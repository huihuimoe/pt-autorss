export function delay<T = never>(time: number, v?: T) {
  return new Promise<T>((resolve) => setTimeout(resolve.bind(undefined, v), time))
}

/**
 * convert formatted size to number (gb)
 * 1024kb->0.001
 * 1024mb->1
 * etc.
 */
export function convert(s: string) {
  s = s.toLowerCase()
  if (s.endsWith('kb') || s.endsWith('kib')) return Number.parseFloat(s) / 1024 / 1024
  if (s.endsWith('mb') || s.endsWith('mib')) return Number.parseFloat(s) / 1024
  if (s.endsWith('gb') || s.endsWith('gib')) return Number.parseFloat(s)
  if (s.endsWith('tb') || s.endsWith('tib')) return Number.parseFloat(s) * 1024
}

export interface ObjectMap<T> {
  [key: string]: T
}

// prettier-ignore
export type Unpacked<T> =
  T extends Array<infer U> ? U :
  T extends (...args: any[]) => infer V ? V :
  T extends Promise<infer W> ? W :
  T

// prettier-ignore
export function combineAsync<FN extends (...args: any) => any>
    (...fns: Array<(...args: Parameters<FN>) => void>)
  : (...args: Parameters<FN>) => Promise<void>
export function combineAsync(...fns: Array<(...args: any) => any>) {
  return async function (...args: any) {
    await Promise.all(fns.map((fn) => fn.call(this, ...args)))
  }
}

export function createRetry(times = 3, delay = 1000) {
  return <T>(fn: () => Promise<T>) => new Promise<T>((resolve, reject) => {
    const retry = () => {
      fn().then(resolve).catch((e) => {
        if (--times) setTimeout(retry, delay)
        else reject(e)
      }
      )
    }
    retry()
  })
}
