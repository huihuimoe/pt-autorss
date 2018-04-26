const axios = require('axios')
const path = require('path')
const fs = require('fs')
const { JSDOM } = require('jsdom')

const loader = (config, name) => {
  const gethtml = axios.create({
    'timeout': config.timeout,
    'headers': {
      ...config.headers,
      'cookie': config.cookie
    }
  })

  const logFile = path.join(__dirname, `${name}-id.log`)
  fs.closeSync(fs.openSync(logFile, 'a')) // create an empty file
  return () => {
    gethtml.get(config.url).then(response => {
      const { document } = (new JSDOM(response.data)).window
      const torrents = config.getTorrents(document)
      const logs = fs.readFileSync(logFile).toString().split('\n')
      const result = torrents.filter(torrent => {
        if (logs.includes(torrent.id.toString())) {
          return false
        } else {
          fs.writeFileSync(logFile, torrent.id + '\n', {
            flag: 'a'
          })
          return true
        }
      })
      console.log(`Downloading ${name} - `, JSON.stringify(result.map(s => s.id)));
      (async () => {
        for (let torrent of result) {
          await axios.request({
            responseType: 'arraybuffer',
            url: config.downloadUrl(torrent, config.passkey),
            method: 'get'
          }).then(result => {
            const outputFilename = path.join(config.tmpdir, `${name}-${torrent.id}.torrent`)
            fs.writeFileSync(outputFilename, result.data)
            if (config.afterDownload) { config.afterDownload(outputFilename, torrent.name) }
          })
        }
      })()
    }).catch(error => {
      if (error.response) {
        console.error('Error ', name, ' - ', error.response.status)
      } else {
        console.error('Error ', name, ' - ', error.message)
      }
    })
  }
}

module.exports = loader
