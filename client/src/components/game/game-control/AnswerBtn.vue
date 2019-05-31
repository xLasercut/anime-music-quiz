<template>
  <v-list-tile v-if="$store.state.game.playing">
    <v-list-tile-action>
      <nav-btn color="warning" @click="toggle()" icon="fas fa-info">Answer</nav-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
  import NavBtn from '../../shared/NavBtn.vue'

  export default {
    components: { NavBtn },
    methods: {
      toggle() {
        this.$store.commit('game/TOGGLE_ANSWER')
      }
    }
  }
</script>