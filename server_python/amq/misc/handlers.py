from amq import sio, db, logger, clientUpdater
from amq.decorators import exceptionHandler

def emojiHandlers():

    @sio.on('LOGIN_MISC')
    @exceptionHandler
    def login(sid):
        clientUpdater.updateEmojiData(sid)

    @sio.on('SYNC_EMOJI_DATA')
    @exceptionHandler
    def emojiListRequest(sid):
        clientUpdater.updateEmojiData(sid)

    @sio.on('ADD_EMOJI')
    @exceptionHandler
    def addEmoji(sid, emoji):
        command = emoji.get('command', '')
        logger.writeLog('EMOJI001', { 'command': command,
                                        'src':  emoji.get('src', ''),
                                        'type': emoji.get('type', '') })
        db.addEmoji(emoji)
        clientUpdater.updateEmojiData()
        clientUpdater.sendNotification('success', f'emoji :{command}: added', sid)

    @sio.on('REMOVE_EMOJI')
    @exceptionHandler
    def removeEmoji(sid, emoji):
        command = emoji.get('command', '')
        logger.writeLog('EMOJI002', { 'command': command,
                                        'src': emoji.get('src', ''),
                                        'type': emoji.get('type', '') })
        db.removeEmoji(emoji)
        clientUpdater.updateEmojiData()
        clientUpdater.sendNotification('success', f'emoji :{command}: removed', sid)
