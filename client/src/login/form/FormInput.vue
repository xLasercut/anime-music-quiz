<template>
    <v-row justify="center" no-gutters>
        <v-col cols="12" sm="6">
            <v-text-field
                filled clearable :value="model" @input="handleChange"
                @click:append="$emit('click:append')"
                @keydown.enter.native="$emit('enter')"
                :rules="rules"
                :id="id" v-bind="$attrs"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {createComponent, reactive, toRefs, watch} from "@vue/composition-api"

    export default createComponent({
        props: {
            value: {
                type: String,
                default: ''
            },
            id: {
                type: String
            },
            rules: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        setup(props, context) {
            const state = reactive({
                model: props.value
            })

            watch((): void => {
                if (props.value) {
                    state.model = props.value.trim()
                }
                else {
                    state.model = ''
                }
            })

            function handleChange(val: string): void {
                if (val) {
                    context.emit('input', val.trim())
                }
                else {
                    context.emit('input', '')
                }
            }

            return {...toRefs(state), handleChange}
        }
    })
</script>