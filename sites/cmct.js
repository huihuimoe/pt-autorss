const { getId } = require('../libs/NexusPHP-utils')
module.exports = {
  getId,
  downloadUrl () {
    return (id, passkey) => `http://hdcmct.org/download.php?id=${id}&passkey=${passkey}`
  }
}
