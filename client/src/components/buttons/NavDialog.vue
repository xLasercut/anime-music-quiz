<template>
  <v-dialog :max-width="width" v-model="model" no-click-animation :persistent="persistent">
    <template v-slot:activator="{ on }">
      <nav-btn
        @click="$emit('click')"
        :activator="on"
        :id="id"
        v-show="showBtn"
        v-bind="$attrs"
      ></nav-btn>
    </template>
    <v-card>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'
  import NavBtn from './NavBtn.vue'

  export default
    mixins: [ VModel ]
    components: { NavBtn }
    props: {
      width: {}
      id: {}
      showBtn: { default: true }
      persistent: { default: false }
    }
</script>