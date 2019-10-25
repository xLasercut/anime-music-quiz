import { AMQLogger } from '../shared/logging/logger'
import { AbstractDataObject } from '../shared/abstracts'
import { AMQDbError } from '../shared/exceptions'

class UserData extends AbstractDataObject {
  db: Array<string>
  _name: string

  constructor(name: string, filepath: string, logger: AMQLogger) {
    super(filepath, logger)
    this._name = name
  }

  addSong(songId: string): void {
    this.db.push(songId)
    this._writeFile()
  }

  removeSong(songId: string): void {
    let i = this.db.indexOf(songId)
    if (i > -1) {
      this.db.splice(i, 1)
      this._writeFile()
    }
  }

  validateAddSongId(songId: string): void {
    if (this.db.includes(songId)) {
      this._logger.writeLog('DATA001', { user: this._name,
                                         songId: songId,
                                         reason: 'song already in user list' })
      throw new AMQDbError('Song already added to user list')
    }
  }

  validateRemoveSongId(songId: string): void {
    if (!this.db.includes(songId)) {
      this._logger.writeLog('DATA001', { user: this._name,
                                         songId: songId,
                                         reason: 'song not in user list' })
      throw new AMQDbError('Song not in user list')
    }
  }
}

export { UserData }