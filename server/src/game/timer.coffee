q = require 'q'

class Timer
  constructor: () ->
    this.time = 0
    this.countdown = null
    this.timeout = null

  startCountdown: (time, playerManagement, type) ->
    this.resetCountdown()
    deferred = q.defer()
    this.time = 0
    this.countdown = setInterval () =>
      this.time += 500
      if playerManagement.checkAllReady(type) or this.time >= time
        this.resetCountdown()
        deferred.resolve(true)
    , 500
    deferred.promise

  startTimeout: (time) ->
    this.resetTimeout()
    deferred = q.defer()
    this.timeout = setTimeout () =>
      deferred.resolve(true)
    , time
    deferred.promise

  startCountdownSingle: (time, playerManagement, id, type) ->
    this.resetCountdown()
    deferred = q.defer()
    this.time = 0
    this.countdown = setInterval () =>
      this.time += 500
      if playerManagement.checkSingleReady(id, type) or this.time >= time
        this.resetCountdown()
        deferred.resolve(true)
    , 500
    deferred.promise

  newRound: (newRound) ->
    deferred = q.defer()
    if newRound
      this.timeout = setTimeout () =>
        deferred.resolve(true)
      , 10000
    else
      deferred.resolve(false)
    deferred.promise

  resetCountdown: () ->
    clearInterval(this.countdown)

  resetTimeout: () ->
    clearTimeout(this.timeout)


module.exports = Timer