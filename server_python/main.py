import os
import eventlet
from amq_server import app

if __name__ == '__main__':
    SERVER_PORT = os.environ.get('SERVER_PORT', 3001)
    eventlet.wsgi.server(eventlet.listen(('', SERVER_PORT)), app)
