/* eslint-disable comma-dangle,no-unused-vars */
const rTorrent = require('./plugins/rTorrent')
const tr = require('./plugins/transmission')
const deluge = require('./plugins/delugeRPC')

// default settings
const global = {
  headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3393.4 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'ja-JP,ja;q=0.8',
    'cache-control': 'max-age=0',
    'dnt': '1',
    'upgrade-insecure-requests': '1',
  },
  interval: 30000,
  timeout: 10000,
  tmpdir: '/home/torrents',
  afterDownload: rTorrent('127.0.0.1:1088'),
}

/*
 * tips:
 * 1. press F12 and type `document.cookie` in  console to get cookie
 * 2. set `afterDownload: ()=>{}` to do nothing after download
 */

// download all torrents of both two url and push to rtorrent every 30s
const ttg = require('./sites/totheglory')({
  url: [
    'https://totheglory.im/browse.php?c=M',
    'https://totheglory.im/browse.php?c=G'
  ],
  passkey: 'your passkey here',
  cookie: 'your cookie here',
})

// download only free and 2xfree except sticky torrents and push to rtorrent every 45s
const hdh = require('./sites/hdhome')({
  interval: 45000,
  url: 'https://hdhome.org/torrents.php',
  filter: s => {
    if (s.isSticky) {
      return false
    }
    if ((s.isFree || s.is2xfree) && s.size < 10) {
      return true
    }
  },
  passkey: 'your passkey here',
  cookie: 'your cookie here',
})

/*
 * download torrents both
 * 1. size < 100G, after 2018-04-01, uploader < 10, downloader > 10
 * 2. ↑2.33 ↓0.00
 * and push them to deluge
 */
const u2 = require('./sites/u2')({
  url: 'https://u2.dmhy.org/torrents.php',
  filter: s => {
    if (s.size < 100 && s.date.isAfter('2018-04-01') && s.uploader < 10 && s.downloader > 10) {
      if (s.is2xfree) {
        return true
      }
      if (s.isCustom && s.customDetail.upload === 2.33 && s.customDetail.download === 0) {
        return true
      }
    }
  },
  passkey: 'your passkey here',
  cookie: 'your cookie here',
  afterDownload: deluge('http://127.0.0.1:8112/', 'deluge', { max_upload_speed: 51200 })
})

// download all torrents and push to transmission every 60s
const opencd = require('./sites/opencd')({
  interval: 60000,
  afterDownload: tr({
    username: 'admin',
    password: 'admin',
  }),
  url: 'https://open.cd/torrents.php?boardid=1',
  passkey: 'your passkey here',
  cookie: 'your cookie here',
})

module.exports = {
  global,
  ttg,
  hdh,
  // u2,
  opencd,
}
