<template>
  <v-btn @click="$emit('click')" v-on="activator" small text v-bind="$attrs">
    <v-icon>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class NavBtn extends Vue {
  @Prop(String) icon!: string
  @Prop() activator!: any
}
</script>