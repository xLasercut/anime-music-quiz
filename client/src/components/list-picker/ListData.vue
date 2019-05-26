<template>
  <el-row>
    <el-table :data="data">
      <el-table-column
        prop="name"
        label="Anime"
      >
      </el-table-column>
      <el-table-column label="Song">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <!--<el-table-column label="Artist">
        <template slot-scope="scope">
          {{ scope.row.artist }}
        </template>
      </el-table-column>-->
      <el-table-column label="Type" width="100">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="Link">
        <template slot-scope="scope" width="100">
          <a :href="scope.row.src" target="_blank"><i class="el-icon-link"></i> View</a>
        </template>
      </el-table-column>
      <el-table-column label="Action" width="100">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-circle-plus-outline" size="medium"
            v-if="!inUserList(scope.row)"
            @click="addAnime(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete" size="medium"
            v-if="inUserList(scope.row)"
            @click="removeAnime(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      },
      userList: {
        type: Array,
        required: true
      }
    },
    methods: {
      inUserList(anime) {
        for (var item of this.userList) {
          if (item.name === anime.name && anime.src === item.src) {
            return true
          }
        }
        return false
      },
      addAnime(anime) {
        this.$emit('add-anime', anime)
      },
      removeAnime(anime) {
        this.$emit('remove-anime', anime)
      }
    }
  }
</script>
