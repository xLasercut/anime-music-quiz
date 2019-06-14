<template>
  <v-btn
    :color="color" small icon
    @click="$emit('click')"
    :disabled="disabled"
  >
    <v-icon size="12pt"><slot></slot></v-icon>
  </v-btn>
</template>

<script lang="coffee">
  export default
    props: [ 'color', 'disabled' ]
</script>