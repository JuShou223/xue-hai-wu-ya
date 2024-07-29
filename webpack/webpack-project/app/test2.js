/*
 * @Date: 2024-07-17 11:50:17
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-17 11:54:04
 * @Description:
 */
const returnWord = require('./test3')
function returnHelloWord () {
  return 'hello' + returnWord()
}
module.exports = returnHelloWord