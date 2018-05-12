const { getTorrents } = require('../libs/NexusPHP-utils')

const downloadUrl = ({id}, passkey) =>
  `https://pt.gztown.net/download.php?id=${id}&passkey=${passkey}&https=1`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter),
  ...others
})
