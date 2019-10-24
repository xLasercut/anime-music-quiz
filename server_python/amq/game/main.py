from amq import sio, logger, db, clientUpdater, authManager
from amq.decorators import exceptionHandler
from amq.game.player import PlayerManager
from amq.game.settings import SettingsManager


class GameManager(object):
    def __init__(self):
        self.playerManager = PlayerManager()
        self.settingsManager = SettingsManager()

    def registerHandlers(self):
        self.settingsManager.registerHandlers()


    def removePlayer(self, sid):
        self.playerManager.removePlayer(sid)

