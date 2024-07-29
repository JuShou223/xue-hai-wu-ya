/*
 * @Date: 2024-07-29 10:24:18
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 10:32:29
 * @Description:
 */
function CLoader (content, map, meta) {
  console.log('执行c-loader的normal阶段')
  return content + '// 给你加点注释（来自CLoader）'
}
CLoader.pitch = function () {
  console.log('CLoader的pitch阶段')
}
module.exports = CLoader