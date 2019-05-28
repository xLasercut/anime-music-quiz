const file = require('./shared/file.js')
const conversionMap = require('./generate-anime-list/conversion-map.js')

var animes = file.read('./user-list.json')

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

for (var i = 0; i < animes.length; i++) {
  animes[i].name = convertName(animes[i].name)
}

file.write('./user-list.json', animes)