<template>
  <v-layout fill-height align-center justify-center>
    <v-progress-circular
      :rotate="270"
      :size="100"
      :width="15"
      :value="percentage()"
      :color="color()"
    >
      {{ Math.ceil(time / 1000) }}
    </v-progress-circular>
  </v-layout>
</template>

<script lang="coffee">
  export default
    props: ['time', 'maxTime']
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