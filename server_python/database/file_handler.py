import os
import re
import json
import operator

class FileHandler(object):

    CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))

    def __init__(self):
        if os.environ.get('NODE_ENV', '') == 'test':
            self._base_dir = os.path.join(self.CURRENT_DIR, 'test_data')
        else:
            self._base_dir = os.path.join(self.CURRENT_DIR, 'data')

        self._user_dir = os.path.join(self._base_dir, 'user')
        self._song_list_path = os.path.join(self._base_dir, 'song-list.json')
        self._emoji_list_path = os.path.join(self._base_dir, 'emoji.json')
        self._bot_list_path = os.path.join(self._base_dir, 'chat-bot.json')

    @property
    def song_list(self):
        data = self._read_file(self._song_list_path)
        data.sort(key=lambda x: (x['anime'][0].lower(), x['title'].lower()))
        return data

    @song_list.setter
    def song_list(self, data):
        self._write_file(self._song_list_path, data)

    @property
    def user_files(self):
        user_files = []
        for file in os.listdir(self._user_dir):
            if file.endswith('.json'):
                user_files.append(file.replace('.json', ''))
        return user_files

    def get_user_list(self, file):
        filepath = os.path.join(self.user_dir, '{}.json'.format(file))
        return self._read_file(filepath)

    @property
    def emoji_list(self):
        return self._read_file(self._emoji_list_path)

    @staticmethod
    def _read_file(filepath):
        with open(filepath, 'r') as f:
            return json.loads(f.read())

    @staticmethod
    def _write_file(filepath, data):
        with open(filepath, 'w') as f:
            f.write(json.dumps(data, indent=2))
