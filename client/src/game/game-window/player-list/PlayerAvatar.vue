<template>
  <v-row justify="center">
    <v-col cols="auto">
      <v-badge :color="badgeColor(player)" overlap left>
        <v-icon v-if="player.admin || player.host" color="white" slot="badge">mdi-crown</v-icon>
        <v-avatar tile size="100px">
          <v-img :src="imgSrc(player.avatar)" aspect-ratio="1"/>
        </v-avatar>
      </v-badge>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { AvatarHelper } from '../../../assets/mixins'
import { PlayerObj } from '../../../assets/interfaces'

@Component({})
export default class PlayerAvatar extends Mixins(AvatarHelper) {
  @Prop() player!: PlayerObj

  badgeColor(player: PlayerObj): string | undefined {
    if (player.admin) {
      return '#E65100'
    }

    if (player.host) {
      return '#0277BD'
    }
  }
}
</script>

<style scoped>
  .v-avatar {
    outline: 1px solid black;
    background-color: white;
  }
</style>