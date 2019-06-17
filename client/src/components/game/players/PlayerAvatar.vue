<template>
  <v-layout justify-center>
    <v-flex shrink>
      <v-badge :color="badgeColor(player)" overlap left>
        <v-icon v-if="player.admin || player.host" color="white" slot="badge">mdi-crown</v-icon>
        <v-avatar tile size="100px">
          <v-img :src="`img/avatar/${player.avatar}.png`" aspect-ratio="1"/>
        </v-avatar>
      </v-badge>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  export default
    props: [ 'player' ]
    methods:
      badgeColor: (player) ->
        if player.admin
          return '#E65100'
        if player.host
          return '#0277BD'
</script>

<style scoped>
  .v-avatar .v-image {
    outline: 1px solid black;
    background-color: white;
  }
</style>