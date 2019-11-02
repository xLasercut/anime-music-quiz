<template>
  <div class="message-row" :style="messageStyle">
    <div class="avatar-container">
      <v-avatar v-if="!message.repeat">
        <v-img :src="imgSrc(message.avatar)" aspect-ratio="1"></v-img>
      </v-avatar>
    </div>
    <div class="text-container">
      <div class="chat-username" :style="nameColor" v-if="!message.repeat">
        <b>{{message.user}}</b>
        <v-icon color="#E65100" v-if="message.admin">mdi-crown</v-icon>
      </div>
      <div class="chat-text" v-html="message.text"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { AvatarHelper } from '../../assets/mixins'
import { ChatObj } from '../../../../shared-modules/interfaces'

@Component({})
export default class ChatMessage extends Mixins(AvatarHelper) {
  @Prop() message!: ChatObj

  get messageStyle(): object {
    if (this.message.repeat) {
      return { 'margin-top': '0px' }
    }
    return { 'margin-top': '10px' }
  }

  get nameColor() {
    if (this.message.admin) {
      return { color: '#E65100' }
    }
    return {}
  }
}
</script>

<style scoped>
.message-row {
  width: 100%;
  float: left;
}

.avatar-container {
  width: 48px;
  height: 100%;
  float: left;
  margin-top: 2px;
}

.text-container {
  width: calc(100% - 58px);
  float: left;
  white-space: pre-wrap;
}

.chat-username {
  width: 100%;
  float: left;
  padding-left: 10px;
  font-size: 14pt;
}

.chat-text {
  width: 100%;
  float: left;
  padding-left: 10px;
  font-size: 12pt;
}
</style>

<style>
  .emoji {
    padding: 0;
    margin: 0;
    width: 16pt;
    position: relative;
    top: 3px;
  }
</style>