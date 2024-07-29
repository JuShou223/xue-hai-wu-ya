/*
 * @Date: 2024-07-29 10:06:14
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 10:30:55
 * @Description:
 */
function ALoader (content, map, meta) {
  console.log('执行a-loader的normal阶段')
  return content + '//给你加点注释（来自ALoader）'
}

ALoader.pitch = function () {
  console.log('ALoader的pitch阶段')
}

module.exports = ALoader