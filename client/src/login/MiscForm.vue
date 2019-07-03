<template>
  <v-form ref="miscForm">
    <v-container fluid grid-list-lg>
      <v-layout justify-center>
        <v-flex shrink>
          <h2>Miscellaneous</h2>
        </v-flex>
      </v-layout>
      <form-input-password v-model.trim="form.password" @enter="login()" :disabled="loading" />
      <v-layout justify-center wrap>
        <v-flex xs12 class="text-xs-center">
          <icon-btn
            color="success" icon="mdi-login"
            @click="login()"
            id="login-btn" :disabled="loading"
          >
            Connect
          </icon-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="coffee">
  import FormInputPassword from './form/FormInputPassword.vue'
  import IconBtn from '../components/buttons/IconBtn.vue'
  import Notification from '../assets/mixins/notification.coffee'

  password = ''
  if process.env.NODE_ENV == 'development'
    password = 'password'

  export default
    components: { IconBtn, FormInputPassword }
    mixins: [ Notification ]
    data: () ->
      form: {
        password: password
      },
      loading: false
    methods:
      login: () ->
        valid = this.$refs['miscForm'].validate()

        if valid
          this.loading = true
          this.$socket.open()
          this.$socket.emit('AUTHENTICATE', this.form.password, (auth) =>
            this.loading = false
            if auth
              this.$socket.emit('LOGIN_MISC')
              this.$router.push({ name: 'misc' })
            else
              this.notifyError('Incorrect server password')
          )
</script>
