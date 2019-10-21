from database.file_handler import FileHandler

class AMQDatabase(object):

    def __init__(self):
        self.song_list = []
        self.song_ids = []
        self.choices = {
            'song': [],
            'anime': []
        }
        self.user_files = []
        self.user_lists = {}
        self.emoji_list = []
        self.bot_list = []
        self.file_handler = FileHandler()
        self.load_db()


    def load_db(self):
        self.song_list = self.file_handler.song_list
        self._generate_secondary_db()
        self._generate_user_db()

    def _generate_misc_db(self):
        self.emoji_list = self.file_handler.get_emoji_list()

    def _generate_user_db(self):
        self.user_lists = {}
        self.user_files = self.file_handler.user_files
        for file in self.user_files:
            self.user_lists[file] = self.file_handler.get_user_list(file)

    def _generate_secondary_db(self):
        self.choices = {
            'anime': [],
            'song': []
        }
        self.song_ids = []
        for song in self.song_list:
            self._add_song_id(song)
            self._add_song_choice(song)
            self._add_anime_choice(song)

        self.choices['anime'].sort()
        self.choices['song'].sort()

    def _add_anime_choice(self, song):
        for anime in song['anime']:
            if anime not in self.choices['anime']:
                self.choices['anime'].append(anime)

    def _add_song_choice(self, song):
        title = song['title']
        if title not in self.choices['song']:
            self.choices['song'].append(title)

    def _add_song_id(self, song):
        song_id = song['songId']
        if song_id in self.song_ids:
            raise Exception('Duplicate song id: {}'.format(song_id))
        else:
            self.song_ids.append(song_id)
