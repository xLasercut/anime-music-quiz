<template>
  <v-flex xs3>
    <v-card elevation="0" :color="$store.getters.color">
      <slot></slot>
    </v-card>
  </v-flex>
</template>