const webpack = require('webpack')

const path = require('path')

function bundle(configPath) {
  const webpackConfiguration = require(configPath)
  const compiler = webpack(webpackConfiguration)

  compiler.run((err, stats) => {
    const statsString = stats.toString({
      colors: true
    })

    if(err || stats.hasErrors()) {
      console.log(err)
    } else {
      console.log(statsString)
    }
  })
}

module.exports = {
  bundle
}
