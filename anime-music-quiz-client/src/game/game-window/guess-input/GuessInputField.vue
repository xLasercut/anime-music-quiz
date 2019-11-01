<template>
  <v-col cols="12" sm="6" md="5">
    <v-combobox
      filled clearable hide-details auto-select-first
      :search-input.sync="model" :id="id"
      @click:append-outer="$emit('click:append-outer')"
      v-bind="$attrs"
    ></v-combobox>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({})
export default class GuessInputField extends Vue {
  @Prop(String) value!: string
  @Prop(String) id!: string

  model = this.value

  @Watch('value')
  _onValueChange(val: string): void {
    this.model = val
  }

  @Watch('model')
  @Emit('input')
  _onModelChange(val: string): string {
    return val
  }
}
</script>