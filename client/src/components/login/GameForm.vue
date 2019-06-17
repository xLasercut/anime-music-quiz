<template>
  <v-form ref="loginForm">
    <v-container fluid grid-list-lg>
      <form-input
        label="Username"
        v-model.trim="form.username"
        :rules="nameRules"
        @enter="login()"
        counter="20"
      />
      <form-input-password v-model.trim="form.password" @enter="login()" />
      <form-avatar :avatars="avatars" v-model="form.avatar" />
      <v-layout justify-center>
        <v-flex xs6 sm3 md2>
          <v-text-field
            label="Score"
            v-model.number="form.score"
            :rules="scoreRules" type="number"
            box min="0" max="1000"
          />
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <icon-btn
            color="success" icon="mdi-login"
            @click="login()"
          >
            Login
          </icon-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>


<script lang="coffee">
  import IconBtn from '../shared/IconBtn.vue'
  import FormInput from './form/FormInput.vue'
  import FormInputPassword from './form/FormInputPassword.vue'
  import Notification from '../../assets/mixins/notification.coffee'
  import FormAvatar from './form/FormAvatar.vue'

  avatars = ['zero_2', 'lelouch', 'horo', 'madoka', 'alphonse', 'miyu', 'taj']

  password = ''
  if process.env.NODE_ENV == 'development'
    password = 'password'

  export default
    components: { IconBtn, FormInput, FormInputPassword, FormAvatar }
    mixins: [ Notification ]
    data: () ->
      form: {
        username: '',
        password: password,
        avatar: 'zero_2',
        score: 0
      },
      nameRules: [
        (v) => !!v || 'Username required',
        (v) => this.isValidUsername(v) || 'Username can only contain: 0-9, A-Z, a-z and space',
        (v) => this.isValidNameLength(v) || 'Username must be under 20 characters'
      ],
      scoreRules: [
        (v) => v >= 0 and v <= 100 || 'Score must be between 0 and 100',
        (v) => Number.isInteger(v) || 'Score must be a number'
      ],
      avatars: avatars
    methods:
      login: () ->
        valid = this.$refs['loginForm'].validate()
        if valid
          localStorage.avatar = this.form.avatar
          this.$socket.open()
          this.$socket.emit('AUTHENTICATE', this.form.password, (auth) =>
            if auth
              player = {
                username: this.form.username,
                avatar: this.form.avatar,
                score: this.form.score
              }
              this.$socket.emit('LOGIN_GAME', player)
              this.$router.push({ name: 'home' })
            else
              this.notifyError('Incorrect server password')
          )
      isValidUsername: (name) ->
        if /^[0-9A-Za-z ]+$/.exec(name)
          return true
        return false
      isValidNameLength: (name) ->
        if name
          return name.length <= 20
        return false
    mounted: () ->
      if localStorage.avatar and localStorage.avatar in avatars
        this.form.avatar = localStorage.avatar
</script>

<style scoped>
  .accent--text label img {
    outline: 5px solid #4caf50;
  }
</style>