const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const path = require('path')
const { AutomaticPrefetchPlugin } = require('webpack')

const defaultDevServerOptions = {
  allowedHosts: 'auto',
  port: 3000,
  static: {
    directory: path.resolve('./public'),
    publicPath: '/',
    watch: true
  },
  client: {
    // 在浏览器控制台输出服务日志级别和信息
    logging: 'info',
    // 告诉客户端（浏览器）出现错误时全屏显示
    overlay: {
      errors: true,
      warnings: false
    }
  }
}

function serve(configPath) {
  const webpackConfiguration = require(configPath)
  const compiler = webpack(webpackConfiguration)
  const devServerOptions = {
    ...(
      webpackConfiguration.devServer ?
        webpackConfiguration.devServer : defaultDevServerOptions
    ),
    open: true
  }

  const server = new WebpackDevServer(devServerOptions, compiler)

  const runServer = async () => {
    console.log('开启服务...')
    await server.start()
  }

  runServer()
}

module.exports = {
  serve
}
