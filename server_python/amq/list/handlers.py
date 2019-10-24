from amq import sio, db, logger, clientUpdater
from amq.decorators import exceptionHandler

def listPickerHandlers():

    @sio.on('LOGIN_LIST')
    @exceptionHandler
    def login(sid):
        clientUpdater.updateUsers(sid)


    @sio.on('SYNC_FULL_LIST')
    @exceptionHandler
    def fullListRequest(sid):
        logger.writeLog('LIST002', { 'id': sid })
        clientUpdater.updateSongList(sid)

    @sio.on('SYNC_USER_LIST')
    @exceptionHandler
    def userListRequest(sid, user):
        logger.writeLog('LIST003', { 'id': sid, 'filename': user })
        clientUpdater.updateUserList(user, sid)

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
                                        'user': user })
        db.addUserSong(user, songId)
        clientUpdater.updateUserList(user)
        clientUpdater.sendNotification('success', f'{anime}: {title} added', sid)


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
        db.removeUserSong(user, songId)
        clientUpdater.updateUserList(user)
        clientUpdater.sendNotification('success', f'{anime}: {title} removed', sid)
