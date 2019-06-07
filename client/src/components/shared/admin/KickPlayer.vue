<template>
  <v-layout justify-center wrap>
    <v-flex>
      <v-select box
        :items="items()"
        item-text="username"
        item-value="id"
        :hint="hint()"
        return-object
        v-model="player"
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
    props: [ 'playerList' ]
    data: () ->
      player: { username: '', id: '' }
    methods:
      items: () ->
        list = []
        for id, player of this.playerList
          if !player.admin
            list.push({
              username: player.username,
              id: id
            })
        return list
      kickPlayer: () ->
        this.$socket.emit('ADMIN_KICK_PLAYER', this.player.id)
      hint: () ->
        return "name=#{this.player.username} id=#{this.player.id}"
</script>