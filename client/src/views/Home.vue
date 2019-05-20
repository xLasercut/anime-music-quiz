<template>
  <div class="main-container">
    <div class="game-container">

    </div>
    <chat></chat>
  </div>
</template>

<script>
  import Chat from '../components/Chat.vue'

  export default {
    components: { Chat },
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

  .game-container {
    background: green;
    height: 100%;
    width: calc(100% - 420px);
    float: left;
  }
</style>