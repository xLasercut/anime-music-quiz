import * as socketio from 'socket.io'
import { exceptionHandler } from '../shared/exceptions'
import { emitter } from '../shared/server'
import { songService, userService, logger } from '../services/init'
import { SongObj } from '@shared/interfaces'

class ListPickerHandler {
  start(socket: socketio.Socket): void {
    socket.on('LOGIN_LIST', exceptionHandler(socket, () => {
      socket.join('list')
      emitter.updateSongList(songService.getSongList(), socket.id)
      emitter.updateUsers(userService.getUsers(), socket.id)
      logger.writeLog('SERVER005', { id: socket.id, service: 'list' })
    }))

    socket.on('GET_FULL_LIST', exceptionHandler(socket, () => {
      logger.writeLog('LIST002', { id: socket.id })
      emitter.updateSongList(songService.getSongList(), socket.id)
    }))

    socket.on('GET_USER_LIST', exceptionHandler(socket, (user: string) => {
      logger.writeLog('LIST003', { id: socket.id, user: user })
      emitter.updateUserList(user, userService.getUserList(user), socket.id)
    }))

    socket.on('ADD_USER_SONG', exceptionHandler(socket, (song: SongObj, user: string) => {
      let { anime, title, songId } = this._parseSong(song)
      logger.writeLog('LIST004', {
        id: socket.id,
        anime: anime,
        title: title,
        songId: songId,
        user: user
      })
      songService.validateSongId(songId)
      userService.addSong(user, songId)
      emitter.updateUserList(user, userService.getUserList(user), 'list')
      emitter.notification('success', `${anime}: ${title} added`, socket.id)
    }))

    socket.on('REMOVE_USER_SONG', exceptionHandler(socket, (song: SongObj, user: string) => {
      let { anime, title, songId } = this._parseSong(song)
      logger.writeLog('LIST005', {
        id: socket.id,
        anime: anime,
        title: title,
        songId: songId,
        user: user
      })
      userService.removeSong(user, songId)
      emitter.updateUserList(user, userService.getUserList(user), 'list')
      emitter.notification('success', `${anime}: ${title} removed`, socket.id)
    }))
  }

  _parseSong(song: SongObj) {
    let anime = song.anime[0]
    let title = song.title
    let songId = song.songId

    return { anime, title, songId }
  }
}

export { ListPickerHandler }