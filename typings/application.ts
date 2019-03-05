import Bootstrap from '../bootstrap'
import { IBaseConfig } from './config'

export interface IRequireStatus {
  readonly id: number
  readonly downLink: string
}

export interface IApplicationLifecycle<T extends IRequireStatus = IRequireStatus> {
  preFetch(this: Bootstrap): Promise<void>
  preAnalyze(document: Document): Promise<void>
  afterAnalyze(torrentElements: Element[], document: Document): Promise<void>
  afterFetch(this: Bootstrap): Promise<void>
  filter(this: Bootstrap, status: T): boolean
  success(this: Bootstrap, status: T): Promise<void>
}

export interface IApplication<T extends IRequireStatus = IRequireStatus>
  extends IApplicationLifecycle<T> {
  config: IBaseConfig
  getDownloadUrl(status: T): Promise<string>
  getStatus(element: Element): T
  getTorrentsStatus(document: Document): Promise<T[]>
}
