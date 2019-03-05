import NexusPHP from '../libs/NexusPHP'

/**
 * Mteam 若有 2fa 的话，请现在当前运行的 ip 上完成 2fa。
 * Mteam 的 2fa 机制是 cookie + ip 验证，只要 ip 不变，Mteam 没有宕机，就几乎不用再重新验证。
 * 同 cookie 请不要在多个 ip 反复认证。
 * @TODO 2fa 提示
 */

export default class MTEAM extends NexusPHP {
  public getStatus(element: Element) {
    return {
      ...super.getStatus(element),
      get name() {
        return element.querySelector('.torrentname .embedded a').textContent
      },
    }
  }
}
