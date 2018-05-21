const DelugeRPC = require('deluge-rpc')

module.exports = (url, password, options) => {
  const deluge = new DelugeRPC(url, password)
  return (outputFilename, name) => {
    console.log(name, ' downloaded completely. Pushing...')
    deluge.addTorrent(outputFilename, options)
  }
}
