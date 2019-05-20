<template>
  <el-main>
    <chat></chat>
  </el-main>
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
      if (!this.$store.state.username) {
        this.$router.push('/')
      }
    }
  }
</script>
