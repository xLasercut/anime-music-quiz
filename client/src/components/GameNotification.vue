<template>
  <v-snackbar :timeout="6000" :color="color" top v-model="show" id="game-notification">
    {{text}}
    <v-btn
      flat
      @click="show = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="coffee">
  import EventBus from '../assets/mixins/event-bus.coffee'

  export default
    data: () ->
      show: false,
      color: '',
      text: ''
    methods:
      showNotification: (color, text) ->
        this.color = color
        this.text = text
        this.show = true
    mounted: () ->
      EventBus.$on('game-notification', (color, text) =>
        if this.show
          this.show = false
          setTimeout( () =>
            this.showNotification(color, text)
          , 500)
        else
          this.showNotification(color, text)
      )
</script>