<template>
  <v-layout justify-center wrap>
    <v-flex shrink v-for="avatar in avatars" :key="`avatar_${avatar}`">
      <input :id="`avatar_${avatar}`" type="radio" :value="avatar" v-model="model">
      <label :for="`avatar_${avatar}`">
        <v-avatar tile size="100px">
          <img :src="`img/avatar/${avatar}.png`">
        </v-avatar>
      </label>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../../assets/mixins/v-model.coffee'

  export default
    props: ['avatars']
    mixins: [ VModel ]
</script>

<style scoped>
  input {
    display: none;
  }

  img {
    outline: 1px solid black;
    cursor: pointer;
    transition: all 0.1s;
    background-color: white;
  }

  input:checked + label img {
    outline: 4px solid var(--v-success-base);
  }


</style>