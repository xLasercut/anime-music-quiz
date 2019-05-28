<template>
  <form-input
    label="Server URL"
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
          v => !!v || 'Server URL required',
          v => /^(http|https):\/\//ig.test(v) || 'Please input full URL'
        ]
      }
    }
  }
</script>