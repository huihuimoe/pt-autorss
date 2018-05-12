const { getTorrents } = require('../libs/NexusPHP-utils')

const downloadUrl = ({id}, passkey) =>
  `http://hdcmct.org/download.php?id=${id}&passkey=${passkey}`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter),
  ...others
})
