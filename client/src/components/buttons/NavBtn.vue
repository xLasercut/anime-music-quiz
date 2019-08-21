<template>
  <v-btn @click="$emit('click')" v-on="activator" small text v-bind="$attrs">
    <v-icon>
      {{icon}}
    </v-icon>
  </v-btn>
</template>

<script lang="coffee">
  export default
    props: [ 'icon', 'activator' ]
</script>