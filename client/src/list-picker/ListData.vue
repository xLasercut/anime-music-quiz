<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card tile flat>
        <v-container fluid>
          <list-filter :id="id" v-model="filter"></list-filter>
          <v-row no-gutters>
            <v-col>
              <v-data-table
                :items="filteredData()" :headers="headers"
                disable-filtering :items-per-page="5"
                :footer-props="footerProps"
              >
                <template #item.id="{ item }" >
                  <item-id :id="item.id" />
                </template>

                <template #item.src="{ item }">
                  <a :href="item.src" target="_blank">View</a>
                </template>

                <template #item.action="{ item }">
                  <slot name="action" :props="item">
                    <item-action-btn
                      color="success" @click="addAnime(item)"
                      :disabled="!$store.state.list.filename || inUserList(item)"
                      :id="`add-${item.id}-${id}`"
                    >
                      mdi-plus
                    </item-action-btn>
                    <item-action-btn
                      color="error"
                      @click="removeAnime(item)"
                      :disabled="!$store.state.list.filename || !inUserList(item)"
                      :id="`remove-${item.id}-${id}`"
                    >
                      mdi-minus
                    </item-action-btn>
                  </slot>
                </template>
              </v-data-table>
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
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Anime', value: 'name', sortable: false },
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
      footerProps: {
        'items-per-page-options': [5, 10, 15, 20]
      }
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
        return this.data.filter( (anime) =>
          names = "#{anime.name},#{anime.altName.join(',')}".toLowerCase()
          songName = anime.title.toLowerCase()
          type = anime.type.toLowerCase()
          if names.includes(animefilter) and songName.includes(songfilter) and type.includes(typefilter)
            return anime
        ).sort( (a, b) =>
          if a.name == b.name
            if a.title > b.title
              return 1
            else if a.title < b.title
              return -1
            return 0
          else
            if a.name > b.name
              return 1
            return -1
        )
      inUserList: (anime) ->
        for item in this.$store.state.list.userList
          if anime.id == item.id
            return true
        return false

      addAnime: (anime) ->
        this.$emit('add-anime', anime)
      removeAnime: (anime) ->
        this.$emit('remove-anime', anime)
</script>