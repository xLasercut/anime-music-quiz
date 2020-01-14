import {BannerColor, GameMode} from '../types'
import {SongObj} from './data'

interface PlayerGuess {
    title: string
    anime: string
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

interface GameStateObj {
    currentSong: SongObj
    currentSongCount: number
    maxSongCount: number
    playing: boolean
    startPosition: number
}

interface SettingsObj {
    songCount: number
    guessTime: number
    gameMode: GameMode
    duplicate: boolean
    selectTime: number
    users: Array<string>
    leastPlayed: boolean
}

interface PlayerReady {
    guess: boolean
    load: boolean
    select: boolean
}

interface RawPlayerObj {
    username: string
    avatar: string
    score: number
}

interface GameChoices {
    anime: Array<string>
    title: Array<string>
}

interface PlayersObj {
    [key: string]: PlayerObj
}

interface UserSongIds {
    [key: string]: Set<string>
}

interface GameSongList {
    normal: Array<SongObj>
    priority: Array<SongObj>
}

interface UserSongLists {
    [key: string]: GameSongList
}

export {
    PlayerObj,
    GameStateObj,
    SettingsObj,
    PlayerGuess,
    PlayerReady,
    RawPlayerObj,
    GameChoices,
    PlayersObj,
    UserSongIds,
    UserSongLists,
    GameSongList
}
