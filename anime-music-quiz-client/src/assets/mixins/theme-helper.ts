import { Component, Vue } from 'vue-property-decorator'

@Component({})
class ThemeHelper extends Vue {
  themeclass(additionalClass: string): string {
    let classes = []
    if (additionalClass) {
      classes.push(additionalClass)
    }

    if (this.$vuetify.theme.dark) {
      classes.push('grey darken-4')
    }
    else {
      classes.push('grey lighten-2')
    }

    return classes.join(' ')
  }
}

export { ThemeHelper }