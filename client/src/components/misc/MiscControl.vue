<template>
  <v-toolbar-items v-if="$route.path == '/misc'">
    <admin-panel></admin-panel>
    <nav-btn color="warning" @click="reload()" icon="mdi-sync">
      Reload
    </nav-btn>
  </v-toolbar-items>
</template>

<script lang="coffee">
  import NavBtn from '../shared/NavBtn.vue'
  import EventBus from '../../assets/mixins/event-bus.coffee'
  import AdminPanel from '../shared/AdminPanel.vue'

  export default
    components: { NavBtn, AdminPanel }
    methods:
      reload: () ->
        this.$store.commit('misc/UPDATE_LOADING', true)
        this.$socket.emit('SYNC_EMOJI_DATA')
</script>