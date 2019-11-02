<template>
  <v-row justify="center">
    <v-col>
      <v-text-field filled hide-details clearable label="Message" v-model.trim="msg" @keydown.enter.native="sendMsg()"></v-text-field>
    </v-col>
    <v-col cols="auto">
      <v-select filled hide-details :items="msgTypeChoices" v-model="msgType" label="Type"></v-select>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BannerColor } from '../../../assets/types'

@Component({})
export default class SystemMessage extends Vue {
  msgType: BannerColor = 'success'

  msgTypeChoices = [ 'success', 'warning', 'error' ]

  msg = ''

  sendMsg(): void {
    if (this.msg) {
      this.$socket.client.emit('ADMIN_SYSTEM_MESSAGE', this.msgType, this.msg)
      this.msg = ''
    }
  }
}
</script>