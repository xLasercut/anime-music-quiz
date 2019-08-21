<template>
  <form-input
    label="Server Password"
    v-model="model"
    :rules="rules"
    :append-icon="icon"
    @click:append="show = !show"
    @enter="$emit('enter')"
    :type="inputType"
    id="password-input"
    v-bind="$attrs"
  ></form-input>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'
  import FormInput from './FormInput.vue'

  export default
    components: { FormInput }
    mixins: [ VModel ]
    data: () ->
      rules: [
        (v) => !!v || 'Server password required',
        (v) => /[0-9A-Za-z]+/ig.test(v) || 'Valid characters A-Z, a-z, 0-9'
      ],
      show: false
    computed:
      icon: () ->
        if this.show
          return 'mdi-eye-off'
        return 'mdi-eye'
      inputType: () ->
        if this.show
          return 'text'
        return 'password'
</script>