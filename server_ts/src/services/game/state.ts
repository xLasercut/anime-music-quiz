import { AMQLogger } from '../logging/logging'
import { SongObj, GameStateObj } from '@shared/interfaces'
import { GameMode } from '@shared/types'

class GameStateService {
  private _logger: AMQLogger

  playing = false
  maxSongCount = 0
  currentSongCount = 0
  startPosition = 0
  gameList: Array<SongObj> = []
  songOverride: SongObj
  currentSong: SongObj = {
    anime: [''],
    title: '',
    artist: '',
    src: '',
    type: '',
    songId: ''
  }

  constructor(logger: AMQLogger) {
    this._logger = logger
  }

  generateGameList(combinedList: Array<SongObj>, songCount: number, duplicate: boolean): void {
    let dupes: Set<string> = new Set()
    let sourceList = combinedList
    this.gameList = []
    while (this.gameList.length < songCount && sourceList.length > 0) {
      let i = this._getRandomIndex(sourceList)
      let anime = sourceList[i].anime[0]
      if (!dupes.has(anime) || duplicate) {
        this.gameList.push(sourceList[i])
        dupes.add(anime)
      }
      sourceList.splice(i, 1)
    }
  }

  startGame(gameMode: GameMode): void {
    this.playing = true
    this.maxSongCount = this.gameList.length
    this._logger.writeLog('GAME002', { songCount: this.maxSongCount, gameMode: gameMode })
  }

  newSong(): void {
    this._selectSong()
    this.currentSongCount += 1
    this.startPosition = Math.random()
    this._logger.writeLog('GAME005', {
      number: this.currentSongCount,
      title: this.currentSong.title,
      anime: this.currentSong.anime[0],
      type: this.currentSong.type,
      artist: this.currentSong.artist
    })
  }

  overrideSong(song: SongObj): void {
    this.songOverride = song
  }

  getGameState(): GameStateObj {
    return {
      currentSongCount: this.currentSongCount,
      maxSongCount: this.maxSongCount,
      currentSong: this.currentSong,
      startPosition: this.startPosition,
      playing: this.playing
    }
  }

  reset(): void {
    this.currentSong = {
      anime: [''],
      title: '',
      artist: '',
      src: '',
      type: '',
      songId: ''
    }
    this.songOverride = null
    this.currentSongCount = 0
    this.maxSongCount = 0
    this.playing = false
    this.startPosition = 0
  }

  get gameEnd(): boolean {
    if (this.currentSongCount >= this.maxSongCount) {
      return true
    }
    return false
  }

  _selectSong(): void {
    let i = this._getRandomIndex(this.gameList)
    this.currentSong = this.gameList[i]
    this.gameList.splice(i, 1)
    if (this.songOverride) {
      this.currentSong = this.songOverride
      this.songOverride = null
    }
  }

  _getRandomIndex(list: Array<any>): number {
    return Math.floor(Math.random() * list.length)
  }
}

export { GameStateService }