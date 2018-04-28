const rTorrent = require('./plugins/rTorrent')
const tr = require('./plugins/transmission')
const global = {
  'headers': {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3393.4 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'ja-JP,ja;q=0.8',
    'cache-control': 'max-age=0',
    'dnt': '1',
    'upgrade-insecure-requests': '1',
  },
  'interval': 30000,
  'timeout': 10000,
  'tmpdir': '/home/torrents',
  'afterDownload': rTorrent('127.0.0.1:1088'),
}

const hdhGen = require('./sites/hdhome')
const hdh = {
  'interval': 45000,
  'url': 'https://hdhome.org/torrents.php',
  'downloadUrl': hdhGen.downloadUrl(),
  'getTorrents': hdhGen.getTorrents(s => {
    if (s.isSticky) {
      return false
    }
    if ((s.isFree || s.is2xfree) && s.size < 10) {
      return true
    }
  }),
  'passkey': '',
  'cookie': '',
}

const ttgGen = require('./sites/totheglory')
const ttg = {
  'url': 'https://totheglory.im/browse.php?c=M',
  'downloadUrl': ttgGen.downloadUrl(),
  'getTorrents': ttgGen.getTorrents(),
  'passkey': '',
  'cookie': '',
}

const u2Gen = require('./sites/u2')
const u2 = {
  'url': 'https://u2.dmhy.org/torrents.php',
  'downloadUrl': u2Gen.downloadUrl(),
  'getTorrents': u2Gen.getTorrents(s => {
    if (s.size < 100 && s.date.isAfter('2018-04-01') && s.uploader < 10 && s.downloader > 10) {
      if (s.is2xfree) {
        return true
      }
      if (s.isCustom && s.customDetail.upload === 2.33 && s.customDetail.download === 0) {
        return true
      }
    }
  }),
  'passkey': '',
  'cookie': '',
}

const opencdGen = require('./sites/opencd')
const opencd = {
  'interval': 45000,
  'afterDownload': tr({
    'username': 'admin',
    'password': 'admin',
  }),
  'url': 'https://open.cd/torrents.php?boardid=1',
  'downloadUrl': opencdGen.downloadUrl(),
  'getTorrents': opencdGen.getTorrents(),
  'passkey': '',
  'cookie': '',
}

module.exports = {
  global,
  hdh,
  ttg,
  opencd,
}
