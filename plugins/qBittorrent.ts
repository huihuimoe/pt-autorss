import { connect } from 'qbittorrent-api'
import { IDownloadToRetn } from '../bootstrap'

export default () => {
  // @TODO
  return (file: IDownloadToRetn) => {
    console.log(`Pushing ${file.filename} to qBittorrent using qBittorrent API...`)
    // @TODO
    return file
  }
}
