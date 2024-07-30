/*
 * @Date: 2024-07-30 10:24:10
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-30 11:17:00
 * @Description:
 */
const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  devServer: {
    hot: true,
    port: 8000
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/i,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ],
  },
  plugins: [
    new HtmlwebpackPlugin({ template: './index.html' }),
    new ReactRefreshWebpackPlugin()
  ]
}