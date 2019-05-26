<template>
  <el-main>
    <el-row type="flex" justify="end">
      <el-button icon="el-icon-document" type="info" @click="$router.push('list-picker')">
        Song List Generator
      </el-button>
    </el-row>
    <el-row>
      <h1>Login</h1>
    </el-row>
    <el-form ref="loginForm" :model="form" :rules="validationRules" label-position="top">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="Username" prop="username">
            <el-input
              v-model.trim="form.username"
              minlength="1" maxlength="20"
              :clearable="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="Server URL" prop="server">
            <el-input
              v-model.trim="form.server"
              :clearable="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form-item>
            <el-radio-group v-model="form.avatar">
              <el-radio-button
                v-for="(avatar, index) in avatars"
                :key="`avatar_${index}`"
                :label="avatar"
              >
                <img :src="`img/avatar/${avatar}.png`">
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="Score" prop="score">
            <el-input-number v-model.number="form.score" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item>
            <el-button type="primary" @click="login()">Login</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
  var default_server = ''
  if (process.env.NODE_ENV === 'development') {
    default_server = 'http://localhost:3001'
  }

  const avatars = ['0', '1', '2', '3', '4', '5', '6']

  export default {
    data() {
      return {
        form: {
          username: '',
          server: default_server,
          avatar: '0',
          score: 0
        },
        validationRules: {
          username: [ { required: true, validator: this.validateName, trigger: 'blur' } ],
          server: [ { required: true, validator: this.validateServer, trigger: 'blur' } ],
          score: [ { required: false, validator: this.validateScore, trigger: 'blur' } ]
        },
        avatars: avatars,
        socket: this.$store.state.socket
      }
    },
    methods: {
      login() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.$store.commit('LOGIN', this.form)
            this.$router.push({name: 'home'})
          }
        })
      },
      validateName(rule, val, callback) {
        if (!val) {
          callback(new Error('Username cannot be blank'))
        }
        else {
          callback()
        }
      },
      validateServer(rule, val, callback) {
        var regex = new RegExp('^(http|https):\/\/', 'i')

        if (!val) {
          callback(new Error('Server URL cannot be blank'))
        }
        else if (!regex.exec(val)) {
          callback(new Error('Please input full server url'))
        }
        else {
          callback()
        }
      },
      validateScore(rule, val, callback) {
        if (val < 0) {
          callback(new Error('Score cannot be negative'))
        }
        else {
          callback()
        }
      }
    },
    mounted() {
      if (this.socket) {
        this.$store.commit('DISCONNECT')
      }
    }
  }

</script>

<style scoped>

</style>