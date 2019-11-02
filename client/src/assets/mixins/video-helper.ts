import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({})
export default class VideoHelper extends Vue {
  @Prop(Number) volume!: number
  @Prop(Boolean) value!: boolean

  show = this.value

  duration = 0

  @Watch('value')
  _onValueChange(val: boolean): void {
    this.show = val
  }

  @Watch('show')
  @Emit('input')
  _onShowChange(val: boolean): boolean {
    return val
  }

  get playerStyle() {
    if (this.show) {
      return {}
    }
    return { position: 'absolute', top: '-200%' }
  }

  getStartPosition() {
    let maxStart = Math.floor(this.duration - this.$store.state.game.settings.guessTime)
    if (maxStart > 0) {
      return Math.floor(this.$store.state.game.gameState.startPosition * maxStart)
    }
    return 0
  }
}