<template>
  <v-btn depressed x-small @click="$emit('click')" v-bind="$attrs">
    <v-icon size="12pt">{{icon}}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class TableBtn extends Vue {
  @Prop(String) icon!: string
}
</script>

<style scoped>
button {
  margin-right: 2px;
}
</style>