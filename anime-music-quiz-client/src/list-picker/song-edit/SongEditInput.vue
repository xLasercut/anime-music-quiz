<template>
  <v-col cols="12">
    <v-text-field
      v-model.trim="model"
      v-bind="$attrs"
      clearable filled hide-details :id="id"
    ></v-text-field>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({})
export default class SongEditImport extends Vue {
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