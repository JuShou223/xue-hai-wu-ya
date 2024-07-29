/*
 * @Date: 2024-07-25 11:20:10
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-25 14:18:08
 * @Description:
 */
// 手写console.log插件
// 思路：
// 第一步；先找出console节点部分
// 第二步：判断是否是这几个方法名中的某一个："log、info、warn、error
// 第三步：往节点的arguments中添加参数
const core = require('@babel/core')
const types = require('@babel/types')
const pathlib = require('path')

const sourceCode = `
//console.log('日志')
`

const logPlugin = {
  visitor: {
    CallExpression (path, state) {
      const { node: { callee, arguments, loc } } = path
      if (types.isMemberExpression(callee)) {
        if (callee.object.name === 'console') {
          if (['log', 'warn', 'info', 'error'].includes(callee.property.name)) {
            const { line, column } = loc.start
            console.log('line', line, column)

            arguments.push(types.stringLiteral(`${line}:${column}`))
            const filename = state.file.opts.filename
            console.log('file', filename)

            const relativeName = pathlib.relative(__dirname, filename).replace(/\\/, '/') // 兼容windows
            console.log('relativeName', relativeName)

            arguments.push(types.stringLiteral(relativeName))
          }
        }
      }
      // console.log('node', node.object.name)
    }
  }
}

let result = core.transform(sourceCode, {
  plugins: [logPlugin], // 使用插件
  filename: 'hello.js' // 模拟环境
})

console.log(result.code)