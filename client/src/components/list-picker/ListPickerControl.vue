<template>
  <v-toolbar-items v-if="$route.path == '/list-picker'">
    <list-selector></list-selector>
    <nav-btn color="warning" @click="reload()" icon="fas fa-sync">
      Reload
    </nav-btn>
    <user-list></user-list>
  </v-toolbar-items>
</template>

<script>
  import ListSelector from './ListSelector.vue'
  import NavBtn from '../shared/NavBtn.vue'
  import UserList from './UserList.vue'

  export default {
    components: { ListSelector, NavBtn, UserList },
    methods: {
      reload() {
        this.$store.commit('list/SYNC_FULL_LIST')
      }
    }
  }
</script>