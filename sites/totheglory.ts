import dayjs = require('dayjs')
import { convert } from '../libs/helper'
import NexusPHP from '../libs/NexusPHP'

export default class TTG extends NexusPHP {
  public getStatus(element: Element) {
    // prettier-ignore
    return {
      get id         () { return +element.id },
      get catalog    () { return element.children[0].querySelector('img').alt },
      get name       () { return element.querySelector('.name_left a b').childNodes[0].textContent },
      get isSticky   () { return element.classList.toString().includes('sticky') },
      get isHR       () { return !!element.querySelector('[title="Hit and Run"]') },
      get isFree     () { return !!element.querySelector('[alt="free"]') },
      get is50       () { return !!element.querySelector('[alt="50%"]') },
      get is30       () { return !!element.querySelector('[alt="30%"]') },
      /** @deprecated */
      get is2xfree   () { return false },
      /** @deprecated */
      get is2x       () { return false },
      /** @deprecated */
      get is2x50     () { return false },
      get isNew      () { return !!element.querySelector('.new') },
      get isHot      () { return !!element.querySelector('.hot') },
      get downLink   () { return element.children[1].querySelector<HTMLAnchorElement>('.dl_a').href },
      get comments   () { return +element.children[3].textContent },
      get date       () { return dayjs(element.children[4].textContent.replace('\n', ' ')) },
      get size       () { return convert(element.children[6].textContent.replace('\n', '')) },
      get seeder     () { return +element.children[8].textContent.replace('\n', '').split('/')[0] },
      get leecher    () { return +element.children[8].textContent.replace('\n', '').split('/')[1] },
      get snatched   () { return Number.parseInt(element.children[7].textContent, 10) },
    }
  }
  public async getTorrentsStatus(document: Document) {
    return super.getTorrentsStatus(document, '#torrent_table > tbody > tr:not(:first-child)')
  }
}
