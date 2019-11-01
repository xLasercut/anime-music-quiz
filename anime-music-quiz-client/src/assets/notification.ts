import Vue from 'vue'
import { BannerColor } from './types'

let EventBus = new Vue()

function sendNotification(type: BannerColor, msg: string): void {
  EventBus.$emit('game-notification', type, msg)
}

export { EventBus, sendNotification }