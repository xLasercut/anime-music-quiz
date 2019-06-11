<template>
  <timer-circle :time="time" :maxTime="guessTime" v-show="show"></timer-circle>
</template>

<script lang="coffee">
  import TimerCircle from '../shared/TimerCircle.vue'

  export default
    components: { TimerCircle }
    data: () ->
      guessTime: 30000,
      time: 30000,
      countdown: null,
      show: false
    sockets:
      START_COUNTDOWN: (guessTime) ->
        this.time = guessTime * 1000
        this.guessTime = guessTime * 1000
        this.startCountdown()
      TIME_UP: () ->
        this.stopCountdown()
      RESET: () ->
        this.stopCountdown()
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