<template>
  <v-row justify="center">
    <v-col>
      <v-menu v-model="show" top offset-y max-height="304px" :transition="false">
        <template #activator="{ on }">
          <v-textarea
            no-resize solo flat clearable hide-details
            v-model.trim="message"
            @keydown.enter.exact.prevent="sendMsg()"
            @click:append="sendMsg()"
            label="Message"
            append-icon="mdi-send"
            rows="3" id="chat-input"
            ref="input"
          ></v-textarea>
        </template>

        <chat-emoji-list
          :data="choices"
          @add-emoji="addEmoji($event)"
        ></chat-emoji-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import ChatEmojiList from './ChatEmojiList.vue'

  emoji = new RegExp(':(?:[^:]+)$', 'ig')

  export default
    components: { ChatEmojiList }
    data: () ->
      message: ''
      show: false
      choices: []
      choicesOldLength: 0
    watch:
      message: (val) ->
        match = this.match(val)
        if match
          this.choices = this.$store.state.emoji.emojiList.filter( (emoji) =>
            if emoji and ":#{emoji.command.toLowerCase()}:".includes(match.toLowerCase())
              return emoji
          )
          if this.choices.length > 0
            if this.choices.length != this.choicesOldLength
              this.choicesOldLength = this.choices.length
              this.show = false
            setTimeout () =>
              this.show = true
            , 1
          else
            this.show = false
        else
          this.show = false
    methods:
      sendMsg: () ->
        if this.message
          this.$socket.emit('USER_MESSAGE', this.message)
          this.message = ''
      addEmoji: (command) ->
        if command
          this.message = this.message.replace(emoji, ":#{command}:")
        this.$refs.input.focus()
      match: (val) ->
        match = val.match(emoji)
        if match
          return match[0]
        return null
      command: (val) ->
        if val
          return ":#{val}:"
        return ''
</script>

<style scoped>
  .input-container {
    width: 95%;
  }
</style>