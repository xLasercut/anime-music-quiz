q = require 'q'

class Timer
  constructor: () ->
    @time = 0
    @countdown = null
    @timeout = null

  startCountdown: (time, playerManagement, type) ->
    @resetCountdown()
    deferred = q.defer()
    @time = 0
    @countdown = setInterval () =>
      @time += 500
      if playerManagement.checkAllReady(type) or @time >= time
        @resetCountdown()
        deferred.resolve(true)
    , 500
    deferred.promise

  startTimeout: (time) ->
    @resetTimeout()
    deferred = q.defer()
    @timeout = setTimeout () =>
      deferred.resolve(true)
    , time
    deferred.promise

  startCountdownSingle: (time, playerManagement, id, type) ->
    @resetCountdown()
    deferred = q.defer()
    @time = 0
    @countdown = setInterval () =>
      @time += 500
      if playerManagement.checkSingleReady(id, type) or @time >= time
        @resetCountdown()
        deferred.resolve(true)
    , 500
    deferred.promise

  newRound: (newRound) ->
    deferred = q.defer()
    if newRound
      @timeout = setTimeout () =>
        deferred.resolve(true)
      , 10000
    else
      deferred.resolve(false)
    deferred.promise

  resetCountdown: () ->
    clearInterval(@countdown)

  resetTimeout: () ->
    clearTimeout(@timeout)


module.exports = Timer