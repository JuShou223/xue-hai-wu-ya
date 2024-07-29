/*
 * @Date: 2024-07-23 15:14:14
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-23 16:10:15
 * @Description:
 */
function asyncFunc () {
  console.log('i am a async function')
}
function asyncFunc2 () {
  console.log('i am a async function2')
}
exports.asyncFunc = asyncFunc
exports.asyncFunc2 = asyncFunc2