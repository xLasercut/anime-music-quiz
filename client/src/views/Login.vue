<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs6 class="text-xs-center">
        <icon-btn color="success" icon="fas fa-gamepad" @click="mode = 'game'">
          Game
        </icon-btn>
      </v-flex>
      <v-flex xs6 class="text-xs-center">
        <icon-btn color="info" icon="fas fa-list" @click="mode = 'list'">
          Song List
        </icon-btn>
      </v-flex>
    </v-layout>
    <game-form v-if="displayForm('game')"></game-form>
    <list-form v-if="displayForm('list')"></list-form>
  </v-container>
</template>

<script>
  import IconBtn from '../components/shared/IconBtn.vue'
  import GameForm from '../components/login/GameForm.vue'
  import ListForm from '../components/login/ListForm.vue'

  export default {
    components: { GameForm, ListForm, IconBtn },
    data() {
      return {
        gameSocket: this.$store.state.game.socket,
        listSocket: this.$store.state.list.socket,
        mode: 'game'
      }
    },
    methods: {
      displayForm(type) {
        if (this.mode === type) {
          return true
        }
        return false
      }
    },
    mounted() {
      if (this.gameSocket) {
        this.$store.commit('game/DISCONNECT')
      }

      if (this.listSocket) {
        this.$store.commit('list/DISCONNECT')
      }
    }
  }
</script>