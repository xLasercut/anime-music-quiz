import * as socketio from 'socket.io'
import {AMQGameError, exceptionHandler} from '../shared/exceptions'
import {PlayerGuess, RawPlayerObj, SettingsObj, SongObj} from '../shared/interfaces'
import {
    chatService,
    emojiService,
    gameStateService,
    gameTimer,
    logger,
    playerService,
    settingsService,
    songService,
    userService
} from '../services/init'
import {emitter} from '../shared/server'
import {GAME_ROOM} from '../shared/config'

class GameHandler {
    start(socket: socketio.Socket): void {
        startPlayerHandler(socket)
        startSettingsHandler(socket)

        socket.on('disconnect', exceptionHandler(socket, () => {
            try {
                let player = playerService.getPlayerObj(socket.id)
                playerService.removePlayer(socket.id)
                if (playerService.zeroPlayersRemain()) {
                    this._resetGame()
                    logger.writeLog('GAME001')
                }
                else {
                    emitter.updatePlayerData(playerService.getPlayerData(), GAME_ROOM)
                    let sysMsgData = chatService.generateSysMsgData(`${player['username']} has left the room`)
                    emitter.chat(sysMsgData, GAME_ROOM)
                }
            } catch (e) {
                if (e.message != 'Invalid player ID') {
                    throw new Error(e.message)
                }
            }
        }))

        socket.on('LOGIN_GAME', exceptionHandler(socket, (inputInfo: RawPlayerObj) => {
            socket.join(GAME_ROOM)
            playerService.newPlayer(socket.id, socket['admin'], inputInfo)
            emitter.updatePlayerData(playerService.getPlayerData(), GAME_ROOM)
            emitter.updateEmojiData(emojiService.getEmojiList(), socket.id)
            emitter.updateSongList(songService.getSongList(), socket.id)
            emitter.updateUsers(userService.getUsers(), socket.id)
            emitter.updateGameChoices(songService.getChoices(), socket.id)
            emitter.updateGameState(gameStateService.getGameState())
            let sysMsgData = chatService.generateSysMsgData(`${inputInfo.username} has joined the room`)
            emitter.chat(sysMsgData, GAME_ROOM)
            logger.writeLog('SERVER005', {id: socket.id, service: GAME_ROOM})
        }))

        socket.on('START_GAME', exceptionHandler(socket, () => {
            playerService.resetScore()
            emitter.updatePlayerData(playerService.getPlayerData(), GAME_ROOM)
            if (settingsService.gameMode === 'balanced') {
                this._generateGameListBalanced()
            }
            else {
                this._generateGameList()
            }
        }))

        socket.on('STOP_GAME', exceptionHandler(socket, () => {
            this._resetGame()
        }))

        socket.on('GET_PLAYER_LIST', exceptionHandler(socket, () => {
            emitter.updatePlayerData(playerService.getPlayerData(), socket.id)
        }))
    }

    _generateGameList(): void {
        let combinedSongIds = userService.getCombinedSongIds(settingsService.users)
        let combinedSongList = songService.getCombinedList(combinedSongIds, gameStateService.playedSongIds)
        gameStateService.generateGameList(combinedSongList, settingsService.getSettings())
        this._checkGameList()
    }

    _generateGameListBalanced(): void {
        let userSongIds = userService.getUserSongIds(settingsService.users)
        let userSongLists = songService.getUserLists(userSongIds, gameStateService.playedSongIds)
        gameStateService.generateGameListBalanced(userSongLists, settingsService.getSettings())
        this._checkGameList()
    }

    _checkGameList(): void {
        if (gameStateService.gameList.length > 0) {
            gameStateService.startGame(settingsService.gameMode)
            emitter.updateGameState(gameStateService.getGameState(), GAME_ROOM)
            this._newRound()
        }
        else {
            let sysMsgData = chatService.generateSysMsgData('Empty song list')
            emitter.chat(sysMsgData, GAME_ROOM)
        }
    }

    _newRound(): void {
        playerService.newRound()
        emitter.updatePlayerData(playerService.getPlayerData(), GAME_ROOM)
        if (settingsService.gameMode === 'selector') {
            this._gameFlowSelector()
        }
        else {
            this._gameFlowMain()
        }
    }

    _gameFlowMain(): void {
        gameStateService.newSong(settingsService.leastPlayed)
        emitter.gameNewSong(GAME_ROOM)
        emitter.updateGameState(gameStateService.getGameState(), GAME_ROOM)
        emitter.gameStartLoad(GAME_ROOM)
        gameTimer.startCountdown(5000, 'load')
            .then(() => {
                emitter.gameStartCountdown(GAME_ROOM)
                return gameTimer.startCountdown(settingsService.guessTime * 1000, 'guess')
            })
            .then(() => {
                emitter.gameTimeUp(GAME_ROOM)
                return gameTimer.startCountdown(5000, 'guess')
            })
            .then(() => {
                playerService.roundOver(gameStateService.currentSong)
                emitter.updatePlayerData(playerService.getPlayerData(), GAME_ROOM)
                emitter.gameShowGuess(GAME_ROOM)
                if (gameStateService.gameEnd) {
                    logger.writeLog('GAME003')
                    this._resetGame()
                    return gameTimer.newRound(false)
                }
                return gameTimer.newRound(true)
            })
            .then((newRound: boolean) => {
                if (newRound) {
                    this._newRound()
                }
            })
            .catch((error) => {
                logger.writeLog('SERVER004', {stack: error})
            })
    }

    _gameFlowSelector(): void {
        let sid = playerService.generateSelector()
        emitter.gameSelectSong(sid)
        gameTimer.startCountdownSingle(settingsService.selectTime * 1000, sid, 'select')
            .then(() => {
                emitter.gameSelectSongOver(sid)
                this._gameFlowMain()
            })
            .catch((error) => {
                logger.writeLog('SERVER004', {stack: error})
            })
    }

    _resetGame(): void {
        gameTimer.resetCountdown()
        gameTimer.resetTimeout()
        gameStateService.reset()
        emitter.updateGameState(gameStateService.getGameState(), GAME_ROOM)
        emitter.gameReset(GAME_ROOM)
    }
}

function startPlayerHandler(socket: socketio.Socket): void {
    socket.on('PLAYER_CHAT', exceptionHandler(socket, (message: string) => {
        let player = playerService.getPlayerObj(socket.id)
        let msgData = chatService.generateUserMsgData(socket.id, player, message)
        emitter.chat(msgData, GAME_ROOM)
        let botMsgData = chatService.generateBotMsgData(message)
        if (botMsgData) {
            emitter.chat(botMsgData, GAME_ROOM)
        }
    }))

    socket.on('SONG_LOADED', exceptionHandler(socket, () => {
        playerService.setReady(socket.id, true, 'load')
    }))

    socket.on('GUESS', exceptionHandler(socket, (guess: PlayerGuess) => {
        if (!playerService.isSelector(socket.id)) {
            playerService.setGuess(socket.id, guess)
        }
        playerService.setReady(socket.id, true, 'guess')
    }))

    socket.on('SONG_OVERRIDE', exceptionHandler(socket, (song: SongObj) => {
        gameStateService.overrideSong(song)
        playerService.setReady(socket.id, true, 'select')
        let anime = song.anime[0]
        logger.writeLog('GAME008', {
            title: song.title,
            artist: song.artist,
            anime: anime,
            type: song.type,
            id: socket.id
        })
        emitter.notification('success', `Song selected: ${anime} - ${song.title}`, socket.id)
    }))
}

function startSettingsHandler(socket: socketio.Socket): void {
    socket.on('UPDATE_GAME_SETTINGS', exceptionHandler(socket, (settings: SettingsObj) => {
        if (gameStateService.playing) {
            throw new AMQGameError('Cannot update settings while game is playing')
        }
        settingsService.updateSettings(settings)
        emitter.updateGameSettings(settingsService.getSettings(), GAME_ROOM)
        let sysMsgData = chatService.generateSysMsgData('Game settings updated')
        emitter.chat(sysMsgData, GAME_ROOM)
    }))

    socket.on('GET_GAME_SETTINGS', exceptionHandler(socket, () => {
        logger.writeLog('SETTING001', {id: socket.id})
        emitter.updateGameSettings(settingsService.getSettings(), socket.id)
    }))
}

export {GameHandler}
