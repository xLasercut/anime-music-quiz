<template>
  <v-form ref="loginForm">
    <form-heading>User List</form-heading>
    <form-input-password v-model.trim="form.password" @enter="login()" :disabled="disabled"></form-input-password>
    <login-btn @click="login()" :disabled="disabled"></login-btn>
  </v-form>
</template>

<script lang="ts">
    import FormInputPassword from "./form/FormInputPassword.vue"
    import LoginBtn from "./form/LoginBtn.vue"
    import FormHeading from "./form/FormHeading.vue"
    import {sendNotification} from '@/assets/notification'
    import {createComponent, reactive, ref, toRefs} from "@vue/composition-api"

    let password = ""
    if (process.env.NODE_ENV === "development") {
        password = "password"
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
                }
            })

            let loginForm: any = ref(null)

            const socket = context.root.$socket

            function login(): void {
                let valid = loginForm.value.validate()
                if (valid) {
                    state.disabled = true
                    socket.client.open()
                    socket.client.emit(
                        "AUTHENTICATE",
                        state.form.password,
                        (auth: boolean): void => {
                            state.disabled = false
                            if (auth) {
                                socket.client.emit("LOGIN_LIST")
                                context.root.$router.push("/list-picker")
                            } else {
                                sendNotification("error", "Incorrect server password")
                            }
                        }
                    )
                }
            }

            return {...toRefs(state), login, loginForm}
        }
    })
</script>