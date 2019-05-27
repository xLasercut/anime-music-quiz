<template>
  <video ref="player" @loadeddata="confirmLoad()" v-show="show">
    <source :src="$store.state.game.anime.src" v-if="$store.state.game.anime.src">
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
        socket: this.$store.state.game.socket
      }
    },
    methods: {
      confirmLoad() {
        if (this.socket) {
          this.socket.emit('SONG_LOADED')
        }
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('NEW_SONG', (anime) => {
          this.show = false
          this.$store.commit('game/UPDATE_ANIME', anime)
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