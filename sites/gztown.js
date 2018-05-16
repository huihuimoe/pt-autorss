const convert = require('../libs/convert')
const moment = require('moment')

/**
 * 注意 gztown 的顶置种子不会标明魔法，
 * 需要订阅指定魔法的顶置种请选择下方的查看特定魔法的种子再使用 `status.isSticky` 筛选
 */

const status = element => ({
  get id         () { return +element.querySelector('.torrentname a').href.match(/(?<=id=)\d+/)[0] },
  get name       () { return element.querySelector('.torrentname a').textContent },
  get isSticky   () { return element.classList.toString().includes('sticky') },
  get isFree     () { return !!element.querySelector('.free_bg') },
  get is50       () { return !!element.querySelector('.halfdown_bg') },
  get is30       () { return !!element.querySelector('.thirtypercentdown_bg') },
  get is2xfree   () { return !!element.querySelector('.twoupfree_bg') },
  get is2x       () { return !!element.querySelector('.twoup_bg') },
  get is2x50     () { return !!element.querySelector('.twouphalfdown_bg') },
  get date       () { return moment(element.children[3].querySelector('[title]').getAttribute('title')) },
  get size       () { return convert(element.children[4].textContent) }, // GB
  get uploader   () { return +element.children[5].textContent },
  get downloader () { return +element.children[6].textContent }
})

const getTorrents = (filter = status => true, standardize = document => {}) => document => {
  standardize(document)
  const origin = Array.from(document.querySelectorAll('.torrents > tbody > tr'))
  origin.shift()
  return origin.map(status).filter(filter).map(s => ({
    'id': s.id,
    'name': s.name
  }))
}

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
