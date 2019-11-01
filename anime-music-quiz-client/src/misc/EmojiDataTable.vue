<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <v-text-field label="Command" v-model="filter.command" clearable hide-details id="filter-emoji"></v-text-field>
    </v-col>
    <v-col cols="auto">
      <add-emoji-dialog></add-emoji-dialog>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :items="displayData()" :headers="headers"
        hide-default-footer disable-filtering disable-sort dense
      >
        <template #item.command="{ item }">
          {{`:${item.command}:`}}
        </template>

        <template #item.emoji="{ item }">
          <emoji-preview :emoji="item"></emoji-preview>
        </template>

        <template #item.src="{ item }">
          <a :href="item.src" target="_blank" v-if="item.type === 'img'">{{item.src}}</a>
          <span v-else>{{item.src}}</span>
        </template>

        <template #item.action="{ item }">
          <table-btn
            :disabled="!$store.state.client.admin"
            color="error" icon="mdi-delete"
            @click="deleteEmoji(item)"
            :id="`${item.command}-delete`"
          >
            delete
          </table-btn>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="10">
      <v-pagination :length="maxPage" v-model="currentPage" total-visible="10"></v-pagination>
    </v-col>
    <v-col cols="2">
      <v-select v-model="itemsPerPage" :items="paginationItems"></v-select>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { EmojiObj } from '../assets/interfaces'
import TableBtn from '../components/buttons/TableBtn.vue'
import AddEmojiDialog from './AddEmojiDialog.vue'
import EmojiPreview from './EmojiPreview.vue'

@Component({
  components: { TableBtn, AddEmojiDialog, EmojiPreview }
})
export default class EmojiDataTable extends Vue {
  headers = [
    { text: 'Command', value: 'command' },
    { text: 'Emoji', value: 'emoji' },
    { text: 'Type', value: 'type' },
    { text: 'Source', value: 'src' },
    { text: 'Action', value: 'action', width: 100 }
  ]

  filter = {
    command: ''
  }

  paginationItems = [ 5, 10, 15, 20 ]
  itemsPerPage = 10
  maxPage = 1
  currentPage = 1

  _filterData(): Array<EmojiObj> {
    let { commandFilter } = this._getFilters()
    return this.$store.state.misc.emojiList.filter((emoji: EmojiObj): EmojiObj | undefined => {
      let command = emoji.command.toLowerCase()
      if (command.includes(commandFilter)) {
        return emoji
      }
    }).sort(this._sortEmoji)
  }

  _getFilters() {
    let commandFilter = ''
    if (this.filter.command) {
      commandFilter = this.filter.command.trim().toLowerCase()
    }

    return { commandFilter }
  }

  _sortEmoji(a: EmojiObj, b: EmojiObj): number {
    if (a.command > b.command) {
      return 1
    }
    return -1
  }

  deleteEmoji(emoji: EmojiObj): void {
    this.$socket.client.emit('DELETE_EMOJI', emoji)
  }

  displayData(): Array<EmojiObj> {
    let filteredData = this._filterData()
    this.maxPage = Math.ceil(filteredData.length / this.itemsPerPage)
    if (this.currentPage > this.maxPage) {
      this.currentPage = 1
    }
    let startIndex = (this.currentPage - 1) * this.itemsPerPage
    let endIndex = startIndex + this.itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }
}
</script>