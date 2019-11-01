<template>
  <v-row justify="center">
    <v-col cols="auto" v-for="(item, index) in items" :key="`checkbox_${index}`">
      <v-checkbox :label="item" :value="item" v-model="model" :id="`setting-user-list-${item}`" v-bind="$attrs" hide-details></v-checkbox>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({})
export default class SettingsCheckbox extends Vue {
  @Prop() value!: Array<string>
  @Prop() items!: Array<string>

  model = this.value

  @Watch('value')
  _onValueChange(val: Array<string>): void {
    this.model = val
  }

  @Watch('model')
  @Emit('input')
  _onModelChange(val: Array<string>): Array<string> {
    return val
  }
}
</script>