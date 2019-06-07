<template>
  <v-layout justify-center wrap>
    <v-flex shrink v-for="avatar in avatars" :key="`avatar_${avatar}`">
      <input :id="`avatar_${avatar}`" type="radio" :value="avatar" v-model="model">
      <label :for="`avatar_${avatar}`"><img :src="`img/avatar/${avatar}.png`"></label>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../../assets/mixins/v-model.coffee'

  export default
    props: ['avatars'],
    mixins: [ VModel ]
</script>

<style scoped>
  input {
    display: none;
  }

  input:checked + label img {
    outline: 4px solid var(--v-success-base);
  }

  img {
    cursor: pointer;
  }
</style>