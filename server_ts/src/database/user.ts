import { AMQLogger } from '../shared/logging/logger'
import { AbstractDataObject } from './abstract'

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

  }

  validateRemoveSongId(songId: string): void {

  }
}

export { UserData }