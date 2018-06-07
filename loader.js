const axios = require('axios')
const path = require('path')
const fs = require('fs')
const { JSDOM } = require('jsdom')

const loader = (config, name) => {
  const gethtml = axios.create({
    timeout: config.timeout,
    headers: {
      ...config.headers,
      'cookie': config.cookie
    }
  })

  const logFile = path.join(__dirname, `${name}-id.log`)
  // create an empty file if not exist
  fs.closeSync(fs.openSync(logFile, 'a'))

  if (!Array.isArray(config.url)) {
    config.url = [config.url]
  }

  const fn = async () => {
    console.log('Start fetching ', name)
    await Promise.all(config.url.map(url => gethtml.get(url))).then(async responses => {
      const logs = fs.readFileSync(logFile).toString().split('\n')
      const torrents = [].concat(...responses.map(response => {
        const { document } = (new JSDOM(response.data)).window
        return config.getTorrents(document)
      }))

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
      console.log(`Downloading ${name} - `, JSON.stringify(result.map(s => s.id)))
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
      console.log('Complete task ', name)
    }).catch(error => {
      if (error.response) {
        console.error('Error ', name, ' - ', error.response.status)
      } else {
        console.error('Error ', name, ' - ', error.message)
      }
    })
    setTimeout(fn, config['interval'])
  }
  return fn
}

module.exports = loader
