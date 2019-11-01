<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" sm="6">
      <v-text-field
        filled clearable v-model.trim="model"
        @click:append="$emit('click:append')"
        @keydown.enter.native="$emit('enter')"
        :rules="rules"
        :id="id" v-bind="$attrs"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({})
export default class FormInput extends Vue {
  @Prop(String) id!: string
  @Prop(String) value!: string
  @Prop() rules!: Array<Object>

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