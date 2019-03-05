import NexusPHP from '../libs/NexusPHP'

export default class BYR extends NexusPHP {
  public getStatus(element: Element) {
    // prettier-ignore
    return {
      ...super.getStatus(element),
      get isFree   () { return !!element.querySelector('.free_bg') },
      get is50     () { return !!element.querySelector('.halfdown_bg') },
      get is30     () { return !!element.querySelector('.thirtypercentdown_bg') },
      get is2xfree () { return !!element.querySelector('.twoupfree_bg') },
      get is2x     () { return !!element.querySelector('.twoup_bg') },
      get is2x50   () { return !!element.querySelector('.twouphalfdown_bg') },
      get isSticky () { return !!element.querySelector('.sticky') },
    }
  }
}
