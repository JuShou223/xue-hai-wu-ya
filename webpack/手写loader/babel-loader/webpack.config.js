/*
 * @Date: 2024-07-29 11:13:19
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 11:36:37
 * @Description:
 */
const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
// const
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
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'my-babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ],
  },
  plugins: [new HtmlwebpackPlugin({ template: './src/index.html' })]
}