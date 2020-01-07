<template>
    <v-toolbar-items>
        <dialog-btn nav icon="mdi-shield-account" color="warning" v-model="show" v-if="$store.state.client.admin"
                    @click="reload()" id="admin-btn">
            <v-row justify="space-between" no-gutters>
                <v-col cols="auto">Admin</v-col>
                <v-col cols="auto">
                    <dialog-close-btn @click="show = false"></dialog-close-btn>
                </v-col>
            </v-row>
            <reload-db></reload-db>
            <system-message></system-message>
            <player-options></player-options>
            <song-answer></song-answer>
        </dialog-btn>
    </v-toolbar-items>
</template>

<script lang="ts">
    import DialogBtn from '../../components/buttons/DialogBtn.vue'
    import DialogCloseBtn from '../../components/buttons/DialogCloseBtn.vue'
    import ReloadDb from './admin-controls/ReloadDb.vue'
    import SystemMessage from './admin-controls/SystemMessage.vue'
    import PlayerOptions from './admin-controls/PlayerOptions.vue'
    import SongAnswer from './admin-controls/SongAnswer.vue'
    import {createComponent, ref} from '@vue/composition-api'

    export default createComponent({
        components: {
            DialogBtn, DialogCloseBtn, ReloadDb, SystemMessage, PlayerOptions, SongAnswer
        },
        setup(_props, context) {
            let show = ref(false)

            function reload(): void {
                context.root.$socket.client.emit('GET_PLAYER_LIST')
            }

            return {show, reload}
        }
    })
</script>