const { execSync } = require('child_process')

// need deluge-console
module.exports = () => {
  return (outputFilename, name) => {
    console.log(name, ' downloaded completely. Pushing...')
    execSync(`deluge-console add ${outputFilename}`)
  }
}
