import {Module} from 'vuex'
import {EmojiObj, MiscStoreState, RootStoreState} from '../assets/interfaces'

let misc: Module<MiscStoreState, RootStoreState> = {
    state: {
        emojiList: []
    },
    mutations: {
        DISCONNECT(state: MiscStoreState): void {
            state.emojiList = []
        },
        SOCKET_UPDATE_EMOJI_DATA(state: MiscStoreState, emojiList: Array<EmojiObj>): void {
            state.emojiList = emojiList
        }
    }
}

export default misc