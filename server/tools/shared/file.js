const fs = require('fs')

class File {
  read(path) {
    return JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }))
  }

  write(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
  }
}

module.exports = new File()