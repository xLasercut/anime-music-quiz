import {AMQLogger} from '../logging/logging'
import {SONG_LIST_PATH} from '../../shared/config'
import {readFile, writeFile} from './init'
import {GameChoices, GameSongList, SongObj, UserSongIds, UserSongLists} from '../../shared/interfaces'
import {AMQSongListError} from '../../shared/exceptions'
import * as uuid from 'uuid/v4'

class SongService {
    private _data: Array<SongObj>
    private _titleChoices: Array<string>
    private _animeChoices: Array<string>
    private _songIds: Set<string>
    private _logger: AMQLogger

    private _filepath = SONG_LIST_PATH

    constructor(logger: AMQLogger) {
        this._logger = logger
        this.loadDb()
    }

    loadDb(): void {
        this._data = readFile(this._filepath).sort(this._sortSong)
        this._animeChoices = []
        this._titleChoices = []
        this._songIds = new Set()

        for (let song of this._data) {
            this._addSongId(song)
            this._addAnimeChoice(song)
            this._addTitleChoice(song)
        }

        this._animeChoices = this._animeChoices.sort()
        this._titleChoices = this._titleChoices.sort()
    }

    getSongList(): Array<SongObj> {
        return this._data
    }

    getChoices(): GameChoices {
        return {
            anime: this._animeChoices,
            title: this._titleChoices
        }
    }

    validateSongId(songId: string): void {
        if (!this._songIds.has(songId)) {
            throw new AMQSongListError('Song ID not in database')
        }
    }

    getCombinedList(combinedSongIds: Set<string>, playedSongIds: Set<string>): GameSongList {
        return this._generateGameSongList(combinedSongIds, playedSongIds)
    }

    getUserLists(userSongIds: UserSongIds, playedSongIds: Set<string>): UserSongLists {
        let userSongLists = {}
        for (let user in userSongIds) {
            userSongLists[user] = this._generateGameSongList(userSongIds[user], playedSongIds)
        }

        return userSongLists
    }

    addNewSong(song: SongObj): void {
        let songId = uuid()
        if (process.env.NODE_ENV === 'test') {
            songId = 'a22c2206-b504-4f11-a380-e787f2d8e449'
        }
        song['songId'] = songId
        this._data.push(song)
        this._songIds.add(songId)
        writeFile(SONG_LIST_PATH, this._data)
    }

    deleteSong(songId: string): void {
        this.validateSongId(songId)
        for (let i = 0; i < this._data.length; i++) {
            if (songId === this._data[i].songId) {
                this._data.splice(i, 1)
                writeFile(SONG_LIST_PATH, this._data)
                break
            }
        }
    }

    editSong(song: SongObj): void {
        this.validateSongId(song.songId)
        for (let i = 0; i < this._data.length; i++) {
            if (song.songId === this._data[i].songId) {
                this._data[i] = song
                writeFile(SONG_LIST_PATH, this._data)
                break
            }
        }
    }

    _generateGameSongList(totalSongIds: Set<string>, playedSongIds: Set<string>): GameSongList {
        let normalSongIds: Set<string> = new Set()
        let prioritySongIds: Set<string> = new Set()

        for (let songId of totalSongIds) {
            if (playedSongIds.has(songId)) {
                normalSongIds.add(songId)
            }
            else {
                prioritySongIds.add(songId)
            }
        }

        return {
            normal: this._convertIdsToSongs(normalSongIds),
            priority: this._convertIdsToSongs(prioritySongIds)
        }
    }

    _convertIdsToSongs(songIds: Set<string>): Array<SongObj> {
        let songList = []
        for (let song of this._data) {
            if (songIds.has(song.songId)) {
                songList.push(song)
            }
        }
        return songList
    }

    _addTitleChoice(song: SongObj): void {
        let title = song.title
        if (!this._titleChoices.includes(title)) {
            this._titleChoices.push(title)
        }
    }

    _addAnimeChoice(song: SongObj): void {
        for (let anime of song.anime) {
            if (!this._animeChoices.includes(anime)) {
                this._animeChoices.push(anime)
            }
        }
    }

    _addSongId(song: SongObj): void {
        let songId = song.songId
        if (this._songIds.has(songId)) {
            throw new Error(`Duplicate song id: ${songId}`)
        }
        this._songIds.add(songId)
    }

    _sortSong(a: SongObj, b: SongObj): number {
        let animeA = a.anime[0]
        let animeB = b.anime[0]
        let titleA = a.title
        let titleB = b.title

        if (animeA == animeB) {
            if (titleA > titleB) {
                return 1
            }
            else if (titleA < titleB) {
                return -1
            }
            return 0
        }
        else if (animeA > animeB) {
            return 1
        }
        return -1
    }
}

export {SongService}
