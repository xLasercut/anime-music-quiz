class Notification
  constructor: (io) ->
    @io = io

  client: (id, type, msg) ->
    client = @io.nsps['/'].connected[id]
    if client
      client.emit('SYSTEM_NOTIFICATION', type, msg)

  all: (type, msg) ->
    @io.emit('SYSTEM_NOTIFICATION', type, msg)


module.exports = Notification