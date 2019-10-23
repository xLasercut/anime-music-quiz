from shared.config import EMOJI_LIST_PATH, BOT_LIST_PATH
from database.abstract import AbstractDataObject

class EmojiData(AbstractDataObject):

    def __init__(self, logger):
        super().__init__(EMOJI_LIST_PATH, logger)

    def addEmoji(self, emoji):
        command, src, emojiType = self._parseEmoji(emoji)
        self._validateEmojiFields(command, src, emojiType)
        self._checkDuplicateEmoji(command, src, emojiType)
        self.db.append(emoji)
        self._writeFile()
        self._logger.writeLog('DATA004', { 'command': command,
                                           'src': src,
                                           'type': emojiType,
                                           'changeType': 'add emoji' })

    def removeEmoji(self, emoji):
        command, src, emojiType = self._parseEmoji(emoji)
        for i in range(0, len(self.db)):
            if self.db[i].get('command', '').lower() == command:
                del self.db[i]
                break
        self._writeFile()
        self._logger.writeLog('DATA004', { 'command': command,
                                           'src': src,
                                           'type': emojiType,
                                           'changeType': 'remove emoji' })

    @staticmethod
    def _validateEmojiFields(command, src, emojiType):
        if not command or not src or not emojiType:
            self._logger.writeLog('DATA002', { 'command': command,
                                               'src': src,
                                               'type': emojiType,
                                               'reason': 'invalid mandatory field' })
            raise AMQDbError(f'Invalid emoji field')

    def _checkDuplicateEmoji(self, command, src, emojiType):
        for item in self.db:
            existingCommand = item.get('commmand', '').lower()
            if existingCommand == command.lower():
                self._logger.writeLog('DATA002', { 'command': command,
                                                   'src': src,
                                                   'type': emojiType,
                                                   'reason': 'duplicate command' })
                raise AMQDbError(f'Duplicate emoji command: {command}')

    @staticmethod
    def _parseEmoji(emoji):
        command = emoji.get('command', '')
        src = emoji.get('src', '')
        emojiType = emoji.get('type', '')

        return command, src, emojiType


class ChatBotData(AbstractDataObject):

    def __init__(self, logger):
        super().__init__(BOT_LIST_PATH, logger)