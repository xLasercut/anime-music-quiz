var publicPath = '/'

if (process.env.NODE_ENV === 'production') {
  publicPath = './'
}

module.exports = {
  publicPath: publicPath,
  lintOnSave: false
}
