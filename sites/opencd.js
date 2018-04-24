const { status } = require('../libs/NexusPHP-utils')
module.exports = {
  getId = filter => {
    return document => {
      const origin = Array.from(document.querySelectorAll('.torrents > tbody > tr'))
      origin.shift()
      return origin.map(e => {
        e.children[2].remove()
        return status(e)
      }).filter(filter).map(s => s.id)
    }
  },
  downloadUrl () {
    return (id, passkey) => `https://open.cd/download.php?id=${id}&passkey=${passkey}`
  }
}
