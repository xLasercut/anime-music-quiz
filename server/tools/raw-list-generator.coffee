axios = require 'axios'
cheerio = require 'cheerio'
{ RawList } = require '../database/database.coffee'
timer = require './timer.coffee'

titleFilter = new RegExp('^(OP|ED)')

getTable = (title) ->
  elementLength = title.parent().nextUntil('table').length
  table = title.parent()
  for i in [0..elementLength]
    table = table.next()
  return table.html()

getSongDetails = (name) ->
  array = name.split('"')
  type = ''
  artist = ''
  title = ''

  if array[0]
    type = array[0].trim()

  if array[1]
    title = array[1].trim()

  if array[2]
    artist = array[2].trim().replace('by ', '')

  return {
    title: title,
    artist: artist,
    type: type
  }

queries = []


specialYears = ['60s', '70s', '80s', '90s']

for year in specialYears
  queries.push(axios.get("https://www.reddit.com/r/AnimeThemes/wiki/#{year}"))

for year in [2000..2019]
  queries.push(axios.get("https://www.reddit.com/r/AnimeThemes/wiki/#{year}"))


console.log('Generating raw anime list from /r/AnimeThemes...')
timer.run()
axios.all(queries)
.then (responses) ->
  songs = []
  for response in responses
    $ = cheerio.load(response.data)
    titles = $('h3 a')

    titles.each (_i, title) ->
      name = $(title).text()
      table = getTable($(title))
      rows = $(table).find('tr')

      rows.each (_i, row) ->
        cells = $(row).find('td')

        cells.each (_i, cell) ->
          songName = $(cell).text()
          if songName.match(titleFilter)
            src = $(cell).next().find('a').attr('href')
            if src
              details = getSongDetails(songName)
              key = src.replace('https://animethemes.moe/video/', '').replace('.webm', '')

              song = {
                id: key,
                name: name,
                src: src,
                title: details.title,
                artist: details.artist,
                type: details.type
              }

              songs.push(song)

  rawList = new RawList()
  rawList.write(songs)

  processTime = timer.end()
  console.log("Generation complete. Time Taken: #{processTime} seconds")
.catch (error) ->
  console.log(error)
