const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function getEnv () {
  return process.env.NODE_ENV || 'production'
}

module.exports = {
  resolve,
  getEnv
}
