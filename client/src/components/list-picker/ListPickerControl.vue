<template>
  <v-toolbar-items v-if="$route.path == '/list-picker'">
    <list-selector></list-selector>
    <nav-btn color="warning" @click="reload()" icon="fas fa-sync">
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

  export default
    components: { ListSelector, NavBtn, UserList }
    methods:
      reload: () ->
        EventBus.$emit('sync-full-list')
</script>