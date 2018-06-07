const { defaultStatus, getTorrents } = require('../libs/NexusPHP-utils')

const status = element =>
  Object.defineProperties(defaultStatus(element), Object.getOwnPropertyDescriptors({
    get id     () { return +element.querySelector('.torrent a').href.match(/(?<=id=)\d+/)[0] },
    get name   () { return element.querySelector('.torrent a').textContent },
    get isFree () { return !!element.querySelector('.free') },
    get is50   () { return !!element.querySelector('.halfdown') },
    get is30   () { return !!element.querySelector('.thirtypercent') },
    get is0day () { return !!element.querySelector('.oday') }
  }))

const downloadUrl = ({id}, passkey) =>
  `https://hudbt.hust.edu.cn/download.php?id=${id}&passkey=${passkey}&https=1`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter, undefined, status),
  ...others
})
