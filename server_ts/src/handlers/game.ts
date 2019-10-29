import * as socketio from 'socket.io'
import { exceptionHandler } from '../shared/exceptions'
import { InputPlayerObj } from '../shared/interfaces'
import { playerService, chatService, emojiService, songService, userService } from '../services/init'
import { emitter } from '../shared/server'

class GameHandler {
  start(socket: socketio.Socket): void {
    startPlayerHandler(socket)

    socket.on('disconnect', exceptionHandler(socket, () => {
      let player = playerService.getPlayerObj(socket.id)
      playerService.removePlayer(socket.id)
      emitter.updatePlayerData(playerService.getPlayerData())
      let sysMsgData = chatService.generateSysMsgData(`${player['username']} has left the room`)
      emitter.chat(sysMsgData, 'game')
    }))

    socket.on('LOGIN_GAME', exceptionHandler(socket, (inputInfo: InputPlayerObj) => {
      socket.join('game')
      playerService.newPlayer(socket.id, socket['admin'], inputInfo)
      emitter.updatePlayerData(playerService.getPlayerData(), 'game')
      emitter.updateEmojiData(emojiService.getEmojiList(), socket.id)
      emitter.updateSongList(songService.getSongList(), socket.id)
      emitter.updateUsers(userService.getUsers(), socket.id)
      emitter.updateGameChoices(songService.getChoices(), socket.id)
      let sysMsgData = chatService.generateSysMsgData(`${inputInfo.username} has joined the room`)
      emitter.chat(sysMsgData, 'game')
    }))
  }
}

function startPlayerHandler(socket: socketio.Socket): void {
  socket.on('PLAYER_CHAT', exceptionHandler(socket, (message: string) => {
    let player = playerService.getPlayerObj(socket.id)
    let msgData = chatService.generateUserMsgData(socket.id, player, message)
    emitter.chat(msgData, 'game')
    let botMsgData = chatService.generateBotMsgData(message)
    if (botMsgData) {
      emitter.chat(botMsgData, 'game')
    }
  }))
}

export { GameHandler }