<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-autocomplete
          :fetch-suggestions="querySearch"
          v-model="guess"
        ></el-autocomplete>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        guess: ''
      }
    },
    methods: {
      querySearch(string, callback) {
        var results = this.$store.state.animeList.filter((item) => {
          if (item.value.toLowerCase().includes(string)) {
            return item
          }
        })

        callback(results)
      }
    }
  }

</script>

<style scoped>
  .el-autocomplete {
    width: 100%;
  }
</style>