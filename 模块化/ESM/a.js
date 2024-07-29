/*
 * @Date: 2024-07-22 15:45:50
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-22 18:30:55
 * @Description:
 */
const name = '123'
export { name }
export const age = '234'
export default {name, age}
import * as b from './b.js'
console.log('a', b)