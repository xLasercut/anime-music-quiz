import random
from amq import logger, db

class GameState(object):

    def __init__(self):
        self.playing = False
        self.gameList = []
        self.maxSongCount = 0
        self.currentSongCount = 0
        self.currentSong = {}
        self.songOverride = {}
        self.startPosition = 0

    def generateGameList(self, users, songCount, duplicate):
        combinedList = db.getCombinedUserList(users)
        dupes = []
        self.gameList = []
        while len(self.gameList) < songCount and combinedList:
            index = random.randrange(0, len(combinedList))
            anime = combinedList[index]['anime'][0]
            if anime not in dupes or duplicate:
                self.gameList.append(combinedList[index])
                dupes.append(anime)
            del combinedList[index]

        logger.writeLog('GAME004', { 'size': len(self.gameList) })

    def startGame(self, gameMode):
        self.playing = True
        self.maxSongCount = len(self.gameList)
        logger.writeLog('GAME002', { 'songCount': self.maxSongCount, 'gameMode': gameMode })

    def newSong(self):
        self._selectSong()
        self.startPosition = random.random()

    @property
    def songCount(self):
        return {
            'current': self.currentSongCount,
            'max': self.maxSongCount
        }

    def _selectSong(self):
        index = random.randrange(0, len(self.gameList))
        self.currentSong = self.gameList[index]
        del self.gameList[index]
        self.currentSongCount += 1
        if self.songOverride:
            self.currentSong = self.songOverride
            self.songOverride = {}

        logger.writeLog('GAME005', { 'number': self.currentSongCount,
                                     'title': self.currentSong['title'],
                                     'anime': self.currentSong['anime'][0],
                                     'type': self.currentSong['type'],
                                     'artist': self.currentSong['artist'] })


