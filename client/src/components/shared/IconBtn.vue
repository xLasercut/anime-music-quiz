<template>
  <v-btn @click="$emit('click')" :color="color" depressed :disabled="disabled">
    <slot></slot>
    <v-icon size="14pt" right>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script lang="coffee">
  export default
    props: [ 'color', 'icon', 'disabled' ]
</script>