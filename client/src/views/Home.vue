<template>
  <el-container class="main-container">
    <game></game>
    <chat></chat>
  </el-container>
</template>

<script>
  import Chat from '../components/Chat.vue'
  import Game from '../components/Game.vue'

  export default {
    components: {
      Chat,
      Game
    },
    data() {
      return {
        socket: this.$store.state.socket
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('UPDATE_CHOICES', (data) => {
          this.$store.commit('UPDATE_CHOICES', data)
        })

        this.socket.on('UPDATE_HOST', (id) => {
          this.$store.commit('UPDATE_HOST', id)
        })
      }
      else {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .main-container {
    height: 100%;
    width: 100%;
  }
</style>