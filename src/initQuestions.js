const path = require('path')

module.exports = [
  {
    name: 'name',
    type: 'input',
    message: '请输入项目的名称：',
    default: path.basename(path.resolve('./'))
  },
  {
    name: 'version',
    type: 'input',
    message: '请输入项目的版本号：',
    default: '0.0.1'
  },
  {
    name: 'description',
    type: 'input',
    message: '请输入项目的描述：'
  },
  {
    name: 'author',
    type: 'input',
    message: '请输入项目的作者名字：'
  },
  {
    name: 'license',
    type: 'input',
    message: '请输入项目的开源协议：',
    default: 'ISC'
  }
]
