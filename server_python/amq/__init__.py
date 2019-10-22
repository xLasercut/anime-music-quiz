import socketio
from database import AMQDatabase
from shared.logging import Logger

sio = socketio.Server(cors_allowed_origins='*')
logger = Logger('AMQ Server')
db = AMQDatabase()

from amq.services import AuthenticationManager, Notifications

notification = Notifications()
authManager = AuthenticationManager()

from amq.list import ListManager

listManager = ListManager()


def registerHandlers(auth, admin):
    if auth:
        listManager.registerHandlers()

@sio.event
def connect(sid, environ):
    authManager.addClient(sid)
    sio.start_background_task(authManager.verifyClientAuth, sid)

@sio.event
def disconnect(sid):
    logger.writeLog('SERVER003', { 'id': sid })
    authManager.removeClient(sid)

@sio.on('AUTHENTICATE')
def authenticateClient(sid, password):
    auth, admin = authManager.authenticateClient(sid, password)
    registerHandlers(auth, admin)
    return auth, admin


app = socketio.WSGIApp(sio)
