const nexus = require('../lib/NexusPHP-utils')

module.exports = {
  getId(filter) {
    return document => {
      const origin = Array.from(document.querySelectorAll('#torrenttable > tbody > tr'))
      origin.shift()
      return origin.map(e => {
        return Object.assign({},
          nexus.status(e), {
            id: e.querySelector('a[href*=detail]').href.match(/(?<=id=)\d+/)[0]
          }
        )
      }).filter(filter).map(s => s.id)
    }
  },
  downloadUrl() {
    return (id, passkey) => `https://hdhome.org/download.php?id=${id}&passkey=${passkey}`
  }
}