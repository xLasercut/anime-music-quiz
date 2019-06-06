<template>
  <v-btn @click="$emit('click')" :color="color" flat :disabled="disabled">
    <slot></slot>
    <v-icon size="12pt" right>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script lang="coffee">
  export default
    props: [ 'color', 'icon', 'disabled' ]
</script>

<style scoped>
  .v-btn {
    border-radius: 0;
  }
</style>