<template>
  <v-toolbar-items>
    <nav-btn color="warning" @click="reload()" icon="mdi-sync"></nav-btn>
  </v-toolbar-items>
</template>

<script lang="coffee">
  import NavBtn from '../components/buttons/NavBtn.vue'

  export default
    components: { NavBtn }
    methods:
      reload: () ->
        this.$socket.emit('SYNC_EMOJI_DATA')
</script>