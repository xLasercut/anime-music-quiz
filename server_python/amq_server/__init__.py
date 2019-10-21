import socketio
from database import AMQDatabase

sio = socketio.Server(cors_allowed_origins='*')
db = AMQDatabase()

from amq_server.authentication import AuthenticationManager
from amq_server.list import ListManager




authentication_manager = AuthenticationManager()
list_manager = ListManager()


def register_handlers(auth, admin):
    if auth:
        list_manager.register_handlers()

@sio.event
def connect(sid, environ):
    authentication_manager.add_client(sid)
    sio.start_background_task(authentication_manager.verify_client_auth, sid)

@sio.event
def disconnect(sid):
    print('{} disconnected'.format(sid))
    authentication_manager.remove_client(sid)

@sio.event
def AUTHENTICATE(sid, password):
    auth, admin = authentication_manager.authenticate_client(sid, password)
    register_handlers(auth, admin)
    return auth, admin


app = socketio.WSGIApp(sio)
