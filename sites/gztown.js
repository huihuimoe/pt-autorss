const { defaultStatus, getTorrents } = require('../libs/NexusPHP-utils')

/**
 * 注意 gztown 的顶置种子不会标明魔法，
 * 需要订阅指定魔法的顶置种请选择下方的查看特定魔法的种子再使用 `status.isSticky` 筛选
 */

const status = element =>
  Object.defineProperties(defaultStatus(element), Object.getOwnPropertyDescriptors({
    get isFree     () { return !!element.querySelector('.free_bg') },
    get is50       () { return !!element.querySelector('.halfdown_bg') },
    get is30       () { return !!element.querySelector('.thirtypercentdown_bg') },
    get is2xfree   () { return !!element.querySelector('.twoupfree_bg') },
    get is2x       () { return !!element.querySelector('.twoup_bg') },
    get is2x50     () { return !!element.querySelector('.twouphalfdown_bg') }
  }))

const downloadUrl = ({id}, passkey) =>
  `https://pt.gztown.net/download.php?id=${id}&passkey=${passkey}&https=1`

module.exports = ({
  filter,
  ...others
} = {}) => ({
  downloadUrl,
  getTorrents: getTorrents(filter, undefined, status),
  ...others
})
