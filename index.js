const config = require('./config')
const loader = require('./loader')

for (let i in config) {
  if (i === 'global')
    continue
  config[i] = Object.assign({}, config['global'], config[i])
  setInterval(loader(config[i], i), config[i]['interval'])
}