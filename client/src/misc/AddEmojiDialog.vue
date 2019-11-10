<template>
  <dialog-btn
    label="Add Emoji"
    icon="mdi-plus"
    color="success"
    v-model="show"
    width="800"
    id="add-emoji-btn"
  >
    <v-row justify="space-between" no-gutters>
      <v-col cols="auto">Add Emoji</v-col>
      <v-col cols="auto">
        <dialog-close-btn id="add-emoji-cancel" @click="show = false"></dialog-close-btn>
      </v-col>
    </v-row>
    <v-form ref="emojiForm">
      <v-row justify="center">
        <v-col cols="10">
          <v-text-field
            label="Command"
            v-model.trim="form.command"
            clearable
            id="add-emoji-command"
            counter="20"
            :rules="rulesCommand"
            filled
          ></v-text-field>
        </v-col>
        <v-col cols="10">
          <v-text-field
            label="Source"
            v-model.trim="form.src"
            clearable
            id="add-emoji-source"
            :rules="rulesSrc"
            filled
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
        <icon-btn
          color="success"
          icon="mdi-check"
          @click="addEmoji()"
          id="add-emoji-confirm"
        >Confirm</icon-btn>
      </v-col>
    </v-row>
  </dialog-btn>
</template>

<script lang="ts">
import DialogBtn from '../components/buttons/DialogBtn.vue'
import DialogCloseBtn from '../components/buttons/DialogCloseBtn.vue'
import EmojiPreview from './EmojiPreview.vue'
import IconBtn from '../components/buttons/IconBtn.vue'
import { EmojiType } from '../assets/types'
import { EmojiObj } from '../assets/interfaces'
import { IMAGE_FORMAT, EMOJI_COMMAND_FORMAT } from '../assets/config'
import {
  createComponent,
  reactive,
  ref,
  computed,
  toRefs
} from '@vue/composition-api'

export default createComponent({
  components: {
    DialogBtn,
    DialogCloseBtn,
    EmojiPreview,
    IconBtn
  },
  setup(_props, context) {
    const state = reactive({
      show: false,
      form: {
        command: '',
        src: ''
      },
      rulesCommand: [
        (v: string): boolean | string =>
          _isNotDuplicate(v) || 'Duplicate command',
        (v: string): boolean | string =>
          EMOJI_COMMAND_FORMAT.test(v) || 'Command only accepts: a-z, A-Z, 0-9',
        (v: string): boolean | string =>
          v.length <= 20 || 'Command must be between 1-20 characters'
      ],
      rulesSrc: [
        (v: string): boolean | string => !!v || 'Source cannot be empty'
      ]
    })

    const emojiForm: any = ref(null)

    function addEmoji(): void {
      let valid = emojiForm.value.validate()
      if (valid) {
        context.root.$socket.client.emit('ADD_EMOJI', {})
        state.form = {
          command: '',
          src: ''
        }
        state.show = false
      }
    }

    function _isNotDuplicate(command: string): boolean {
      for (let emoji of context.root.$store.state.misc.emojiList) {
        if (command.toLowerCase() === emoji.command.toLowerCase()) {
          return false
        }
      }
      return true
    }

    const emojiToAdd = computed(
      (): EmojiObj => {
        let type: EmojiType = 'dec'
        if (state.form.src && IMAGE_FORMAT.test(state.form.src)) {
          type = 'img'
        }

        return {
          command: state.form.command,
          src: state.form.src,
          type: type
        }
      }
    )

    return { ...toRefs(state), emojiForm, addEmoji, emojiToAdd }
  }
})
</script>