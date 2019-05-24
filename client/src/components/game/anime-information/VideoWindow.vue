<template>
  <video id="video" @loadeddata="socket.emit('SONG_LOADED')" v-show="show">
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
        var video = document.getElementById('video')
        video.volume = val / 100
      }
    },
    data() {
      return {
        show: false,
        socket: this.$store.state.socket
      }
    },
    mounted() {
      var video = document.getElementById('video')

      if (this.socket) {
        this.socket.on('NEW_SONG', (anime) => {
          this.show = false
          this.$store.commit('UPDATE_ANIME', anime)
          video.load()
        })

        this.socket.on('START_COUNTDOWN', (_time) => {
          video.play()
        })

        this.socket.on('TIME_UP', () => {
          this.show = true
        })

        this.socket.on('RESET', () => {
          video.pause()
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