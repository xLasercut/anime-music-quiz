<template>
  <v-row justify="center">
    <v-col cols="auto">
      <icon-btn color="warning" icon="mdi-sync" @click="reloadDb()">Reload Database</icon-btn>
    </v-col>
    <v-col cols="auto">
      <icon-btn color="success" icon="mdi-download" @click="downloadSongStats()">Download Song Stats</icon-btn>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import IconBtn from '../../buttons/IconBtn.vue'

  export default
    components: { IconBtn }
    methods:
      reloadDb: () ->
        this.$socket.emit('ADMIN_RELOAD_DATABASE')
      downloadSongStats: () ->
        this.$socket.emit('ADMIN_DOWNLOAD_SONG_STATS', null, (data) =>
          jsonstring = JSON.stringify(data, null, 2)
          blob = new Blob([jsonstring], {type: 'text/plain'})
          link = document.createElement('a')
          document.body.appendChild(link)
          link.setAttribute("type", "hidden")
          link.href = window.URL.createObjectURL(blob)
          link.download = 'song-stats.json'
          link.click()
        )
</script>