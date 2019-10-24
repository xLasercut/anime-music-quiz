import uuid
import os
import random
from database.services import FileHandler
from database.misc import EmojiData, ChatBotData
from database.anime import SongData
from database.user import UserData
from shared.logging import Logger
from shared.exceptions import AMQDbError

class AMQDatabase(object):

    def __init__(self):
        self._logger = Logger('AMQ Database')
        self._emojiData = None
        self._songData = None
        self._botData = None
        self.users = []
        self._userData = {}
        self._fileHandler = FileHandler()
        self.loadDb()

    def loadDb(self):
        self._songData = SongData(self._logger)
        self._emojiData = EmojiData(self._logger)
        self._botData = ChatBotData(self._logger)
        self._generateUserDb()

    def addUserSong(self, user, songId):
        self._songData.validateSongId(user, songId)
        self._userData[user].validateAddSongId(songId)
        self._userData[user].addSong(songId)
        self._logger.writeLog('DATA003', { 'songId': songId,
                                           'user': user,
                                           'changeType': 'add song' })

    def removeUserSong(self, user, songId):
        self._userData[user].validateRemoveSongId(songId)
        self._userData[user].removeSong(songId)
        self._logger.writeLog('DATA003', { 'songId': songId,
                                           'file': user,
                                           'changeType': 'remove song' })

    def addEmoji(self, emoji):
        self._emojiData.addEmoji(emoji)

    def removeEmoji(self, emoji):
        self._emojiData.removeEmoji(emoji)

    @property
    def choices(self):
        return self._songData.choices

    @property
    def songList(self):
        return self._songData.db

    @property
    def userFiles(self):
        return self.users

    def getUserList(self, user):
        return self._userData[user].db

    def getCombinedUserList(self, users):
        combinedSongIds = self._getCombinedSongIds(users)
        combinedList = []
        for song in self.songList:
            if song.get('songId', '') in combinedSongIds:
                combinedList.append(song)
        random.shuffle(combinedList)
        return combinedList

    @property
    def emojiList(self):
        return self._emojiData.db

    def _getCombinedSongIds(self, users):
        combinedSongIds = []
        for user in users:
            for songId in self.getUserList(user):
                if songId not in combinedSongIds:
                    combinedSongIds.append(songId)
        return combinedSongIds

    def _generateUserDb(self):
        self._userData = {}
        self.users = self._fileHandler.getUsers()
        for user in self.users:
            userFilePath = self._fileHandler.getUserFilePath(user)
            self._userData[user] = UserData(user, userFilePath, self._logger)



