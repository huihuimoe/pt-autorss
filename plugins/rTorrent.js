const xmlrpc = require('xmlrpc')

module.exports = rpcurl => {
  const xmlrpcClient = xmlrpc.createSecureClient(rpcurl)
  return outputFilename => xmlrpcClient.methodCall('load.start', ['', outputFilename], () => {})
}
