import { Component, Vue, Prop } from 'vue-property-decorator'
import { BannerColor } from '../types'

@Component({})
class CountdownHelper extends Vue {
  @Prop(Number) maxTime!: number

  time = 0
  countdown: any = null
  show = false

  get percentage(): number {
    return 100 * (1 - this.time / this.maxTime)
  }

  get color(): BannerColor {
    let percentage = this.percentage
    if (percentage > 75) {
      return 'error'
    }
    else if (percentage > 50) {
      return 'warning'
    }
    return 'success'
  }

  startCountdown(): void {
    this.show = true
    this.time = this.maxTime
    this.countdown = setInterval(() => {
      this.time -= 1
      if (this.time <= 0) {
        this.stopCountdown()
      }
    }, 1000)
  }

  stopCountdown(): void {
    this.show = false
    clearInterval(this.countdown)
  }
}

export { CountdownHelper }