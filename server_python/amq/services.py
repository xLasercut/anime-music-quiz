import os
from amq import sio, logger

class AuthenticationManager(object):
    SERVER_PASSWORD = os.environ.get('SERVER_PASSWORD', 'server')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'password')

    def __init__(self):
        self._clients = {}

    def verifyClientAuth(self, sid):
        sio.sleep(2)
        if not self._clients.get(sid, {}).get('auth'):
            logger.writeLog('AUTH002', { 'id': sid })
            sio.disconnect(sid)
            self.removeClient(sid)

    def authenticateClient(self, sid, password):
        auth = False
        admin = False
        if password == self.SERVER_PASSWORD:
            auth = True

        if password == self.ADMIN_PASSWORD:
            auth = True
            admin = True

        self._clients[sid]['auth'] = auth
        self._clients[sid]['admin'] = admin

        return auth, admin

    def addClient(self, sid):
        self._clients[sid] = {
            'auth': False,
            'admin': False
        }

    def removeClient(self, sid):
        if sid in self._clients:
            del self._clients[sid]


class Notifications(object):

    @staticmethod
    def sendSingle(sid, msgType, msg):
        sio.emit('SYSTEM_NOTIFICATION', data=(msgType, msg), room=sid)

    @staticmethod
    def sendAll(msgType, msg):
        sio.emit('SYSTEM_NOTIFICATION', data=(msgType, msg))