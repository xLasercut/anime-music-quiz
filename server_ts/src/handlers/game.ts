import * as socketio from 'socket.io'
import { exceptionHandler } from '../shared/exceptions'
import { RawPlayerObj, SettingsObj, PlayerGuess, SongObj } from '@shared/interfaces'
import { playerService, chatService, emojiService, songService, userService, settingsService, logger, gameStateService, gameTimer } from '../services/init'
import { emitter } from '../shared/server'

class GameHandler {
  start(socket: socketio.Socket): void {
    startPlayerHandler(socket)
    startSettingsHandler(socket)

    socket.on('disconnect', exceptionHandler(socket, () => {
      let player = playerService.getPlayerObj(socket.id)
      playerService.removePlayer(socket.id)
      emitter.updatePlayerData(playerService.getPlayerData())
      let sysMsgData = chatService.generateSysMsgData(`${player['username']} has left the room`)
      emitter.chat(sysMsgData, 'game')
    }))

    socket.on('LOGIN_GAME', exceptionHandler(socket, (inputInfo: RawPlayerObj) => {
      socket.join('game')
      playerService.newPlayer(socket.id, socket['admin'], inputInfo)
      emitter.updatePlayerData(playerService.getPlayerData(), 'game')
      emitter.updateEmojiData(emojiService.getEmojiList(), socket.id)
      emitter.updateSongList(songService.getSongList(), socket.id)
      emitter.updateUsers(userService.getUsers(), socket.id)
      emitter.updateGameChoices(songService.getChoices(), socket.id)
      emitter.updateGameState(gameStateService.getGameState())
      let sysMsgData = chatService.generateSysMsgData(`${inputInfo.username} has joined the room`)
      emitter.chat(sysMsgData, 'game')
    }))

    socket.on('START_GAME', exceptionHandler(socket, () => {
      playerService.resetScore()
      emitter.updatePlayerData(playerService.getPlayerData(), 'game')
      let combinedIds = userService.getCombinedSongIds(settingsService.users)
      let combinedList = songService.getCombinedList(combinedIds)
      gameStateService.generateGameList(combinedList, settingsService.songCount, settingsService.duplicate)
      if (gameStateService.gameList.length > 0) {
        gameStateService.startGame(settingsService.gameMode)
        emitter.updateGameState(gameStateService.getGameState(), 'game')
        this._newRound()
      }
      else {
        let sysMsgData = chatService.generateSysMsgData('Empty song list')
        emitter.chat(sysMsgData, 'game')
      }
    }))

    socket.on('STOP_GAME', exceptionHandler(socket, () => {
      this._resetGame()
    }))
  }

  _newRound(): void {
    playerService.newRound()
    emitter.updatePlayerData(playerService.getPlayerData(), 'game')
    if (settingsService.gameMode === 'selector') {
      this._gameFlowSelector()
    }
    else {
      this._gameFlowMain()
    }
  }

  _gameFlowMain(): void {
    gameStateService.newSong()
    emitter.updateGameState(gameStateService.getGameState(), 'game')
    emitter.gameNewSong('game')
    gameTimer.startCountdown(5000, 'load')
    .then(() => {
      emitter.gameStartCountdown('game')
      return gameTimer.startCountdown(settingsService.guessTime * 1000, 'guess')
    })
    .then(() => {
      emitter.gameTimeUp('game')
      return gameTimer.startCountdown(5000, 'guess')
    })
    .then(() => {
      playerService.roundOver(gameStateService.currentSong)
      emitter.updatePlayerData(playerService.getPlayerData(), 'game')
      emitter.gameShowGuess('game')
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
      logger.writeLog('SERVER004', { stack: error })
    })
  }

  _gameFlowSelector(): void {
    let sid = playerService.generateSelector()
    emitter.gameSelectSong(sid)
    gameTimer.startCountdownSingle(settingsService.selectTime * 1000, 'select', sid)
    .then(() => {
      emitter.gameSelectSongOver(sid)
      return this._gameFlowMain()
    })
    .catch((error) => {
      logger.writeLog('SERVER004', { stack: error })
    })
  }

  _resetGame(): void {
    gameTimer.resetCountdown()
    gameTimer.resetTimeout()
    gameStateService.reset()
    emitter.updateGameState(gameStateService.getGameState(), 'game')
    emitter.gameReset('game')
  }
}

function startPlayerHandler(socket: socketio.Socket): void {
  socket.on('PLAYER_CHAT', exceptionHandler(socket, (message: string) => {
    let player = playerService.getPlayerObj(socket.id)
    let msgData = chatService.generateUserMsgData(socket.id, player, message)
    emitter.chat(msgData, 'game')
    let botMsgData = chatService.generateBotMsgData(message)
    if (botMsgData) {
      emitter.chat(botMsgData, 'game')
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
    settingsService.updateSettings(settings)
    emitter.updateGameSettings(settingsService.getSettings(), 'game')
    let sysMsgData = chatService.generateSysMsgData('Game settings updated')
    emitter.chat(sysMsgData, 'game')
  }))

  socket.on('GET_GAME_SETTINGS', exceptionHandler(socket, () => {
    logger.writeLog('SETTING001', { id: socket.id })
    emitter.updateGameSettings(settingsService.getSettings(), socket.id)
  }))
}

export { GameHandler }