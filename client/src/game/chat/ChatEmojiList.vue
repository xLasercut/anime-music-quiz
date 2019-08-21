<template>
  <v-list>
    <v-list-item v-for="item in data" :key="item.command" @click="$emit('add-emoji', item.command)">
      <v-list-item-avatar tile>
        <v-img :src="item.src" v-if="item.type == 'img'"/>
        <span v-if="item.type == 'dec'">{{item.src}}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        {{command(item.command)}}
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="coffee">
  export default
    props: [ 'data' ]
    methods:
      command: (val) ->
        if val
          return ":#{val}:"
        return ''
</script>