import { Module } from 'vuex'
import { MiscState, RootState, EmojiObj } from '../assets/interfaces'

let misc: Module<MiscState, RootState> = {
  state: {
    emojiList: []
  },
  mutations: {
    DISCONNECT(state: MiscState): void {
      state.emojiList = []
    },
    SOCKET_UPDATE_EMOJI_DATA(state: MiscState, emojiList: Array<EmojiObj>): void {
      state.emojiList = emojiList
    }
  }
}

export default misc