from amq import sio, db, logger, clientUpdater, authManager
from amq.decorators import exceptionHandler
from amq.game import gameSettings, playerManager, gameState, gameFlow

def gameHandlers():
    settingsHandlers()

    @sio.on('LOGIN_GAME')
    @exceptionHandler
    def login(sid, player):
        _auth, admin = authManager.getClientAuth(sid)
        playerManager.newPlayer(sid, admin, player)
        clientUpdater.updateGameStatePlaying(gameState.playing)
        clientUpdater.updatePlayerData(playerManager.playerData)
        clientUpdater.updateSongList(sid)
        clientUpdater.updateUsers(sid)
        clientUpdater.updateGameChoices(sid)

    @sio.on('START_GAME')
    @exceptionHandler
    def startGame(sid):
        playerManager.resetScore()
        clientUpdater.updatePlayerData(playerManager.playerData)
        gameState.generateGameList(gameSettings.users, gameSettings.songCount, gameSettings.duplicate)
        if gameState.gameList:
            gameState.startGame(gameSettings.gameMode)
            clientUpdater.updateGameStatePlaying(gameState.playing)
            gameFlow.newRound()
        else:
            test = 'test'

    @sio.on('STOP_GAME')
    @exceptionHandler
    def stopGame(sid):
        gameFlow.stopGame()


def settingsHandlers():

    @sio.on('SYNC_SETTINGS')
    @exceptionHandler
    def syncSettings(sid):
        logger.writeLog('SETTING001', { 'id': sid })
        clientUpdater.updateGameSettings(gameSettings.serialize(), sid)

    @sio.on('UPDATE_SETTINGS')
    @exceptionHandler
    def updateSettings(sid, settings):
        gameSettings.update(settings)
        clientUpdater.updateGameSettings(gameSettings.serialize())



def playerHandlers():

    @sio.on('SONG_LOADED')
    @exceptionHandler
    def songLoaded(sid):
        playerManager.playerReady(sid, 'song')

    @sio.on('GUESS')
    @exceptionHandler
    def playerGuess(sid, guess):
        playerManager.playerGuess(sid, guess)
        playerManager.playerReady(sid, 'guess')
        logger.writeLog('GAME007', { 'song': guess['song'], 'anime': guess['anime'] })