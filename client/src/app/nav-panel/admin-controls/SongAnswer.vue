<template>
    <v-row no-gutters>
        <v-col cols="12" class="admin-answer-container">
            <v-list>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Anime</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.game.gameState.currentSong.anime[0]}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Title</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.game.gameState.currentSong.title}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Artist</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.game.gameState.currentSong.artist}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Type</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.game.gameState.currentSong.type}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {createComponent} from '@vue/composition-api'

    export default createComponent({})
</script>

<style scoped>
    .admin-answer-container {
        text-align: center;
    }
</style>