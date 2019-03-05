import DelugeRPC = require('deluge-rpc')
import { IDownloadToRetn } from '../bootstrap'

export default (
  url: string,
  password: string,
  options?: string | DelugeRPC.DelugeTorrentConfig,
) => {
  const deluge = new DelugeRPC(url, password)
  return async (file: IDownloadToRetn) => {
    console.log(`Pushing ${file.filename} to deluge with delugeRPC...`)
    await deluge.auth()
    await deluge.connect()
    await deluge.addTorrent(file.path, options)
  }
}
