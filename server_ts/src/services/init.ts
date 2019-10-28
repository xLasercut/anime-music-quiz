import { AMQLogger } from './logging/logging'
import { SongService } from './database/song'
import { UserService } from './database/user'
import { EmojiService } from './database/misc'
import { PlayerService } from './game/player'

let logger = new AMQLogger()

let songService = new SongService(logger)
let userService = new UserService(logger)
let emojiService = new EmojiService(logger)
let playerService = new PlayerService(logger)


export { logger, songService, userService, emojiService, playerService }