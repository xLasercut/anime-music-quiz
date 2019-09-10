<template>
  <v-form ref="miscForm">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="auto">
          <h2>Miscellaneous</h2>
        </v-col>
      </v-row>
      <form-input-password v-model.trim="form.password" @enter="login()" :disabled="loading" />
      <login-btn @click="login()" :disabled="loading" />
    </v-container>
  </v-form>
</template>

<script lang="coffee">
  import FormInputPassword from './form/FormInputPassword.vue'
  import IconBtn from '../components/buttons/IconBtn.vue'
  import Notification from '../assets/mixins/notification.coffee'
  import LoginBtn from './form/LoginBtn.vue'

  password = ''
  if process.env.NODE_ENV == 'development'
    password = 'password'

  export default
    components: { IconBtn, FormInputPassword, LoginBtn }
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
