<template>
  <v-form ref="listForm">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="auto">
          <h2>User List</h2>
        </v-col>
      </v-row>
      <form-input-password v-model.trim="form.password" @enter="login()" :disabled="loading" />
      <v-row justify="center">
        <v-col cols="auto">
          <icon-btn
            color="success" icon="mdi-login"
            @click="login()"
            id="login-btn" :disabled="loading"
          >
            Connect
          </icon-btn>
        </v-col>
      </v-row>
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
        valid = this.$refs['listForm'].validate()

        if valid
          this.loading = true
          this.$socket.open()
          this.$socket.emit('AUTHENTICATE', this.form.password, (auth) =>
            this.loading = false
            if auth
              this.$socket.emit('LOGIN_LIST')
              this.$router.push({ name: 'list-picker' })
            else
              this.notifyError('Incorrect server password')
          )


</script>
