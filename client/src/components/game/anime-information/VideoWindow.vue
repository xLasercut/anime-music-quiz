<template>
  <video ref="player" @loadeddata="socket.emit('SONG_LOADED')" v-show="show">
    <source :src="`https://openings.moe/video/${$store.state.anime.file}.mp4`" v-if="$store.state.anime.file">
    Your browser does not support video element
  </video>
</template>

<script>
  export default {
    props: {
      volume: {
        type: Number
      }
    },
    watch: {
      volume(val) {
        this.$refs.player.volume = val / 100
      }
    },
    data() {
      return {
        show: false,
        socket: this.$store.state.socket
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (anime) => {
          this.show = false
          this.$store.commit('UPDATE_ANIME', anime)
          this.$refs.player.load()
        })

        this.socket.on('START_COUNTDOWN', (_time) => {
          this.$refs.player.play()
        })

        this.socket.on('TIME_UP', () => {
          this.show = true
        })

        this.socket.on('RESET', () => {
          this.$refs.player.pause()
        })
      }
    }
  }
</script>


<style scoped>
  video {
    width: 100%;
  }
</style>