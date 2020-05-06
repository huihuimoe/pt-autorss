import dayjs = require('dayjs')
import { get } from 'lodash'
import { convert } from '../libs/helper'
import NexusPHP from '../libs/NexusPHP'

export default class OPENCD extends NexusPHP {
  public async preAnalyze(document: Document) {
    await super.preAnalyze(document)
    for (const e of document.querySelectorAll<HTMLTableRowElement>('.torrents > tbody > tr')) {
      e.children[1].remove()
      e.children[2].remove()
    }
  }
}
