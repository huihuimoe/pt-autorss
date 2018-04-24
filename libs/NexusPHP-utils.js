const convert = require('./convert')

const status = element => {
  return {
    get id(){         return element.querySelector('.torrentname a').href.match(/(?<=id=)\d+/)[0]},
    get name(){       return element.querySelector('.torrentname a').textContent},
    get isSticky(){   return element.classList.toString().includes('sticky')},
    get isHR(){       return false}, // @TODO
    get isFree(){     return !!element.querySelector('.pro_free')},
    get is50(){       return !!element.querySelector('.pro_50pctdown')},
    get is30(){       return !!element.querySelector('.pro_30pctdown')},
    get is2xfree(){   return !!element.querySelector('.pro_free2up')},
    get is2x(){       return !!element.querySelector('.pro_2up')},
    get is2x50(){     return !!element.querySelector('.pro_50pctdown2up')},
    get size(){       return convert(element.children[4].textContent)}, // GB
    get uploader(){   return Number(element.children[5].textContent)},
    get downloader(){ return Number(element.children[6].textContent)},
    get isCustom(){   return !!element.querySelector('.pro_custom')},
    customDetail: {
      get upload () {
        const text = element.querySelector('.arrowup ~ b')
        if (text) { return Number(text.textContent.slice(0, -1)) } else { return 1 }
      },
      get download () {
        const text = element.querySelector('.arrowdown ~ b')
        if (text) { return Number(text.textContent.slice(0, -1)) } else { return 1 }
      }
    }
  }
}

const getId = filter => {
  return document => {
    const origin = Array.from(document.querySelectorAll('.torrents > tbody > tr'))
    origin.shift()
    return origin.map(status).filter(filter).map(s => s.id)
  }
}

module.exports = {
  status,
  getId
}
