const axios = require('axios')
const path = require('path')
const fs = require('fs')
const { JSDOM } = require('jsdom')

const loader = (config, name) => {
  const gethtml = axios.create({
    'timeout': config.timeout,
    'headers': Object.assign(
      {},
      config.headers,
      {
        'cookie': config.cookie
      })
  })

  const logFile = path.join(__dirname, `${name}-id.log`)
  fs.closeSync(fs.openSync(logFile, 'a')) // create an empty file
  return () => {
    gethtml.get(config.url).then(response => {
      const { document } = (new JSDOM(response.data)).window
      const ids = config.getId(document)
      const logs = fs.readFileSync(logFile).toString().split('\n')
      const result = ids.filter(id => {
        if (logs.includes(id)) {
          return false
        } else {
          fs.writeFileSync(logFile, id + '\n', {
            flag: 'a'
          })
          return true
        }
      })
      console.log(`Downloading ${name} - `, JSON.stringify(result));
      (async () => {
        for (let id of result) {
          await axios.request({
            responseType: 'arraybuffer',
            url: config.downloadUrl(id, config.passkey),
            method: 'get'
          }).then((result) => {
            const outputFilename = path.join(config.tmpdir, `${name}-${id}.torrent`)
            fs.writeFileSync(outputFilename, result.data)
            if (config.afterDownload) { config.afterDownload(outputFilename) }
          })
        }
      })()
    }).catch(error => {
      if (error.response) {
        console.log('Error ', name, ' - ', error.response.status)
      } else {
        console.log('Error ', name, ' - ', error.message)
      }
    })
  }
}

module.exports = loader
