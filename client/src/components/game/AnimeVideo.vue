<template>
  <div>
    {{anime}}
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object
      }
    },
    data() {
      return {
        anime: this.value
      }
    },
    watch: {
      value(val) {
        this.anime = val
      },
      anime(val) {
        this.emit('input', val)
      }
    }
  }
</script>

<style scoped>
  div {
    width: calc(100% - 20px);
    height: 200px;
    padding: 10px;
  }
</style>