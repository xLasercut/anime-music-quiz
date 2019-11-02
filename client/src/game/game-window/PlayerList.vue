<template>
  <v-row justify="center">
    <player-card v-for="(player, key) in $store.state.game.players" :key="key" :player="player"></player-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlayerCard from './player-list/PlayerCard.vue'

@Component({
  components: { PlayerCard }
})
export default class PlayerList extends Vue {

}
</script>