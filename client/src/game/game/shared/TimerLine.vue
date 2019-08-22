<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-progress-linear
        :value="percentage()"
        :color="color()"
        striped
        height="20"
        rounded
      >
        <strong>{{ Math.round(this.time / 1000) }}</strong>
      </v-progress-linear>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  export default
    props: [ 'time', 'maxTime' ]
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
</script>