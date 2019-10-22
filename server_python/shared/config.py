import os

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))

LOGBASE_PATH = os.path.join(CURRENT_DIR, 'logging/logbase.cfg')
LOG_PATH = os.path.join(CURRENT_DIR, '../log/amq.log')

if os.environ.get('RUNTIME_ENV') == 'test':
    DATA_DIR = os.path.join(CURRENT_DIR, '../database/test_data')
else:
    DATA_DIR = os.path.join(CURRENT_DIR, '../database/data')

USER_DATA_DIR = os.path.join(DATA_DIR, 'user')
SONG_LIST_PATH = os.path.join(DATA_DIR, 'song-list.json')
EMOJI_LIST_PATH = os.path.join(DATA_DIR, 'emoji.json')
BOT_LIST_PATH = os.path.join(DATA_DIR, 'chat-bot.json')
