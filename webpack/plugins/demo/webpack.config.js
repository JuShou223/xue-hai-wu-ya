/*
 * @Date: 2024-07-29 15:22:05
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 15:30:27
 * @Description:
 */
const path = require('path')
const DemoPlugin = require('./plugins/demo-plugin.js')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [new DemoPlugin()]
}