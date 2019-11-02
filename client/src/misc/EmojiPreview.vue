<template>
  <div>
    <v-img :src="emoji.src" width="25pt" v-if="emoji.type === 'img'" aspect-ratio="1"></v-img>
    <span class="normal-emoji" v-else>{{emoji.src}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EmojiObj } from '../assets/interfaces'

@Component({})
export default class EmojiPreview extends Vue {
  @Prop({ type: Object, required: true }) emoji!: EmojiObj
}
</script>

<style scoped>
.normal-emoji {
  font-size: 20pt;
}
</style>