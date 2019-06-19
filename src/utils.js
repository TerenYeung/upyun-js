const
  path = require('path'),
  fs = require('fs')

const
  utils = {
    readFile(path, encoding = 'utf8') {
      return fs.readFileSync(path, encoding);
    },
    exists(path) {
      return fs.existsSync(path);
    },
    isDirectory(path) {
      return fs.existsSync(path) && fs.statSync(path).isDirectory();
    },
  }

module.exports = utils;