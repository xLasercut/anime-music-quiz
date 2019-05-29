<template>
  <song-card>
    <v-card-title>
      <div>
        <div>Players</div>
        <ol>
          <li v-for="(player, index) in score()" :key="`score_${index}`">
            {{player.username}}: {{player.score}}
          </li>
        </ol>
      </div>
    </v-card-title>
  </song-card>
</template>

<script>
  import SongCard from './SongCard.vue'

  export default {
    components: { SongCard },
    methods: {
      score() {
        var players = []
        for (var key in this.$store.state.game.players) {
          players.push(this.$store.state.game.players[key])
        }

        return players.sort(function(a, b) {
          return b.score > a.score
        })
      }
    }
  }
</script>

<style scoped>
  ol {
    margin-left: 15px;
    padding: 0;
  }

  li {
    margin: 0;
    padding: 5px;
  }
</style>