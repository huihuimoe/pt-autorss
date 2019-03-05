import NexusPHP, { INexusPHPStatus } from '../libs/NexusPHP'

export interface IU2StatusType extends INexusPHPStatus {
  readonly isCustom: boolean
  readonly customEffect: {
    readonly upload: number
    readonly download: number
  }
}

export default class U2 extends NexusPHP<IU2StatusType> {
  public getStatus(element: Element): IU2StatusType {
    return {
      ...super.getStatus(element),
      get isCustom() {
        return !!element.querySelector('.pro_custom')
      },
      get customEffect() {
        return {
          get upload() {
            const text = element.querySelector('.arrowup ~ b')
            return text ? +text.textContent.slice(0, -1) : 1
          },
          get download() {
            const text = element.querySelector('.arrowdown ~ b')
            return text ? +text.textContent.slice(0, -1) : 1
          },
        }
      },
    }
  }
}
