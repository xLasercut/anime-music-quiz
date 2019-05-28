<template>
  <v-app :dark="$store.state.dark">
    <v-switch class="switch"
      v-model="dark"
    ></v-switch>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      dark: false
    }
  },
  watch: {
    dark(val) {
      this.$store.commit('TOGGLE_DARK_MODE', val)
    }
  }
}
</script>

<style scoped>
  .switch {
    position: absolute;
    top: 5px;
    left: 10px;
    z-index: 2;
    margin: 0;
  }
</style>