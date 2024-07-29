/*
 * @Date: 2024-07-18 14:33:50
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-22 15:09:09
 * @Description:
 */
const a = require('./a')
const b = require('./b')
const c = require('./c')
setTimeout(() => {
  console.log('c', c)
}, 0);
const obj = { name: 'obj' }
function changeObj (newObj) {
  newObj = { name: 'newObj' }
}
changeObj(obj)
console.log(obj)
console.log('node 入口文件')
