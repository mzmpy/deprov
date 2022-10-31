const fs = require('fs')
const zip = require('jszip')
const path = require('path')
const shell = require('shelljs')
const inquirer = require('inquirer')

const initQues = require('../src/initQuestions')

const { getDeprovDirPath } = require('../src/utils')

async function create(option) {
  const defaultTemplate = fs.readFileSync(getDeprovDirPath('../templates/webpack-template.zip'))

  if(option.template === true) {
    let upzipFiles = await zip.loadAsync(defaultTemplate, { createFolders: true })
    const files = upzipFiles['files']

    Object.keys(files).forEach(item => {
      const content = files[item]
      const dest = option.name
        ? path.resolve('./', content.name).replace('webpack-template', option.name)
        : path.resolve('./', content.name)
      
      if(content.dir) {
        fs.mkdirSync(dest, { recursive: true })
      } else {
        files[item].async('nodebuffer').then(buffer => {
          fs.writeFileSync(dest, buffer)
        })
      }
    })

    console.log(`已成功创建${option.name || 'webpack-template'}`)

    if(shell.cd(`${option.name || 'webpack-template'}`).code === 0) {
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
}

module.exports = {
  create
}
