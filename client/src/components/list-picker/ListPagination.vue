<template>
  <v-layout>
    <v-flex xs12 class="text-xs-center">
      <v-pagination
        v-model="model"
        :length="maxPage()"
        total-visible="10"
      >
      </v-pagination>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'

  export default
    mixins: [ VModel ]
    props: [ 'length' ]
    methods:
      maxPage: () ->
        if this.length < this.model
          this.model = 1
        return this.length
</script>
