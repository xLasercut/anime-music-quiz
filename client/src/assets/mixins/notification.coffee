import EventBus from './event-bus.coffee'

export default
  methods:
    notifySuccess: (msg) ->
      EventBus.$emit('game-notification', 'success', msg)
    notifyError: (msg) ->
      EventBus.$emit('game-notification', 'error', msg)