import { LoginMode, EmojiType, BannerColor } from '../types'
import { GameChoices, SettingsObj, PlayersObj, GameStateObj } from '../../../../shared-modules/interfaces'

interface ClientStoreState {
  admin: boolean
  loginMode: LoginMode
}

interface RootStoreState {}

interface ListStoreState {
  songList: Array<SongObj>
  users: Array<string>
  userList: Set<string>
  user: string
}

interface MiscStoreState {
  emojiList: Array<EmojiObj>
}

interface SongObj {
  songId: string
  src: string
  anime: Array<string>
  title: string
  artist: string
  type: string
}

interface EmojiObj {
  command: string
  src: string
  type: EmojiType
}

interface GameStoreState {
  sid: string
  choices: GameChoices
  settings: SettingsObj
  players: PlayersObj
  gameState: GameStateObj
  host: boolean
  volume: number
}

export { RootStoreState, ClientStoreState, ListStoreState, MiscStoreState, GameStoreState }