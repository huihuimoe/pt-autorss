const { getId } = require('../libs/NexusPHP-utils')
module.exports = {
  getId,
  downloadUrl () {
    return (id, passkey) => `https://pt.gztown.net/download.php?id=${id}&passkey=${passkey}&https=1`
  }
}
