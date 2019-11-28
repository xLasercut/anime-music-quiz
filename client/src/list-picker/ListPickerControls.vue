<template>
    <v-toolbar-items>
        <div class="selector-container">
            <v-select
                :items="$store.state.list.users" label="List"
                class="mt-5" height="30px" id="user-list-select"
                hide-details @change="changeUser($event)"
            ></v-select>
        </div>
        <user-list></user-list>
        <nav-btn color="warning" @click="reload()" icon="mdi-sync" id="song-list-reload-btn"></nav-btn>
    </v-toolbar-items>
</template>

<script lang="ts">
    import NavBtn from '../components/buttons/NavBtn.vue'
    import UserList from './UserList.vue'
    import {createComponent} from '@vue/composition-api'

    export default createComponent({
        components: {
            NavBtn,
            UserList
        },
        setup(_props, context) {
            function reload(): void {
                context.root.$socket.client.emit('GET_FULL_LIST')
            }

            function changeUser(user: string): void {
                context.root.$store.commit('UPDATE_USER', user)
                context.root.$socket.client.emit('GET_USER_LIST', user)
            }

            return {reload, changeUser}
        }
    })
</script>

<style scoped>
    .selector-container {
        width: 200px;
    }
</style>