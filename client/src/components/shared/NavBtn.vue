<template>
  <v-btn @click="$emit('click')" :color="color" fab flat :disabled="disabled">
    <v-icon>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script lang="coffee">
  export default
    props: [ 'color', 'icon', 'disabled' ]
</script>
