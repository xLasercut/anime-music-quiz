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
  import EmojiDataTable from '../misc/EmojiDataTable.vue'
  import { createComponent, onMounted } from '@vue/composition-api'

  export default createComponent({
    components: {
      EmojiDataTable
    },
    setup(_props, context) {
      onMounted(() => {
        if (context.root.$socket.disconnected) {
          context.root.$router.push('/')
        }
      })
    }
  })
</script>