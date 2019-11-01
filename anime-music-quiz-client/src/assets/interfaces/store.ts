import { LoginMode, EmojiType, GameMode, BannerColor } from '../types'

interface ClientState {
  admin: boolean
  loginMode: LoginMode
}

interface RootState {

}

interface ListState {
  songList: Array<SongObj>
  users: Array<string>
  userList: Array<string>
  user: string
}

interface MiscState {
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
  settings: GameSettings
  players: PlayerData
  gameState: GameStateObj
  host: boolean
  volume: number
}

interface GameChoices {
  title: Array<string>
  anime: Array<string>
}

interface GameSettings {
  songCount: number
  guessTime: number
  users: Array<string>
  gameMode: GameMode
  duplicate: boolean
  selectTime: number
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

interface PlayerGuess {
  title: string
  anime: string
}

interface SongCount {
  current: number
  max: number
}

interface GameStateObj {
  currentSong: SongObj
  currentSongCount: number
  maxSongCount: number
  playing: boolean
  startPosition: number
}

export { ClientState, RootState, ListState, SongObj, MiscState, EmojiObj, GameChoices, GameSettings, PlayerObj, PlayerGuess, PlayerData, GameStoreState, GameStateObj }