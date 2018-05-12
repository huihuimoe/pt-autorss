const { getTorrents } = require('../libs/NexusPHP-utils')

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
  getTorrents: getTorrents(filter),
  ...others
})
