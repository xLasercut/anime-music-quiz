<template>
    <v-row justify="center">
        <v-col cols="auto">
            <h2>
                <slot></slot>
            </h2>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {createComponent} from '@vue/composition-api'

    export default createComponent({})
</script>