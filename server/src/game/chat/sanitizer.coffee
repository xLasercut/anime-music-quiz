map = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '/': '&sol;',
  '\'': '&apos;'
}

sanitizer = (message) ->
  output = message
  for key, val of map
    output = output.split(key).join(val)
  return output

module.exports = sanitizer