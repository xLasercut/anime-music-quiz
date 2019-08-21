<template>
  <v-btn
    small icon
    @click="$emit('click')"
    v-bind="$attrs"
  >
    <v-icon size="12pt"><slot></slot></v-icon>
  </v-btn>
</template>