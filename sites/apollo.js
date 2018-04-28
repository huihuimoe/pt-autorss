const convert = require('../libs/convert')
const moment = require('moment')
const status = element => {
  return {
    get id         () { return +element.querySelector('td > span > a[href*=id]').href.match(/(?<=id=)\d+/)[0] },
    get name       () { return 'unknown - ' + element.querySelector('td > a').childNodes[0].textContent },
    get isFree     () { return !!element.querySelector('td > a .tl_free') },
    get date       () { return moment(element.querySelector('span.time').getAttribute('title')) },
    get size       () { return convert(element.children[3].textContent) }, // GB
    get uploader   () { return +element.children[5].textContent },
    get downloader () { return +element.children[6].textContent }
  }
}

module.exports = {
  getTorrents (filter = status => true) {
    return document => {
      const origin = Array.from(document.querySelectorAll('#torrent_table > tbody > [class*=edition_]'))
      return origin.map(status).filter(filter).map(s => ({
        'id': s.id,
        'name': s.name
      }))
    }
  },
  downloadUrl () {
    return ({id}, {passkey, authkey}) => `https://apollo.rip/torrents.php?action=download&id=${id}&authkey=${authkey}&torrent_pass=${passkey}`
  }
}
