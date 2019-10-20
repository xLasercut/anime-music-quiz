<template>
  <v-btn
    depressed x-small
    @click="$emit('click')"
    v-bind="$attrs"
    class="data-action-btn"
  >
    <v-icon size="12pt"><slot></slot></v-icon>
  </v-btn>
</template>

<style scoped>
  .data-action-btn {
    margin-left: 2px;
    margin-right: 2px;
  }
</style>