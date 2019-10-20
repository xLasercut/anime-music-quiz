<template>
  <v-btn @click="$emit('click')" depressed v-on="activator" v-bind="$attrs">
    <slot></slot>
    <v-icon right>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script lang="coffee">
  export default
    props: [ 'icon', 'activator' ]
</script>