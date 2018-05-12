const { getTorrents } = require('../libs/NexusPHP-utils')

const downloadUrl = ({id}, passkey) =>
  `https://u2.dmhy.org/download.php?id=${id}&passkey=${passkey}&https=1`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter),
  ...others
})
