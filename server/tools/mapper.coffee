swapNameMap = require './maps/swap-name-map.coffee'
altNameMap = require './maps/alt-name-map.coffee'
multiSeasonMap = require './maps/multi-season-map.coffee'
swapSongMap = require './maps/swap-title-map.coffee'

class SongMapper
  constructor: () ->
    @dupe = []
    @initDupe()

  initDupe: () ->
    for _key, val of multiSeasonMap
      if val.dupe
        for item in val.dupe
          if !@dupe.includes(item)
            @dupe.push(item)

  swapName: (name) ->
    if name of swapNameMap
      return swapNameMap[name]
    return name

  altName: (name, id) ->
    altName = []

    if name of altNameMap
      altName = altNameMap[name]

    if id of multiSeasonMap
      for name in multiSeasonMap[id].altName
        if !altName.includes(name)
          altName.push(name)

    return altName

  swapTitle: (title) ->
    if title of swapSongMap
      return swapSongMap[title]
    return title

module.exports = new SongMapper()