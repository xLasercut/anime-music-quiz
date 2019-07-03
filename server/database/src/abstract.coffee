fs = require 'fs'

_readFile = (filepath) ->
  return JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))

_writeFile = (filepath, data) ->
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2))

class AbstractDatabase
  constructor: (filepath, initData=[]) ->
    @filepath = filepath
    @db = initData
    @_initDb()
    @reload()

  _initDb: () ->
    if !fs.existsSync(@filepath)
      _writeFile(@filepath, @db)

  read: () ->
    return @db

  update: (data) ->
    @db = data

  write: () ->
    _writeFile(@filepath, @db)

  reload: () ->
    @db = _readFile(@filepath)


module.exports = AbstractDatabase