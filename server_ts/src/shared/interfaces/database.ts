import { User } from '../../services/database/user'
import { EmojiType, GameMode } from '../types'

interface SongObj {
  songId: string
  src: string
  anime: Array<string>
  title: string
  artist: string
  type: string
}

interface UserLists {
  [key: string]: User
}

interface EmojiObj {
  src: string
  command: string
  type: EmojiType
}

interface BotObj {
  regex: string
  flag: string
  response: BotResponseObj
}

interface BotResponseObj {
  user: string
  text: string
  avatar: string
  id: string
}

interface ChatObj extends BotResponseObj {
  repeat: boolean
  admin: boolean
}

interface SettingsObj {
  songCount: number
  guessTime: number
  gameMode: GameMode
  duplicate: boolean
  selectTime: number
  users: Array<string>
}

export { SongObj, UserLists, EmojiObj, BotResponseObj, BotObj, ChatObj, SettingsObj }