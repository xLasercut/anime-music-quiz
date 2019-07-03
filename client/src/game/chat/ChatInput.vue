<template>
  <v-layout justify-center>
    <v-flex shrink class="input-container">
      <v-menu v-model="show" top offset-y max-height="304px">
        <template #activator="{ on }">
          <v-textarea
            no-resize solo flat clearable
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
    </v-flex>
  </v-layout>
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
    watch:
      message: (val) ->
        match = this.match(val)
        if match
          this.choices = this.$store.state.misc.emojiList.filter( (emoji) =>
            if emoji and ":#{emoji.command.toLowerCase()}:".includes(match.toLowerCase())
              return emoji
          )
          if this.choices.length > 0
            this.show=true
          else
            this.show = false
        else
          this.show = false
      choices: (val) ->
        length = val.length
        if length < 6
          range = 5 - length
          for i in [0..range]
            val.push({})
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