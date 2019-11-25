<template>
    <v-app>
        <game-notification></game-notification>
        <nav-panel></nav-panel>
        <router-view></router-view>
    </v-app>
</template>

<script lang="ts">
    import NavPanel from "./app/NavPanel.vue"
    import GameNotification from "./app/GameNotification.vue"
    import {BannerColor} from "./assets/types"
    import {sendNotification} from "./assets/notification"
    import {createComponent} from "@vue/composition-api"

    export default createComponent({
        components: {
            GameNotification,
            NavPanel
        },
        sockets: {
            SYSTEM_NOTIFICATION(type: BannerColor, msg: string): void {
                sendNotification(type, msg)
            }
        },
        setup(_props, context) {
        }
    })
</script>

<style>
    .v-application {
        background-color: var(--v-background-base) !important;
    }

    .v-input__slot {
        background-color: var(--v-background-darken1) !important;
    }

    .v-textarea .v-input__slot {
        background-color: var(--v-background-base) !important;
    }

    .v-sheet {
        background-color: var(--v-background-darken1) !important;
    }

    .v-data-table {
        background-color: var(--v-background-darken1) !important;
    }

    .v-data-table tr:hover {
        background-color: var(--v-background-base) !important;
    }

    .v-pagination__item {
        background-color: var(--v-background-base) !important;
    }

    .v-pagination__item:hover {
        background-color: var(--v-primary-base) !important;
    }

    .v-pagination__navigation {
        background-color: var(--v-background-base) !important;
    }

    .v-pagination__navigation:hover {
        background-color: var(--v-primary-base) !important;
    }

    .v-list-item--link:hover {
        background-color: var(--v-background-base) !important;
    }

    .v-slider__thumb-container {
        cursor: pointer;
    }
</style>