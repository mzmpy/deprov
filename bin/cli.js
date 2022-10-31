#! /usr/bin/env node
const program = require('commander')
const path = require('path')

const { create } = require('../src/create')

const defaults = {
  appTemplate: 'webpack-template',
  appName: 'webpack-demo'
}

/**
 * console.log('current workink directory: ', path.resolve('./')) // 当前工作目录，也是工作终端所在目录
 * console.log('current directory', __dirname) // 当前文件所在目录
 */

program
  .command('create')
  .description('create a new project')
  .option('-n, --name [app-name]', 'customize the name of project')
  .option('-t, --template [template]', 'create by template')
  .action(create)

program
  .command('build')
  .description('use webpack to bundle your javascript code')
  .action(option => {
    const { bundle } = require('../src/bundle')
    bundle(path.resolve('./webpack.config.js'))
  })

program
  .command('serve')
  .description('serve webpack bundled files with webpack-dev-server')
  .action(option => {
    const { serve } = require('../src/serve')
    serve(path.resolve('./webpack.config.js'))
  })

program.parse()
