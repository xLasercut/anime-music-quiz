<template>
  <v-dialog width="500" v-model="show" persistent no-click-animation>
    <v-card>
      <v-container grid-list-lg>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            Place your bets
          </v-flex>
        </v-layout>
        <timer-circle :time="time" :maxTime="betTime"></timer-circle>
        <v-layout justify-center>
          <v-flex xs10>
            <v-slider
              v-model.number="bet" label="Bet"
              :min="1" :max="10"
              thumb-label="always" always-dirty
              thumb-size="24"
            >
            </v-slider>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import TimerCircle from './shared/TimerCircle.vue'

  export default
    components: { TimerCircle }
    data: () ->
      show: false
      bet: 1
      time: 10000
      betTime: 10000
      countdown: null
    sockets:
      PLACE_BET: (betTime) ->
        this.time = betTime * 1000
        this.betTime = betTime * 1000
        this.bet = 1
        this.startCountdown()
      CLOSE_BET: () ->
        this.stopCountdown()
        this.$socket.emit('SET_BET', this.bet)
    methods:
      startCountdown: () ->
        this.show = true
        this.countdown = setInterval( () =>
          this.time -= 200
          if this.time <= 0
            this.stopCountdown()
        , 200)
      stopCountdown: () ->
        clearInterval(this.countdown)
        this.show = false
</script>