const { getTorrents } = require('../libs/NexusPHP-utils')
module.exports = {
  getTorrents,
  downloadUrl () {
    return ({id}, passkey) => `https://hdhome.org/download.php?id=${id}&passkey=${passkey}`
  }
}
