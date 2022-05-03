import { expect } from 'chai'
import { combineAsync, convert, delay } from '../../libs/helper'

describe('libs/helper/combineAsync', () => {
  it('combine 1 fn', async () => {
    let str = 'before'
    const fn1 = async () => (str = 'after')
    const fn = combineAsync(fn1)
    await fn()
    expect(str).to.eq('after')
  })
  it('combine 2 fn', async () => {
    let str1 = 'before'
    let str2 = 'before'
    const fn1 = async () => (str1 = 'after')
    const fn2 = async () => (str2 = 'after')
    const fn = combineAsync(fn1, fn2)
    await fn()
    expect(str1).to.eq('after')
    expect(str2).to.eq('after')
  })
  it('combine 2 fn with this', async () => {
    const thisPtr = {
      str1: 'before',
    }
    let str2 = 'before'
    const fn1 = async function () {
      this.str1 = 'after'
    }
    const fn2 = async () => (str2 = 'after')
    const fn = combineAsync(fn1, fn2)
    await fn.call(thisPtr)
    expect(thisPtr.str1).to.eq('after')
    expect(str2).to.eq('after')
  })
})

describe('libs/helper/convert', () => {
  it('covert kb', () => {
    expect(convert('1321987kB')).to.eq(1.2607450485229492)
  })
  it('covert mb', () => {
    expect(convert('98715mB')).to.eq(96.4013671875)
  })
  it('covert gb', () => {
    expect(convert('3.221gB')).to.eq(3.221)
  })
  it('covert tb', () => {
    expect(convert('312.5132tB')).to.eq(320013.5168)
  })
  it('covert error input', () => {
    expect(convert('fanih98312rh09')).to.eq(undefined)
  })
})

describe('libs/helper/delay', () => {
  it('delay basic test', (done) => {
    delay(30).then(done)
  })
  it('delay result return test', async () => {
    const result = 'some str'
    expect(await delay(30, result)).to.eq(result)
  })
})
