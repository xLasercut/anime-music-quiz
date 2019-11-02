<template>
  <v-row justify="center">
    <v-col cols="auto"><icon-btn color="warning" icon="mdi-sync" @click="reload()">Reload AMQ Database</icon-btn></v-col>
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
}
</script>