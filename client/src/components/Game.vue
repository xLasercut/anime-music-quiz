<template>
  <el-main class="game-container">
    <game-control
      @toggle="toggleAnswer()"
      @settings="showSettings = true"
      v-model="volume"
    ></game-control>
    <answer :toggle="toggle"></answer>
    <anime-information :toggle="toggle" :volume="volume"></anime-information>
    <guess-input></guess-input>
    <players></players>
    <settings-panel v-model="showSettings"></settings-panel>
  </el-main>
</template>

<script>
  import Answer from './game/Answer.vue'
  import GuessInput from './game/GuessInput.vue'
  import Players from './game/Players.vue'
  import AnimeInformation from './game/AnimeInformation.vue'
  import GameControl from './game/GameControl.vue'
  import SettingsPanel from './game/SettingsPanel.vue'

  export default {
    components: {
      Answer,
      GuessInput,
      Players,
      AnimeInformation,
      GameControl,
      SettingsPanel
    },
    data() {
      return {
        toggle: false,
        showSettings: false,
        volume: 50
      }
    },
    methods: {
      toggleAnswer() {
        this.toggle = !this.toggle
      }
    }
  }
</script>
