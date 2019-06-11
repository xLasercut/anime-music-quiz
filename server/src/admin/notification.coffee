class Notification
  constructor: (io) ->
    @io = io

  sendNotification: (id, type, msg) ->
    client = @io.nsps['/'].connected[id]
    if client
      client.emit('SYSTEM_NOTIFICATION', type, msg)

  error: (id, msg) ->
    @sendNotification(id, 'error', msg)

  warning: (id, msg) ->
    @sendNotification(id, 'warning', msg)

module.exports = Notification