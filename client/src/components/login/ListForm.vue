<template>
  <el-form ref="listForm" :model="form" :rules="validationRules" label-position="top">
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-form-item label="Server URL" prop="server">
          <el-input
            v-model.trim="form.server"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="login()">Connect</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
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
          server: default_server
        },
        validationRules: {
          server: [ { required: true, validator: this.validateServer, trigger: 'blur' } ]
        }
      }
    },
    methods: {
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
      login() {
        this.$refs['listForm'].validate((valid) => {
          if (valid) {
            this.$store.commit('list/LOGIN', this.form)
            this.$router.push({name: 'list-picker'})
          }
        })
      }
    }
  }
</script>