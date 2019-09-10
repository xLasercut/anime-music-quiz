<template>
  <v-container fluid class="emoji-container">
    <emoji-data :data="$store.state.emoji.emojiList"></emoji-data>
  </v-container>
</template>

<script lang="coffee">
  import EmojiData from '../misc/EmojiData.vue'

  export default
    components: { EmojiData }
    sockets:
      disconnect: () ->
        this.$router.push('/')
    mounted: () ->
      if !this.$socket.connected
        this.$router.push('/')
</script>

<style scoped>
  .emoji-container {
    height: calc(100vh - 65px);
    overflow: auto;
  }
</style>