<template>
  <v-toolbar>
    <v-toolbar-items>
      <nav-btn :icon="switchIcon" @click="$store.commit('TOGGLE_DARK_MODE')">
        {{switchLabel}}
      </nav-btn>
      <nav-btn color="primary" v-if="$route.path != '/'" icon="fas fa-home" @click="$router.push('/')">
        Home
      </nav-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <game-control></game-control>
    <list-picker-control></list-picker-control>
    <login-control></login-control>
  </v-toolbar>
</template>

<script>
  import GameControl from '../game/GameControl.vue'
  import ListPickerControl from '../list-picker/ListPickerControl.vue'
  import LoginControl from '../login/LoginControl.vue'
  import NavBtn from './NavBtn.vue'

  export default {
    components: { GameControl, NavBtn, ListPickerControl, LoginControl },
    computed: {
      switchLabel() {
        if (this.$store.state.dark) {
          return 'Light'
        }
        return 'Dark'
      },
      switchIcon() {
        if (this.$store.state.dark) {
          return 'fas fa-sun'
        }
        return 'fas fa-moon'
      }
    },
    mounted() {
      if (localStorage.dark) {
        var dark = (localStorage.dark === 'true')
        if (dark != this.$store.state.dark) {
          this.$store.commit('TOGGLE_DARK_MODE')
        }
      }
    }
  }
</script>