from amq_server import sio, db

class ListManager(object):

    def register_handlers(self):
        @sio.event
        def LOGIN_LIST(sid):
            sio.emit('SYNC_USER_LIST_FILES', db.user_files)

        @sio.event
        def SYNC_FULL_LIST(sid):
            sio.emit('SYNC_FULL_LIST', db.song_list)

        @sio.event
        def SYNC_USER_LIST(sid):
            self.sync_user_list(file)


    def sync_user_list(file, sid, single=False):
        data = {
            'list': db.user_lists[file],
            'file': file
        }
        if single:
            sio.emit('SYNC_USER_LIST', data, room=sid)
        else:
            sio.emit('SYNC_USER_LIST', data)
