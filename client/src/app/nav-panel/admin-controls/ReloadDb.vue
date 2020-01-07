<template>
    <v-row justify="center">
        <v-col cols="auto">
            <icon-btn color="warning" icon="mdi-sync" @click="reload()">Reload AMQ Database</icon-btn>
        </v-col>
        <v-col cols="auto">
            <icon-btn color="info" icon="mdi-sync" @click="resetPriority()">Reset Priority List</icon-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import IconBtn from '../../../components/buttons/IconBtn.vue'
    import {createComponent} from '@vue/composition-api'

    export default createComponent({
        components: {
            IconBtn
        },
        setup(_props, context) {
            function reload(): void {
                context.root.$socket.client.emit('ADMIN_RELOAD_DATABASE')
            }

            function resetPriority(): void {
                context.root.$socket.client.emit('ADMIN_RESET_PRIORITY_LIST')
            }

            return {reload, resetPriority}
        }
    })
</script>