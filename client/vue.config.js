var publicPath = '/'

if (process.env.NODE_ENV === 'ghpages') {
  publicPath = '/anime-music-quiz/'
}
else if (process.env.NODE_ENV === 'production') {
  publicPath = './'
}


module.exports = {
  publicPath: publicPath,
  transpileDependencies: [
    "vuetify"
  ]
}