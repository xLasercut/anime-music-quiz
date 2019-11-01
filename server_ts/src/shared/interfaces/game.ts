import { Player } from '../../services/game/player'
import { BannerColor } from '../types'
import { SongObj } from './database'

interface AMQPlayers {
  [key: string]: Player
}

interface PlayerGuess {
  title: string
  anime: string
}

interface PlayerReady {
  guess: boolean
  load: boolean
  select: boolean
}

interface InputPlayerObj {
  username: string
  avatar: string
  score: number
}

interface PlayerData {
  [key: string]: PlayerObj
}

interface PlayerObj {
  username: string
  score: number
  avatar: string
  admin: boolean
  host: boolean
  guess: PlayerGuess
  color: BannerColor
}

interface GameChoices {
  anime: Array<string>
  title: Array<string>
}

interface GameStateObj {
  currentSong: SongObj
  currentSongCount: number
  maxSongCount: number
  playing: boolean
  startPosition: number
}

export { AMQPlayers, PlayerGuess, PlayerReady, InputPlayerObj, PlayerObj, PlayerData, GameChoices, GameStateObj }