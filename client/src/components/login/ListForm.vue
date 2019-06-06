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

<script lang="coffee">
  import FormInputPassword from './form/FormInputPassword.vue'
  import IconBtn from '../shared/IconBtn.vue'
  import Notification from '../../assets/mixins/notification.coffee'

  password = ''
  if process.env.NODE_ENV == 'development'
    password = 'password'

  export default
    components: { IconBtn, FormInputPassword }
    mixins: [ Notification ]
    data: () ->
      form: {
        password: password
      }
    methods:
      login: () ->
        valid = this.$refs['listForm'].validate()

        if valid
          this.$socket.open()
          this.$socket.emit('AUTHENTICATE', this.form.password, (auth) =>
            if auth
              this.$socket.emit('LOGIN_LIST')
              this.$router.push({ name: 'list-picker' })
            else
              this.notifyError('Incorrect server password')
          )


</script>
