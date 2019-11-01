<template>
  <v-row justify="center">
    <v-col cols="auto">
      <h2><slot></slot></h2>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class FormHeading extends Vue {}
</script>