const file = require('./shared/file.js')
const conversionMap = require('./generate-anime-list/conversion-map.js')

const titleJapFilter = new RegExp('\(.*\)', 'g')

var raw = file.read('./raw-anime.json')
var animes = []


function convertName(name) {
  for (var key in conversionMap) {
    for (var item of conversionMap[key]) {
      if (item === name.toString().trim()) {
        return key
      }
    }
  }
  return name
}

function cleanTitle(title) {
  if (title.includes('(')) {
    var titleArray = title.split('(')
    return titleArray[0].trim()
  }
  return title
}

function isDuplicate(anime) {
  for (var item of animes) {
    if ((anime.src === item.src || anime.title === item.title) && anime.name === item.name) {
      return true
    }
  }
  return false
}


for (var anime of raw) {
  anime.name = convertName(anime.name)
  anime.title = cleanTitle(anime.title)


  if (!isDuplicate(anime)) {
    animes.push(anime)
  }
}

file.write('./anime.json', animes)