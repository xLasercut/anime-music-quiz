const axios = require('axios')

var queries = []

const specialYears = ['90s', '80s', '70s', '60s']

for (var year = 2000; year <= 2019; year++) {
  queries.push(axios.get(`https://www.reddit.com/r/AnimeThemes/wiki/${year}`))
}

for (var year of specialYears) {
  queries.push(axios.get(`https://www.reddit.com/r/AnimeThemes/wiki/${year}`))
}

module.exports = queries