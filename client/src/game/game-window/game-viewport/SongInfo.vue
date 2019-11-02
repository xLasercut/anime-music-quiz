<template>
  <v-col cols="12" sm="3" class="info-container">
    <v-card flat :class="themeclass()">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Title</v-list-item-title>
          <v-list-item-subtitle>{{songInfo('title')}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Artist</v-list-item-title>
          <v-list-item-subtitle>{{songInfo('artist')}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Type</v-list-item-title>
          <v-list-item-subtitle>{{songInfo('type')}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ThemeHelper } from '../../../assets/mixins'

@Component({})
export default class SongInfo extends Mixins(ThemeHelper) {
  show = false

  songInfo(key: string): string {
    if (this.show) {
      let output = this.$store.state.game.gameState.currentSong[key]
      if (output) {
        return output
      }
      return '...'
    }
    return '?'
  }
}
</script>

<style scoped>
.info-container {
  max-width: 300px;
  text-align: center;
}
</style>