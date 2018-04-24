const Transmission = require('transmission')
/**
 * @param {object} options @see https://github.com/FLYBYME/node-transmission#how-to-use
 */

module.exports = options => {
  const transmission = new Transmission(options)
  return outputFilename => transmission.addFile(outputFilename, (err, result) => {
    if (err) { console.error(err) }
    transmission.start(result.id, () => {})
  })
}
