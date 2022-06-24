#! /usr/bin/env node

const fs = require('fs')
const path = require('path')

const program = require('commander')
const shell = require('shelljs')
const inquirer = require('inquirer')
const zip = require('jszip')

const initQues = require('../src/initQuestions')
const { getDeprovDirPath } = require('../src/utils')

const defaults = {
  appTemplate: 'webpack-template',
  appName: 'webpack-demo'
}

/**
 * console.log('current workink directory: ', path.resolve('./')) // 当前工作目录，即工作终端所在目录
 * console.log('current directory', __dirname) // 当前文件所在目录
 */

program
  .command('create')
  .description('create a new project')
  .option('-n, --name [app-name]', 'customize the name of project')
  .option('-t, --template [template]', 'create by template')
  .action(async option => {
    const defaultTemplate = fs.readFileSync(getDeprovDirPath('../templates/webpack-template.zip'))

    if(option.template === true) {
      let upzipFiles = await zip.loadAsync(defaultTemplate, { createFolders: true })
      const files = upzipFiles['files']

      Object.keys(files).forEach(item => {
        const content = files[item]
        const dest = option.name ?
          path.resolve('./', content.name).replace('webpack-template', option.name) :
          path.resolve('./', content.name)
        
        if(content.dir) {
          fs.mkdirSync(dest, { recursive: true })
        } else {
          files[item].async('nodebuffer').then(buffer => {
            fs.writeFileSync(dest, buffer)
          })
        }
      })

      console.log(`已成功创建${option.name || 'webpack-template'}`)

      if(shell.cd([`${option.name || 'webpack-template'}`]).code === 0) {
        shell.exec('npm i', { async: true })
        // shell.exec('npm install -D webpack@5.73.0', { async: true })
      }

      return
    } else if(typeof option.template === 'string' && option.template) {
      console.log('未支持该功能！')
      return
    }

    inquirer.prompt(initQues, {}).then(config => {
      config['scripts'] = {
        test: 'echo "Error: no test specified" && exit 1'
      }
      fs.writeFileSync('./package.json', JSON.stringify(config, null, '\t'),  { encoding: 'utf-8' })
    })
  })

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
