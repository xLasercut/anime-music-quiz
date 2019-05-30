const nameSwap = require('./name-swap.js')
const alternateName = require('./alternate-name.js')
const multiSeason = require('./multi-season-songs.js')

function generateAltName(current, list) {
  var output = current
  var additionalNames = list.altName
  additionalNames.push(list.name)
  for (var name of additionalNames) {
    if (!output.includes(name)) {
      output.push(name)
    }
  }
  return output
}

function removeDupe(dupe, list) {
  for (var i = 0; i < list.length; i++) {
    if (dupe.includes(list[i].id)) {
      list.splice(i, 1)
    }
  }
}

class Converter {
  swapName(name) {
    if (name in nameSwap) {
      return nameSwap[name]
    }
    return name
  }

  alternateName(name) {
    if (name in alternateName) {
      return alternateName[name]
    }
    return []
  }

  multiSeason(list) {
    for (var key in multiSeason) {
      for (var anime of list) {
        if (anime.id === key) {
          anime.altName = anime.altName.concat(multiSeason[key].altName)
          if (multiSeason[key].dupe) {
            removeDupe(multiSeason[key].dupe, list)
          }
        }
      }
    }
  }
}

module.exports = new Converter()