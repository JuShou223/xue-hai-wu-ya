/*
 * @Date: 2024-07-29 10:06:53
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 10:27:21
 * @Description:
 */
const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolveLoader: {
    modules: ['loaders', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'c-loader',
          'b-loader',
          'a-loader'
        ]
      }
    ]
  },
  plugins: [new HtmlwebpackPlugin({ template: './src/index.html' })]
}