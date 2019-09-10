<template>
  <v-container>
    <component :is="component"></component>
  </v-container>
</template>

<script lang="coffee">
  import GameForm from '../login/GameForm.vue'
  import ListForm from '../login/ListForm.vue'
  import MiscForm from '../login/MiscForm.vue'

  components = {
    'game': GameForm,
    'list': ListForm,
    'misc': MiscForm
  }

  export default
    components: { GameForm, ListForm, MiscForm }
    methods:
      displayForm: (type) ->
        if this.$store.state.mode == type
          return true
        return false
    computed:
      component: () ->
        return components[this.$store.state.mode]
    mounted: () ->
      if this.$socket.connected
        this.$socket.close()
      this.$store.commit('list/DISCONNECT')
      this.$store.commit('game/DISCONNECT')
      this.$store.commit('admin/DISCONNECT')
</script>