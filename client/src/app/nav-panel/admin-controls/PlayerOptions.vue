<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-text-field label="New Name" filled clearable v-model="newName"></v-text-field>
    </v-col>
    <v-col cols="auto">
      <v-select filled :items="items" label="Player" v-model="sid" item-text="username" item-value="sid" :hint="sid" persistent-hint></v-select>
    </v-col>
    <v-col cols="auto">
      <icon-btn color="error" icon="mdi-delete" @click="kickPlayer()">Kick</icon-btn>
    </v-col>
    <v-col cols="auto">
      <icon-btn color="warning" icon="mdi-pencil" @click="changeName()">Change Name</icon-btn>
    </v-col>
  </v-row>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IconBtn from '../../../components/buttons/IconBtn.vue'

@Component({
  components: { IconBtn }
})
export default class PlayerOptions extends Vue {
  sid = ''

  newName = ''

  get items(): Array<{ username: string, sid: string }> {
    let players = this.$store.state.game.players
    let validPlayers = []
    for (let sid in players) {
      if (!players[sid].admin) {
        validPlayers.push({
          username: players[sid].username,
          sid: sid
        })
      }
    }
    return validPlayers
  }

  kickPlayer(): void {
    this.$socket.client.emit('ADMIN_KICK_PLAYER', this.sid)
  }

  changeName(): void {
    if (this.newName) {
      this.$socket.client.emit('ADMIN_CHANGE_PLAYER_NAME', this.sid, this.newName)
      this.newName = ''
    }
  }
}

</script>