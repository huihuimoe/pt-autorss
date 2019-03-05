import NexusPHP from '../libs/NexusPHP'

export default class OURBITS extends NexusPHP {
  public getStatus(element: Element) {
    return {
      ...super.getStatus(element),
      get isSticky() {
        return !!element.querySelector('.sticky')
      },
    }
  }
  public async preAnalyze(document: Document) {
    await super.preAnalyze(document)
    for (const e of document.querySelectorAll('.torrents > tbody > tr.sticky_blank'))
      e.classList.remove('sticky_blank')
  }
}
