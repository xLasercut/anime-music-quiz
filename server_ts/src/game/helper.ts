import { Song, PlayerGuess } from '../shared/interfaces'
import { BannerColor } from '../shared/types'

class ScoreCalculator {
  _song: Song

  constructor(song: Song) {
    this._song = song
  }

  getScore(guess: PlayerGuess) {
    let point = 0

    if (this._animeCorrect(guess['anime'])) {
      point += 1
    }

    if (this._songCorrect(guess['song'])) {
      point += 1
    }

    let color = this._getBannerColor(point)

    return { point, color }
  }

  _animeCorrect(animeGuess: string): boolean {
    if (animeGuess) {
      for (let anime of this._song['anime']) {
        if (anime.toLowerCase() === animeGuess.toLowerCase()) {
          return true
        }
      }
    }
    return false
  }

  _songCorrect(songGuess: string): boolean {
    if (songGuess) {
      if (songGuess.toLowerCase() === this._song['title'].toLowerCase()) {
        return true
      }
    }
    return false
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