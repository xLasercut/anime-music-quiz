import { AMQLogger } from '../logging/logging'
import { BotObj, PlayerObj, ChatObj, BotResponseObj } from '@shared/interfaces'
import { readFile } from '../database/init'
import { BOT_LIST_PATH } from '../../shared/config'
import { AMQGameError } from '../../shared/exceptions'
import { EmojiService } from '../database/misc'

let MSG_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\\/': '&sol;',
  '\'': '&apos;'
}

class ChatService {
  private _logger: AMQLogger
  private _botData: Array<BotObj>
  private _emojiService: EmojiService

  constructor(logger: AMQLogger, emojiService: EmojiService) {
    this._logger = logger
    this._emojiService = emojiService
    this.loadDb()
  }

  loadDb(): void {
    this._botData = readFile(BOT_LIST_PATH)
  }

  generateUserMsgData(sid: string, player: PlayerObj, msg: string): ChatObj {
    let sanitizedMsg = this._sanitizeMsg(msg)
    let { username, avatar, admin } = this._parsePlayerObj(player)
    this._logger.writeLog('CHAT001', { username: username, message: msg })
    return {
      user: username,
      admin: admin,
      avatar: avatar,
      id: sid,
      repeat: false,
      text: this._addEmojiToMsg(sanitizedMsg)
    }
  }

  generateBotMsgData(msg: string): ChatObj {
    let sanitizedMsg = this._sanitizeMsg(msg)
    let botResponse = this._getBotResponse(sanitizedMsg)
    if (botResponse) {
      let botMsg = `:notes: ${this._sanitizeMsg(botResponse.text)} :notes:`
      return {
        user: botResponse.user,
        text: this._addEmojiToMsg(botMsg),
        admin: false,
        avatar: botResponse.avatar,
        id: botResponse.id,
        repeat: false
      }
    }
  }

  generateSysMsgData(msg: string): ChatObj {
    let sanitizedMsg = this._sanitizeMsg(msg)
    return {
      user: 'Eva Unit-01',
      text: this._addEmojiToMsg(sanitizedMsg),
      admin: false,
      avatar: 'eva_unit_1',
      id: 'eva_bot',
      repeat: false
    }
  }

  _addEmojiToMsg(msg: string): string {
    let output = msg
    for (let emoji of this._emojiService.getEmojiList()) {
      let command = new RegExp(`:${emoji.command}:`, 'gi')
      let type = emoji.type
      let src = emoji.src

      if (type === 'img') {
        output = output.replace(command, `<img src="${src}" class="emoji" />`)
      }
      else if (type === 'dec') {
        output = output.replace(command, src)
      }
      else {
        throw new AMQGameError('Cannot render emoji - Invalid source')
      }
    }
    return output
  }

  _getBotResponse(msg: string): BotResponseObj {
    for (let bot of this._botData) {
      let trigger = new RegExp(bot.regex, bot.flag)
      if (msg.match(trigger)) {
        return bot.response
      }
    }
  }

  _sanitizeMsg(msg: string): string {
    let output = msg
    for (let key in MSG_MAP) {
      output = output.replace(new RegExp(key, 'g'), MSG_MAP[key])
    }
    return output
  }

  _parsePlayerObj(player: PlayerObj) {
    let username = player.username
    let admin = player.admin
    let avatar = player.avatar

    return { username, avatar, admin }
  }
}

export { ChatService }