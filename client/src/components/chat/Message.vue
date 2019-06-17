<template>
  <div class="message-line" :style="messageStyle">
    <div class="avatar-container">
      <v-avatar v-if="!message.repeat">
        <img :src="`img/avatar/${message.avatar}.png`" />
      </v-avatar>
    </div>
    <div class="text-container">
      <div class="username" :style="nameColor(message.admin)" v-if="!message.repeat">
        <b>{{message.user}}</b>
        <v-icon color="#E65100" v-if="message.admin">mdi-crown</v-icon>
      </div>
      <div class="text">{{message.message}}</div>
    </div>
  </div>
</template>

<script lang="coffee">
  export default
    props: [ 'message' ]
    computed:
      messageStyle: () ->
        if this.message.repeat
          return { 'margin-top': '0px' }
        return { 'margin-top': '10px' }
    methods:
      nameColor: (admin) ->
        if admin
          return { color: '#E65100' }
        return {}
</script>

<style scoped>
  .message-line {
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

  .username {
    width: 100%;
    float: left;
    padding-left: 10px;
    font-size: 14pt;
  }

  .text {
    width: 100%;
    float: left;
    padding-left: 10px;
    font-size: 12pt;
  }

</style>
