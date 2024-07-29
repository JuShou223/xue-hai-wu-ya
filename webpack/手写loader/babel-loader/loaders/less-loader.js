/*
 * @Date: 2024-07-29 11:37:30
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 11:40:21
 * @Description:
 */
// 实现思路：调用less库将.less源码转换为.css文件即可。
const less = require('less')

function lessLoader (lessSource) {
  let css;
  less.render(lessSource, { filename: this.resource }, (err, output) => {
    css = output.css
  })
  return css
}

module.exports = lessLoader