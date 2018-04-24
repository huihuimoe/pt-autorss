const { getTorrents } = require('../libs/NexusPHP-utils')
module.exports = {
  getTorrents,
  downloadUrl () {
    return (id, passkey) => `https://u2.dmhy.org/download.php?id=${id}&passkey=${passkey}&https=1`
  }
}
