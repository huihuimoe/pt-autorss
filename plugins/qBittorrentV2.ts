// @TODO added temporarily
// for qBittorrent >= 4.2.0, using qBittorrent web API v2
// https://github.com/qbittorrent/qBittorrent/wiki/Web-API-Documentation
/* tslint:disable */
import { addOptions as IaddOptions } from 'qbittorrent-api'
import { IDownloadToRetn } from '../bootstrap'

export interface IqBittorrentV2ConnectOptions {
  host: string
  username: string
  password: string
}

import async from 'async'
import fs from 'fs'
import path from 'path'
import request from 'request'
import stream from 'stream'
interface QueueReq {
  method: string
  url: string
  formData?: { [x: string]: string }
}
function logIn(
  queue: async.AsyncQueue<QueueReq>,
  username: string,
  password: string,
  callback: (err?: Error) => void,
) {
  if (!username || !password) {
    callback(new Error('Must provide username and password.'))
    return
  }
  queue.push(
    {
      formData: {
        password,
        username,
      },
      method: 'POST',
      url: '/auth/login',
    },
    (error, response: any) => {
      if (error) {
        callback(error)
        return
      }
      if (response && response.statusCode !== 200) {
        callback(new Error('Login failed ' + response.statusCode + '  with username: ' + username))
        return
      }
      callback()
    },
  )
}

function getGlobalInfo(
  queue: async.AsyncQueue<QueueReq>,
  query: string,
  callback: (e?: Error | null, data?: any) => void,
) {
  queue.push(
    {
      method: query.startsWith('/command/') ? 'POST' : 'GET',
      url: query,
    },
    // @ts-ignore
    (error, response: any, body: any) => {
      if (!error) {
        try {
          callback(error, JSON.parse(body))
        } catch (e) {
          callback(error, body)
        }
        return
      }
      if (response.statusCode !== 200) {
        callback(new Error('GetGlobalInfo failed ' + response.statusCode + ' '))
        return
      }
      callback()
    },
  )
}
function addTorrent(queue, torrent, options, callback) {
  if (torrent instanceof stream.Readable) {
    options['torrents'] = {
      options: {
        contentType: 'application/x-bittorrent',
        // @ts-ignore
        filename: torrent.path,
      },
      value: torrent,
    }
  } else if (typeof torrent === 'string') {
    try {
      options['torrents'] = {
        options: {
          contentType: 'application/x-bittorrent',
          filename: path.basename(torrent),
        },
        value: fs.createReadStream(torrent),
      }
    } catch (error) {
      if (callback) {
        callback(error)
      }
      return
    }
  } else {
    if (callback) {
      callback(new Error('Torrent must be path or readable stream.'))
    }
    return
  }
  queue.push(
    {
      formData: options,
      method: 'POST',
      url: '/torrents/add',
    },
    (error, response) => {
      if (callback) {
        if (error) {
          callback(error)
          return
        }
        if (response && response.statusCode !== 200) {
          callback(
            new Error(
              'AddTorrent failed ' +
                response.statusCode +
                '  with options: ' +
                JSON.stringify(options),
            ),
          )
          return
        }
        callback()
      }
    },
  )
}
function addTorrentUrl(queue, url, options, callback) {
  options['urls'] = [].concat(url).join('\n')
  queue.push(
    {
      formData: options,
      method: 'POST',
      url: '/torrents/add',
    },
    (error, response) => {
      if (callback) {
        if (error) {
          callback(error)
          return
        }
        if (response && response.statusCode !== 200) {
          callback(
            new Error(
              'AddTorrentUrl failed ' +
                response.statusCode +
                '  with options: ' +
                JSON.stringify(options),
            ),
          )
          return
        }
        callback()
      }
    },
  )
}
const connectV2 = (host: string, username: string, password: string) => {
  if (!host) host = 'http://localhost:8080'
  else if (!host.startsWith('http')) host = 'http://' + host

  if (host.endsWith('/')) host = host.slice(0, -1)
  const baseRequest = request.defaults({ jar: true })
  const queue = async.queue((req: QueueReq, callback: (err?: Error) => any) => {
    req.url = `${host}/api/v2${req.url}`
    baseRequest(req, callback)
  })
  const reconnect = logIn.bind(undefined, queue, username, password, (error: Error) => {
    if (error) throw error
  })
  if (username && password) reconnect()

  const cookies = new Map()
  return {
    add2: (torrent, options, callback) => {
      options = options || {}
      if (options) {
        if (typeof options === 'function') {
          callback = options
          options = {}
        }
      }
      if (typeof torrent === 'string' && torrent.match(/^(?:http|magnet:|bc:)/)) {
        options['cookie'] = cookies.get(new URL(torrent).host)
        addTorrentUrl(queue, torrent, options, callback)
      } else {
        addTorrent(queue, torrent, options, callback)
      }
    },
    reconnect,
    transferInfo: callback => {
      getGlobalInfo(queue, '/transfer/info', callback)
    },
    version: callback => {
      getGlobalInfo(queue, '/app/version', callback)
    },
  }
}

export default (
  connectOptions: IqBittorrentV2ConnectOptions,
  globalAddOptions: IaddOptions = {},
) => {
  const instance = connectV2(connectOptions.host, connectOptions.username, connectOptions.password)
  return async (file: IDownloadToRetn, addOptions: IaddOptions = {}) => {
    // test is login
    await new Promise((resolve, rejects) => {
      instance.transferInfo((e, data) => {
        // relogin
        if (e || !data) {
          console.log('qBittorrent need relogin...')
          instance.reconnect()
        }
        resolve(true)
      })
    })

    console.log(`Pushing ${file.filename} to qBittorrent using qBittorrent API...`)
    await new Promise((resolve, rejects) => {
      instance.add2(
        file.path,
        {
          ...globalAddOptions,
          ...addOptions,
        },
        e => {
          if (e) rejects(e)
          resolve(true)
        },
      )
    })

    return file
  }
}
