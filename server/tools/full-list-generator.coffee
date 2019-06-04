timer = require './timer.coffee'
mapper = require './mapper.coffee'
{ RawList, FullList } = require '../database/database.coffee'

rawList = new RawList()
fullList = new FullList()

songs = []

isDuplicate = (song) ->
  for item in songs
    if (item.title == song.title and item.name == song.name) or item.id == song.id or mapper.dupe.includes(song.id)
      return true
  return false

console.log('Generating full list...')
timer.run()
for song in rawList.read()
  song.name = mapper.swapName(song.name)
  song.title = mapper.swapTitle(song.title)
  song.altName = mapper.altName(song.name, song.id)

  if !isDuplicate(song)
    songs.push(song)

fullList.write(songs)
processTime = timer.end()
console.log("Generation complete. Time Taken: #{processTime} seconds")