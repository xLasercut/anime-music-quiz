import { AMQLogger } from '../logging/logging'
import { SONG_LIST_PATH } from '../../shared/config'
import { readFile } from './init'
import { SongObj, GameChoices } from '../../shared/interfaces'
import { AMQSongListError } from '../../shared/exceptions'

class SongService {
  private _data: Array<SongObj>
  private _titleChoices: Array<string>
  private _animeChoices: Array<string>
  private _songIds: Set<string>
  private _logger: AMQLogger

  private _filepath = SONG_LIST_PATH

  constructor(logger: AMQLogger) {
    this._logger = logger
    this.loadDb()
  }

  loadDb(): void {
    this._data = readFile(this._filepath).sort(this._sortSong)
    this._animeChoices = []
    this._titleChoices = []
    this._songIds = new Set()

    for (let song of this._data) {
      this._addSongId(song)
      this._addAnimeChoice(song)
      this._addTitleChoice(song)
    }

    this._animeChoices = this._animeChoices.sort()
    this._titleChoices = this._titleChoices.sort()
  }

  getSongList(): Array<SongObj> {
    return this._data
  }

  getChoices(): GameChoices {
    return {
      anime: this._animeChoices,
      title: this._titleChoices
    }
  }

  validateSongId(songId: string): void {
    if (!this._songIds.has(songId)) {
      throw new AMQSongListError('Song ID not in database')
    }
  }

  getCombinedList(songIds: Set<string>): Array<SongObj> {
    let combinedList: Array<SongObj> = []
    for (let song of this._data) {
      if (songIds.has(song.songId)) {
        combinedList.push(song)
      }
    }
    return combinedList
  }

  _addTitleChoice(song: SongObj): void {
    let title = song.title
    if (!this._titleChoices.includes(title)) {
      this._titleChoices.push(title)
    }
  }

  _addAnimeChoice(song: SongObj): void {
    for (let anime of song.anime) {
      if (!this._animeChoices.includes(anime)) {
        this._animeChoices.push(anime)
      }
    }
  }

  _addSongId(song: SongObj): void {
    let songId = song.songId
    if (this._songIds.has(songId)) {
      throw new Error(`Duplicate song id: ${songId}`)
    }
    this._songIds.add(songId)
  }

  _sortSong(a: SongObj, b: SongObj): number {
    let animeA = a.anime[0]
    let animeB = b.anime[0]
    let titleA = a.title
    let titleB = b.title

    if (animeA == animeB) {
      if (titleA > titleB) {
        return 1
      }
      else if (titleA < titleB) {
        return -1
      }
      return 0
    }
    else if (animeA > animeB) {
      return 1
    }
    return -1
  }
}

export { SongService }