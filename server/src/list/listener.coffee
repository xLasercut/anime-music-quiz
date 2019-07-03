{ userLists, fullList } = require '../shared-classes.coffee'

class ListListener
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject

  listen: (socket) ->
    socket.on 'LOGIN_LIST', () =>
      socket.emit('SYNC_USER_LIST_FILES', userLists.files)

    socket.on 'SYNC_FULL_LIST', () =>
      @logObject.writeLog('LIST002', { id: socket.id })
      socket.emit('SYNC_FULL_LIST', fullList.read())

    socket.on 'SYNC_USER_LIST', (file) =>
      @logObject.writeLog('LIST003', { id: socket.id, filename: file })
      @syncUserList(file, socket, true)

    socket.on 'ADD_ANIME', (anime, file) =>
      @logObject.writeLost('LIST004', {
        id: socket.id,
        name: anime.name,
        title: anime.title,
        songId: anime.id,
        filename: file
      })
      userLists.add(anime, file)
      @syncUserList(file, socket)

    socket.on 'REMOVE_ANIME', (anime, file) =>
      @logObject.writeLost('LIST005', {
        id: socket.id,
        name: anime.name,
        title: anime.title,
        songId: anime.id,
        filename: file
      })
      userLists.remove(anime, file)
      @syncUserList(file, socket)

  syncUserList: (file, socket, single=false) ->
    data = {
      list: userLists.singleList(file),
      file: file
    }
    if single
      socket.emit('SYNC_USER_LIST', data)
    else
      @io.emit('SYNC_USER_LIST', data)

module.exports = ListListener