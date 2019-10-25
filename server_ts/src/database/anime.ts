import { AbstractDataObject } from './abstract'
import { SONG_LIST_PATH } from '../shared/config'
import { AMQLogger } from '../shared/logging/logger'
import { Song } from '../shared/interfaces'
import { AMQDbError } from '../shared/exceptions'

class SongData extends AbstractDataObject {
  db: Array<Song>
  _songChoices: Array<string>
  _animeChoices: Array<string>
  _songIds: Array<string>

  constructor(logger: AMQLogger) {
    super(SONG_LIST_PATH, logger)
    this._initSecondaryDb()
  }

  validateSongId(user: string, songId: string): void {
    if (!this._songIds.includes(songId)) {
      this._logger.writeLog('DATA001', { user: user,
                                         songId: songId,
                                         reason: 'invalid song id' })
      throw new AMQDbError('Invalid song ID')
    }
  }

  _initSecondaryDb(): void {
    this._animeChoices = []
    this._songChoices = []
    this._songIds = []

    for (let song of this.db) {
      this._addSongId(song)
      this._addAnimeChoice(song)
    }

    this._animeChoices = this._animeChoices.sort(this._sortChoices)
    this._songChoices = this._songChoices.sort(this._sortChoices)
  }

  _addSongChoice(song: Song): void {
    let title = song['title']
    if (!this._songChoices.includes(title)) {
      this._songChoices.push(title)
    }
  }

  _addAnimeChoice(song: Song): void {
    for (let anime of song['anime']) {
      if (!this._animeChoices.includes(anime)) {
        this._animeChoices.push(anime)
      }
    }
  }

  _addSongId(song: Song): void {
    let songId = song['songId']
    if (this._songIds.includes(songId)) {
      throw new Error(`Duplicate song id: ${songId}`)
    }
    else {
      this._songIds.push(songId)
    }
  }

  _sortChoices(a: string, b: string): number {
    if (a > b) {
      return 1
    }
    return -1
  }
}

export { SongData }