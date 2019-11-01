import * as q from 'q'
import { playerService } from '../init'
import { ReadyType } from '../../shared/types'

class AMQGameTimer {
  private _time = 0
  private _tick = 500
  private _timeout: NodeJS.Timeout
  private _countdown: NodeJS.Timeout

  startCountdown(time: number, type: ReadyType) {
    this.resetCountdown()
    let deferred = q.defer()
    this._time = 0
    this._countdown = setInterval(() => {
      this._time += this._tick
      if (playerService.allPlayerReady(type) || this._time >= time) {
        this.resetCountdown()
        deferred.resolve(true)
      }
    }, this._tick)
    return deferred.promise
  }

  startCountdownSingle(time: number, type: ReadyType, sid: string) {
    this.resetCountdown()
    let deferred = q.defer()
    this._time = 0
    this._countdown = setInterval(() => {
      this._time += this._tick
      if (playerService.singlePlayerReady(sid, type) || this._time >= time) {
        this.resetCountdown()
        deferred.resolve(true)
      }
    }, this._tick)
    return deferred.promise
  }

  newRound(newRound: boolean) {
    this.resetTimeout()
    let deferred = q.defer()
    if (newRound) {
      this._timeout = setTimeout(() => {
        deferred.resolve(true)
      }, 10000)
    }
    else {
      deferred.resolve(false)
    }
    return deferred.promise
  }

  resetTimeout() {
    clearTimeout(this._timeout)
  }

  resetCountdown(): void {
    clearInterval(this._countdown)
  }
}

export { AMQGameTimer }