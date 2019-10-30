import { AMQLogger } from './logging/logging'
import { SongService } from './database/song'
import { UserService } from './database/user'
import { EmojiService } from './database/misc'
import { PlayerService } from './game/player'
import { ChatService } from './game/chat'
import { GameSettingService } from './game/settings'

let logger = new AMQLogger()

let songService = new SongService(logger)
let userService = new UserService(logger)
let emojiService = new EmojiService(logger)
let playerService = new PlayerService(logger)
let chatService = new ChatService(logger, emojiService)
let settingsService = new GameSettingService(logger)

export { logger, songService, userService, emojiService, playerService, chatService, settingsService }