/*
 * @Date: 2024-07-25 17:22:49
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-25 18:08:37
 * @Description:
 */
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              // 我们自己手写的babel-plugin-import插件
              [
                path.resolve(__dirname, 'src/loadashPlugin.js'),
                {
                  libraryName: 'lodash'
                }
              ]
            ]
          }
        }
      }
    ]
  }
}