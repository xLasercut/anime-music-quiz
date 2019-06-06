<template>
  <v-flex xs4 lg2>
    <v-tooltip v-model="show" :color="color()" min-width="160" max-width="160" top>
      <template #activator="{ on }">
        <div class="player-card">
          <img :src="`img/avatar/${player.avatar}.png`" :style="imgStyle(player)">
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
  export default
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
      imgStyle: (player) ->
        if player.host
          return { outline: '4px solid #E6A23C' }
      color: () ->
        if this.player.scoreGained == 2
          return 'success'
        else if this.player.scoreGained == 1
          return 'warning'
        return 'error'
      guess: (type) ->
        if !this.player.guess[type]
          return '...'
        return this.player.guess[type]
</script>

<style scoped>
  .player-card {
    width: 100%;
    text-align: center;
  }

  img {
    width: 100%;
    max-width: 100px;
    margin: 0;
    padding: 0;
  }

  .player-name {
    width: 100% ;
    max-width: 150px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 5px;
    word-wrap: break-word;
  }

  .player-score {
    width: 100%;
    max-width: 50px;
    font-size: 12pt;
    background: #E4E7ED;
    border-radius: 0 0 20px 20px;
  }

  .v-tooltip__content {
    word-wrap: break-word;
    font-size: 12pt;
  }
</style>