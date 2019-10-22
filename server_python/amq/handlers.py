from shared.exceptions import AMQDbError
from amq import logger, notification

def exceptionHandler(function):
    def wrapper(*args, **kwargs):
        try:
            return function(*args, **kwargs)
        except AMQDbError as e:
            notification.sendSingle(args[0], 'error', str(e))
        except:
            logger.writeLog('SERVER004')

    return wrapper