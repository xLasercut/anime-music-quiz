let JSON_FILE_FORMAT = new RegExp('.*\.json', 'ig')
let EMOJI_COMMAND_FORMAT = new RegExp('^[A-Za-z0-9]{1,20}$')
let PLAYER_USERNAME_FORMAT = new RegExp('^[A-Za-z0-9 ]{1,20}$')

export { JSON_FILE_FORMAT, EMOJI_COMMAND_FORMAT, PLAYER_USERNAME_FORMAT }