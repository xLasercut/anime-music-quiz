<template>
  <v-btn icon text small @click="$emit('click')" v-bind="$attrs">
    <v-icon>mdi-close</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class DialogCloseBtn extends Vue {}
</script>