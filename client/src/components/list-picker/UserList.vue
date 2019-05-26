<template>
  <el-row>
    <el-dialog :visible.sync="dialog" :fullscreen="true" title="User List">
      <el-row>
        <el-button @click="download()" type="success" icon="el-icon-download">Download List</el-button>
      </el-row>
      <list-filter v-model="filter"></list-filter>
      <list-data
        :data="filteredData()" :user-list="data"
        @remove-anime="$emit('remove-anime', $event)"
      ></list-data>
    </el-dialog>
  </el-row>
</template>

<script>
  import ListData from './ListData.vue'
  import ListFilter from './ListFilter.vue'

  export default {
    components: {
      ListData,
      ListFilter
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      data: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        dialog: this.value,
        filter: {
          anime: '',
          song: ''
        }
      }
    },
    watch: {
      value(val) {
        this.dialog = val
      },
      dialog(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      filteredData () {
        if (this.filter.anime || this.filter.song) {
          var filtered = []
          var songfilter = new RegExp(this.filter.song, 'i')
          var animefilter = new RegExp(this.filter.anime, 'i')
          for (var anime of this.data) {
            if (animefilter.exec(anime.name) && songfilter.exec(anime.title)) {
              filtered.push(anime)
            }
          }
          return filtered
        }
        return this.data
      },
      download() {
        var jsonstring = JSON.stringify(this.data)
        let blob = new Blob(this.encodeString(jsonstring), {type: 'application/octet-stream'})
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'my-list.json'
        link.click()
      },
      encodeString(s) {
        var out = []
        for ( var i = 0; i < s.length; i++ ) {
          out[i] = s.charCodeAt(i)
        }
        return [new Uint8Array(out)]
      }
    }
  }
</script>