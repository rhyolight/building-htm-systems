let path = require('path')
let templateFolder = path.join(__dirname, 'templates')

module.exports = {
  plugins: {
    // 'posthtml-expressions': {
    //   root: templateFolder,
    //   locals: {
    //     NODE_ENV: process.env.NODE_ENV
    //   }
    // },
    'posthtml-include': {
      root: templateFolder
    }
  }
};
