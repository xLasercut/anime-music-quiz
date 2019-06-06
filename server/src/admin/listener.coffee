{ animeChoices, userLists, songChoices, fullList } = require '../shared-classes.coffee'

class AdminListener
  constructor: (io, logObject) ->
    @io = io
    @logObject = logObject

  listen: (socket) ->
    socket.on 'RELOAD_DATABASE', () ->
      @updateUserLists()
      @updateChoices()
      fullList.reload()
      @io.emit('SYNC_FULL_LIST', fullList.read())
      @logObject.writeLog('ADMIN001', { id: socket.id, admin: socket.admin })

  updateChoices: () ->
    animeChoices.reload()
    songChoices.reload()
    choices = {
      anime: animeChoices.read(),
      song: songChoices.read()
    }
    @io.emit('SYNC_CHOICES', choices)

  updateUserLists: () ->
    userLists.reload()
    for file of userLists
      @io.emit('SYNC_USER_LIST', userLists.singleList(file), file)

module.exports = AdminListener