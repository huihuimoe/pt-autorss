// @TODO

module.exports = {
  getTorrents () {
    return document => {
      const els = Array.from(document.querySelectorAll('#torrent_table tr[class*=sticky]'))
      return els.map(e => new Object({
        'id': e.id
      }))
    }
  },
  downloadUrl () {
    return (id, passkey) => `https://totheglory.im/dl/${id}/${passkey}`
  }
}
