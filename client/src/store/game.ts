import {Module} from 'vuex'
import {GameChoices, GameStateObj, GameStoreState, PlayersObj, RootStoreState, SettingsObj} from '../assets/interfaces'

let game: Module<GameStoreState, RootStoreState> = {
    state: {
        sid: '',
        choices: {
            anime: [],
            title: []
        },
        settings: {
            songCount: 20,
            guessTime: 30,
            users: [],
            gameMode: 'normal',
            duplicate: false,
            selectTime: 20,
            leastPlayed: false
        },
        players: {},
        gameState: {
            currentSong: {
                anime: [''],
                title: '',
                src: '',
                artist: '',
                type: '',
                songId: ''
            },
            playing: false,
            startPosition: 0,
            currentSongCount: 0,
            maxSongCount: 0
        },
        host: false,
        volume: 50
    },
    mutations: {
        DISCONNECT(state: GameStoreState): void {
            state.sid = ''
            state.choices = {
                anime: [],
                title: []
            }
            state.settings = {
                songCount: 20,
                guessTime: 30,
                users: [],
                gameMode: 'normal',
                duplicate: false,
                selectTime: 20,
                leastPlayed: false
            }
            state.gameState = {
                currentSong: {
                    anime: [''],
                    title: '',
                    src: '',
                    artist: '',
                    type: '',
                    songId: ''
                },
                playing: false,
                startPosition: 0,
                currentSongCount: 0,
                maxSongCount: 0
            }
            state.host = false
            state.players = {}
            state.volume = 50
        },
        UPDATE_SID(state: GameStoreState, sid: string): void {
            state.sid = sid
        },
        UPDATE_VOLUME(state: GameStoreState, volume: number): void {
            state.volume = volume
        },
        SOCKET_UPDATE_PLAYER_DATA(state: GameStoreState, playerData: PlayersObj): void {
            if (Object.keys(playerData).length > 0) {
                state.players = playerData
                state.host = playerData[state.sid].host
            }
        },
        SOCKET_UPDATE_GAME_CHOICES(state: GameStoreState, choices: GameChoices): void {
            state.choices = choices
        },
        SOCKET_UPDATE_GAME_SETTINGS(state: GameStoreState, settings: SettingsObj): void {
            state.settings = settings
        },
        SOCKET_UPDATE_GAME_STATE(state: GameStoreState, gameState: GameStateObj): void {
            state.gameState = gameState
        }
    }
}


export default game