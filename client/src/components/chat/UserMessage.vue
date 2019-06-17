<template>
  <span class="message-line">
    <span>{{message.user}}: </span>
    <span>{{message.message}}</span>
  </span>
</template>


<script lang="coffee">
  export default
    props: [ 'message' ]
</script>

<style scoped>
  .message-line {
    background: gray;
  }
</style>