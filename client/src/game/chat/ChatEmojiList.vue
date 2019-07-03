<template>
  <v-list>
    <v-list-tile v-for="item in data" :key="item.command" @click="$emit('add-emoji', item.command)">
      <v-list-tile-avatar tile>
        <v-img :src="item.src" v-if="item.type == 'img'"/>
        <span v-if="item.type == 'dec'">{{item.src}}</span>
      </v-list-tile-avatar>
      <v-list-tile-content>
        {{command(item.command)}}
      </v-list-tile-content>
    </v-list-tile>
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