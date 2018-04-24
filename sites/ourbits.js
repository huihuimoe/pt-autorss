// @TODO

const { getId } = require('../libs/NexusPHP-utils')
module.exports = {
  getId,
  downloadUrl () {
    return (id, passkey) => `http://ourbits.club/download.php?id=${id}&passkey=${passkey}`
  }
}
