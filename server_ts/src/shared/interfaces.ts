import { UserData } from '../database/user'
import { Player } from '../game/player'
import { GameMode } from './types'


interface Song {
  songId: string
  src: string
  anime: Array<string>
  title: string
  artist: string
  type: string
}

interface Emoji {
  command: string
  src: string
  type: string
}

interface UserDatas {
  [key: string]: UserData
}

interface PlayerDatas {
  [key: string]: Player
}

interface PlayerInputObj {
  username: string
  avatar: string
  score: number
}

interface PlayerGuess {
  song: string
  anime: string
}

interface PlayerReady {
  song: boolean
  select: boolean
  guess: boolean
}

interface PlayerObj {
  username: string
  avatar: string
  score: number
  host: boolean
  admin: boolean
  color: string
  guess: PlayerGuess
}

interface PlayerDataSerialized {
  [key: string]: PlayerObj
}

interface Choices {
  song: Array<string>
  anime: Array<string>
}

interface SettingObj {
  songCount: number
  guessTime: number
  gameMode: GameMode
  duplicate: boolean
  users: Array<string>
  selectTime: number
}

interface SongCount {
  current: number
  max: number
}

interface ChatBot {
  regex: string
  flag: string
  response: ChatBotResponse
}

interface ChatBotResponse {
  user: string
  text: string
  avatar: string
  id: string
}

export { Song, UserDatas, Emoji, PlayerInputObj, PlayerGuess, PlayerReady, PlayerObj, PlayerDatas, PlayerDataSerialized, Choices, SettingObj, SongCount, ChatBot }