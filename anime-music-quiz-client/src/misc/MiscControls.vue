<template>
  <v-toolbar-items>
    <nav-btn color="warning" icon="mdi-sync" @click="reload()"></nav-btn>
  </v-toolbar-items>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBtn from '../components/buttons/NavBtn.vue'

@Component({
  components: { NavBtn }
})
export default class MiscControls extends Vue {
  reload(): void {
    this.$socket.client.emit('GET_EMOJI_DATA')
  }
}
</script>