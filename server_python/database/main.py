import uuid
import os
from database.services import FileHandler
from database.misc import EmojiData, ChatBotData
from database.anime import SongData
from database.user import UserData
from shared.logging import Logger
from shared.exceptions import AMQDbError

class AMQDatabase(object):

    def __init__(self):
        self._logger = Logger('AMQ Database')
        self.emojiData = None
        self.songData = None
        self.botData = None
        self.users = []
        self.userData = {}
        self._fileHandler = FileHandler()
        self.loadDb()

    def loadDb(self):
        self.songData = SongData(self._logger)
        self.emojiData = EmojiData(self._logger)
        self.botData = ChatBotData(self._logger)
        self._generateUserDb()

    def addUserSong(self, user, songId):
        self.songData.validateSongId(user, songId)
        self.userData[user].validateAddSongId(songId)
        self.userData[user].addSong(songId)
        self._logger.writeLog('DATA003', { 'songId': songId,
                                           'user': user,
                                           'changeType': 'add song' })

    def removeUserSong(self, user, songId):
        self.userData[user].validateRemoveSongId(songId)
        self.userData[user].removeSong(songId)
        self._logger.writeLog('DATA003', { 'songId': songId,
                                           'file': user,
                                           'changeType': 'remove song' })

    def addEmoji(self, emoji):
        self.emojiData.addEmoji(emoji)

    def removeEmoji(self, emoji):
        self.emojiData.removeEmoji(emoji)

    @property
    def choices(self):
        return self.songData.choices

    @property
    def songList(self):
        return self.songData.db

    @property
    def userFiles(self):
        return self.users

    def getUserList(self, user):
        return self.userData[user].db

    @property
    def emojiList(self):
        return self.emojiData.db

    def _generateUserDb(self):
        self.userData = {}
        self.users = self._fileHandler.getUsers()
        for user in self.users:
            userFilePath = self._fileHandler.getUserFilePath(user)
            self.userData[user] = UserData(user, userFilePath, self._logger)



