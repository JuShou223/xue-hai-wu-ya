/*
 * @Date: 2024-07-25 09:10:33
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-25 09:21:49
 * @Description:
 */
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const generator = require('@babel/generator')

// 源代码
const code = `
const hello = () => {}
`

// 1. 源代码解析成AST树
const ast = parser.parse(code)

// 2. 转换
const visitor = {
  // traverse 会遍历树节点，只要节点的type在visitor对象出现，变化调用该方法
  Identifier (path) {
    console.log(path)
    const { node } = path
    if (node.name === 'hello') {
      node.name = 'world'
    }
  }
}
traverse.default(ast, visitor)

// 3. 生成
const result = generator.default(ast, {}, code)

console.log(result.code)