<template>
  <el-col :span="8">
    <el-card class="leader-board" shadow="never">
      <el-row>Players</el-row>
      <ol>
        <li v-for="(player, index) in $store.getters.playerScore" :key="`score_${index}`">
          {{player.username}}: {{player.score}}
        </li>
      </ol>
    </el-card>
  </el-col>
</template>

<style scoped>
  .el-col {
    padding-right: 80px;
  }

  .leader-board {
    background: #E4E7ED;
    text-align: left;
  }

  ol {
    margin: 15px;
    padding: 0;
  }

  li {
    margin: 0;
    padding: 5px;
  }
</style>