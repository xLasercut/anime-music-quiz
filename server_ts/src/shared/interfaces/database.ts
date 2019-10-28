import { User } from '../../services/database/user'
import { EmojiType } from '../types'

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

export { SongObj, UserLists, EmojiObj }