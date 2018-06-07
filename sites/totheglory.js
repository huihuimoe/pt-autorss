const convert = require('../libs/convert')
const dayjs = require('dayjs')

const status = element => ({
  get id         () { return +element.id },
  get name       () { return element.querySelector('.name_left a b').childNodes[0].textContent },
  get isSticky   () { return element.classList.toString().includes('sticky') },
  get isHR       () { return !!element.querySelector('[title="Hit and Run"]') },
  get isFree     () { return !!element.querySelector('[alt="free"]') },
  get is50       () { return !!element.querySelector('[alt="50%"]') },
  get is30       () { return !!element.querySelector('[alt="30%"]') },
  get date       () { return dayjs(element.children[4].innerText.replace('\n', ' ')) },
  get size       () { return convert(element.children[6].textContent.replace('\n', '')) }, // GB
  get uploader   () { return +element.children[8].textContent.replace('\n', '').split('/')[0] },
  get downloader () { return +element.children[8].textContent.replace('\n', '').split('/')[1] }
})

const getTorrents = (filter = status => true) => document => {
  const origin = Array.from(document.querySelectorAll('#torrent_table > tbody > tr:not(:first-child)'))
  if (!origin.length) {
    throw new Error('Can not match torrents.')
  }
  return origin.map(status).filter(filter).map(s => ({
    'id': s.id,
    'name': s.name
  }))
}

const downloadUrl = ({id}, passkey) =>
  `https://totheglory.im/dl/${id}/${passkey}`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter),
  ...others
})
