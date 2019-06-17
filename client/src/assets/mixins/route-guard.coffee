export default
  beforeRouteLeave: (to, from, next) ->
    answer = window.confirm('You are about to leave this page. Continue?')
    if answer
      next()
    else
      next(false)