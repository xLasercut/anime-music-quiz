import threading

from shared.exceptions import AMQDbError
from amq import logger, clientUpdater, sio

def setTimeout(delay):
    def wrapper(function):
        def timeout(*args, **kwargs):
            timer = threading.Timer(delay, function, args=args, kwargs=kwargs)
            timer.start()
            return timer
        return timeout
    return wrapper


class IntervalThread(threading.Thread):
    def __init__(self, delay, function, *args, **kwargs):
        super().__init__()
        self._stopEvent = threading.Event()
        self._delay = delay
        self._action = function
        self._args = args
        self._kwargs = kwargs

    def run(self):
        while not self._stopEvent.is_set():
            self._stopEvent.wait(self._delay)
            self._action(*self._args, **self._kwargs)

    def stop(self):
        self._stopEvent.set()

def setInterval(delay):
    def wrapper(function):
        def interval(*args, **kwargs):
            intervalThread = IntervalThread(delay, function, *args, **kwargs)
            intervalThread.start()
            return intervalThread
        return interval
    return wrapper



def exceptionHandler(function):
    def wrapper(*args, **kwargs):
        try:
            return function(*args, **kwargs)
        except AMQDbError as e:
            clientUpdater.sendNotification('error', str(e), args[0])
        except:
            logger.writeLog('SERVER004')

    return wrapper