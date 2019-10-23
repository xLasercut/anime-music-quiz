from amq import sio, db, logger, notification
from amq.handlers import exceptionHandler

class EmojiManager(object):

    def registerHandlers(self):

        @sio.on('LOGIN_MISC')
        @exceptionHandler
        def login(sid):
            self.syncEmojiData(sid)

        @sio.on('SYNC_EMOJI_DATA')
        @exceptionHandler
        def emojiListRequest(sid):
            self.syncEmojiData(sid)

        @sio.on('ADD_EMOJI')
        @exceptionHandler
        def addEmoji(sid, emoji):
            command = emoji.get('command', '')
            logger.writeLog('EMOJI001', { 'command': command,
                                          'src':  emoji.get('src', ''),
                                          'type': emoji.get('type', '') })
            db.addEmoji(emoji)
            self.syncEmojiData()
            notification.sendSingle(sid, 'success', f'emoji :{command}: added')

        @sio.on('REMOVE_EMOJI')
        @exceptionHandler
        def removeEmoji(sid, emoji):
            command = emoji.get('command', '')
            logger.writeLog('EMOJI002', { 'command': command,
                                          'src': emoji.get('src', ''),
                                          'type': emoji.get('type', '') })
            db.removeEmoji(emoji)
            self.syncEmojiData()
            notification.sendSingle(sid, 'success', f'emoji :{command}: removed')

    @staticmethod
    def syncEmojiData(sid=None):
        if sid:
            sio.emit('SYNC_EMOJI_DATA', db.emojiList, room=sid)
        else:
            sio.emit('SYNC_EMOJI_DATA', db.emojiList)