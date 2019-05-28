<template>
  <v-flex xs6>
    <icon-btn color="primary" icon="fas fa-home" @click="$router.push('/')">Home</icon-btn>
    <icon-btn color="success" icon="fas fa-play" v-if="showStartButton" @click="$emit('start')">Start</icon-btn>
    <icon-btn color="error" icon="fas fa-stop" v-if="showStopButton" @click="$emit('stop')">Stop</icon-btn>
    <icon-btn color="warning" icon="fas fa-info" v-if="$store.state.game.playing" @click="toggle()">
      Toggle Answer
    </icon-btn>
  </v-flex>
</template>

<script>
  import IconBtn from '../../shared/IconBtn.vue'

  export default {
    components: { IconBtn },
    computed: {
      showStartButton() {
        return (!this.$store.state.game.playing && this.$store.state.game.host)
      },
      showStopButton() {
        return (this.$store.state.game.playing && this.$store.state.game.host)
      }
    },
    methods: {
      toggle() {
        this.$store.commit('game/TOGGLE_ANSWER')
      }
    }
  }
</script>