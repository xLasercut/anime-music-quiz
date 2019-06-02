<template>
  <div class="selector-container">
    <v-select
      :items="$store.state.list.userListFiles"
      label="List"
      @change="updateFileName($event)"
      class="mt-2"
    ></v-select>
  </div>
</template>

<script>
  export default {
    methods: {
      updateFileName(filename) {
        this.$store.commit('list/UPDATE_FILENAME', filename)
      }
    }
  }
</script>

<style scoped>
  .selector-container {
    width: 200px;
  }
</style>
