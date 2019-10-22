import uuid
import os
from database.services import FileHandler
from shared.logging import Logger
from shared.exceptions import AMQDbError

class AMQDatabase(object):

    def __init__(self):
        self._logger = Logger('AMQ Database')
        self.songList = []
        self.songIds = []
        self._songChoices = []
        self._animeChoices = []
        self.userFiles = []
        self.userLists = {}
        self.emojiList = []
        self.botList = []
        self._fileHandler = FileHandler()
        self.loadDb()


    def loadDb(self):
        self.songList = self._fileHandler.songList
        self._generateSecondaryDb()
        self._generateUserDb()

    def addUserSong(self, user, songId, anime, title):
        if songId not in self.songIds:
            self._logger.writeLog('DATA001', { 'file': user,
                                               'songId': songId,
                                               'anime': anime,
                                               'title': title })
            raise AMQDbError(f'{anime}: {title} could not be added')

        if songId in self.userLists[user]:
            self._logger.writeLog('DATA002', { 'file': user,
                                               'songId': songId,
                                               'anime': anime,
                                               'title': title })
            raise AMQDbError(f'{anime}: {title} could not be added')

        self.userLists[user].append(songId)
        self._fileHandler.writeUserList(user, self.userLists[user])

    def removeUserSong(self, user, songId, anime, title):
        if songId not in self.userLists[user]:
            self._logger.writeLog('DATA001', { 'file': user,
                                               'songId': songId,
                                               'anime': anime,
                                               'title': title })
            raise AMQDbError(f'{anime}: {title} could not be removed')

        self.userLists[user].remove(songId)
        self._fileHandler.writeUserList(user, self.userLists[user])

    @property
    def choices(self):
        return {
            'anime': self._animeChoices,
            'song': self._songChoices
        }

    def _generate_misc_db(self):
        self.emojiList = self._fileHandler.emojiList
        self.botList = self._fileHandler.botList

    def _generateUserDb(self):
        self.userLists = {}
        self.userFiles = self._fileHandler.userFiles
        for file in self.userFiles:
            self.userLists[file] = self._fileHandler.getUserList(file)

    def _generateSecondaryDb(self):
        self._songChoices = []
        self._animeChoices = []
        self.songIds = []
        for song in self.songList:
            self._addSongId(song)
            self._addSongChoice(song)
            self._addAnimeChoice(song)

        self._animeChoices.sort()
        self._songChoices.sort()

    def _addAnimeChoice(self, song):
        for anime in song['anime']:
            if anime not in self._animeChoices:
                self._animeChoices.append(anime)

    def _addSongChoice(self, song):
        title = song['title']
        if title not in self._songChoices:
            self._songChoices.append(title)

    def _addSongId(self, song):
        songId = song['songId']
        if songId in self.songIds:
            raise Exception('Duplicate song id: {}'.format(songId))
        else:
            self.songIds.append(songId)
