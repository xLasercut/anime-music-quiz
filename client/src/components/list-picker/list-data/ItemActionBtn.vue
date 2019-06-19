<template>
  <v-btn
    :color="color" small icon
    @click="$emit('click')"
    :disabled="disabled"
    :id="id"
  >
    <v-icon size="12pt"><slot></slot></v-icon>
  </v-btn>
</template>

<script lang="coffee">
  export default
    props: [ 'color', 'disabled', 'id' ]
</script>