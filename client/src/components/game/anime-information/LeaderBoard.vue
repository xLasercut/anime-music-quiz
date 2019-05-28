<template>
  <song-card>
    <v-card-title>
      <div>
        <div>Players</div>
        <ol>
          <li v-for="(player, index) in $store.getters['game/playerScore']" :key="`score_${index}`">
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
    components: { SongCard }
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