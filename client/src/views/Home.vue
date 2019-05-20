<template>
  <div class="main-container">
    <game></game>
    <chat></chat>
  </div>
</template>

<script>
  import Chat from '../components/Chat.vue'
  import Game from '../components/Game.vue'

  export default {
    components: { Chat, Game },
    data() {
      return {
      }
    },
    mounted() {
      if (!this.$store.getters.validState) {
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