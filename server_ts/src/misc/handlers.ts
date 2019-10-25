import socketio = require('socket.io')
import { AbstractRequestHandler } from "../shared/abstracts"
import { exceptionHandler } from '../shared/exceptions'
import { Emoji } from '../shared/interfaces'

class EmojiHandler extends AbstractRequestHandler {
  start(socket: socketio.Socket): void {
    socket.on('LOGIN_MISC', exceptionHandler(socket, () => {
      this._emitter.syncEmojiData(socket)
    }))

    socket.on('SYNC_EMOJI_DATA', exceptionHandler(socket, () => {
      this._emitter.syncEmojiData(socket)
    }))

    socket.on('ADD_EMOJI', exceptionHandler(socket, (emoji: Emoji) => {
      let command = emoji['command']
      this._logger.writeLog('EMOJI001', { command: command,
                                          src: emoji['src'],
                                          type: emoji['type'] })
      this._db.addEmoji(emoji)
      this._emitter.syncEmojiData()
      this._emitter.notification('success', `emoji :${command}: added`, socket)
    }))

    socket.on('REMOVE_EMOJI', exceptionHandler(socket, (emoji: Emoji) => {
      let command = emoji['command']
      this._logger.writeLog('EMOJI002', { command: command,
                                          src: emoji['src'],
                                          type: emoji['type'] })
      this._db.removeEmoji(emoji)
      this._emitter.syncEmojiData()
      this._emitter.notification('success', `emoji :${command}: removed`, socket)
    }))
  }
}

export { EmojiHandler }