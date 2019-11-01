<template>
  <v-toolbar-items>
    <div class="selector-container">
      <v-select
        :items="$store.state.list.users" label="List"
        class="mt-5" height="30px" id="user-list-select"
        hide-details @change="changeUser($event)"
      ></v-select>
    </div>
    <user-list></user-list>
    <nav-btn color="warning" @click="reload()" icon="mdi-sync" id="song-list-reload-btn"></nav-btn>
  </v-toolbar-items>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBtn from '../components/buttons/NavBtn.vue'
import UserList from './UserList.vue'

@Component({
  components: { NavBtn, UserList }
})
export default class ListPickerControls extends Vue {
  reload(): void {
    this.$socket.client.emit('GET_FULL_LIST')
  }

  changeUser(user: string): void {
    this.$store.commit('UPDATE_USER', user)
    this.$socket.client.emit('GET_USER_LIST', user)
  }
}
</script>

<style scoped>
.selector-container {
  width: 200px;
}
</style>