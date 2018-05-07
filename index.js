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
for (let i in config) {
  if (i === 'global') { continue }
  config[i] = Object.assign({}, config['global'], config[i])
  const fn = loader(config[i], i)
  setTimeout(fn, delay++ * loadDelay)
}
