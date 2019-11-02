let IMAGE_FORMAT = new RegExp('(.*)\.(png|jpg|jpeg|gif)$', 'i')
let EMOJI_COMMAND_FORMAT = new RegExp('^[A-Za-z0-9]+$')
let SERVER_PASSWORD_FORMAT = new RegExp('^[A-Za-z0-9]+$')
let USERNAME_FORMAT = new RegExp('^[A-Za-z0-9 ]+$')
let EMOJI_FORMAT = new RegExp(':(?:[^:]+)$', 'ig')

export { IMAGE_FORMAT, EMOJI_COMMAND_FORMAT, SERVER_PASSWORD_FORMAT, USERNAME_FORMAT, EMOJI_FORMAT }