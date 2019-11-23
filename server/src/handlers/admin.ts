import * as socketio from 'socket.io'
import { exceptionHandler, AMQAdminError } from '../shared/exceptions'
import { logger, songService, userService, emojiService, playerService, chatService, gameStateService } from '../services/init'
import { emitter } from '../shared/server'
import { BannerColor } from '../shared/types'
import { SongObj } from '../shared/interfaces'

class AdminHandler {
  start(socket: socketio.Socket): void {
    socket.on('ADMIN_RELOAD_DATABASE', exceptionHandler(socket, () => {
      this._checkAdminAuth(socket)
      songService.loadDb()
      emitter.updateSongList(songService.getSongList())
      emitter.updateGameChoices(songService.getChoices())
      userService.loadDb()
      let users = userService.getUsers()
      emitter.updateUsers(users)
      for (let user of users) {
        emitter.updateUserList(user, userService.getUserList(user))
      }
      emojiService.loadDb()
      emitter.updateEmojiData(emojiService.getEmojiList())
      logger.writeLog('ADMIN001', { id: socket.id, admin: socket['admin'] })
      emitter.notification('success', 'Game database reloaded')
    }))

    socket.on('ADMIN_SYSTEM_MESSAGE', exceptionHandler(socket, (msgType: BannerColor, msg: string) => {
      this._checkAdminAuth(socket)
      emitter.notification(msgType, msg)
    }))

    socket.on('ADMIN_KICK_PLAYER', exceptionHandler(socket, (sid: string) => {
      this._checkAdminAuth(socket)
      let player = playerService.getPlayerObj(sid)
      let sysMsgData = chatService.generateSysMsgData(`${player.username} has been kicked`)
      emitter.chat(sysMsgData)
      emitter.kickPlayer(sid)
      logger.writeLog('ADMIN002', {
        id: socket.id,
        admin: socket['admin'],
        idKicked: sid,
        username: player.username
      })
    }))

    socket.on('ADMIN_CHANGE_PLAYER_NAME', exceptionHandler(socket, (sid: string, username: string) => {
      this._checkAdminAuth(socket)
      playerService.changePlayerName(sid, username)
      emitter.updatePlayerData(playerService.getPlayerData())
      emitter.notification('warning', 'Your username has been changed', sid)
      logger.writeLog('ADMIN004', {
        id: socket.id,
        admin: socket['admin'],
        idChanged: sid,
        newName: username
      })
    }))

    socket.on('ADMIN_ADD_NEW_SONG', exceptionHandler(socket, (song: SongObj) => {
      this._checkAdminAuth(socket)
      songService.addNewSong(song)
      logger.writeLog('ADMIN006', {
        id: socket.id,
        admin: socket['admin'],
        songId: song.songId,
        anime: song.anime[0],
        src: song.src,
        title: song.title,
        artist: song.artist,
        type: song.type
      })
      emitter.notification('success', `${song.anime[0]}: ${song.title} added`, socket.id)
    }))

    socket.on('ADMIN_DELETE_SONG', exceptionHandler(socket, (song: SongObj) => {
      this._checkAdminAuth(socket)
      songService.deleteSong(song.songId)
      logger.writeLog('ADMIN007', {
        id: socket.id,
        admin: socket['admin'],
        songId: song.songId,
        anime: song.anime,
        src: song.src,
        title: song.title,
        artist: song.artist,
        type: song.type
      })
      emitter.notification('success', `${song.anime[0]}: ${song.title} deleted`, socket.id)
    }))

    socket.on('ADMIN_EDIT_SONG', exceptionHandler(socket, (song: SongObj) => {
      this._checkAdminAuth(socket)
      songService.editSong(song)
      logger.writeLog('ADMIN005', {
        id: socket.id,
        admin: socket['admin'],
        songId: song.songId,
        anime: song.anime[0],
        title: song.title,
        artist: song.artist,
        type: song.type
      })
      emitter.notification('success', `${song.anime[0]}: ${song.title} edited`, socket.id)
    }))

    socket.on('ADMIN_RESET_PRIORITY_LIST', exceptionHandler(socket, (): void => {
      this._checkAdminAuth(socket)
      gameStateService.playedSongIds = new Set()
      logger.writeLog('ADMIN008', { id: socket.id, admin: socket['admin'] })
      emitter.notification('success', 'Priority list cleared')
    }))

    socket.on('ADMIN_MUTE_PLAYER', exceptionHandler(socket, (sid: string, status: boolean): void => {
      this._checkAdminAuth(socket)
      playerService.mutePlayer(sid, status)
      logger.writeLog('ADMIN009', {
        id: socket.id,
        admin: socket['admin'],
        idChanged: sid,
        status: status
      })
      emitter.notification('success', `${sid} mute status set to ${status}`, socket.id)
    }))
  }

  _checkAdminAuth(socket: socketio.Socket): void {
    if (!socket['admin']) {
      logger.writeLog('ADMIN003', { id: socket.id })
      throw new AMQAdminError('Invalid admin authentication')
    }
  }
}

export { AdminHandler }