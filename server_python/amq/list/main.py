from amq import sio, db, logger, notification
from amq.handlers import exceptionHandler

class ListManager(object):

    def registerHandlers(self):
        @sio.on('LOGIN_LIST')
        @exceptionHandler
        def login(sid):
            sio.emit('SYNC_USER_LIST_FILES', db.userFiles)


        @sio.on('SYNC_FULL_LIST')
        @exceptionHandler
        def fullListRequest(sid):
            logger.writeLog('LIST002', { 'id': sid })
            sio.emit('SYNC_FULL_LIST', db.songList, room=sid)

        @sio.on('SYNC_USER_LIST')
        @exceptionHandler
        def userListRequest(sid, user):
            logger.writeLog('LIST003', { 'id': sid, 'filename': user })
            self.syncUserList(user, sid)

        @sio.on('ADD_SONG')
        @exceptionHandler
        def addSong(sid, song, user):
            anime = song.get('anime', [''])[0]
            title = song.get('title', '')
            songId = song.get('songId', '')
            logger.writeLog('LIST004', { 'id': sid,
                                        'anime': anime,
                                        'title': title,
                                        'songId': songId,
                                        'filename': user })
            db.addUserSong(user, songId, anime, title)
            self.syncUserList(user, sid)
            notification.sendSingle(sid, 'success', f'{anime}: {title} added')


        @sio.on('REMOVE_SONG')
        @exceptionHandler
        def removeSong(sid, song, user):
            anime = song.get('anime', [''])[0]
            title = song.get('title', '')
            songId = song.get('songId', '')
            logger.writeLog('LIST005', { 'id': sid,
                                        'anime': anime,
                                        'title': title,
                                        'songId': songId,
                                        'filename': user })
            db.removeUserSong(user, songId, anime, title)
            self.syncUserList(user, sid)
            notification.sendSingle(sid, 'success', f'{anime}: {title} removed')



    @staticmethod
    def syncUserList(user, sid, single=False):
        data = {
            'list': db.userLists[user],
            'file': user
        }
        if single:
            sio.emit('SYNC_USER_LIST', data, room=sid)
        else:
            sio.emit('SYNC_USER_LIST', data)
