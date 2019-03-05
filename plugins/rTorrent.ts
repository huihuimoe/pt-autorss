import xmlrpc = require('xmlrpc')
import { IDownloadToRetn } from '../bootstrap'
import { ArgumentTypes, Unpacked } from '../libs/helper'

export default (rpcurl: Unpacked<ArgumentTypes<typeof xmlrpc.createSecureClient>>) => {
  const xmlrpcClient = xmlrpc.createSecureClient(rpcurl)
  return (file: IDownloadToRetn) => {
    console.log(`Pushing ${file.filename} to rTorrent with rTorrentRPC...`)
    xmlrpcClient.methodCall('load.start', ['', file.path], () => {})
  }
}
