import ListFilter from '../../components/list-picker/ListFilter.vue'

export default
  components: { ListFilter }
  data: () ->
    filter: {
      anime: '',
      song: '',
      type: 'All'
    }
  methods:
    filteredData: (data) ->
      songfilter = ''
      animefilter = ''
      typefilter = ''
      if this.filter.song
        songfilter = this.filter.song.trim().toLowerCase()
      if this.filter.anime
        animefilter = this.filter.anime.trim().toLowerCase()
      if this.filter.type and this.filter.type != 'All'
        typefilter = this.filter.type.trim().toLowerCase()
      return data.filter( (anime) =>
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
