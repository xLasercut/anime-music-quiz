<template>
    <v-container fluid>
        <v-card>
            <v-container fluid>
                <v-row justify="center" v-if="$store.state.client.admin">
                    <v-col cols="auto">
                        <icon-btn color="success" icon="mdi-playlist-plus" id="add-song-to-list-btn" @click="addSong()">
                            Add Song
                        </icon-btn>
                    </v-col>
                </v-row>
                <song-list-table
                    :data="$store.state.list.songList" id="main" show-edit
                    @add-user-song="addUserSong($event)"
                    @remove-user-song="removeUserSong($event)"
                    @edit-song="editSong($event)"
                    @delete-song="deleteSong($event)"
                ></song-list-table>
                <v-row>
                    <v-col>
                        <v-dialog v-model="show" width="800">
                            <song-edit v-model="song" @cancel-edit="show = false"
                                       @confirm-edit="confirmEdit()"></song-edit>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import SongListTable from '../list-picker/SongListTable.vue'
    import {SongObj} from '../assets/interfaces'
    import IconBtn from '../components/buttons/IconBtn.vue'
    import SongEdit from '../list-picker/SongEdit.vue'
    import {EditSongType} from '@/assets/types'

    @Component({
        components: {SongListTable, IconBtn, SongEdit}
    })
    export default class ListPicker extends Vue {
        song: SongObj = {
            songId: '',
            anime: [],
            src: '',
            title: '',
            artist: '',
            type: ''
        }

        show = false

        editType: EditSongType = 'add'

        addUserSong(song: SongObj): void {
            this.$socket.client.emit('ADD_USER_SONG', song, this.$store.state.list.user)
        }

        removeUserSong(song: SongObj): void {
            this.$socket.client.emit('REMOVE_USER_SONG', song, this.$store.state.list.user)
        }

        addSong(): void {
            this.editType = 'add'
            this._setSong({
                songId: '',
                anime: [],
                src: '',
                title: '',
                artist: '',
                type: ''
            })
            this.show = true
        }

        editSong(song: SongObj): void {
            this.editType = 'edit'
            this._setSong(song)
            this.show = true
        }

        deleteSong(song: SongObj): void {
            this.$socket.client.emit('ADMIN_DELETE_SONG', song)
        }

        confirmEdit() {
            if (this.editType === 'add') {
                this.$socket.client.emit('ADMIN_ADD_NEW_SONG', this.song)
            } else if (this.editType === 'edit') {
                this.$socket.client.emit('ADMIN_EDIT_SONG', this.song)
            }
            this.show = false
        }

        _setSong(song: SongObj): void {
            this.song = JSON.parse(JSON.stringify(song))
        }

        mounted() {
            if (this.$socket.disconnected) {
                this.$router.push('/')
            }
        }
    }
</script>