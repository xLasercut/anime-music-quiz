from amq import logger

class GameSettings(object):

    def __init__(self):
        self.songCount = 20
        self.guessTime = 30
        self.users = []
        self.gameMode = 'normal'
        self.duplicate = False
        self.selectTime = 20

    def update(self, settings):
        songCount = settings.get('songCount', 20)
        guessTime = settings.get('guessTime', 30)
        users = settings.get('users', [])
        gameMode = settings.get('gameMode', 'normal')
        duplicate = settings.get('duplicate', False)
        selectTime = settings.get('selectTime', 20)

        self.songCount = songCount
        self.guessTime = guessTime
        self.users = users
        self.gameMode = gameMode
        self.duplicate = duplicate
        self.selectTime = selectTime

        logger.writeLog('SETTING002', { 'songCount': songCount,
                                        'guessTime': guessTime,
                                        'gameMode': gameMode,
                                        'duplicate': duplicate,
                                        'users': '|'.join(users),
                                        'selectTime': selectTime })

    def serialize(self):
        return {
            'songCount': self.songCount,
            'guessTime': self.guessTime,
            'users': self.users,
            'gameMode': self.gameMode,
            'duplicate': self.duplicate,
            'selectTime': self.selectTime
        }


