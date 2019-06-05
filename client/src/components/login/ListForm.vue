<template>
  <v-form ref="listForm">
    <v-container fluid grid-list-lg>
      <form-input-password v-model.trim="form.password"></form-input-password>
      <v-layout justify-center wrap>
        <v-flex xs12 class="text-xs-center">
          <icon-btn
            color="success" icon="fas fa-sign-in-alt"
            @click="login()"
          >
            Connect
          </icon-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import FormInputPassword from './form/FormInputPassword.vue'
  import IconBtn from '../shared/IconBtn.vue'

  export default {
    components: { IconBtn, FormInputPassword },
    data() {
      return {
        form: {
          password: ''
        }
      }
    },
    methods: {
      login() {
        var valid = this.$refs['listForm'].validate()

        if (valid) {
          this.$store.commit('list/LOGIN', this.form)
          this.$router.push({name: 'list-picker'})
        }
      }
    }
  }
</script>
