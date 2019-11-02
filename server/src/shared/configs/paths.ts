import * as path from 'path'

let LOG_DIR = path.join(__dirname, '../../../log')
let LOGBASE_PATH = path.join(__dirname, '../../../logbase.cfg')

let DATA_DIR: string
if (process.env.NODE_ENV === 'test') {
  DATA_DIR = path.join(__dirname, '../../../test-data')
}
else {
  DATA_DIR = path.join(__dirname, '../../../data')
}


let USER_DATA_DIR = path.join(DATA_DIR, 'user')
let SONG_LIST_PATH = path.join(DATA_DIR, 'song-list.json')
let EMOJI_LIST_PATH = path.join(DATA_DIR, 'emoji.json')
let BOT_LIST_PATH = path.join(DATA_DIR, 'chat-bot.json')




export { LOGBASE_PATH, LOG_DIR, SONG_LIST_PATH, EMOJI_LIST_PATH, BOT_LIST_PATH, USER_DATA_DIR }