<template>
  <v-layout justify-center wrap>
    <v-flex xs5>
      <v-select box
        :items="items()"
        item-text="username"
        item-value="id"
        :hint="id"
        v-model="id"
      >
      </v-select>
    </v-flex>
    <v-flex xs4>
      <v-text-field v-model="newName"></v-text-field>
    </v-flex>
    <v-flex xs3 class="text-xs-center">
      <v-btn block depressed color="warning" @click="changeName()">Change Name</v-btn>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  export default
    props: [ 'playerList' ]
    data: () ->
      id: '',
      newName: ''
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
      changeName: () ->
        this.$socket.emit('ADMIN_CHANGE_PLAYER_NAME', this.id, this.newName)
</script>