/*
 * @Date: 2024-07-17 10:10:36
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-17 17:32:13
 * @Description:
 */
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// 定义一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
// 提取css代码打包成单独文件
const MinCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css文件
const CssMinifyCssPlugin = require('css-minimizer-webpack-plugin');
// 注入环境变量
const webpack = require('webpack');
//
module.exports = {
  // 入口文件 默认会找文件夹内的index.js文件
  entry: APP_PATH,
  // 输出文件，合并以后会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       loader: 'babel',
  //       include: APP_PATH
  //     }
  //   ]
  // },
  plugins: [
    // 添加插件会自动生成index.html文件
    new HtmlwebpackPlugin({
      title: 'Hello World app'
    }),
    new MinCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MinCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/i,
        use: [MinCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpeg|jpg|gif})$/i,
        type: 'asset',
        generator: {
          filename: 'asset/[hash][ext][query]'
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinifyCssPlugin()
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app')
    }
  }
  // devServer: {
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   progress: true
  // }
}