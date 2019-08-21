<template>
  <v-col cols="auto">
    <v-tooltip
      v-model="show" :color="player.color" min-width="160" max-width="160"
      top transition="slide-y-reverse-transition"
    >
      <template #activator="{ on }">
        <div class="player-card">
          <player-avatar :player="player" />
          <v-row justify="center">
            <v-sheet class="player-name" :color="theme">
              {{player.username}}
            </v-sheet>
            <v-sheet class="player-score" :color="theme">
              {{player.score}}
            </v-sheet>
          </v-row>
        </div>
      </template>
      {{guess('anime')}} - {{guess('song')}}
    </v-tooltip>
  </v-col>
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
    computed:
      theme: () ->
        if this.$vuetify.theme.dark
          return 'rgb(33, 33, 33)'
        return 'rgb(224, 224, 224)'
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