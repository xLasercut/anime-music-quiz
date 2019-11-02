<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-row align="center">
        <v-col>
          <v-text-field label="Anime" v-model.trim="anime" clearable filled hide-details id="add-song-to-list-anime"></v-text-field>
        </v-col>
        <v-col cols="auto">
          <icon-btn color="success" icon="mdi-plus" id="add-song-to-list-add-anime" @click="addAnime()">Add Anime</icon-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto" v-for="(item, index) in model" :key="`song-edit-${index}`">
      <v-chip color="primary" close @click="removeAnime(index)">{{item}}</v-chip>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import IconBtn from '../../components/buttons/IconBtn.vue'

@Component({
  components: { IconBtn }
})
export default class SongEditAnimeInput extends Vue {
  @Prop() value!: Array<string>

  model = this.value
  anime = ''

  @Watch('value')
  _onValueChange(val: Array<string>): void {
    this.model = val
  }

  @Watch('model')
  @Emit('input')
  _onModelChange(val: Array<string>): Array<string> {
    return val
  }

  removeAnime(index: number): void {
    this.model.splice(index, 1)
  }

  addAnime(): void {
    this.model.push(this.anime)
    this.anime = ''
  }
}
</script>