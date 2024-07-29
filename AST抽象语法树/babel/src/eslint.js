/*
 * @Date: 2024-07-25 16:00:12
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-25 16:31:17
 * @Description:
 */
// 实现一个简易的eslint
// 思路遍历AST，然后找出console节点，如果有console就报错
const core = require('@babel/core')
const pathlib = require('path')

const code = `
var a = 1
console.log(a)
var b =2`

const eslintPlugin = ({ fix }) => {
  return {
    pre (file) {
      file.set('errors', [])
    },
    visitor: {
      CallExpression (path, state) {
        const errors = state.file.get('errors')
        const { node } = path
        if (node.callee.object && node.callee.object.name === 'console') {
          errors.push(
            path.buildCodeFrameError(`代码中不能出现console语句`, Error) // 抛出一个语法错误
          )
          if (fix) {
            // 如果启动了fix，就删除掉该节点
            path.parentPath.remove()
          }
        }
      }
    },
    post (file) {
      console.log(...file.get('errors'))
    }
  }
}

const result = core.transform(code, {
  plugins: [eslintPlugin({ fix: true })]
})

console.log(result.code)