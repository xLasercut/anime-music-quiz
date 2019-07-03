path = require 'path'

if process.env.NODE_ENV == 'test'
  baseDir = path.join(__dirname, '..', 'test_data')
else
  baseDir = path.join(__dirname, '..', 'data')

userDir = path.join(baseDir, 'user')
animeDir = path.join(baseDir, 'anime')

module.exports = { baseDir, animeDir, userDir }