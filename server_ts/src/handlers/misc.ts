import * as socketio from 'socket.io'
import { exceptionHandler } from '../shared/exceptions'
import { emitter } from '../shared/server'
import { emojiService, logger } from '../services/init'
import { EmojiObj } from '@shared/interfaces'

class MiscHandler {
  start(socket: socketio.Socket): void {
    socket.on('LOGIN_MISC', exceptionHandler(socket, () => {
      socket.join('misc')
      emitter.updateEmojiData(emojiService.getEmojiList(), socket.id)
      logger.writeLog('SERVER005', { id: socket.id, service: 'misc' })
    }))

    socket.on('ADD_EMOJI', exceptionHandler(socket, (emoji: EmojiObj) => {
      let command = emoji.command
      logger.writeLog('EMOJI001', {
        command: command,
        src: emoji.src,
        type: emoji.type
      })
      emojiService.addEmoji(emoji)
      emitter.updateEmojiData(emojiService.getEmojiList())
      emitter.notification('success', `emoji :${command}: added`, socket.id)
    }))

    socket.on('DELETE_EMOJI', exceptionHandler(socket, (emoji: EmojiObj) => {
      let command = emoji.command
      logger.writeLog('EMOJI002', {
        command: command,
        src: emoji.src,
        type: emoji.type
      })
      emojiService.deleteEmoji(emoji)
      emitter.updateEmojiData(emojiService.getEmojiList())
      emitter.notification('success', `emoji :${command}: removed`, socket.id)
    }))

    socket.on('GET_EMOJI_DATA', exceptionHandler(socket, () => {
      logger.writeLog('EMOJI003', { id: socket.id })
      emitter.updateEmojiData(emojiService.getEmojiList(), socket.id)
    }))
  }
}

export { MiscHandler }