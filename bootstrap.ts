import 'array-flat-polyfill' // for node < 11.0.0
import axios, { AxiosError, AxiosInstance, AxiosPromise } from 'axios'
import * as fs from 'fs'
import { JSDOM } from 'jsdom'
import * as path from 'path'
import { delay, ObjectMap, Unpacked } from './libs/helper'
import { IApplication, IRequireStatus } from './typings/application'
import { IBaseConfig } from './typings/config'

export interface IDownloadToRetn {
  configName: string
  filename: string
  path: string
  s: IRequireStatus
}

export interface IDownloadRetn {
  configName: string
  result: AxiosPromise<ArrayBuffer>
  s: IRequireStatus
  to: (savePath: string) => Promise<IDownloadToRetn>
}

export default class Bootstrap {
  public static async initialize(apps: ObjectMap<IApplication>) {
    const instances: ObjectMap<Bootstrap> = {}
    for (const [name, app] of Object.entries(apps)) instances[name] = new this(app, name)

    let delayCount = 0
    const delayStep = 3000
    for (const instance of Object.values(instances)) {
      instance.run()
      await delay(delayCount++ * delayStep)
    }
  }

  private readonly config: IBaseConfig
  private readonly httpClient: AxiosInstance
  private readonly logFile: fs.PathLike

  public constructor(readonly app: IApplication, readonly configName: string) {
    this.config = app.config

    const { origin } = new URL(
      Array.isArray(this.config.url) ? this.config.url[0] : this.config.url,
    )
    this.httpClient = axios.create({
      baseURL: origin,
      headers: {
        ...this.config.headers,
        cookie: this.config.cookie,
      },
      timeout: this.config.timeout,
    })
    this.logFile = path.join(__dirname, `${configName}-id.log`)
    // create an empty file if logFile not exist
    fs.closeSync(fs.openSync(this.logFile, 'a'))
  }

  public async fetchTorrentsStatus() {
    const urls = Array.isArray(this.config.url) ? this.config.url : [this.config.url]
    const responses = await Promise.all(urls.map(url => this.httpClient.get<string>(url)))
    const torrentsStatusQueue = responses.map(response => {
      const DOMTree = new JSDOM(response.data)
      const { document } = DOMTree.window
      return this.app.getTorrentsStatus(document)
    })
    const torrentsStatus = (await Promise.all(torrentsStatusQueue)).flat()
    return torrentsStatus
  }

  public async filterTorrentStatus(
    torrentsStatus: Unpacked<Unpacked<Bootstrap['fetchTorrentsStatus']>>,
  ) {
    const logStream = fs
      .readFileSync(this.logFile)
      .toString()
      .split('\n')
    const filteredStatus = torrentsStatus.filter(torrent => {
      if (logStream.includes(torrent.id.toString())) return false
      fs.writeFileSync(this.logFile, torrent.id + '\n', {
        flag: 'a',
      })
      return true
    })
    return filteredStatus
  }

  public async runOnce() {
    console.log('Start task ', this.configName)
    await this.app.preFetch.call(this)
    const torrentsStatus = await this.fetchTorrentsStatus()
    await this.app.afterFetch.call(this)

    const filteredStatus = await this.filterTorrentStatus(torrentsStatus)
    const customFilteredStatus = filteredStatus.filter(s => this.app.filter.call(this, s))
    console.log(
      `Detected new torrents on ${this.configName} - ${JSON.stringify(
        customFilteredStatus.map(s => s.id),
      )}`,
    )

    for (const status of filteredStatus) {
      console.log(`Excute success function with ${this.configName} ${status.id}`)
      await this.app.success.call(this, status)
    }
    console.log(`Complete task ${this.configName}, wait for ${this.config.interval}ms`)
  }

  public async run() {
    const isAxiosError = (error: AxiosError | Error): error is AxiosError =>
      typeof (error as AxiosError).response !== 'undefined'

    while (true) {
      await this.runOnce().catch((error: AxiosError | Error) => {
        if (isAxiosError(error))
          console.error('Error ', this.configName, ' - got ', error.response.status)
        else console.error('Error ', this.configName, ' - ', error.message)
      })
      await delay(this.config.interval)
    }
  }

  public download(s: IRequireStatus): IDownloadRetn {
    console.log(`Downloading torrent ${s.id} from ${this.configName} ...`)
    const result = this.httpClient.get<ArrayBuffer>(s.downLink, {
      responseType: 'arraybuffer',
    })
    const to = async (savePath: string): Promise<IDownloadToRetn> => {
      const outputFileName = `${this.configName} - ${s.id}.torrent`
      const outputFullPath = path.join(savePath, outputFileName)
      fs.writeFileSync(outputFullPath, (await result).data)
      console.log(
        `Download torrent ${s.id} from ${this.configName} completed. Save to ${outputFullPath}.`,
      )
      return {
        configName: this.configName,
        filename: outputFileName,
        path: outputFullPath,
        s,
      }
    }
    return { configName: this.configName, result, s, to }
  }

  public async downloadTo(s: IRequireStatus, savePath: string) {
    return this.download(s).to(savePath)
  }
}
