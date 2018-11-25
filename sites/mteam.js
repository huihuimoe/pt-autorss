const { defaultStatus, getTorrents } = require('../libs/NexusPHP-utils')

const status = element =>
  Object.defineProperties(defaultStatus(element), Object.getOwnPropertyDescriptors({
    get name () { return element.querySelector('.torrentname .embedded a').textContent }
  }))

/**
 * 2fa 认证
 * @TODO
 */

const downloadUrl = (useIpv6 = false) => {
  return ({id}, passkey) =>
    `https://tp.m-team.cc/download.php?id=${id}&passkey=${passkey}&https=1${useIpv6 ? '&ipv6=1' : ''}`
}

module.exports = ({
  filter,
  useIpv6 = false,
  ...others
} = {}) => ({
  downloadUrl: downloadUrl(useIpv6),
  getTorrents: getTorrents(filter, undefined, status),
  ...others
})
