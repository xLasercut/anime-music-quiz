<template>
    <v-container>
        <component :is="component"></component>
    </v-container>
</template>

<script lang="ts">
    import ListLogin from '../login/ListLogin.vue'
    import MiscLogin from '../login/MiscLogin.vue'
    import GameLogin from '../login/GameLogin.vue'
    import {computed, createComponent} from '@vue/composition-api'

    let componentMap: { [key: string]: any } = {
        game: GameLogin,
        list: ListLogin,
        misc: MiscLogin
    }

    export default createComponent({
        setup(_props, context) {
            const component = computed(() => {
                return componentMap[context.root.$store.state.client.loginMode]
            })

            return {component}
        }
    })
</script>