<template>
  <form-input
    label="Server Password"
    v-model.trim="model"
    :rules="rules" :append-icon="icon"
    @click:append="togglePass()"
    @enter="$emit('enter')"
    :type="inputType"
    id="password-input"
    v-bind="$attrs"
  ></form-input>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit, PropSync } from 'vue-property-decorator'
import FormInput from './FormInput.vue'
import { SERVER_PASSWORD_FORMAT } from '../../assets/config'

@Component({
  components: { FormInput }
})
export default class FormInputPassword extends Vue {
  @Prop(String) value!: string

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

  rules = [
    (v: string): boolean | string => (!!v) || 'Server password required',
    (v: string): boolean | string => SERVER_PASSWORD_FORMAT.test(v) || 'Valid characters A-Z, a-z, 0-9'
  ]

  showPass = false

  get icon(): string {
    if (this.showPass) {
      return 'mdi-eye-off'
    }
    return 'mdi-eye'
  }

  get inputType(): string {
    if (this.showPass) {
      return 'text'
    }
    return 'password'
  }

  togglePass() {
    this.showPass = !this.showPass
  }
}
</script>