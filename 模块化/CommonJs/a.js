/*
 * @Date: 2024-07-18 14:35:06
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-22 14:23:32
 * @Description:
 */
console.log('我是 a 文件')
exports.say = function(){
    const getMes = require('./b')
    console.log(getMes)
    const message = getMes()
    console.log(message)
}
