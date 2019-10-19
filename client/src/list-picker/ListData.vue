<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card tile flat>
        <v-container fluid>
          <list-filter :id="id" v-model="filter"></list-filter>
          <v-row no-gutters>
            <v-col>
              <v-data-table
                :items="displayData()" :headers="headers"
                disable-filtering disable-pagination
                hide-default-footer dense
              >
                <template #item.anime="{ item }">
                  {{item.anime[0]}}
                </template>

                <template #item.src="{ item }">
                  <a :href="item.src" target="_blank">View</a>
                </template>

                <template #item.action="{ item }">
                  <slot name="action" :props="item">
                    <item-action-btn
                      color="success" @click="addSong(item)"
                      :disabled="!$store.state.list.filename || inUserList(item)"
                      :id="`add-${item.songId}-${id}`"
                    >
                      mdi-plus
                    </item-action-btn>
                    <item-action-btn
                      color="error"
                      @click="removeSong(item)"
                      :disabled="!$store.state.list.filename || !inUserList(item)"
                      :id="`remove-${item.songId}-${id}`"
                    >
                      mdi-minus
                    </item-action-btn>

                    <item-action-btn
                      color="warning"
                      v-if="$store.state.admin.admin"
                      @click="editSong(item)"
                      :id="`edit-${item.songId}-${id}`"
                    >
                      mdi-pencil-plus
                    </item-action-btn>
                  </slot>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-pagination :length="maxPage" v-model="currentPage" total-visible="10"></v-pagination>
            </v-col>
            <v-col cols="2">
              <v-select v-model="itemsPerPage" :items="itemOptions"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import ItemId from './list-data/ItemId.vue'
  import ItemActionBtn from './list-data/ItemActionBtn.vue'
  import ListFilter from './ListFilter.vue'

  export default
    components: { ItemId, ItemActionBtn, ListFilter }
    props: [ 'data', 'id' ]
    data: () ->
      headers: [
        { text: 'Anime', value: 'anime', sortable: false },
        { text: 'Song', value: 'title', sortable: false },
        { text: 'Type', value: 'type', sortable: false, width: 100 },
        { text: 'Link', value: 'src', sortable: false, width: 80 },
        { text: 'Action', value: 'action', sortable: false, width: 140 }
      ],
      filter: {
        anime: '',
        song: '',
        type: 'All'
      },
      itemOptions: [5, 10, 15, 20],
      itemsPerPage: 10,
      maxPage: 1,
      currentPage: 1
    methods:
      filteredData: () ->
        songfilter = ''
        animefilter = ''
        typefilter = ''
        if this.filter.song
          songfilter = this.filter.song.trim().toLowerCase()
        if this.filter.anime
          animefilter = this.filter.anime.trim().toLowerCase()
        if this.filter.type and this.filter.type != 'All'
          typefilter = this.filter.type.trim().toLowerCase()
        return this.data.filter( (song) =>
          animes = "#{song.anime.join(',')}".toLowerCase()
          songName = song.title.toLowerCase()
          type = song.type.toLowerCase()
          if animes.includes(animefilter) and songName.includes(songfilter) and type.includes(typefilter)
            return song
        )
      displayData: () ->
        filteredData = this.filteredData()
        this.maxPage = Math.ceil(filteredData.length / this.itemsPerPage)
        if this.currentPage > this.maxPage
          this.currentPage = 1
        startIndex = (this.currentPage - 1) * this.itemsPerPage
        endIndex = startIndex + this.itemsPerPage
        return filteredData.slice(startIndex, endIndex)
      inUserList: (anime) ->
        if anime.songId in this.$store.state.list.userList
          return true
        return false
      addSong: (song) ->
        this.$emit('add-song', song)
      removeSong: (song) ->
        this.$emit('remove-song', song)
      editSong: (song) ->
        this.$emit('edit-song', song)
</script>