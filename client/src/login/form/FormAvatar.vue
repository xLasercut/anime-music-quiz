<template>
  <v-row justify="center">
    <v-col cols="auto" v-for="avatar in avatars" :key="`avatar_${avatar}`">
      <input :id="`avatar_${avatar}`" type="radio" :value="avatar" v-model="model" :disabled="disabled">
      <label :for="`avatar_${avatar}`">
        <v-avatar tile size="100px">
          <v-img :src="imageSrc(avatar)" aspect-ratio="1"/>
        </v-avatar>
      </label>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'
  import AvatarMap from '../../assets/mixins/avatar-map.coffee'

  export default
    props: [ 'avatars', 'disabled' ]
    mixins: [ VModel, AvatarMap ]
</script>

<style scoped>
  input {
    display: none;
  }

  .v-image {
    outline: 1px solid black;
    cursor: pointer;
    transition: all 0.1s;
    background-color: white;
  }

  input:checked + label .v-image {
    outline: 4px solid #4caf50;
  }
</style>