from amq import clientUpdater
from amq.game import playerManager, gameSettings, gameState
from amq.decorators import setInterval

class GameFlow(object):

    def __init__(self):
        self.songLoadTimer = None
        self.guessTimer = None
        self.songOverTimer = None
        self.songSelectTimer = None
        self.elapsed = 0

    def newRound(self):
        playerManager.newRound()
        clientUpdater.updateSongSelector()
        if gameSettings.gameMode == 'selector':
            self._gameFlowSelect()
        else:
            self._gameFlowMain()


    def _gameFlowMain(self):
        gameState.newSong()
        clientUpdater.updateGameStateNewSong(gameState.currentSong, gameState.startPosition)
        self.elapsed = 0
        self.songLoadTimer = self._checkPlayerAllReady('song', 5, self._startGuessCountdown)


    @setInterval(0.5)
    def _checkPlayerAllReady(self, readyType, waitTime, callback):
        self.elapsed += 0.5
        if playerManager.allPlayerReady(readyType) or self.elapsed >= waitTime:
            callback()

    def _startGuessCountdown(self):
        self.songLoadTimer.stop()
        self.elapsed = 0
        clientUpdater.updateGameStateStartCountdown(gameSettings.guessTime)
        self.guessTimer  = self._checkPlayerAllReady('guess', gameSettings.guessTime, self._startScoreCountdown)

    def _startScoreCountdown(self):
        self.guessTimer.stop()
        self.elapsed = 0
        clientUpdater.updateGameStateTimeUp()
        self.songOverTimer = self._checkPlayerAllReady('guess', 5, self._songOver)

    def _songOver(self):
        self.songOverTimer.stop()
        self.elapsed = 0
        clientUpdater.updateGameStateShowGuess()


