const { getTorrents } = require('../libs/NexusPHP-utils')

const standardize = document => {
  for (let e of document.querySelectorAll('.torrents > tbody > tr')) {
    e.children[2].remove()
  }
}

const downloadUrl = ({id}, passkey) =>
  `https://open.cd/download.php?id=${id}&passkey=${passkey}`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter, standardize),
  ...others
})
