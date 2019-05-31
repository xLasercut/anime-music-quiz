<template>
  <v-btn @click="$emit('click')" :color="color" flat :disabled="disabled">
    <slot></slot>
    <v-icon size="12pt" right>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script>
  export default {
    props: [ 'color', 'icon', 'disabled' ]
  }
</script>

<style scoped>
  .v-btn {
    width: 120px;
    border-radius: 0;
  }
</style>