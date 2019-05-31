<template>
  <v-navigation-drawer
    v-model="$store.state.drawer"
    absolute
    mini-variant
    temporary
    mini-variant-width="120"
  >
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-switch v-model="dark" :label="switchLabel"></v-switch>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-if="$route.path != '/'">
        <v-list-tile-action>
          <nav-btn color="primary" icon="fas fa-home" @click="$router.push('/')">Home</nav-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <game-control></game-control>
  </v-navigation-drawer>
</template>

<script>
  import GameControl from '../game/GameControl.vue'
  import NavBtn from './NavBtn.vue'

  export default {
    components: { GameControl, NavBtn },
    data() {
      return {
        dark: false
      }
    },
    watch: {
      dark(val) {
        this.$store.commit('TOGGLE_DARK_MODE', val)
        localStorage.dark = val
      }
    },
    computed: {
      switchLabel() {
        if (this.$store.state.dark) {
          return 'Dark'
        }
        return 'Light'
      }
    },
    mounted() {
      if (localStorage.dark) {
        this.dark = (localStorage.dark === 'true')
        this.$store.commit('TOGGLE_DARK_MODE', this.dark)
      }
    }
  }
</script>