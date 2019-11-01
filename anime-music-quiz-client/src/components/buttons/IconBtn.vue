<template>
  <v-btn @click="$emit('click')" depressed v-on="activator" v-bind="$attrs">
    <slot></slot>
    <v-icon right>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class IconBtn extends Vue {
  @Prop(String) icon!: string
  @Prop() activator!: any
}
</script>