<template>
  <div class="input-container">
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
    props: {
      value: {
        type: String
      }
    },
    data() {
      return {
        guess: this.value
      }
    },
    watch: {
      value(val) {
        this.guess = val
      },
      guess(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      querySearch(string, callback) {
        var results = this.$store.state.animeList.filter((item) => {
          if (item.value.toLowerCase().includes(string.toLowerCase())) {
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

  .input-container {
    width: 100%;
    height: 100px;
    padding-top: 50px;
  }
</style>