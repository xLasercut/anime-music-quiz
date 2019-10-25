import { AbstractDataObject } from "../shared/abstracts"
import { EMOJI_LIST_PATH } from '../shared/config'
import { AMQLogger } from "../shared/logging/logger"
import { Emoji } from "../shared/interfaces"
import { AMQDbError } from "../shared/exceptions"

class EmojiData extends AbstractDataObject {
  db: Array<Emoji>

  constructor(logger: AMQLogger) {
    super(EMOJI_LIST_PATH, logger)
  }

  addEmoji(emoji: Emoji): void {
    let { command, src, emojiType } = this._parseEmoji(emoji)
    this._validateEmojiFields(command, src, emojiType)
    this._checkDuplicateEmoji(command, src, emojiType)
    this.db.push(emoji)
    this._writeFile()
    this._logger.writeLog('DATA004', { command: command,
                                       src: src,
                                       type: emojiType,
                                       changeType: 'add emoji' })
  }

  removeEmoji(emoji: Emoji): void {
    let { command, src, emojiType } = this._parseEmoji(emoji)
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i]['command'].toLowerCase() === command.toLowerCase()) {
        this.db.splice(i, 1)
        this._writeFile()
        this._logger.writeLog('DATA004', { command: command,
                                           src: src,
                                           type: emojiType,
                                           changeType: 'add emoji' })
        break
      }
    }
  }

  _validateEmojiFields(command: string, src: string, emojiType: string): void {
    if (!command || !src || !emojiType) {
      this._logger.writeLog('DATA002', { command: command,
                                         src: src,
                                         type: emojiType,
                                         reason: 'invalid mandatory field' })
      throw new AMQDbError('Invalid emoji field')
    }
  }

  _checkDuplicateEmoji(command: string, src: string, emojiType: string): void {
    for (let emoji of this.db) {
      let exisitingCommand = emoji['command'].toLowerCase()
      if (exisitingCommand === command.toLowerCase()) {
        this._logger.writeLog('DATA002', { command: command,
                                           src: src,
                                           type: emojiType,
                                           reason: 'invalid mandatory field' })
        throw new AMQDbError(`Duplicate emoji command: ${command}`)
      }
    }
  }

  _parseEmoji(emoji: Emoji) {
    let command = emoji['command']
    let src = emoji['src']
    let emojiType = emoji['type']

    return { command, src, emojiType }
  }
}

export { EmojiData }