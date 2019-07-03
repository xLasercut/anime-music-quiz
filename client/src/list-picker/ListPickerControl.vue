<template>
  <v-toolbar-items v-if="$route.path == '/list-picker'">
    <list-selector></list-selector>
    <nav-btn color="warning" @click="reload()" icon="mdi-sync" id="full-list-reload-btn">
      Reload
    </nav-btn>
    <user-list></user-list>
  </v-toolbar-items>
</template>

<script lang="coffee">
  import ListSelector from './ListSelector.vue'
  import NavBtn from '../components/buttons/NavBtn.vue'
  import UserList from './UserList.vue'

  export default
    components: { ListSelector, NavBtn, UserList }
    methods:
      reload: () ->
        this.$socket.emit('SYNC_FULL_LIST')
</script>