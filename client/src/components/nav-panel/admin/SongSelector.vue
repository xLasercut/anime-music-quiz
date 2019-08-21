<template>
  <v-row>
    <v-col cols="6">
      <v-text-field
        label="Anime"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="Song"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-select
        :items="songList"
      ></v-select>
    </v-col>
    <v-col cols="auto">
      <v-btn>Send</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  export default
    sockets:
      SYNC_FULL_LIST: (data) ->
        this.songList = data
    data: () ->
      songList: []
</script>