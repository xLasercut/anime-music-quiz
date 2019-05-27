<template>
  <el-main>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-button @click="mode = 'game'" type="success" icon="el-icon-stopwatch">Game</el-button>
      </el-col>
      <el-col :span="10">
        <el-button @click="mode = 'list'" type="info" icon="el-icon-document">Song List</el-button>
      </el-col>
    </el-row>
    <game-form v-if="displayForm('game')"></game-form>
    <list-form v-if="displayForm('list')"></list-form>
  </el-main>
</template>

<script>
  import GameForm from '../components/login/GameForm.vue'
  import ListForm from '../components/login/ListForm.vue'

  export default {
    components: { GameForm, ListForm },
    data() {
      return {
        gameSocket: this.$store.state.game.socket,
        listSocket: this.$store.state.list.socket,
        mode: ''
      }
    },
    methods: {
      displayForm(type) {
        if (this.mode === type) {
          return true
        }
        return false
      }
    },
    mounted() {
      if (this.gameSocket) {
        this.$store.commit('game/DISCONNECT')
      }

      if (this.listSocket) {
        this.$store.commit('list/DISCONNECT')
      }
    }
  }

</script>

<style scoped>

</style>