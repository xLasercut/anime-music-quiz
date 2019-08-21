<template>
  <div class="video-overlay" :style="theme">
    <slot></slot>
  </div>
</template>

<script lang="coffee">
  export default
    computed:
      theme: () ->
        if this.$vuetify.theme.dark
          return { background: '#303030' }
        return { background: '#fafafa' }
</script>

<style scoped>
  .video-overlay {
    display: block;
    height: 100%;
    width: 100%;
    position: relative;
    top: -100%;
    z-index: 2;
  }
</style>