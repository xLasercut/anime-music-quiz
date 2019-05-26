<template>
  <el-row :gutter="10" class="filter-container">
    <el-col :span="12">
      <el-input v-model="filter['anime']">
        <span slot="prepend">Anime</span>
      </el-input>
    </el-col>
    <el-col :span="12">
      <el-input v-model="filter['song']">
        <span slot="prepend">Song</span>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        filter: this.value
      }
    },
    watch: {
      value(val) {
        this.filter = val
      },
      filter(val) {
        this.$emit('input', val)
      }
    }
  }
</script>


<style scoped>
  .filter-container {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>