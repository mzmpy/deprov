const path = require('path')

function getDeprovDirPath(relPath) {
  return path.resolve(__dirname, relPath)
}

module.exports = {
  getDeprovDirPath
}
