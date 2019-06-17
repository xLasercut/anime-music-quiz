<template>
  <v-flex shrink>
    <v-tooltip v-model="show" :color="player.color" min-width="160" max-width="160" top>
      <template #activator="{ on }">
        <div class="player-card">
          <player-avatar :player="player" />
          <v-layout column align-center>
            <v-sheet class="player-name" :color="$store.getters.color">
              {{player.username}}
            </v-sheet>
            <v-sheet class="player-score" :color="$store.getters.color">
              {{player.score}}
            </v-sheet>
          </v-layout>
        </div>
      </template>
      {{guess('anime')}} - {{guess('song')}}
    </v-tooltip>
  </v-flex>
</template>

<script lang="coffee">
  import PlayerAvatar from './PlayerAvatar.vue'

  export default
    components: { PlayerAvatar }
    props:
      player: {
        type: Object,
        required: true
      }
    data: () ->
      show: false
    sockets:
      SHOW_GUESS: () ->
        this.show = true
        setTimeout( () =>
          this.show = false
        , 8000)
    methods:
      guess: (type) ->
        if !this.player.guess[type]
          return '...'
        return this.player.guess[type]
</script>

<style scoped>
  .player-card {
    width: 160px;
    text-align: center;
    margin: 5px;
  }

  .player-name {
    width: 100% ;
    max-width: 150px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 5px;
    word-wrap: break-word;
    padding: 2px;
  }

  .player-score {
    width: 100%;
    max-width: 70px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 0 0 25px 25px;
  }

  .v-tooltip__content {
    word-wrap: break-word;
    font-size: 12pt;
  }
</style>