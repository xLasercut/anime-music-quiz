<template>
  <v-container fluid grid-list-lg>
    <game-form v-if="displayForm('game')"></game-form>
    <list-form v-if="displayForm('list')"></list-form>
  </v-container>
</template>

<script lang="coffee">
  import IconBtn from '../components/shared/IconBtn.vue'
  import GameForm from '../components/login/GameForm.vue'
  import ListForm from '../components/login/ListForm.vue'

  export default
    components: { GameForm, ListForm, IconBtn }
    methods:
      displayForm: (type) ->
        if this.$store.state.mode == type
          return true
        return false
    mounted: () ->
      if this.$socket.connected
        this.$socket.close()
        this.$store.commit('list/DISCONNECT')
        this.$store.commit('game/DISCONNECT')
</script>