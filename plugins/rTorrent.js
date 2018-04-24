const xmlrpc = require('xmlrpc')

module.exports = rpcurl => {
  const xmlrpcClient = xmlrpc.createSecureClient(rpcurl)
  return (outputFilename, name) => {
    console.log(name, ' downloaded completely. Pushing...')
    xmlrpcClient.methodCall('load.start', ['', outputFilename], () => {})
  }
}
