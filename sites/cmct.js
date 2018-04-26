const { getTorrents } = require('../libs/NexusPHP-utils')
module.exports = {
  getTorrents,
  downloadUrl () {
    return ({id}, passkey) => `http://hdcmct.org/download.php?id=${id}&passkey=${passkey}`
  }
}
