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
      socket.emit('SYNC_USER_LIST', userLists.singleList(file), file)

    socket.on 'UPDATE_USER_LIST', (list, file) =>
      userLists.write(file, list)
      @logObject.writeLog('LIST004', { id: socket.id, filename: file })
      @io.emit('SYNC_USER_LIST', userLists.singleList(file), file)

module.exports = ListListener