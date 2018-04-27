const config = require('./config')
const loader = require('./loader')

/**
 * beautify logger
 */
console.log = new Proxy(console.log, {
  apply(target, ctx, args) {
    return Reflect.apply(target, ctx, [(new Date()).toLocaleString(), ' - ', ...args]);
  }
})

/**
 * load
 */
for (let i in config) {
  if (i === 'global') { continue }
  config[i] = Object.assign({}, config['global'], config[i])
  const func = loader(config[i], i)
  setTimeout(func, 0)
  setInterval(func, config[i]['interval'])
}