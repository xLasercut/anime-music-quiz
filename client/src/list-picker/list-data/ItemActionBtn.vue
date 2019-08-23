<template>
  <v-btn
    depressed x-small
    @click="$emit('click')"
    v-bind="$attrs"
  >
    <v-icon size="12pt"><slot></slot></v-icon>
  </v-btn>
</template>