<template>
  <v-list-tile v-if="show">
    <v-list-tile-action>
      <nav-btn color="success" @click="$store.commit('game/START_GAME')" icon="fas fa-play">Start</nav-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
  import NavBtn from '../../shared/NavBtn.vue'

  export default {
    components: { NavBtn },
    computed: {
      show() {
        return (!this.$store.state.game.playing && this.$store.state.game.host)
      }
    }
  }
</script>