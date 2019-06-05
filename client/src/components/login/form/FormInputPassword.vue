<template>
  <form-input
    label="Server Password"
    v-model="model"
    :rules="rules"
  ></form-input>
</template>

<script>
  import VModel from '../../../assets/mixins/v-model.js'
  import FormInput from './FormInput.vue'

  export default {
    components: { FormInput },
    mixins: [ VModel ],
    data() {
      return {
        rules: [
          v => !!v || 'Server password required',
          v => /[0-9A-Za-z]+/ig.test(v) || 'Valid characters A-Z, a-z, 0-9'
        ]
      }
    }
  }
</script>