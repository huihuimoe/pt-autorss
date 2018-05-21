const DelugeRPC = require('deluge-rpc')

module.exports = (url, password, options) => {
  const deluge = new DelugeRPC(url, password)
  return async (outputFilename, name) => {
    console.log(name, ' downloaded completely. Pushing...')
    await deluge.connect()
    await deluge.addTorrent(outputFilename, options)
  }
}
