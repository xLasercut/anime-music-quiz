import {AMQLogger} from '../logging/logging'
import {GameSongList, GameStateObj, SettingsObj, SongObj, UserSongLists} from '../../shared/interfaces'
import {GameMode} from '../../shared/types'

class GameStateService {
    private _logger: AMQLogger

    playing = false
    maxSongCount = 0
    currentSongCount = 0
    startPosition = 0
    gameList: Array<SongObj> = []
    songOverride: SongObj
    currentSong: SongObj = {
        anime: [''],
        title: '',
        artist: '',
        src: '',
        type: '',
        songId: ''
    }

    playedSongIds: Set<string> = new Set()

    constructor(logger: AMQLogger) {
        this._logger = logger
    }

    generateGameListBalanced(userSongLists: UserSongLists, gameSettings: SettingsObj): void {
        this.gameList = []
        let dupes: Set<string> = new Set()
        let dupeSongIds: Set<string> = new Set()
        let songCount = gameSettings.songCount
        let duplicate = gameSettings.duplicate
        let leastPlayed = gameSettings.leastPlayed
        let playerCount = Object.keys(userSongLists).length
        let songCountPerPlayer = Math.floor(songCount / playerCount)
        let priorityCount = 0

        for (let user in userSongLists) {
            let normalList = userSongLists[user].normal
            let priorityList = userSongLists[user].priority
            priorityCount += priorityList.length
            let userGameList: Array<SongObj> = []

            if (leastPlayed) {
                this._addToGameListBalanced(userGameList, priorityList, songCountPerPlayer, dupes, dupeSongIds, duplicate)
                this._addToGameListBalanced(userGameList, normalList, songCountPerPlayer, dupes, dupeSongIds, duplicate)
            }
            else {
                let combinedList = normalList.concat(priorityList)
                this._addToGameListBalanced(userGameList, combinedList, songCountPerPlayer, dupes, dupeSongIds, duplicate)
            }
            this.gameList = this.gameList.concat(userGameList)
        }

        if (leastPlayed && priorityCount <= songCount) {
            this.playedSongIds = new Set()
        }
    }

    generateGameList(combinedSongList: GameSongList, gameSettings: SettingsObj): void {
        this.gameList = []
        let dupes: Set<string> = new Set()
        let songCount = gameSettings.songCount
        let duplicate = gameSettings.duplicate
        let leastPlayed = gameSettings.leastPlayed
        let normalList = combinedSongList.normal
        let priorityList = combinedSongList.priority


        if (leastPlayed) {
            if (priorityList.length <= songCount) {
                this.playedSongIds = new Set()
            }
            this._addToGameList(this.gameList, priorityList, songCount, dupes, duplicate)
            this._addToGameList(this.gameList, normalList, songCount, dupes, duplicate)
        }
        else {
            let combinedList = normalList.concat(priorityList)
            this._addToGameList(this.gameList, combinedList, songCount, dupes, duplicate)
        }
    }

    startGame(gameMode: GameMode): void {
        this.playing = true
        this.maxSongCount = this.gameList.length
        this._logger.writeLog('GAME002', {songCount: this.maxSongCount, gameMode: gameMode})
    }

    newSong(leastPlayed: boolean): void {
        this._selectSong()
        this.currentSongCount += 1
        this.startPosition = Math.random()
        if (leastPlayed) {
            this.playedSongIds.add(this.currentSong.songId)
        }
        this._logger.writeLog('GAME005', {
            number: this.currentSongCount,
            title: this.currentSong.title,
            anime: this.currentSong.anime[0],
            type: this.currentSong.type,
            artist: this.currentSong.artist
        })
    }

    overrideSong(song: SongObj): void {
        this.songOverride = song
    }

    getGameState(): GameStateObj {
        return {
            currentSongCount: this.currentSongCount,
            maxSongCount: this.maxSongCount,
            currentSong: this.currentSong,
            startPosition: this.startPosition,
            playing: this.playing
        }
    }

    reset(): void {
        this.songOverride = null
        this.currentSongCount = 0
        this.maxSongCount = 0
        this.playing = false
        this.startPosition = 0
    }

    get gameEnd(): boolean {
        if (this.currentSongCount >= this.maxSongCount) {
            return true
        }
        return false
    }

    _addToGameListBalanced(gameList: Array<SongObj>, sourceList: Array<SongObj>, songCount: number, dupes: Set<string>, dupeSongIds: Set<string>, duplicate: boolean): void {
        while (sourceList.length > 0 && gameList.length < songCount) {
            let i = this._getRandomIndex(sourceList)
            let anime = sourceList[i].anime[0]
            let songId = sourceList[i].songId
            if ((!dupes.has(anime) || duplicate) && !dupeSongIds.has(songId)) {
                gameList.push(sourceList[i])
                dupes.add(anime)
                dupeSongIds.add(songId)
            }
            sourceList.splice(i, 1)
        }
    }

    _addToGameList(gameList: Array<SongObj>, sourceList: Array<SongObj>, songCount: number, dupes: Set<string>, duplicate: boolean): void {
        while (sourceList.length > 0 && gameList.length < songCount) {
            let i = this._getRandomIndex(sourceList)
            let anime = sourceList[i].anime[0]
            if (!dupes.has(anime) || duplicate) {
                gameList.push(sourceList[i])
                dupes.add(anime)
            }
            sourceList.splice(i, 1)
        }
    }

    _selectSong(): void {
        let i = this._getRandomIndex(this.gameList)
        this.currentSong = this.gameList[i]
        this.gameList.splice(i, 1)
        if (this.songOverride) {
            this.currentSong = this.songOverride
            this.songOverride = null
        }
    }

    _getRandomIndex(list: Array<any>): number {
        return Math.floor(Math.random() * list.length)
    }
}

export {GameStateService}
