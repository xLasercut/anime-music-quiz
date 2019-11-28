<template>
    <v-form ref="loginForm">
        <form-heading>Miscellaneous</form-heading>
        <form-input-password v-model.trim="form.password" @enter="login()" :disabled="disabled"></form-input-password>
        <login-btn @click="login()" :disabled="disabled"></login-btn>
    </v-form>
</template>

<script lang="ts">
    import FormInputPassword from './form/FormInputPassword.vue'
    import LoginBtn from './form/LoginBtn.vue'
    import FormHeading from './form/FormHeading.vue'
    import {sendNotification} from '@/assets/notification'
    import {createComponent, reactive, ref, toRefs} from '@vue/composition-api'

    let password = ''
    if (process.env.NODE_ENV === 'development') {
        password = 'password'
    }

    export default createComponent({
        components: {
            FormInputPassword,
            LoginBtn,
            FormHeading
        },
        setup(_props, context) {
            const state = reactive({
                disabled: false,
                form: {
                    password: password
                },
                loginForm: null
            })

            let loginForm: any = ref(null)

            const socket = context.root.$socket

            function login(): void {
                let valid = loginForm.value.validate()
                if (valid) {
                    state.disabled = true
                    socket.client.open()
                    socket.client.emit(
                        'AUTHENTICATE',
                        state.form.password,
                        (auth: boolean): void => {
                            state.disabled = false
                            if (auth) {
                                socket.client.emit('LOGIN_MISC')
                                context.root.$router.push('/misc')
                            } else {
                                sendNotification('error', 'Incorrect server password')
                            }
                        }
                    )
                }
            }

            return {...toRefs(state), login, loginForm}
        }
    })
</script>