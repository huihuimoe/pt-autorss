/*
 * Project @see https://github.com/ZJUT/NexusPHP
 */
import dayjs from 'dayjs'
import { global as globalConfig } from '../config'
import { IApplication, IApplicationLifecycle, IRequireStatus } from '../typings/application'
import { INexusPHPConfig } from '../typings/config'
import { combineAsync, convert, parseIntWithComma } from './helper'

export interface INexusPHPStatus extends IRequireStatus {
  readonly catalog: string
  readonly name: string
  readonly detailLink: string
  readonly isSticky: boolean
  readonly isHR: boolean
  readonly isFree: boolean
  readonly is50: boolean
  readonly is30: boolean
  readonly is2xfree: boolean
  readonly is2x: boolean
  readonly is2x50: boolean
  readonly isNew: boolean
  readonly isHot: boolean
  readonly comments: number
  readonly date: dayjs.Dayjs
  readonly size: number
  readonly seeder: number
  readonly leecher: number
  readonly snatched: number
}

export interface INexusPHPParam<T extends INexusPHPStatus>
  extends Partial<IApplicationLifecycle<T>> {
  config: Pick<INexusPHPConfig, Exclude<keyof INexusPHPConfig, keyof typeof globalConfig>> &
    Partial<typeof globalConfig>
}

export default abstract class NexusPHP<S extends INexusPHPStatus = INexusPHPStatus>
  implements IApplication<S>
{
  public config: INexusPHPConfig

  public constructor(param: INexusPHPParam<S>) {
    this.config = {
      ...globalConfig,
      ...param.config,
    }

    const keyList: Array<Exclude<keyof IApplicationLifecycle, 'filter'>> = [
      'preFetch',
      'afterFetch',
      'preAnalyze',
      'afterAnalyze',
      'success',
    ]
    for (const key of keyList)
      if (key in param) this[key] = combineAsync<NexusPHP[typeof key]>(this[key], param[key])

    if (param.filter) this.filter = param.filter
  }

  // @ts-ignore
  public getStatus(element: Element): INexusPHPStatus {
    // prettier-ignore
    return {
      get id         () { return +element.querySelector<HTMLAnchorElement>('.torrentname a').href.match(/(?<=id=)\d+/)[0] },
      get catalog    () { return element.children[0].textContent || element.children[0].querySelector('img').alt },
      get name       () { return element.querySelector('.torrentname a').textContent },
      get isSticky   () { return !!element.querySelector('.sticky') },
      get isHR       () { return !!element.querySelector('.hitandrun') },
      get isFree     () { return !!element.querySelector('.pro_free') },
      get is50       () { return !!element.querySelector('.pro_50pctdown') },
      get is30       () { return !!element.querySelector('.pro_30pctdown') },
      get is2xfree   () { return !!element.querySelector('.pro_free2up') },
      get is2x       () { return !!element.querySelector('.pro_2up') },
      get is2x50     () { return !!element.querySelector('.pro_50pctdown2up') },
      get isNew      () { return !!element.querySelector('.new') },
      get isHot      () { return !!element.querySelector('.hot') },
      get detailLink () { return element.querySelector<HTMLAnchorElement>('.torrentname a').href },
      get downLink   () { return (element.children[1].querySelector('[alt=download]').parentElement as HTMLAnchorElement).href },
      get comments   () { return +element.children[2].textContent },
      get date       () { return dayjs(element.children[3].querySelector('[title]').getAttribute('title')) },
      get size       () { return convert(element.children[4].textContent) },
      get seeder     () { return parseIntWithComma(element.children[5].textContent) },
      get leecher    () { return parseIntWithComma(element.children[6].textContent) },
      get snatched   () { return parseIntWithComma(element.children[7].textContent) },
    }
  }

  // @ts-ignore
  public async getTorrentsStatus(
    document: Document,
    selector = '.torrents > tbody > tr:not(:first-child)',
  ) {
    await this.preAnalyze(document)
    const torrentElements = Array.from(document.querySelectorAll(selector))
    if (!torrentElements.length) throw new Error('Can not match any torrents.')
    await this.afterAnalyze(torrentElements, document)
    return torrentElements.map(this.getStatus).filter(this.filter)
  }

  public async preFetch() {}
  public async afterFetch() {}
  public async preAnalyze(document: Document) {}
  public async afterAnalyze(torrentElements: Element[], document: Document) {}
  public filter(s: S) {
    return true
  }
  public async getDownloadUrl(s: S) {
    return s.downLink
  }
  public async success(s: S) {}
}
