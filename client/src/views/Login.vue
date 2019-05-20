<template>
  <el-main>
    <el-row>
      <h1>Choose Username</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-input
          v-model="username" :minlength="1" :maxlength="20"
          :clearable="true"
        ></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-button type="primary" @click="setName()">Set Username</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  export default {
    data() {
      return {
        username: ''
      }
    },
    methods: {
      setName() {
        if (this.validateName()) {
          this.$store.commit('setName', this.username)
          this.$router.push({name: 'home'})
        }
      },
      validateName() {
        if (!this.username) {
          this.$message({
            message: 'Username cannot be blank',
            type: 'error'
          })
          return false
        }
        return true
      }
    }
  }

</script>

<style scoped>
  .el-row {
    margin: 20px;
  }
</style>