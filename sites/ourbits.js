const { getTorrents } = require('../libs/NexusPHP-utils')
module.exports = {
  getTorrents,
  downloadUrl () {
    return (id, passkey) => `http://ourbits.club/download.php?id=${id}&passkey=${passkey}&https=1`
  }
}
