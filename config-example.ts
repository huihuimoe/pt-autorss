import DelugeInitializer from './plugins/delugeRPC'
import qBittorrentInitializer from './plugins/qBittorrent'
import rTorrentInitializer from './plugins/rTorrent'
import TransmissionInitializer from './plugins/transmission'

// some variable
const savePath = '/opt/torrents'
const qBittorrentWatchPath = '/mnt/qBittorrent/watch'
const DelugeWithMaxUp50M = DelugeInitializer('http://127.0.0.1:8112/', 'deluge', {
  max_upload_speed: 51200,
})
const qBittorrent = qBittorrentInitializer(
  {
    host: 'http://127.0.0.1:9001',
    password: 'admin',
    username: 'admin',
  },
  {
    dlLimit: 10000000, // Bytes/s
    skip_checking: false,
    upLimit: 10000000,
  },
)
const rTorrent = rTorrentInitializer('127.0.0.1:1088')
const Transmission = TransmissionInitializer({
  password: 'admin',
  username: 'admin',
})

// default settings
export const global = {
  headers: {
    accept: 'text/html,application/xhtml+xml,application/xml',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'en-US',
    'cache-control': 'max-age=0',
    dnt: '1',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/72.0.3626.119 Safari/537.36',
  },
  interval: 30000,
  timeout: 10000,
}

/*
 * tips:
 * press F12 and type `document.cookie` in  console to get cookie
 */

// download all torrents of both two url and push to rtorrent every 30s
import TTG from './sites/totheglory'
const ttg = new TTG({
  config: {
    cookie: 'your cookie here',
    url: ['https://totheglory.im/browse.php?c=M', 'https://totheglory.im/browse.php?c=G'],
  },
  async success(s) {
    await this.download(s)
      .to(savePath)
      .then(rTorrent)
  },
})

// download only free and 2xfree exclude all sticky torrents every 45s
import HDH from './sites/hdhome'
const hdh = new HDH({
  config: {
    cookie: 'your cookie here',
    interval: 45000,
    url: 'https://hdhome.org/torrents.php',
  },
  filter(s) {
    if (s.isSticky) return false
    if ((s.isFree || s.is2xfree) && s.size < 10) return true
  },
  async success(s) {
    // save to path
    await this.download(s).to(qBittorrentWatchPath)
    // using qBittorrent API
    await qBittorrent(s, { category: 'Movies' })
  },
})

/*
 * download torrents both
 * 1. size < 100G, after 2018-04-01, uploader < 10, downloader > 10
 * 2. ↑2.33 ↓0.00
 * and push them to deluge with limited speed
 */
import U2 from './sites/u2'
const u2 = new U2({
  config: {
    cookie: 'your cookie here',
    url: 'https://u2.dmhy.org/torrents.php',
  },
  filter(s) {
    if (s.size < 100 && s.date.isAfter('2018-04-01') && s.seeder < 10 && s.leecher > 10) {
      if (s.is2xfree) return true
      if (s.isCustom && s.customEffect.upload === 2.33 && s.customEffect.download === 0) return true
    }
  },
  async success(s) {
    await this.download(s)
      .to(savePath)
      .then(DelugeWithMaxUp50M)
  },
})

// download all torrents and push to transmission every 60s
import OPENCD from './sites/opencd'
const opencd = new OPENCD({
  config: {
    cookie: 'your cookie here',
    interval: 60000,
    url: 'https://open.cd/torrents.php?boardid=1',
  },
  async success(s) {
    await this.download(s)
      .to(savePath)
      .then(Transmission)
  },
})

let configs: import('./libs/helper').ObjectMap<import('./typings/application').IApplication>
configs = {
  hdh,
  opencd,
  ttg,
  u2,
}

export default configs
