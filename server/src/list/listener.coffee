{ FullList } = require '../../database/database.coffee'
{ userLists } = require '../shared-classes.coffee'

class ListListener
  constructor: (io, logger) ->
    @io = io
    @logger = logger
    @fullList = new FullList()

  listen: (socket) ->
    socket.on 'SYNC_USER_LIST_FILES', (_data, callback) =>
      @logger.debug('user list files requested by client')
      callback(userLists.files)

    socket.on 'SYNC_FULL_LIST', (_data, callback) =>
      @logger.debug('full list requested by client')
      callback(@fullList.read())

    socket.on 'SYNC_USER_LIST', (file) =>
      @logger.debug("#{file} requested by client")
      socket.emit('SYNC_USER_LIST', userLists.singleList(file), file)

    socket.on 'UPDATE_USER_LIST', (list, file) =>
      userLists.write(file, list)
      @logger.debug("#{file} updated")
      @io.emit('SYNC_USER_LIST', userLists.singleList(file), file)

module.exports = ListListener