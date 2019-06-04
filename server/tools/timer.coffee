class ProcessTimer
  constructor: () ->
    @start = 0

  run: () ->
    date = new Date()
    @start = date.getTime()

  end: () ->
    date = new Date()
    return (date.getTime() - @start) / 1000

module.exports = new ProcessTimer()