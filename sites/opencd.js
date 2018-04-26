const { getTorrents } = require('../libs/NexusPHP-utils')
module.exports = {
  getTorrents (filter) {
    return getTorrents(filter, document => {
      for (let e of document.querySelectorAll('.torrents > tbody > tr')) {
        e.children[2].remove()
      }
    })
  },
  downloadUrl () {
    return ({id}, passkey) => `https://open.cd/download.php?id=${id}&passkey=${passkey}`
  }
}
