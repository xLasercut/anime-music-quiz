<template>
   <v-layout justify-center>
      <v-flex shrink>
        <icon-btn color="warning" icon="mdi-sync" @click="reloadDb()">Reload Database</icon-btn>
      </v-flex>
    </v-layout>
</template>

<script lang="coffee">
  import IconBtn from '../IconBtn.vue'

  export default
    components: { IconBtn }
    methods:
      reloadDb: () ->
        this.$socket.emit('ADMIN_RELOAD_DATABASE')
</script>