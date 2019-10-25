import { Song, SongCount } from '../shared/interfaces'
import { AbstractGameData } from '../shared/abstracts'
import { GameMode } from '../shared/types'

class GameState extends AbstractGameData {
  playing = false
  _maxSongCount = 0
  _currentSongCount = 0
  startPosition = 0
  gameList: Array<Song>
  songOverride: Song
  currentSong: Song

  generateGameList(combinedList: Array<Song>, songCount: number, duplicate: boolean): void {
    let sourceList = combinedList
    let dupes = []
    this.gameList = []
    while (this.gameList.length < songCount && sourceList.length > 0) {
      let i = Math.floor(Math.random() * sourceList.length)
      let anime = sourceList[i]['anime'][0]
      if (!dupes.includes(anime) || duplicate) {
        this.gameList.push(sourceList[i])
        dupes.push(anime)
      }
      sourceList.splice(i, 1)
    }
  }

  startGame(gameMode: GameMode): void {
    this.playing = true
    this._maxSongCount = this.gameList.length
    this._logger.writeLog('GAME002', { songCount: this._maxSongCount, gameMode: gameMode })
  }

  newSong(): void {
    this._selectSong()
    this._currentSongCount += 1
    this.startPosition = Math.random()
    this._logger.writeLog('GAME005', { number: this._currentSongCount,
                                       title: this.currentSong['title'],
                                       anime: this.currentSong['anime'][0],
                                       type: this.currentSong['type'],
                                       artist: this.currentSong['artist'] })
  }

  reset(): void {
    this.currentSong = null
    this.songOverride = null
    this._currentSongCount = 0
    this.playing = false
  }

  get counts(): SongCount {
    return {
      current: this._currentSongCount,
      max: this._maxSongCount
    }
  }

  get gameEnd(): boolean {
    return this._currentSongCount >= this._maxSongCount
  }

  _selectSong(): void {
    let i = Math.floor(Math.random() * this.gameList.length)
    this.currentSong = this.gameList[i]
    this.gameList.splice(i, 1)
    if (this.songOverride) {
      this.currentSong = this.songOverride
      this.songOverride = null
    }
  }
}


export { GameState }