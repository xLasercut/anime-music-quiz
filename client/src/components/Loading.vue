<template>
  <v-row class="loading-container" justify="center" align="center">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-row>
</template>

<style scoped>
  .loading-container {
    height: 100%;
  }
</style>