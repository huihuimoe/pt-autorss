import DelugeRPC from 'deluge-rpc'
import { readFileSync } from 'fs'
import { IDownloadToRetn } from '../bootstrap'

export default (
  url: string,
  password: string,
  globalOptions: DelugeRPC.DelugeTorrentConfig = {},
) => {
  const deluge = new DelugeRPC(url, password)
  return async (file: IDownloadToRetn, options: DelugeRPC.DelugeTorrentConfig = {}) => {
    console.log(`Pushing ${file.filename} to deluge with delugeRPC...`)
    await deluge.auth()
    await deluge.connect()
    await deluge.addTorrent(readFileSync(file.path), {
      ...globalOptions,
      ...options,
    })
    return file
  }
}
