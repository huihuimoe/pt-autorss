const { getId } = require('../libs/NexusPHP-utils')
module.exports = {
  getId,
  downloadUrl () {
    return (id, passkey) => `https://hdhome.org/download.php?id=${id}&passkey=${passkey}`
  }
}
