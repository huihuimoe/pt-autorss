// @TODO Replace `any`

declare module 'transmission' {
  import { PathLike } from 'fs'
  namespace Transmission {
    interface ITransmissionOption {
      host?: string
      port?: number
      username?: string
      password?: string
      ssl?: boolean
      url?: string
    }
    const enum STATUS {
      STOPPED, // Torrent is stopped
      CHECK_WAIT, // Queued to check files
      CHECK, // Checking files
      DOWNLOAD_WAIT, // Queued to download
      DOWNLOAD, // Downloading
      SEED_WAIT, // Queued to seed
      SEED, // Seeding
      ISOLATED, // Torrent can't find peers
    }
  }
  class Transmission {
    constructor(options?: Transmission.ITransmissionOption)
    readonly statusArray: Array<keyof typeof Transmission.STATUS>
    readonly status: typeof Transmission.STATUS
    readonly methods: any
    set(ids: number | number[], callback: (err: Error) => void): void
    set(ids: number | number[], options, callback: (err: Error) => void): void
    addFile(filePath: PathLike, callback: (err: Error, result: any) => void): void
    addFile(filePath: PathLike, options, callback: (err: Error, result: any) => void): void
    addUrl(url: string, callback: (err: Error, result: any) => void): void
    addUrl(url: string, options, callback: (err: Error, result: any) => void): void
    remove(ids: number | number[], callback: (err: Error, result: any) => void): void
    remove(ids: number | number[], del: boolean, callback: (err: Error, result: any) => void): void
    move(ids: number | number[], location: PathLike, callback: (err: Error, result: any) => void): void
    move(
      ids: number | number[],
      location: PathLike,
      move: boolean,
      callback: (err: Error, result: any) => void,
    ): void
    rename(
      ids: number | number[],
      path: PathLike,
      name: string,
      callback: (err: Error, result: any) => void,
    ): void
    active(callback: (err: Error, result: any) => void): void
    get(ids: number | number[], callback: (err: Error, result: any) => void): void
    waitForState(
      id: number,
      targetState: Transmission.STATUS,
      callback: (err: Error, result: any) => void,
    ): void
    peers(ids: number | number[], callback: (err: Error, result: any) => void): void
    files(ids: number | number[], callback: (err: Error, result: any) => void): void
    fast(ids: number | number[], callback: (err: Error, result: any) => void): void
    stop(ids: number | number[], callback: (err: Error, result: any) => void): void
    stopAll(callback: (err: Error, result: any) => void): void
    start(ids: number | number[], callback: (err: Error, result: any) => void): void
    startAll(callback: (err: Error, result: any) => void): void
    startNow(ids: number | number[], callback: (err: Error, result: any) => void): void
    verify(ids: number | number[], callback: (err: Error, result: any) => void): void
    reannounce(ids: number | number[], callback: (err: Error, result: any) => void): void
    all(callback: (err: Error, result: any) => void): void
    session(callback: (err: Error, result: any) => void): void
    session(session, callback: (err: Error, result: any) => void): void
    sessionStats(callback: (err: Error, result: any) => void): void
    freeSpace(path: PathLike, callback: (err: Error, result: any) => void): void
    callServer(query: any, callBack: (err: Error, result: any) => void): void
  }
  export = Transmission
}
