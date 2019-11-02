import { Component, Vue } from 'vue-property-decorator'
import { AVATAR_MAP } from '../config'

@Component({})
class AvatarHelper extends Vue {
  imgSrc(avatar: string): string {
    if (avatar in AVATAR_MAP) {
      return AVATAR_MAP[avatar]
    }
    return 'img/dead_link.jpg'
  }
}

export { AvatarHelper }