const { getTorrents } = require('../libs/NexusPHP-utils')

const standardize = document => {
  for (let e of document.querySelectorAll('.torrents > tbody > tr.sticky_blank')) {
    e.classList.remove('sticky_blank')
  }
}

const downloadUrl = ({ id }, passkey) =>
  `http://ourbits.club/download.php?id=${id}&passkey=${passkey}&https=1`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter, standardize),
  ...others
})
