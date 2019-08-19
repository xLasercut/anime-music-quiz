<template>
  <v-row>
    <v-col cols="12">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Answer</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              Anime: <b>{{$store.state.game.currentSong.name}}</b>
            </p>
            <p>
              Title: <b>{{$store.state.game.currentSong.title}}</b>
            </p>
            <p>
              Artist: <b>{{$store.state.game.currentSong.artist}}</b>
            </p>
            <p>
              Type: <b>{{$store.state.game.currentSong.type}}</b>
            </p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>
