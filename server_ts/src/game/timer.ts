import * as q from 'q'
import { PlayerManager } from './player'
import { ReadyType } from '../shared/types'

class AMQTimer {
  _time = 0
  _tick = 500
  _timeout: NodeJS.Timeout
  _countdown: NodeJS.Timeout

  startCountdown(time: number, playerManager: PlayerManager, type: ReadyType): any {
    this.resetCountdown()
    let deferred = q.defer()
    this._time = 0
    this._countdown = setInterval(() => {
      this._time += this._tick
      if (playerManager.allPlayerReady(type) || this._time >= time) {
        this.resetCountdown()
        deferred.resolve(true)
      }
    }, this._tick)
    return deferred.promise
  }

  startCountdownSingle(time: number, sid: string, playerManager: PlayerManager, type: ReadyType): any {
    this.resetCountdown()
    let deferred = q.defer()
    this._time = 0
    this._countdown = setInterval(() => {
      this._time += this._tick
      if (playerManager.singlePlayerReady(sid, type) || this._time >= time) {
        this.resetCountdown()
        deferred.resolve(true)
      }
    }, this._tick)
    return deferred.promise
  }

  newRound(startNewRound: boolean): any {
    this.resetTimeout()
    let deferred = q.defer()
    if (startNewRound) {
      this._timeout = setTimeout(() => {
        deferred.resolve(true)
      }, 10000)
    }
    else {
      deferred.resolve(false)
    }
    return deferred.promise
  }

  resetTimeout(): void {
    clearTimeout(this._timeout)
  }

  resetCountdown(): void {
    clearInterval(this._countdown)
  }
}

export { AMQTimer }