import os

from shared.config import USER_DATA_DIR

class FileHandler(object):

    def getUsers(self):
        users = []
        for filename in os.listdir(USER_DATA_DIR):
            if filename.endswith('.json'):
                users.append(filename.replace('.json', ''))
        return users

    def getUserFilePath(self, user):
        return os.path.join(USER_DATA_DIR, f'{user}.json')
