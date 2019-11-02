<template>
  <v-container fluid>
    <v-card>
      <v-container fluid>
        <emoji-data-table></emoji-data-table>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EmojiDataTable from '../misc/EmojiDataTable.vue'

@Component({
  components: { EmojiDataTable }
})
export default class MiscOps extends Vue {
  mounted() {
    if (this.$socket.disconnected) {
      this.$router.push('/')
    }
  }
}
</script>