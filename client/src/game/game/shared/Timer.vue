<template>
  <v-row class="countdown-container">
    <v-col cols="12" align-self="center">
      <v-progress-circular
        :rotate="270"
        :size="100"
        :width="15"
        :value="percentage()"
        :color="color()"
        v-if="!linear"
      >
        {{ time }}
      </v-progress-circular>
      <v-progress-linear
        :value="percentage()"
        :color="color()"
        height="20"
        v-if="linear"
      >
        <strong>{{ time }}</strong>
      </v-progress-linear>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  export default
    props:
      maxTime: {}
      linear: { default: false, type: Boolean }
    data: () ->
      time: 0
      countdown: null
    methods:
      percentage: () ->
        return 100 * (1 - this.time / this.maxTime)
      color: () ->
        percentage = this.percentage()
        if percentage > 75
          return 'error'
        else if percentage > 50
          return 'warning'
        return 'success'
      startCountdown: () ->
        this.time = this.maxTime
        this.countdown = setInterval () =>
          this.time -= 1
          if this.time <= 0
            this.stopCountdown()
        , 1000
      stopCountdown: () ->
        clearInterval(this.countdown)
</script>

<style scoped>
  .countdown-container {
    height: 100%;
  }
</style>