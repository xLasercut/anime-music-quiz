export default
  methods:
    themeClass: (additionalClass) ->
      classes = []
      if additionalClass
        classes.push(additionalClass)

      if this.$vuetify.theme.dark
        classes.push('grey darken-4')
      else
        classes.push('grey lighten-2')

      if classes.length > 0
        return classes.join(' ')
      return null