import Bootstrap from './bootstrap'
import configs from './config'

/**
 * beautify logger
 */
const logHandler: ProxyHandler<typeof console.log> = {
  apply(target, ctx, args) {
    return Reflect.apply(target, ctx, [new Date().toLocaleString(), ' - ', ...args])
  },
}
console.log = new Proxy<typeof console.log>(console.log, logHandler)
console.error = new Proxy<typeof console.error>(console.error, logHandler)

Bootstrap.initialize(configs)
