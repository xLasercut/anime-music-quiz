from amq import sio, db

class ClientUpdater(object):

    @staticmethod
    def sendNotification(msgType, msg, sid=None):
        sio.emit('SYSTEM_NOTIFICATION', data=(msgType, msg), room=sid)

    @staticmethod
    def updateUserList(user, sid=None):
        data = {
            'list': db.getUserList(user),
            'file': user
        }
        sio.emit('SYNC_USER_LIST', data, room=sid)

    @staticmethod
    def updateUsers(sid=None):
        sio.emit('SYNC_USER_LIST_FILES', db.userFiles, room=sid)

    @staticmethod
    def updateEmojiData(sid=None):
        sio.emit('SYNC_EMOJI_DATA', db.emojiList, room=sid)

    @staticmethod
    def updateAdminStatus(admin, sid=None):
        sio.emit('SYNC_ADMIN', admin, room=sid)

    @staticmethod
    def updateGameSettings(settings, sid=None):
        sio.emit('SYNC_SETTINGS', settings, room=sid)

    @staticmethod
    def updatePlayerData(data, sid=None):
        sio.emit('SYNC_PLAYERS', data, room=sid)

    @staticmethod
    def updateSongList(sid=None):
        sio.emit('SYNC_FULL_LIST', db.songList, room=sid)

    @staticmethod
    def updateGameChoices(sid=None):
        sio.emit('SYNC_CHOICES', db.choices, room=sid)

    @staticmethod
    def updateGameStatePlaying(playing, sid=None):
        sio.emit('SYNC_PLAYING', playing, room=sid)

    @staticmethod
    def updateGameStateSongCount(count, sid=None):
        sio.emit('SYNC_SONG_COUNT', count, room=sid)

    @staticmethod
    def updateGameStateNewSong(song, position, sid=None):
        sio.emit('NEW_SONG', data=(song, position), room=sid)

    @staticmethod
    def updateGameStateStartCountdown(guessTime, sid=None):
        sio.emit('START_COUNTDOWN', guessTime, room=sid)

    @staticmethod
    def updateGameStateTimeUp(sid=None):
        sio.emit('TIME_UP', room=sid)

    @staticmethod
    def updateGameStateShowGuess(sid=None):
        sio.emit('SHOW_GUESS', room=sid)

    @staticmethod
    def updateSongSelector(sid=None):
        sio.emit('RESET_SELECTOR', room=sid)

