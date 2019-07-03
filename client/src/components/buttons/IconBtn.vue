<template>
  <v-btn @click="$emit('click')" :color="color" depressed :disabled="disabled" :id="id" v-on="activator">
    <slot></slot>
    <v-icon right>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script lang="coffee">
  export default
    props: [ 'color', 'icon', 'disabled', 'id', 'activator' ]
</script>