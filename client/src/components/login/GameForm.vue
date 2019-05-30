<template>
  <v-form ref="loginForm">
    <v-container fluid grid-list-lg>
      <form-input
        label="Username"
        v-model.trim="form.username"
        :rules="nameRules"
      ></form-input>
      <form-input-server v-model.trim="form.server"></form-input-server>
      <v-layout justify-center wrap>
        <v-flex shrink>
          <v-radio-group :column="false" v-model="form.avatar">
            <v-radio
              v-for="(avatar, index) in avatars"
              :key="`avatar_${index}`"
              :value="avatar"
              on-icon=""
              off-icon=""
              :ripple="false"
            >
              <template slot="label">
                <img :src="`img/avatar/${avatar}.png`">
              </template>
            </v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-flex xs2>
          <v-text-field
            label="Score"
            v-model.number="form.score"
            :rules="scoreRules" type="number"
            box min="0" max="1000"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <icon-btn
            color="success" icon="fas fa-sign-in-alt"
            @click="login()"
          >
            Login
          </icon-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>


<script>
  import IconBtn from '../shared/IconBtn.vue'
  import FormInput from './form/FormInput.vue'
  import FormInputServer from './form/FormInputServer.vue'

  var default_server = ''
  if (process.env.NODE_ENV === 'development') {
    default_server = 'http://localhost:3001'
  }

  const avatars = ['0', '1', '2', '3', '4', '5', '6']

  export default {
    components: { IconBtn, FormInput, FormInputServer },
    data() {
      return {
        form: {
          username: '',
          server: default_server,
          avatar: '0',
          score: 0
        },
        nameRules: [
          v => !!v || 'Username required'
        ],
        scoreRules: [
          v => v >= 0 || 'Score cannot be negative'
        ],
        avatars: avatars,
      }
    },
    methods: {
      login() {
        var valid = this.$refs['loginForm'].validate()
        if (valid) {
          this.$store.commit('game/LOGIN', this.form)
          localStorage.avatar = this.form.avatar
          this.$router.push({name: 'home'})
        }
      }
    },
    mounted() {
      if (localStorage.avatar) {
        this.form.avatar = localStorage.avatar
      }
    }
  }
</script>

<style scoped>
  .accent--text label img {
    outline: 5px solid #4caf50;
  }
</style>