<template>
  <v-row justify="center" class="pagination-container" no-gutters>
    <v-col cols="8">
      <v-pagination
        v-model="model.currentPage"
        :length="maxPage()"
        total-visible="10"
      >
      </v-pagination>
    </v-col>
    <v-col cols="2">
      <v-select height="22px" label="Page Size" :items="pageSizes" v-model="model.pageSize" hide-details></v-select>
    </v-col>
  </v-row>
</template>

<script lang="coffee">
  import VModel from '../assets/mixins/v-model.coffee'

  export default
    mixins: [ VModel ]
    props: [ 'length' ]
    data: () ->
      pageSizes: [5, 10, 15, 20]
    methods:
      maxPage: () ->
        if this.length < this.model.currentPage
          this.model.currentPage = 1
        return this.length
</script>


<style scoped>

  i {
    font-size: 5pt;
  }
</style>