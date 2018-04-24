const convert = require('./convert')

const status = element => {
  return {
    get isSticky(){   element.classList.toString().includes('sticky')},
    get isFree(){     !!element.querySelector('.pro_free')},
    get is50(){       !!element.querySelector('.pro_50pctdown')},
    get is30(){       !!element.querySelector('.pro_30pctdown')},
    get is2xfree(){   !!element.querySelector('.pro_free2up')},
    get is2x(){       !!element.querySelector('.pro_2up')},
    get is2x50(){     !!element.querySelector('.pro_50pctdown2up')},
    get size(){       convert(element.children[4].textContent)}, // GB
    get uploader(){   Number(element.children[5].textContent)},
    get downloader(){ Number(element.children[6].textContent)},
    get isCustom(){   !!element.querySelector('.pro_custom')},
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
    return origin.map(e => {
      return Object.assign({},
        status(e),
        {
          id: e.querySelector('a[href*=detail]').href.match(/(?<=id=)\d+/)[0]
        }
      )
    }).filter(filter).map(s => s.id)
  }
}

module.exports = {
  status,
  getId
}
