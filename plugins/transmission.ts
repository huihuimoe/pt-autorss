import Transmission = require('transmission')
import { IDownloadToRetn } from '../bootstrap'

/**
 * @param {object} options @see https://github.com/FLYBYME/node-transmission#how-to-use
 */
export default (options?: Transmission.ITransmissionOption) => {
  const transmission = new Transmission(options)
  return (file: IDownloadToRetn) => {
    console.log(`Pushing ${file.filename} to Transmission with TransmissionRPC...`)
    transmission.addFile(file.path, (err, result) => {
      if (err) console.error(err)
      transmission.start(result.id, () => {})
    })
    return file
  }
}
