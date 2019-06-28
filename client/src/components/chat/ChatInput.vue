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

        <v-list>
          <v-list-tile v-for="item in emojis" :key="item.command" @click="addEmoji(item.command)">
            <v-list-tile-avatar tile>
              <v-img :src="item.src" v-if="item.type == 'img'"/>
              <span v-if="item.type == 'dec'">{{item.src}}</span>
            </v-list-tile-avatar>
            <v-list-tile-content>
              {{command(item.command)}}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  emoji = new RegExp(':(?:[^:]+)$', 'ig')

  export default
    data: () ->
      message: ''
      show: false
      emojis: []
    watch:
      message: (val) ->
        match = this.match(val)
        if match
          this.show = false
          this.emojis = this.$store.state.misc.emojiList.filter( (emoji) =>
            if emoji and ":#{emoji.command.toLowerCase()}:".includes(match.toLowerCase())
              return emoji
          )
          if this.emojis.length > 0
            if this.emojis.length < 6
              range = 5 - this.emojis.length
              for i in [0..range]
                this.emojis.push({})
            this.show=true
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