import { addOptions as IaddOptions, connect } from 'qbittorrent-api'
import { IDownloadToRetn } from '../bootstrap'

export interface IqBittorrentConnectOptions {
  host: string
  username: string
  password: string
}

export default (connectOptions: IqBittorrentConnectOptions, globalAddOptions: IaddOptions = {}) => {
  const instance = connect(
    connectOptions.host,
    connectOptions.username,
    connectOptions.password,
  )
  return async (file: IDownloadToRetn, addOptions: IaddOptions = {}) => {
    // test is login
    await new Promise((resolve, rejects) => {
      instance.transferInfo((e, data) => {
        // relogin
        if (e) instance.reconnect()
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

    return status
  }
}