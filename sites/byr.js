const { defaultStatus, getTorrents } = require('../libs/NexusPHP-utils')

const status = element =>
  Object.defineProperties(defaultStatus(element), Object.getOwnPropertyDescriptors({
    get isFree   () { return !!element.querySelector('.free_bg') },
    get is50     () { return !!element.querySelector('.halfdown_bg') },
    get is30     () { return !!element.querySelector('.thirtypercentdown_bg') },
    get is2xfree () { return !!element.querySelector('.twoupfree_bg') },
    get is2x     () { return !!element.querySelector('.twoup_bg') },
    get is2x50   () { return !!element.querySelector('.twouphalfdown_bg') },
    get isSticky () { return !!element.querySelector('.sticky') }
  }))

const downloadUrl = ({ id }, passkey) =>
  `https://bt.byr.cn/download.php?id=${id}&passkey=${passkey}&https=1`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter, undefined, status),
  ...others
})
