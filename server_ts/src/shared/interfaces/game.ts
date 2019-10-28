import { Player } from '../../services/game/player'
import { BannerColor } from '../types'

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

export { AMQPlayers, PlayerGuess, PlayerReady, InputPlayerObj, PlayerObj, PlayerData }