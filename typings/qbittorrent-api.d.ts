// @TODO Replace `any`

declare module 'qbittorrent-api' {
  import { ReadStream } from 'fs'
  export type TorrentFile = string | ReadStream
  export interface ListOptions {
    sort?: string
    reverse?: boolean
    limit?: number | string
    offset?: number | string
  }
  export interface SearchOptions extends ListOptions {
    filter?: string
    label?: string
  }
  export type TorrentItem = {
    [x: string]: any
  }
  type KVPair = {
    [x: string]: string | number | boolean
  }
  export interface qBitInstance {
    // Add a torrent
    add(torrent: TorrentFile, savePath?: string, label?: string, callback?: (error: Error) => void): void
    add(torrent: TorrentFile, savePath?: string, callback?: (error: Error) => void): void
    add(torrent: TorrentFile, callback?: (error: Error) => void): void
    setCookie(host: string, value: string): void
    // List torrents
    all(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    all(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    all(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    all(callback: (error: Error, items: TorrentItem[]) => void): void
    downloading(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    downloading(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    downloading(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    downloading(callback: (error: Error, items: TorrentItem[]) => void): void
    seeding(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    seeding(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    seeding(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    seeding(callback: (error: Error, items: TorrentItem[]) => void): void
    completed(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    completed(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    completed(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    completed(callback: (error: Error, items: TorrentItem[]) => void): void
    resumed(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    resumed(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    resumed(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    resumed(callback: (error: Error, items: TorrentItem[]) => void): void
    paused(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    paused(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    paused(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    paused(callback: (error: Error, items: TorrentItem[]) => void): void
    active(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    active(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    active(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    active(callback: (error: Error, items: TorrentItem[]) => void): void
    inactive(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    inactive(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    inactive(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    inactive(callback: (error: Error, items: TorrentItem[]) => void): void
    queued(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    queued(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    queued(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    queued(callback: (error: Error, items: TorrentItem[]) => void): void
    errored(label: string, options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    errored(options: ListOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    errored(label: string, callback: (error: Error, items: TorrentItem[]) => void): void
    errored(callback: (error: Error, items: TorrentItem[]) => void): void
    search(searchText: string, options: SearchOptions, callback: (error: Error, items: TorrentItem[]) => void): void
    search(searchText: string, callback: (error: Error, items: TorrentItem[]) => void): void
    // Get global info
    version(callback: (error: Error) => void, data: any): void
    api(callback: (error: Error) => void, data: any): void
    apiMin(callback: (error: Error) => void, data: any): void
    transferInfo(callback: (error: Error) => void, data: any): void
    preferences(callback: (error: Error) => void, data: any): void
    getGlobalDlLimit(callback: (error: Error) => void, data: any): void
    getGlobalUpLimit(callback: (error: Error) => void, data: any): void
    alternativeSpeedLimitsEnabled(callback: (error: Error) => void, data: any): void
    // Get torrent info
    details(torrent: TorrentItem | string, callback: (error: Error, data: any) => void): void
    trackers(torrent: TorrentItem | string, callback: (error: Error, data: any) => void): void
    webseeds(torrent: TorrentItem | string, callback: (error: Error, data: any) => void): void
    files(torrent: TorrentItem | string, callback: (error: Error, data: any) => void): void
    getDlLimit(torrent: TorrentItem | string, callback: (error: Error, data: any) => void): void
    getUpLimit(torrent: TorrentItem | string, callback: (error: Error, data: any) => void): void
    // Global commands
    pauseAll(callback?: (error: Error) => void): void
    resumeAll(callback?: (error: Error) => void): void
    /** should be a bug, extra argument `values` */
    toggleAlternativeSpeedLimits(values: undefined, callback?: (error: Error) => void): void
    setGlobalDlLimit(value: string | number, callback?: (error: Error) => void): void
    setGlobalUpLimit(value:  string | number, callback?: (error: Error) => void): void
    /** values @see https://github.com/qbittorrent/qBittorrent/wiki/WebUI-API-Documentation#get-qbittorrent-preferences */
    setPreferences(values: KVPair, callback?: (error: Error) => void): void
    // Torrent commands
    pause(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    resume(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    recheck(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    delete(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    deleteData(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    increasePrio(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    decreasePrio(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    topPrio(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    bottomPrio(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    toggleSeqDl(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    toggleFirstLastPiecePrio(torrents: TorrentItem | string | Array<TorrentItem | string>, callback?: (error: Error) => void): void
    setDlLimit(torrents: TorrentItem | string | Array<TorrentItem | string>, value: string | number, callback: (error: Error) => void): void
    setUpLimit(torrents: TorrentItem | string | Array<TorrentItem | string>, value: string | number, callback: (error: Error) => void): void
    setLabel(torrents: TorrentItem | string | Array<TorrentItem | string>, value: string, callback: (error: Error) => void): void
    setForceStart(torrents: TorrentItem | string | Array<TorrentItem | string>, value: boolean, callback: (error: Error) => void): void
    addTrackers(torrent: TorrentItem | string | Array<TorrentItem | string>, trackers: string | string[], callback: (error: Error) => void): void
    // File commands
    setFilePrio(torrent: TorrentItem | string, fileId: string, value: 0 | 1 | 6 | 7, callback: (error: Error) => void): void
  }
  export function connect(host?: string): qBitInstance
  export function connect(host: string, username: string, password: string): qBitInstance
}
