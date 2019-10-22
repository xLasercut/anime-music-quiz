import os
import re
import json

from shared.config import USER_DATA_DIR, SONG_LIST_PATH, BOT_LIST_PATH, EMOJI_LIST_PATH

class FileHandler(object):

    @property
    def songList(self):
        data = self._readFile(SONG_LIST_PATH)
        data.sort(key=lambda x: (x.get('anime', [''])[0].lower(), x.get('title').lower()))
        return data

    @songList.setter
    def songList(self, data):
        self._writeFile(SONG_LIST_PATH, data)

    @property
    def userFiles(self):
        userFiles = []
        for filename in os.listdir(USER_DATA_DIR):
            if filename.endswith('.json'):
                userFiles.append(filename.replace('.json', ''))
        return userFiles

    def getUserList(self, user):
        filepath = os.path.join(USER_DATA_DIR, f'{user}.json')
        return self._readFile(filepath)

    def writeUserList(self, user, data):
        filepath = os.path.join(USER_DATA_DIR, f'{user}.json')
        self._writeFile(filepath, data)

    @property
    def emojiList(self):
        return self._readFile(EMOJI_LIST_PATH)

    @emojiList.setter
    def emojiList(self, data):
        self._writeFile(EMOJI_LIST_PATH, data)

    @property
    def botList(self):
        return self._readFile(BOT_LIST_PATH)

    @botList.setter
    def botList(self):
        self._writeFile(BOT_LIST_PATH, data)

    @staticmethod
    def _readFile(filepath):
        with open(filepath, 'r') as f:
            return json.loads(f.read())

    @staticmethod
    def _writeFile(filepath, data):
        with open(filepath, 'w') as f:
            f.write(json.dumps(data, indent=2))
