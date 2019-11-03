<template>
  <v-row justify="center">
    <v-col cols="auto"><icon-btn color="warning" icon="mdi-sync" @click="reload()">Reload AMQ Database</icon-btn></v-col>
    <v-col cols="auto"><icon-btn color="info" icon="mdi-sync" @click="resetPriority()">Reset Priority List</icon-btn></v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IconBtn from '../../../components/buttons/IconBtn.vue'

@Component({
  components: { IconBtn }
})
export default class ReloadDb extends Vue {
  reload(): void {
    this.$socket.client.emit('ADMIN_RELOAD_DATABASE')
  }

  resetPriority(): void {
    this.$socket.client.emit('ADMIN_RESET_PRIORITY_LIST')
  }
}
</script>