from database.abstract import AbstractDataObject
from shared.config import SONG_LIST_PATH
from shared.exceptions import AMQDbError

class SongData(AbstractDataObject):

    def __init__(self, logger):
        super().__init__(SONG_LIST_PATH, logger)
        self._animeChoices = []
        self._songChoices = []
        self._songIds = []
        self._initChoices()

    def _initDb(self):
        self.db = self._readFile()
        self.db.sort(key=lambda x: (x.get('anime', [''])[0].lower(), x.get('title').lower()))

    def _initChoices(self):
        self._animeChoices = []
        self._songChoices = []
        self._songIds = []

        for song in self.db:
            self._addSongId(song)
            self._addSongChoice(song)
            self._addAnimeChoice(song)

        self._animeChoices.sort()
        self._songChoices.sort()

    @property
    def choices(self):
        return {
            'anime': self._animeChoices,
            'song': self._songChoices
        }

    def validateSongId(self, user, songId):
        if songId not in self._songIds:
            self._logger.writeLog('DATA001', { 'user': user,
                                               'songId': songId,
                                               'reason': 'invalid song id' })
            raise AMQDbError('Invalid song ID')

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
        if songId in self._songIds:
            raise Exception(f'Duplicate song id: {songId}')
        else:
            self._songIds.append(songId)