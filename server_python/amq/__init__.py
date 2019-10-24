import socketio
from database import AMQDatabase
from shared.logging import Logger

sio = socketio.Server(cors_allowed_origins='*')
logger = Logger('AMQ Server')
db = AMQDatabase()

from amq.handlers import ClientUpdater

clientUpdater = ClientUpdater()

from amq.services import AuthenticationManager

authManager = AuthenticationManager()

from amq.list import listPickerHandlers
from amq.misc import emojiHandlers
from amq.game import gameHandlers, playerManager

def registerHandlers(sid, auth, admin):
    if auth:
        clientUpdater.updateAdminStatus(admin, sid)
        listPickerHandlers()
        emojiHandlers()
        gameHandlers()

@sio.event
def connect(sid, environ):
    authManager.addClient(sid)

@sio.event
def disconnect(sid):
    logger.writeLog('SERVER003', { 'id': sid })
    authManager.removeClient(sid)
    playerManager.removePlayer(sid)
    clientUpdater.updatePlayerData(playerManager.playerData)

@sio.on('AUTHENTICATE')
def authenticateClient(sid, password):
    authManager.authenticateClient(sid, password)
    auth, admin = authManager.getClientAuth(sid)
    registerHandlers(sid, auth, admin)
    return auth


app = socketio.WSGIApp(sio)
