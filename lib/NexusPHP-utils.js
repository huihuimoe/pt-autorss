const convert = require('./convert')

module.exports = {
  status (element) {
    return {
      isSticky:   element.classList.toString().includes('sticky'),
      isFree:     !!element.querySelector('.pro_free'),
      is50:       !!element.querySelector('.pro_50pctdown'),
      is30:       !!element.querySelector('.pro_30pctdown'),
      is2xfree:   !!element.querySelector('.pro_free2up'),
      is2x:       !!element.querySelector('.pro_2up'),
      is2x50:     !!element.querySelector('.pro_50pctdown2up'),
      size:       convert(element.children[4].textContent), // GB
      uploader:   Number(element.children[5].textContent),
      downloader: Number(element.children[6].textContent),
      isCustom:   !!element.querySelector('.pro_custom'),
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
}
