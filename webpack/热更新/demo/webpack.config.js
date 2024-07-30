const HtmlwebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    hot: true, // 启用热更新
    port: 8001 // 设置端口号
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: './index.html'
    })
  ]
}