<template>
    <v-row justify="center">
        <v-col>
            <v-text-field filled hide-details clearable label="Message" v-model.trim="msg"
                          @keydown.enter.native="sendMsg()"></v-text-field>
        </v-col>
        <v-col cols="auto">
            <v-select filled hide-details :items="msgTypeChoices" v-model="msgType" label="Type"></v-select>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {createComponent, reactive, toRefs} from '@vue/composition-api'

    export default createComponent({
        setup(_props, context) {
            let state = reactive({
                msgTypeChoices: ['success', 'warning', 'error'],
                msg: '',
                msgType: 'success'
            })

            function sendMsg(): void {
                if (state.msg) {
                    context.root.$socket.client.emit('ADMIN_SYSTEM_MESSAGE', state.msgType, state.msg)
                    state.msg = ''
                }
            }

            return {...toRefs(state), sendMsg}
        }
    })
</script>