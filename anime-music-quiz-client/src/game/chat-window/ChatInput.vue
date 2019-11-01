<template>
  <v-row justify="center">
    <v-col>
      <v-menu v-model="show" top offset-y max-height="304px" :transition="false">
        <template #activator="{ on }">
          <v-textarea
            no-resize solo flat clearable hide-details
            v-model.trim="message"
            label="Message" append-icon="mdi-send"
            rows="3" id="chat-input" ref="input"
            @click:append="sendMsg()"
            @keydown.enter.exact.prevent="sendMsg()"
          ></v-textarea>
        </template>
        <v-list>
          <v-list-item v-for="item in choices" :key="item.command" @click="addEmoji(item.command)">
            <v-list-item-avatar tile>
              <v-img :src="item.src" v-if="item.type === 'img'"/>
              <span v-else>{{item.src}}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              {{command(item.command)}}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { EmojiObj } from '../../assets/interfaces'
import { EMOJI_FORMAT } from '../../assets/config'

@Component({})
export default class ChatInput extends Vue {
  $refs!: {
    input: HTMLInputElement
  }

  message = ''
  choices: Array<EmojiObj> = []
  show = false
  choicesOldLength = 0

  @Watch('message')
  _onMsgChange(val: string): void {
    let match = this._matchCommand(val)
    if (match) {
      this.choices = this.$store.state.misc.emojiList.filter((emoji: EmojiObj): EmojiObj | undefined => {
        if (`:${emoji.command.toLowerCase()}:`.includes(match.toLowerCase())) {
          return emoji
        }
      })
      let currentLength = this.choices.length
      if (currentLength > 0) {
        if (currentLength != this.choicesOldLength) {
          this.choicesOldLength = currentLength
          this.show = false
        }
        setTimeout(() => {
          this.show = true
        }, 1)
      }
      else {
        this.show = false
      }
    }
    else {
      this.show = false
    }
  }

  _matchCommand(val: string): string {
    let match = val.match(EMOJI_FORMAT)
    if (match) {
      return match[0]
    }
    return ''
  }

  sendMsg(): void {
    this.$socket.client.emit('PLAYER_CHAT', this.message)
    this.message = ''
  }

  command(val: string): string {
    if (val) {
      return `:${val}:`
    }
    return ''
  }

  addEmoji(command: string): void {
    this.message = this.message.replace(EMOJI_FORMAT, `:${command}:`)
    this.$refs.input.focus()
  }
}
</script>