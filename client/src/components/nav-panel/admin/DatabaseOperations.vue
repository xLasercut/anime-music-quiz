<template>
  <v-row justify="center">
    <v-col cols="auto">
      <icon-btn color="warning" icon="mdi-sync" @click="reloadDb()">Reload Database</icon-btn>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import IconBtn from '../../buttons/IconBtn.vue'

  export default
    components: { IconBtn }
    methods:
      reloadDb: () ->
        this.$socket.emit('ADMIN_RELOAD_DATABASE')

</script>