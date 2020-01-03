// @TODO added temporarily
// for qBittorrent 3.2.0 - 4.1.x, using qBittorrent webui API, please use qBittorrent-v2 if you are using qBittorrent > 4.2.x.
// https://github.com/qbittorrent/qBittorrent/wiki/WebUI-API-Documentation

import { addOptions as IaddOptions, connect } from 'qbittorrent-api'
import { IDownloadToRetn } from '../bootstrap'

export interface IqBittorrentConnectOptions {
  host: string
  username: string
  password: string
}

export default (connectOptions: IqBittorrentConnectOptions, globalAddOptions: IaddOptions = {}) => {
  const instance = connect(connectOptions.host, connectOptions.username, connectOptions.password)
  return async (file: IDownloadToRetn, addOptions: IaddOptions = {}) => {
    // test is login
    await new Promise((resolve, rejects) => {
      instance.transferInfo((e, data) => {
        // relogin
        if (e || !data) {
          console.log('qBittorrent need relogin...')
          instance.reconnect()
        }
        resolve()
      })
    })

    console.log(`Pushing ${file.filename} to qBittorrent using qBittorrent API...`)
    await new Promise((resolve, rejects) => {
      instance.add2(
        file.path,
        {
          ...globalAddOptions,
          ...addOptions,
        },
        e => {
          if (e) rejects(e)
          resolve()
        },
      )
    })

    return file
  }
}
