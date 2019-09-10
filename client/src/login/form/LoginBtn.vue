<template>
  <v-row justify="center" no-gutters>
    <v-col cols="auto">
      <icon-btn
        color="success" icon="mdi-login"
        @click="$emit('click')"
        id="login-btn" v-bind="$attrs"
      >
        Login
      </icon-btn>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import IconBtn from '../../components/buttons/IconBtn.vue'

  export default
    components: { IconBtn }
</script>