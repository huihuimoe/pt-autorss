const { getTorrents } = require('../libs/NexusPHP-utils')
module.exports = {
  getTorrents,
  downloadUrl () {
    return ({id}, passkey) => `https://pt.gztown.net/download.php?id=${id}&passkey=${passkey}&https=1`
  }
}
