{ userLists, fullList } = require '../shared-classes.coffee'

class ListListener
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject

  listen: (socket) ->
    socket.on 'LOGIN_LIST', () =>
      try
        socket.emit('SYNC_USER_LIST_FILES', userLists.files)
      catch e
        @_logUnhandledError(e)

    socket.on 'SYNC_FULL_LIST', () =>
      try
        @logObject.writeLog('LIST002', { id: socket.id })
        socket.emit('SYNC_FULL_LIST', fullList.read())
      catch e
        @_logUnhandledError(e)

    socket.on 'SYNC_USER_LIST', (file) =>
      try
        @logObject.writeLog('LIST003', { id: socket.id, filename: file })
        @syncUserList(file, socket, true)
      catch e
        @_logUnhandledError(e)

    socket.on 'ADD_ANIME', (anime, file) =>
      try
        @logObject.writeLog('LIST004', {
          id: socket.id,
          name: anime.name,
          title: anime.title,
          songId: anime.id,
          filename: file
        })
        userLists.add(anime, file)
        @syncUserList(file, socket)
      catch e
        @_logUnhandledError(e)

    socket.on 'REMOVE_ANIME', (anime, file) =>
      try
        @logObject.writeLog('LIST005', {
          id: socket.id,
          name: anime.name,
          title: anime.title,
          songId: anime.id,
          filename: file
        })
        userLists.remove(anime, file)
        @syncUserList(file, socket)
      catch e
        @_logUnhandledError(e)

  syncUserList: (file, socket, single=false) ->
    data = {
      list: userLists.singleList(file),
      file: file
    }
    if single
      socket.emit('SYNC_USER_LIST', data)
    else
      @io.emit('SYNC_USER_LIST', data)

  _logUnhandledError: (e) ->
    @logObject.writeLog('SERVER004', { msg: e.message })

module.exports = ListListener