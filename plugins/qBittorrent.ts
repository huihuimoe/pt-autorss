import { addOptions as IaddOptions, connect } from 'qbittorrent-api'
import { IRequireStatus } from '../typings/application'

export interface IqBittorrentConnectOptions {
  host: string
  username: string
  password: string
}

export default (connectOptions: IqBittorrentConnectOptions, addOptions: IaddOptions) => {
  const instance = connect(
    connectOptions.host,
    connectOptions.username,
    connectOptions.password,
  )
  return async (status: IRequireStatus) => {
    // test is login
    await new Promise((resolve, rejects) => {
      instance.transferInfo(e => {
        // relogin
        if (e) instance.reconnect()
        resolve()
      })
    })

    console.log(`Pushing ${status.id} to qBittorrent using qBittorrent API...`)
    await new Promise((resolve, rejects) => {
      instance.add2(status.downLink, addOptions, e => {
        if (e) rejects(e)
        resolve()
      })
    })

    return status
  }
}
