import os
import logging
import configparser
import pystache

from logging.handlers import RotatingFileHandler
from shared.config import LOGBASE_PATH, LOG_PATH

class Logger(object):

    def __init__(self, name):
        self.logger = None
        self.config = {}
        self._initialiseLogger(name)
        self._initialiseConfig()

    def writeLog(self, logReference, variables={}):
        if logReference in self.config:
            level = self.config[logReference].get('Level')
            template = self.config[logReference].get('Text')
            if not template:
                self.writeLog('LOG003', { 'logReference': logReference,                            'text': template })
            else:
                msg = pystache.render(template, variables)
                logMsg = f'{logReference} | {msg}'
                if level == 'INFO':
                    self.logger.info(logMsg)
                elif level == 'WARN':
                    self.logger.warning(logMsg)
                elif level == 'ERROR':
                    self.logger.error(logMsg)
                elif level == 'DEBUG':
                    self.logger.debug(logMsg)
                elif level == 'EXCEPT':
                    self.logger.exception(logMsg)
                else:
                    self.writeLog('LOG002', { 'logReference': logReference,
                    'level': level })
        else:
            self.writeLog('LOG001', { 'logReference': logReference })

    def _initialiseLogger(self, name):
        self.logger = logging.getLogger(name)
        logFormat = '%(asctime)s | {appName} | %(levelname)s | %(message)s'.format(appName=name)

        formatter = logging.Formatter(logFormat)

        fileHandler = RotatingFileHandler(LOG_PATH, maxBytes=5242880, backupCount=5)
        fileHandler.setFormatter(formatter)
        self.logger.addHandler(fileHandler)

        consoleHandler = logging.StreamHandler()
        consoleHandler.setFormatter(formatter)
        self.logger.addHandler(consoleHandler)

        self.logger.setLevel(logging.INFO)

    def _initialiseConfig(self):
        self.config = configparser.ConfigParser()
        self.config.read(LOGBASE_PATH)
