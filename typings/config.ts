import { ObjectMap } from '../libs/helper'

export interface IBaseConfig {
  cookie: string
  headers: ObjectMap<string>
  interval: number
  timeout: number
  url: string | string[]
}

export interface INexusPHPConfig extends IBaseConfig {}
