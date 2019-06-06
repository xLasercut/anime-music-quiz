<template>
  <v-layout justify-center wrap>
    <v-flex>
      <v-select
        :items="items()"
        item-text="username"
        item-value="id"
        v-model="playerToKick"
      >
      </v-select>
    </v-flex>
    <v-flex shrink>
        <v-btn depressed color="error" @click="kickPlayer()">Kick</v-btn>
      </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  export default
    data: () ->
      playerToKick: {}
    methods:
      items: () ->
        list = []
        for id, player of this.$store.state.game.players
          if !player.admin
            list.push({
              username: player.username,
              id: id
            })
        return list
      kickPlayer: () ->
        this.$socket.emit('ADMIN_KICK_PLAYER', this.playerToKick)
</script>