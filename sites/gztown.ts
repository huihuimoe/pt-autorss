import NexusPHP from '../libs/NexusPHP'

/**
 * 注意 gztown 的顶置种子不会标明魔法，
 * 需要订阅指定魔法的顶置种请选择下方的查看特定魔法的种子再使用 `status.isSticky` 筛选
 */

export default class GZTOWN extends NexusPHP {
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
    }
  }
}
