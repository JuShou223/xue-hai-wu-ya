/*
 * @Date: 2024-07-18 14:52:14
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-22 14:22:26
 * @Description:
 */
const say = require('./a')
const  object = {
    name:'《React进阶实践指南》',
    author:'我不是外星人'
}
console.log('我是 b 文件')
module.exports = function(){
    return object
}
console.log(say.say())
