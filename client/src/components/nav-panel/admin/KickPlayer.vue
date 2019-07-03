<template>
  <v-layout justify-center wrap>
    <v-flex>
      <v-select box
        :items="items()"
        item-text="username"
        item-value="id"
        :hint="id"
        v-model="id"
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
      id: ''
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
        this.$socket.emit('ADMIN_KICK_PLAYER', this.id)
</script>