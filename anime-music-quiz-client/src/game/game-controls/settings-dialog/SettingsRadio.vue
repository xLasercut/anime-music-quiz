<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12">
      <v-radio-group :label="label" row v-model="model" hide-details :disabled="disabled">
        <v-radio v-for="item in options" :key="`${label}_${item.value}`" :label="item.label" :value="item.value" :id="radioId(item.value)"></v-radio>
      </v-radio-group>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({})
export default class SettingsRadio extends Vue {
  @Prop() value!: any
  @Prop(String) label!: string
  @Prop(String) id!: string
  @Prop() options!: Array<{label: string, value: any}>
  @Prop(Boolean) disabled!: boolean

  model = this.value

  @Watch('value')
  _onValueChange(val: any): void {
    this.model = val
  }

  @Watch('model')
  @Emit('input')
  _onModelChange(val: any): any {
    return this.model
  }

  radioId(val: any): string | null {
    if (this.id) {
      return `${this.id}-${val}`
    }
    return null
  }
}
</script>