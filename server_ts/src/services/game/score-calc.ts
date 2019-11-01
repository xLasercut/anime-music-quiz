import { SongObj, PlayerGuess } from '@shared/interfaces'
import { BannerColor } from '@shared/types'

class ScoreCalculator {
  private _song: SongObj
  private _animes: Set<string>
  private _title: string

  constructor(currentSong: SongObj) {
    this._song = currentSong
    this._init()
  }

  _init(): void {
    this._animes = new Set()
    for (let anime of this._song.anime) {
      this._animes.add(anime.toLowerCase())
    }
    this._title = this._song.title.toLowerCase()
  }

  getScore(guess: PlayerGuess) {
    let point = 0

    if (guess.anime && this._animes.has(guess.anime.toLowerCase())) {
      point += 1
    }

    if (guess.title && guess.title.toLowerCase() === this._title) {
      point += 1
    }

    let color = this._getBannerColor(point)

    return { point, color }
  }

  _getBannerColor(point: number): BannerColor {
    if (point === 2) {
      return 'success'
    }
    else if (point === 1) {
      return 'warning'
    }
    return 'error'
  }
}

export { ScoreCalculator }