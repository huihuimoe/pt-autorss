const xmlrpc = require('xmlrpc')

module.exports = rpcurl => {
  const xmlrpc_client = xmlrpc.createSecureClient(rpcurl)
  return outputFilename => xmlrpc_client.methodCall('load.start', ['', outputFilename], () => {})
}