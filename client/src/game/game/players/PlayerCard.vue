<template>
  <v-col cols="auto">
    <v-tooltip
      v-model="show" :color="player.color" min-width="160" max-width="160"
      top transition="slide-y-reverse-transition" z-index="1"
    >
      <template #activator="{ on }">
        <div class="player-card">
          <player-avatar :player="player" />
          <v-row justify="center" no-gutters>
            <v-sheet :class="themeClass('player-name')">
              {{player.username}}
            </v-sheet>
            <v-sheet :class="themeClass('player-score')">
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
  import ThemeHelper from '../../../assets/mixins/theme-helper.coffee'

  export default
    mixins: [ ThemeHelper ]
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