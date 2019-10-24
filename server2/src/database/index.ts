import { SongData } from './anime'
import { UserData } from './user'
import { AMQLogger } from '../shared/logging/logger'

class AMQDatabase {
  _songData: SongData
  _logger: AMQLogger

  constructor(logger: AMQLogger) {
    this._logger = logger
    this.loadDb()
  }

  loadDb(): void {
    this._songData = new SongData(this._logger)
  }

}


export { AMQDatabase }