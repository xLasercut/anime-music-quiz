<template>
  <el-main>
    <el-row>
      <h1>Login</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-form ref="loginForm" :model="form" :rules="validationRules">
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
          <el-form-item>
            <el-button type="primary" @click="login()">Login</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  var default_server = ''
  if (process.env.NODE_ENV === 'development') {
    default_server = 'http://localhost:3001'
  }

  export default {
    data() {
      return {
        form: {
          username: '',
          server: default_server
        },
        validationRules: {
          username: [ { required: true, validator: this.validateName, trigger: 'blur' } ],
          server: [ { required: true, validator: this.validateServer, trigger: 'blur' } ]
        }
      }
    },
    methods: {
      login() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.$store.commit('login', this.form)
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
      }
    }
  }

</script>

<style scoped>

</style>