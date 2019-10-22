import os
import eventlet
from amq import app, logger


if __name__ == '__main__':
    SERVER_PORT = os.environ.get('SERVER_PORT', 3001)
    logger.writeLog('SERVER001', { 'port': SERVER_PORT })
    eventlet.wsgi.server(eventlet.listen(('', SERVER_PORT)), app, log_output=False)
