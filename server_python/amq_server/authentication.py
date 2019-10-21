import os
from amq_server import sio

class AuthenticationManager(object):
    SERVER_PASSWORD = os.environ.get('SERVER_PASSWORD', 'server')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'password')

    def __init__(self):
        self.clients = {}

    def verify_client_auth(self, sid):
        sio.sleep(2)
        if not self.clients[sid].get('auth'):
            sio.disconnect(sid)
            self.remove_client(sid)

    def authenticate_client(self, sid, password):
        auth = False
        admin = False
        if password == self.SERVER_PASSWORD:
            auth = True

        if password == self.ADMIN_PASSWORD:
            auth = True
            admin = True

        self.clients[sid]['auth'] = auth
        self.clients[sid]['admin'] = admin

        return auth, admin

    def add_client(self, sid):
        self.clients[sid] = {
            'auth': False,
            'admin': False
        }

    def remove_client(self, sid):
        if sid in self.clients:
            del self.clients[sid]
