<template>
  <v-row justify="center">
    <v-col cols="5">
      <v-select filled
        :items="items()"
        item-text="username"
        item-value="id"
        :hint="id"
        v-model="id"
      >
      </v-select>
    </v-col>
    <v-col cols="4">
      <v-text-field label="New Name" v-model="newName"></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-btn block depressed color="warning" @click="changeName()">Change Name</v-btn>
    </v-col>
  </v-row>
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