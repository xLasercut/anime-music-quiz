<template>
  <dialog-btn label="Add Emoji" icon="mdi-plus" color="success" v-model="show" width="800" id="add-emoji-btn">
    <v-row justify="space-between" no-gutters>
      <v-col cols="auto">
        Add Emoji
      </v-col>
      <v-col cols="auto">
        <dialog-close-btn id="add-emoji-cancel" @click="show = false"></dialog-close-btn>
      </v-col>
    </v-row>
    <v-form ref="form">
      <v-row justify="center">
        <v-col cols="10">
          <v-text-field
            label="Command" v-model.trim="form.command"
            clearable id="add-emoji-command" counter="20"
            :rules="rulesCommand" filled
          ></v-text-field>
        </v-col>
        <v-col cols="10">
          <v-text-field
            label="Source" v-model.trim="form.src"
            clearable id="add-emoji-source"
            :rules="rulesSrc" filled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row justify="center">
      <v-col cols="auto">
        <emoji-preview :emoji="emojiToAdd"></emoji-preview>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <icon-btn color="success" icon="mdi-check" @click="addEmoji()">Confirm</icon-btn>
      </v-col>
    </v-row>
  </dialog-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DialogBtn from '../components/buttons/DialogBtn.vue'
import DialogCloseBtn from '../components/buttons/DialogCloseBtn.vue'
import EmojiPreview from './EmojiPreview.vue'
import IconBtn from '../components/buttons/IconBtn.vue'
import { EmojiType } from '../assets/types'
import { EmojiObj } from '../assets/interfaces'
import { IMAGE_FORMAT, EMOJI_COMMAND_FORMAT } from '../assets/config'

@Component({
  components: { DialogBtn, DialogCloseBtn, EmojiPreview, IconBtn }
})
export default class AddEmojiDialog extends Vue {
  show = false

  form = {
    command: '',
    src: ''
  }

  rulesCommand = [
    (v: string): boolean | string => this._isNotDuplicate(v) || 'Duplicate command',
    (v: string): boolean | string => EMOJI_COMMAND_FORMAT.test(v) || 'Command only accepts: a-z, A-Z, 0-9',
    (v: string): boolean | string => v.length <= 20 || 'Command must be between 1-20 characters'
  ]

  rulesSrc = [
    (v: string): boolean | string => !!v || 'Source cannot be empty'
  ]

  addEmoji(): void {
    // @ts-ignore
    let valid = this.$refs.form.validate()
    if (valid) {
      this.$socket.client.emit('ADD_EMOJI', this.emojiToAdd)
      this.form = {
        command: '',
        src: ''
      }
      this.show = false
    }
  }

  get emojiType(): EmojiType {
    if (this.form.src && IMAGE_FORMAT.test(this.form.src)) {
      return 'img'
    }
    return 'dec'
  }

  get emojiToAdd(): EmojiObj {
    return {
      command: this.form.command,
      src: this.form.src,
      type: this.emojiType
    }
  }

  _isNotDuplicate(command: string): boolean {
    for (let emoji of this.$store.state.misc.emojiList) {
      if (command.toLowerCase() === emoji.command.toLowerCase()) {
        return false
      }
    }
    return true
  }
}
</script>