const { defaultStatus, getTorrents } = require('../libs/NexusPHP-utils')

const standardize = document => {
  for (let e of document.querySelectorAll('.torrents > tbody > tr')) {
    e.children[2].remove()
  }
}

const status = element =>
  Object.defineProperties(defaultStatus(element), Object.getOwnPropertyDescriptors({
    get isSticky () {
      return !!element.querySelector('.sticky')
    }
  }))

const downloadUrl = ({id}, passkey) =>
  `https://open.cd/download.php?id=${id}&passkey=${passkey}`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter, standardize, status),
  ...others
})
