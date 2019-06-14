<template>
  <v-layout justify-center wrap class="pagination-container">
    <v-flex shrink>
      <v-pagination
        v-model="model.currentPage"
        :length="maxPage()"
        total-visible="10"
      >
      </v-pagination>
    </v-flex>
    <v-flex shrink>
      <v-select height="22px" label="Page Size" :items="pageSizes" v-model="model.pageSize"></v-select>
    </v-flex>
  </v-layout>
</template>

<script lang="coffee">
  import VModel from '../../assets/mixins/v-model.coffee'

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
  .pagination-container {
    height: 70px;
  }

  i {
    font-size: 5pt;
  }
</style>