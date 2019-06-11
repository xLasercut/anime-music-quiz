<template>
  <v-btn @click="$emit('click')" :color="color" v-on="activator" flat :disabled="disabled">
    <v-icon>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script lang="coffee">
  export default
    props: [ 'color', 'icon', 'disabled', 'activator' ]
</script>

<style scoped>
  .v-btn {
    border-radius: 0;
  }
</style>