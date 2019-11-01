<template>
  <v-col cols="6" >
    <v-progress-linear
      v-model="percentage" :color="color" height="20"
      rounded :active="show"
    >
      {{time}}
    </v-progress-linear>
  </v-col>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { CountdownHelper } from '../../../assets/mixins'

@Component({})
export default class SongSelectTimer extends Mixins(CountdownHelper) {}
</script>