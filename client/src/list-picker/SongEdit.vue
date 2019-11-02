<template>
  <v-card>
    <v-container fluid>
      <v-row justify="space-between" no-gutters>
        <v-col cols="auto">Song Edit</v-col>
        <v-col cols="auto"><dialog-close-btn id="add-song-to-list-cancel" @click="$emit('cancel-edit')"></dialog-close-btn></v-col>
      </v-row>
      <song-edit-anime-input v-model="model.anime"></song-edit-anime-input>
      <v-row justify="center">
        <song-edit-input
          v-model.trim="model.src"
          label="Source" id="add-song-to-list-src"
        ></song-edit-input>
        <song-edit-input
          v-model.trim="model.title"
          label="Title" id="add-song-to-list-title"
        ></song-edit-input>
        <song-edit-input
          v-model.trim="model.artist"
          label="Artist" id="add-song-to-list-artist"
        ></song-edit-input>
        <song-edit-input
          v-model.trim="model.type"
          label="Type" id="add-song-to-list-type"
        ></song-edit-input>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <icon-btn color="success" icon="mdi-check" id="add-song-to-list-confirm" @click="$emit('confirm-edit')">Confirm</icon-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { SongObj } from '../assets/interfaces'
import DialogCloseBtn from '../components/buttons/DialogCloseBtn.vue'
import SongEditInput from './song-edit/SongEditInput.vue'
import SongEditAnimeInput from './song-edit/SongEditAnimeInput.vue'
import IconBtn from '../components/buttons/IconBtn.vue'

@Component({
  components: { DialogCloseBtn, SongEditInput, SongEditAnimeInput, IconBtn }
})
export default class SongEdit extends Vue {
  @Prop() value!: SongObj

  model = this.value

  @Watch('value')
  _onValueChange(val: SongObj): void {
    this.model = val
  }

  @Watch('model')
  @Emit('input')
  _onModelChange(val: SongObj): SongObj {
    return val
  }
}
</script>