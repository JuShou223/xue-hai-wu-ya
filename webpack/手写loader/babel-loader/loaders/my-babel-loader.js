const babel = require('@babel/core')
const path = require('path')

function babelLoader (source) {
  const options = this.getOptions()
  console.log('自己写的babel-loader')
  const { code } = babel.transform(source, options)
  return code
}

module.exports = babelLoader