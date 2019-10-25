import * as path from 'path'

let SERVER_PASSWORD = process.env.SERVER_PASSWORD || 'server'
let ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password'
let SERVER_PORT = process.env.SERVER_PORT || 3001

let LOG_DIR = path.join(__dirname, '../../log')

let DATA_DIR: string
if (process.env.NODE_ENV === 'test') {
  DATA_DIR = path.join(__dirname, '../../test-data')
}
else {
  DATA_DIR = path.join(__dirname, '../../data')
}

let LOGBASE_PATH = path.join(DATA_DIR, 'logbase.cfg')
let USER_DATA_DIR = path.join(DATA_DIR, 'user')
let SONG_LIST_PATH = path.join(DATA_DIR, 'song-list.json')
let EMOJI_LIST_PATH = path.join(DATA_DIR, 'emoji.json')
let BOT_LIST_PATH = path.join(DATA_DIR, 'chat-bot.json')

let JSON_FILE_FORMAT = new RegExp('.*\.json', 'ig')


export { SERVER_PASSWORD, ADMIN_PASSWORD, SERVER_PORT, LOGBASE_PATH, LOG_DIR, SONG_LIST_PATH, EMOJI_LIST_PATH, BOT_LIST_PATH, USER_DATA_DIR, JSON_FILE_FORMAT }