<template>
  <v-toolbar-items>
    <nav-btn color="warning" icon="mdi-sync" @click="reload()"></nav-btn>
  </v-toolbar-items>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBtn from '../components/buttons/NavBtn.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    NavBtn
  },
  setup(_props, context) {
    function reload(): void {
      context.root.$socket.client.emit('GET_EMOJI_DATA')
    }

    return { reload }
  }
})
</script>