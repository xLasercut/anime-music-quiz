<template>
  <v-row justify="center">
    <v-col>
      <v-select filled
        :items="items()"
        item-text="username"
        item-value="id"
        :hint="id"
        v-model="id"
      >
      </v-select>
    </v-col>
    <v-col cols="auto">
      <v-btn depressed color="error" @click="kickPlayer()">Kick</v-btn>
    </v-col>
  </v-row>
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