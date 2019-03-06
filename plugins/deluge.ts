import { execSync } from 'child_process'
import { IDownloadToRetn } from '../bootstrap'
// import { readFileSync } from 'fs'
// import parseTorrent = require('parse-torrent')

// need deluge-console
export default () => {
  return (file: IDownloadToRetn) => {
    console.log(`Pushing ${file.filename} to deluge using deluge-console...`)
    execSync(`deluge-console add ${file.path}`)
    // parse-torrent example
    // const { infoHash } = parseTorrent(readFileSync(outputFilename))
    // execSync(`deluge-console info ${infoHash}`)
    return file
  }
}
