const config = require('./config')
const loader = require('./loader')
const loadDelay = 3000

/**
 * beautify logger
 */
const logHandler = {
  apply (target, ctx, args) {
    return Reflect.apply(target, ctx, [new Date().toLocaleString(), ' - ', ...args])
  }
}
console.log = new Proxy(console.log, logHandler)
console.error = new Proxy(console.error, logHandler)

/**
 * load
 */
let delay = 0
for (let name in config) {
  if (name === 'global') { continue }
  const fullConfig = {...config['global'], ...config[name]}
  const fn = loader(fullConfig, name)
  setTimeout(fn, delay++ * loadDelay)
}
