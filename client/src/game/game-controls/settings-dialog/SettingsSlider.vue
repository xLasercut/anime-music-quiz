<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-slider
        :label="label" :min="min" :max="max" :disabled="disabled"
        hide-details v-model.number="model"
      ></v-slider>
    </v-col>
    <v-col cols="2">
      <v-text-field
        type="number" :min="min" :max="max" :disabled="disabled"
        class="mt-0 pt-0" :id="id" v-model.number="model" hide-details
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({})
export default class SettingsSlider extends Vue {
  @Prop(String) label!: string
  @Prop(String) id!: string
  @Prop(String) min!: string
  @Prop(String) max!: string
  @Prop(Boolean) disabled!: boolean
  @Prop(Number) value!: number

  model = this.value

  @Watch('value')
  _onValueChange(val: number): void {
    this.model = val
  }

  @Watch('model')
  @Emit('input')
  _onModelChange(val: number): number {
    return val
  }
}
</script>