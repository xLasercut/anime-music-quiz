{ FullList, AnimeChoices, SongChoices } = require '../database/database.coffee'
timer = require './timer.coffee'

fullList = new FullList()
animeChoices = new AnimeChoices()
songChoices = new SongChoices()

songs = []
animes = []

console.log('Generating choices...')
timer.run()
for item in fullList.read()
  if !songs.includes(item.title)
    songs.push(item.title)

  if !animes.includes(item.name)
    animes.push(item.name)

  for name in item.altName
    if !animes.includes(name)
      animes.push(name)

animeChoices.update(animes.sort())
songChoices.update(songs.sort())
animeChoices.write()
songChoices.write()
processTime = timer.end()
console.log("Generation complete. Time Taken: #{processTime} seconds")
