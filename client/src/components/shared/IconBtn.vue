<template>
  <v-btn @click="$emit('click')" :color="color" depressed :disabled="disabled">
    <slot></slot>
    <v-icon size="14pt" right>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script>
  export default {
    props: [ 'color', 'icon', 'disabled' ]
  }
</script>