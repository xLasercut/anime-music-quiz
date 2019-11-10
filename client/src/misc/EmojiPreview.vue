<template>
  <div>
    <v-img :src="emoji.src" width="25pt" v-if="emoji.type === 'img'" aspect-ratio="1"></v-img>
    <span class="normal-emoji" v-else>{{emoji.src}}</span>
  </div>
</template>

<script lang="ts">
import { EmojiObj } from '../assets/interfaces'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    emoji: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>
.normal-emoji {
  font-size: 20pt;
}
</style>