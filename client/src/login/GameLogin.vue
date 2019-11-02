<template>
  <v-form ref="form">
    <form-heading>Game</form-heading>
    <form-input
      label="Display Name" v-model="form.username"
      :disabled="disabled" id="username-input"
      :rules="nameRules" @enter="login()" counter="20"
    ></form-input>
    <form-input-password v-model.trim="form.password" @enter="login()" :disabled="disabled"></form-input-password>
    <form-avatar :avatars="avatars" v-model.trim="form.avatar" :disabled="disabled"></form-avatar>
    <v-row justify="center">
      <v-col xs="6" sm="3" md="2">
        <v-text-field
          label="Score"
          v-model.number="form.score" type="number" filled
          min="0" max="200" id="score-input" :disabled="disabled"
          :rules="scoreRules"
        ></v-text-field>
      </v-col>
    </v-row>
    <login-btn @click="login()" :disabled="disabled"></login-btn>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FormInputPassword from './form/FormInputPassword.vue'
import FormInput from './form/FormInput.vue'
import LoginBtn from './form/LoginBtn.vue'
import FormHeading from './form/FormHeading.vue'
import { sendNotification } from '../assets/notification'
import { USERNAME_FORMAT } from '../assets/config'
import FormAvatar from './form/FormAvatar.vue'
import { RawPlayerObj } from '../../../shared-modules/interfaces'
import { GameFormInputs } from '../assets/interfaces'

let password = ''
if (process.env.NODE_ENV === 'development') {
  password = 'password'
}

@Component({
  components: { FormInputPassword, LoginBtn, FormHeading, FormInput, FormAvatar }
})
export default class GameLogin extends Vue {

  avatars = ['zero_2', 'lelouch', 'horo', 'madoka', 'alphonse', 'misaka', 'miyu', 'taj']

  form: GameFormInputs = {
    username: '',
    password: password,
    avatar: 'zero_2',
    score: 0
  }

  disabled = false

  nameRules = [
    (v: string): boolean | string => (!!v) || 'Username required',
    (v: string): boolean | string => USERNAME_FORMAT.test(v) || 'Username can only contain: 0-9, A-Z, a-z and space',
    (v: string): boolean | string => (v && v.length <= 20) || 'Username must be under 20 characters'
  ]

  scoreRules = [
    (v: number): boolean | string => (v >= 0 && v <= 200) || 'Score must be between 0 and 200',
    (v: number): boolean | string => Number.isInteger(v) || 'Score must be a number'
  ]

  login() {
    // @ts-ignore
    let valid: boolean = this.$refs.form.validate()
    if (valid) {
      this.disabled = true
      localStorage.username = this.form.username
      localStorage.avatar = this.form.avatar
      this.$socket.client.open()
      this.$socket.client.emit('AUTHENTICATE', this.form.password, (auth: boolean): void => {
        this.disabled = false
        if (auth) {
          let inputInfo: RawPlayerObj = {
            username: this.form.username,
            avatar: this.form.avatar,
            score: this.form.score
          }
          this.$socket.client.emit('LOGIN_GAME', inputInfo)
          this.$store.commit('UPDATE_SID', this.$socket.client.id)
          this.$router.push('/game')
        }
        else {
          sendNotification('error', 'Incorrect server password')
        }
      })
    }
  }

  mounted() {
    if (localStorage.avatar && (this.avatars.includes(localStorage.avatar))) {
      this.form.avatar = localStorage.avatar
    }

    if (localStorage.username) {
      this.form.username = localStorage.username
    }
  }
}
</script>