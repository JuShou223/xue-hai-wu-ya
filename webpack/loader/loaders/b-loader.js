function BLoader (content, map, meta) {
  console.log('执行b-loader的normal阶段')
  return content + '// 给你加点注释（来自BLoader）'
}
BLoader.pitch = function () {
  console.log('BLoader的pitch阶段')
}
module.exports = BLoader