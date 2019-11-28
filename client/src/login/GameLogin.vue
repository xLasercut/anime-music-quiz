<template>
    <v-form ref="loginForm">
        <form-heading>Game</form-heading>
        <form-input
            label="Display Name"
            v-model="form.username"
            :disabled="disabled"
            id="username-input"
            :rules="nameRules"
            @enter="login()"
            counter="20"
        ></form-input>
        <form-input-password v-model.trim="form.password" @enter="login()" :disabled="disabled"></form-input-password>
        <form-avatar :avatars="avatars" v-model.trim="form.avatar" :disabled="disabled"></form-avatar>
        <v-row justify="center">
            <v-col xs="6" sm="3" md="2">
                <v-text-field
                    label="Score"
                    v-model.number="form.score"
                    type="number"
                    filled
                    min="0"
                    max="200"
                    id="score-input"
                    :disabled="disabled"
                    :rules="scoreRules"
                ></v-text-field>
            </v-col>
        </v-row>
        <login-btn @click="login()" :disabled="disabled"></login-btn>
    </v-form>
</template>

<script lang="ts">
    import FormInputPassword from './form/FormInputPassword.vue'
    import FormInput from './form/FormInput.vue'
    import LoginBtn from './form/LoginBtn.vue'
    import FormHeading from './form/FormHeading.vue'
    import {sendNotification} from '@/assets/notification'
    import {USERNAME_FORMAT} from '../assets/config'
    import FormAvatar from './form/FormAvatar.vue'
    import {RawPlayerObj} from '../../../shared-modules/interfaces'

    import {createComponent, onMounted, reactive, ref, toRefs} from '@vue/composition-api'

    let password = ''
    if (process.env.NODE_ENV === 'development') {
        password = 'password'
    }

    export default createComponent({
        components: {
            FormInputPassword,
            LoginBtn,
            FormHeading,
            FormInput,
            FormAvatar
        },
        setup(_props, context) {
            const state = reactive({
                avatars: [
                    'zero_2',
                    'lelouch',
                    'horo',
                    'madoka',
                    'alphonse',
                    'misaka',
                    'miyu',
                    'taj'
                ],
                form: {
                    username: '',
                    password: password,
                    avatar: 'zero_2',
                    score: 0
                },
                disabled: false,
                nameRules: [
                    (v: string): boolean | string => !!v || 'Username required',
                    (v: string): boolean | string =>
                        USERNAME_FORMAT.test(v) ||
                        'Username can only contain: 0-9, A-Z, a-z and space',
                    (v: string): boolean | string =>
                        (v && v.length <= 20) || 'Username must be under 20 characters'
                ],
                scoreRules: [
                    (v: number): boolean | string =>
                        (v >= 0 && v <= 200) || 'Score must be between 0 and 200',
                    (v: number): boolean | string =>
                        Number.isInteger(v) || 'Score must be a number'
                ]
            })

            let loginForm: any = ref(null)

            const socket = context.root.$socket

            function login() {
                let valid = loginForm.value.validate()
                if (valid) {
                    state.disabled = true
                    localStorage.username = state.form.username
                    localStorage.avatar = state.form.avatar
                    socket.client.open()
                    socket.client.emit(
                        'AUTHENTICATE',
                        state.form.password,
                        (auth: boolean): void => {
                            state.disabled = false
                            if (auth) {
                                let inputInfo: RawPlayerObj = {
                                    username: state.form.username,
                                    avatar: state.form.avatar,
                                    score: state.form.score
                                }
                                socket.client.emit('LOGIN_GAME', inputInfo)
                                context.root.$store.commit('UPDATE_SID', socket.client.id)
                                context.root.$router.push('/game')
                            } else {
                                sendNotification('error', 'Incorrect server password')
                            }
                        }
                    )
                }
            }

            onMounted((): void => {
                if (localStorage.avatar && state.avatars.includes(localStorage.avatar)) {
                    state.form.avatar = localStorage.avatar
                }

                if (localStorage.username) {
                    state.form.username = localStorage.username
                }
            })

            return {...toRefs(state), login, loginForm}
        }
    })
</script>