<template>
    <form-input
        label="Server Password"
        v-model.trim="model"
        :rules="rules" :append-icon="icon"
        @click:append="togglePass()"
        @enter="$emit('enter')"
        :type="inputType"
        id="password-input"
        v-bind="$attrs"
    ></form-input>
</template>

<script lang="ts">
    import FormInput from './FormInput.vue'
    import {SERVER_PASSWORD_FORMAT} from '../../assets/config'
    import {computed, createComponent, reactive, toRefs, watch} from '@vue/composition-api'

    export default createComponent({
        components: {
            FormInput
        },
        props: {
            value: {}
        },
        setup(props, context) {
            const state = reactive({
                model: props.value,
                rules: [
                    (v: string): boolean | string => (!!v) || 'Server password required',
                    (v: string): boolean | string => SERVER_PASSWORD_FORMAT.test(v) || 'Valid characters A-Z, a-z, 0-9'
                ],
                showPass: false
            })

            watch(() => {
                context.emit('input', state.model)
            })

            const inputType = computed((): string => {
                if (state.showPass) {
                    return 'text'
                }
                return 'password'
            })

            const icon = computed((): string => {
                if (state.showPass) {
                    return 'mdi-eye-off'
                }
                return 'mdi-eye'
            })

            function togglePass(): void {
                state.showPass = !state.showPass
            }

            return {...toRefs(state), inputType, togglePass, icon}
        }
    })
</script>