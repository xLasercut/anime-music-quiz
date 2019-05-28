<template>
  <v-form ref="listForm">
    <v-container fluid grid-list-lg>
      <form-input-server v-model.trim="form.server"></form-input-server>
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
  import FormInputServer from './form/FormInputServer.vue'
  import IconBtn from '../shared/IconBtn.vue'

  var default_server = ''
  if (process.env.NODE_ENV === 'development') {
    default_server = 'http://localhost:3001'
  }

  export default {
    components: { IconBtn, FormInputServer },
    data() {
      return {
        form: {
          server: default_server
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
