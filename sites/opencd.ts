import NexusPHP from '../libs/NexusPHP'

export default class OPENCD extends NexusPHP {
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
    for (const e of document.querySelectorAll<HTMLTableRowElement>('.torrents > tbody > tr'))
      e.children[2].remove()
  }
}
