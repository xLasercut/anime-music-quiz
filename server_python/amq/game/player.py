from amq import logger

class PlayerManager(object):

    def __init__(self):
        self._players = {}

    def newPlayer(self, sid, admin, player):
        if not self._players:
            host = True
        else:
            host = False
        self._players[sid] = Player()
        self._players[sid].username = player.get('username', 'Placeholder')
        self._players[sid].score = player.get('score', 0)
        self._players[sid].avatar = player.get('avatar', '0')
        self._players[sid].host = host
        self._players[sid].admin = admin
        logger.writeLog('PLAYER001', { 'id': sid, 'username': self._players[sid].username })

    def removePlayer(self, sid):
        if sid in self._players:
            username = self._players[sid].username
            host = self._players[sid].host
            logger.writeLog('PLAYER002', { 'id': sid, 'username': username })
            del self._players[sid]
            self._moveHost(host)

    @property
    def playerData(self):
        players = {}
        for sid in self._players:
            players[sid] = self._players[sid].info
        return players

    def resetScore(self):
        for sid in self._players:
            self._players[sid].score = 0

    def newRound(self):
        for sid in self._players:
            self._players[sid].reset()

    def playerReady(self, sid, readyType):
        self._players[sid].ready[readyType] = True

    def playerGuess(self, sid, guess):
        self._players[sid].guess = guess

    def allPlayerReady(self, readyType):
        for sid in self._players:
            if not self._players[sid].ready[readyType]:
                return False
        return True

    def _moveHost(self, host):
        if self._players and host:
            sid = next(iter(self._players))
            self._players[sid].host = True



class Player(object):

    def __init__(self):
        self.username = 'Placeholder'
        self.score = 0
        self.avatar = '0'
        self.color = 'error'

        self.host = False
        self.admin = False

        self.guess = {
            'song': '',
            'anime': ''
        }

        self.ready = {
            'song': False,
            'select': False,
            'guess': False
        }

    @property
    def info(self):
        return {
            'username': self.username,
            'score': self.score,
            'avatar': self.avatar,
            'host': self.host,
            'guess': self.guess,
            'admin': self.admin,
            'color': self.color
        }

    def reset(self):
        self.guess = {
            'song': '',
            'anime': ''
        }
        self.color = 'error'
        self.ready = {
            'song': False,
            'select': False,
            'guess': False
        }