import json

class AbstractDataObject(object):

    def __init__(self, filepath, logger):
        self._filepath = filepath
        self._logger = logger
        self.db = None
        self._initDb()

    def _initDb(self):
        self.db = self._readFile()

    def _readFile(self):
        with open(self._filepath, 'r') as f:
            return json.loads(f.read())

    def _writeFile(self):
        with open(self._filepath, 'w') as f:
            f.write(json.dumps(self.db, indent=2))
