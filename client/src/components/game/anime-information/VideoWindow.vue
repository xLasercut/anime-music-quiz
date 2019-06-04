<template>
  <video ref="player" @loadeddata="confirmLoad()" v-show="show">
    <source :src="$store.state.game.currentSong.src" v-if="$store.state.game.currentSong.src">
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
        socket: this.$store.state.game.socket,
        start: 0
      }
    },
    methods: {
      confirmLoad() {
        this.$refs.player.currentTime = this.getStartPosition()
        if (this.socket) {
          this.socket.emit('SONG_LOADED')
        }
      },
      getStartPosition() {
        var position = 0
        var maxStart = Math.floor(this.$refs.player.duration - this.$store.state.game.settings.guessTime)
        if (maxStart > 0) {
          position = Math.floor(this.start * maxStart)
        }
        return position
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (song, position) => {
          this.show = false
          this.$store.commit('game/SYNC_CURRENT_SONG', song)
          this.start = position
          this.$refs.player.load()
        })

        this.socket.on('START_COUNTDOWN', () => {
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
    max-width: 100%;
    max-height: 100%;
  }
</style>