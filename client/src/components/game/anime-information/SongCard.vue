<template>
  <v-flex xs12 sm3>
    <v-card elevation="0" :color="$store.getters.color">
      <slot></slot>
    </v-card>
  </v-flex>
</template>