const { getTorrents } = require('../libs/NexusPHP-utils')

const downloadUrl = ({id}, passkey) =>
  `https://hdhome.org/download.php?id=${id}&passkey=${passkey}`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter),
  ...others
})
