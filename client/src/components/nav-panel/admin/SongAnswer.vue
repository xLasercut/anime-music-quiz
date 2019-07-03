<template>
  <v-layout>
    <v-flex xs12>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Answer</div>
          <v-card>
            <v-card-text>
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
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>
