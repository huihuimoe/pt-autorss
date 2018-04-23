const { execSync } = require('child_process')

module.exports = () => {
  return outputFilename => execSync(`deluge-console add ${outputFilename}`)
}
