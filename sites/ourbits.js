const { getTorrents } = require('../libs/NexusPHP-utils')

const downloadUrl = ({id}, passkey) =>
  `http://ourbits.club/download.php?id=${id}&passkey=${passkey}&https=1`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter),
  ...others
})
