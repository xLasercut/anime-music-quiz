import { EmojiObj } from '../../shared/interfaces'
import { AMQLogger } from '../logging/logging'
import { EMOJI_LIST_PATH, EMOJI_COMMAND_FORMAT } from '../../shared/config'
import { readFile, writeFile } from './init'
import { AMQDbError } from '../../shared/exceptions'
import { EmojiType } from '../../shared/types'

class EmojiService {
  private _data: Array<EmojiObj>
  private _logger: AMQLogger

  private _filepath = EMOJI_LIST_PATH

  constructor(logger: AMQLogger) {
    this._logger = logger
    this.loadDb()
  }

  loadDb(): void {
    this._data = readFile(this._filepath)
  }

  addEmoji(emoji: EmojiObj): void {
    let { command, src, type } = this._parseEmoji(emoji)
    this._validateEmoji(command, src, type)
    this._data.push(emoji)
    writeFile(this._filepath, this._data)
    this._logger.writeLog('DATA004', {
      command: command,
      src: src,
      type: type,
      changeType: 'add emoji'
    })
  }

  deleteEmoji(emoji: EmojiObj): void {
    let { command, src, type } = this._parseEmoji(emoji)
    for (let i = 0; i < this._data.length; i++) {
      if (this._data[i].command.toLowerCase() === command.toLowerCase()) {
        this._data.splice(i, 1)
        writeFile(this._filepath, this._data)
        this._logger.writeLog('DATA004', {
          command: command,
          src: src,
          type: type,
          changeType: 'delete emoji'
        })
        break
      }
    }
  }

  getEmojiList(): Array<EmojiObj> {
    return this._data
  }

  _validateEmoji(command: string, src: string, type: EmojiType): void {
    if (!src || !type || !command.match(EMOJI_COMMAND_FORMAT)) {
      this._logger.writeLog('DATA002', {
        command: command,
        src: src,
        type: type,
        reason: 'invalid emoji field'
      })
      throw new AMQDbError('Invalid emoji field')
    }

    for (let emoji of this._data) {
      if (emoji.command.toLowerCase() === command.toLowerCase()) {
        this._logger.writeLog('DATA002', {
          command: command,
          src: src,
          type: type,
          reason: 'duplicate emoji command'
        })
        throw new AMQDbError('Duplicate command')
      }
    }
  }

  _parseEmoji(emoji: EmojiObj) {
    let command = emoji.command
    let src = emoji.src
    let type = emoji.type

    return { command, src, type }
  }
}

export { EmojiService }