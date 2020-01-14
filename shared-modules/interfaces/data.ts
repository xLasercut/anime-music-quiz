import {EmojiType} from '../types'

interface SongObj {
    songId: string
    src: string
    anime: Array<string>
    title: string
    artist: string
    type: string
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

export {SongObj, EmojiObj, BotObj, BotResponseObj, ChatObj}
