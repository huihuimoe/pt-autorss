import NexusPHP from '../libs/NexusPHP'

export default class HUTBT extends NexusPHP {
  public getStatus(element: Element) {
    // prettier-ignore
    return {
      ...super.getStatus(element),
      get id     () { return +element.querySelector<HTMLAnchorElement>('.torrent a').href.match(/(?<=id=)\d+/)[0] },
      get name   () { return element.querySelector('.torrent a').textContent },
      get isFree () { return !!element.querySelector('.free') },
      get is50   () { return !!element.querySelector('.halfdown') },
      get is30   () { return !!element.querySelector('.thirtypercent') },
      get is0day () { return !!element.querySelector('.oday') },
    }
  }
}
