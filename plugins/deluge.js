const { execSync } = require('child_process')
const parseTorrent = require('parse-torrent')
const fs = require('fs')

// need deluge-console
module.exports = () => {
  return (outputFilename, name) => {
    console.log(name, ' downloaded completely. Pushing...')
    execSync(`deluge-console add ${outputFilename}`)
    const { infoHash } = parseTorrent(fs.readFileSync(outputFilename))
    execSync(`deluge-console info ${infoHash}`)
  }
}
