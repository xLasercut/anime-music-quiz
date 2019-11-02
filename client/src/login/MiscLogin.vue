<template>
  <v-form ref="form">
    <form-heading>Miscellaneous</form-heading>
    <form-input-password v-model.trim="form.password" @enter="login()" :disabled="disabled"></form-input-password>
    <login-btn @click="login()" :disabled="disabled"></login-btn>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FormInputPassword from './form/FormInputPassword.vue'
import LoginBtn from './form/LoginBtn.vue'
import FormHeading from './form/FormHeading.vue'
import { sendNotification } from '../assets/notification'
import { MiscFormInputs } from '../assets/interfaces'

let password = ''
if (process.env.NODE_ENV === 'development') {
  password = 'password'
}

@Component({
  components: { FormInputPassword, LoginBtn, FormHeading }
})
export default class MiscLogin extends Vue {

  form: MiscFormInputs = {
    password: password
  }

  disabled = false

  login() {
    // @ts-ignore
    let valid: boolean = this.$refs.form.validate()
    if (valid) {
      this.disabled = true
      this.$socket.client.open()
      this.$socket.client.emit('AUTHENTICATE', this.form.password, (auth: boolean): void => {
        this.disabled = false
        if (auth) {
          this.$socket.client.emit('LOGIN_MISC')
          this.$router.push('/misc')
        }
        else {
          sendNotification('error', 'Incorrect server password')
        }
      })
    }
  }
}
</script>