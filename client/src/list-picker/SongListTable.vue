<template>
    <v-row justify="center" align="center">
        <v-col cols="4">
            <v-text-field clearable label="Anime" v-model="filter.anime" hide-details
                          :id="`filter-anime-${id}`"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field clearable label="Song" v-model="filter.song" hide-details
                          :id="`filter-song-${id}`"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-select :items="typeFilterItems" label="Type" v-model="filter.type" hide-details
                      :id="`filter-type-${id}`"></v-select>
        </v-col>
        <v-col cols="12">
            <v-data-table
                :items="displayData()" :headers="headers"
                disable-filtering disable-pagination disable-sort
                hide-default-footer dense
            >
                <template #item.anime="{ item }">
                    <span :id="`name-${item.songId}-${id}`">{{item.anime[0]}}</span>
                </template>

                <template #item.src="{ item }">
                    <a :href="item.src" target="_blank">View</a>
                </template>

                <template #item.title="{ item }">
                    <span :id="`title-${item.songId}-${id}`">{{ item.title }}</span>
                </template>

                <template #item.type="{ item }">
                    <span :id="`type-${item.songId}-${id}`">{{ item.type }}</span>
                </template>

                <template #item.action="{ item }">
                    <slot name="action" :props="item">
                        <table-btn
                            color="success" icon="mdi-plus"
                            :disabled="disableAddBtn(item)" :id="`add-${item.songId}-${id}`"
                            @click="addUserSong(item)"
                        ></table-btn>

                        <table-btn
                            color="error" icon="mdi-minus"
                            :disabled="disableRemoveBtn(item)" :id="`remove-${item.songId}-${id}`"
                            @click="removeUserSong(item)"
                        ></table-btn>

                        <table-btn
                            color="warning" icon="mdi-pencil-plus"
                            v-if="showEditBtns()" :id="`edit-${item.songId}-${id}`"
                            @click="editSong(item)"
                        ></table-btn>

                        <table-btn
                            color="error" icon="mdi-delete"
                            v-if="showEditBtns()" :id="`delete-${item.songId}-${id}`"
                            @click="deleteSong(item)"
                        ></table-btn>
                    </slot>
                </template>
            </v-data-table>
        </v-col>
        <v-col cols="10">
            <v-pagination :length="maxPage" v-model="currentPage" total-visible="10"></v-pagination>
        </v-col>
        <v-col cols="2">
            <v-select :items="paginationItems" v-model="itemsPerPage"></v-select>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
    import {SongObj} from '../assets/interfaces'
    import TableBtn from '../components/buttons/TableBtn.vue'

    @Component({
        components: {TableBtn}
    })
    export default class SongListTable extends Vue {
        @Prop(String) id!: string
        @Prop(Array) data!: Array<SongObj>
        @Prop({type: Boolean, default: false}) showEdit!: boolean

        filter = {
            song: '',
            anime: '',
            type: 'All'
        }

        typeFilterItems = ['All', 'OP', 'ED', 'Insert']

        headers = [
            {text: 'Anime', value: 'anime', sortable: false},
            {text: 'Song', value: 'title', sortable: false},
            {text: 'Type', value: 'type', sortable: false, width: 100},
            {text: 'Link', value: 'src', sortable: false, width: 80},
            {text: 'Action', value: 'action', sortable: false, width: this.actionWidth}
        ]

        paginationItems = [5, 10, 15, 20]
        itemsPerPage = 10
        maxPage = 1
        currentPage = 1

        displayData(): Array<SongObj> {
            let filteredData = this._filterData()
            this.maxPage = Math.ceil(filteredData.length / this.itemsPerPage)
            if (this.currentPage > this.maxPage) {
                this.currentPage = 1
            }
            let startIndex = (this.currentPage - 1) * this.itemsPerPage
            let endIndex = startIndex + this.itemsPerPage
            return filteredData.slice(startIndex, endIndex)
        }

        _filterData(): Array<SongObj> {
            let {songFilter, animeFilter, typeFilter} = this._getFilters()
            return this.data.filter((song: SongObj): SongObj | undefined => {
                let animes = song.anime.join(',').toLowerCase()
                let title = song.title.toLowerCase()
                let type = song.type.toLowerCase()
                if (animes.includes(animeFilter) && title.includes(songFilter) && type.includes(typeFilter)) {
                    return song
                }
            })
        }

        _getFilters() {
            let songFilter = ''
            let animeFilter = ''
            let typeFilter = ''
            if (this.filter.song) {
                songFilter = this.filter.song.trim().toLowerCase()
            }
            if (this.filter.anime) {
                animeFilter = this.filter.anime.trim().toLowerCase()
            }
            if (this.filter.type && this.filter.type != 'All') {
                typeFilter = this.filter.type.trim().toLowerCase()
            }

            return {songFilter, animeFilter, typeFilter}
        }

        disableAddBtn(song: SongObj): boolean {
            if (this.$store.state.list.userList.has(song.songId) || !this.$store.state.list.user) {
                return true
            }
            return false
        }

        disableRemoveBtn(song: SongObj): boolean {
            if (!this.$store.state.list.userList.has(song.songId) || !this.$store.state.list.user) {
                return true
            }
            return false
        }

        showEditBtns(): boolean {
            return (this.$store.state.client.admin && this.showEdit)
        }

        @Emit('add-user-song')
        addUserSong(song: SongObj): SongObj {
            return song
        }

        @Emit('remove-user-song')
        removeUserSong(song: SongObj): SongObj {
            return song
        }

        @Emit('delete-song')
        deleteSong(song: SongObj): SongObj {
            return song
        }

        @Emit('edit-song')
        editSong(song: SongObj): SongObj {
            return song
        }

        get actionWidth(): number {
            if (this.showEditBtns()) {
                return 200
            }
            return 120
        }
    }
</script>