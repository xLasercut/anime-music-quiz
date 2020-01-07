<template>
    <v-btn @click="$emit('click')" depressed v-on="activator" v-bind="$attrs">
        <slot></slot>
        <v-icon right>
            {{icon}}
        </v-icon>
    </v-btn>
</template>

<script lang="ts">
    import {createComponent} from '@vue/composition-api'

    export default createComponent({
        props: {
            icon: {
                type: String
            },
            activator: {}
        }
    })
</script>