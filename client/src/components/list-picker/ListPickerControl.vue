<template>
  <v-toolbar-items v-if="$route.path == '/list-picker'">
    <admin-panel></admin-panel>
    <list-selector></list-selector>
    <nav-btn color="warning" @click="reload()" icon="mdi-sync">
      Reload
    </nav-btn>
    <user-list></user-list>
  </v-toolbar-items>
</template>

<script lang="coffee">
  import ListSelector from './ListSelector.vue'
  import NavBtn from '../shared/NavBtn.vue'
  import UserList from './UserList.vue'
  import EventBus from '../../assets/mixins/event-bus.coffee'
  import AdminPanel from '../shared/AdminPanel.vue'

  export default
    components: { ListSelector, NavBtn, UserList, AdminPanel }
    methods:
      reload: () ->
        this.$store.commit('list/UPDATE_LOADING', true)
        this.$socket.emit('SYNC_FULL_LIST')
</script>