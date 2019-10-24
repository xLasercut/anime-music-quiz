import os
from amq import sio, logger
from amq.decorators import setTimeout

class AuthenticationManager(object):
    SERVER_PASSWORD = os.environ.get('SERVER_PASSWORD', 'server')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'password')

    def __init__(self):
        self._clients = {}

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

    def addClient(self, sid):
        self._clients[sid] = {
            'auth': False,
            'admin': False,
            'timer': self._verifyClientAuth(sid)
        }

    def removeClient(self, sid):
        if sid in self._clients:
            self._clients[sid]['timer'].cancel()
            del self._clients[sid]

    def getClientAuth(self, sid):
        client = self._clients.get(sid, {})
        if not client:
            return False, False

        auth = client.get('auth', False)
        admin = client.get('admin', False)

        return auth, admin

    @setTimeout(2)
    def _verifyClientAuth(self, sid):
        auth, admin = self.getClientAuth(sid)
        if not auth:
            logger.writeLog('AUTH002', { 'id': sid })
            sio.disconnect(sid)
