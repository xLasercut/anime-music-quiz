from database.abstract import AbstractDataObject
from shared.exceptions import AMQDbError

class UserData(AbstractDataObject):

    def __init__(self, name, filepath, logger):
        super().__init__(filepath, logger)
        self._name = name

    def addSong(self, songId):
        self.db.append(songId)
        self._writeFile()

    def removeSong(self, songId):
        self.db.remove(songId)
        self._writeFile()

    def validateAddSongId(self, songId):
        if songId in self.db:
            self._logger.writeLog('DATA001', { 'user': self._name,
                                               'songId': songId,
                                               'reason': 'song already added to user list' })
            raise AMQDbError('Song already added to user list')

    def validateRemoveSongId(self, songId):
        if songId not in self.db:
            self._logger.writeLog('DATA001', { 'user': self._name,
                                               'songId': songId,
                                               'reason': 'song not in user list' })
            raise AMQDbError('Song not in user list')