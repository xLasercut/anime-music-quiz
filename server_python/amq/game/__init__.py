from amq.game.settings import GameSettings
from amq.game.player import PlayerManager
from amq.game.state import GameState

gameSettings = GameSettings()
playerManager = PlayerManager()
gameState = GameState()

from amq.game.workflow import GameFlow

gameFlow = GameFlow()

from amq.game.handlers import gameHandlers


