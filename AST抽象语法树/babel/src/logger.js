/*
 * @Date: 2024-07-25 14:39:17
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-25 15:59:17
 * @Description:
 */
// 场景：在监控系统的日志上传过程中，我们需要往每个函数的作用域中添加一行日志执行函数
// 需要注意的是，函数的定义方式总共有四种，都需要考虑进来
const code = `function sum (a, b) {
  return a + b
}

const multiply = function (a, b) {
  return a * b
}

const minus = (a, b) => a - b

class Calculator {
  divide (a, b) {
    return a / b
  }
}`

// 思路
// 第一步：先判断源代码中是否引入了logger库
// 第二步：如果引入了，就找出导入的变量名，后面直接使用该变量名即可
// 第三步：如果没有引入我们就在源代码的顶部引用下
// 第四步：在函数中插入引用的函数
const core = require('@babel/core')
const types = require('@babel/types')
// 它可以通过我们传入的模版代码帮助我们生成对应的节点
const template = require('@babel/template')

const autoImportLogPlugin = {
  visitor: {
    // 用来保证此模块一定会引入一个日志的模块
    Program(path, state) {
      let loggerId
      // 遍历子节点
      path.traverse({
        ImportDeclaration (path) {
          const { node } = path
          if (node.source.value === 'logger') {
            // 说明导入过了
            loggerId = node.specifiers[0].local.name
            path.stop() // 找到了就跳出循环
          }
        }
      })
      if (!loggerId) {
        loggerId = path.scope.generateUid('loggerLib')
        // 说明loggerid没有值
        // console.log('console', path)
        const { node } = path
        // console.log('console', types.importDeclaration())
        // 优化前
        // node.body.unshift(types.importDeclaration(
        //   [types.importDefaultSpecifier(types.identifier(loggerId))],
        //   types.stringLiteral('logger')
        // ))
        // 优化后
        node.body.unshift(template.statement(`import ${loggerId} from 'logger'`)())
      }
      // 将生成后的该节点挂载在state对象上,state就是一个用来暂存数据的对象，是一个容器，用于共享数据，
      state.loggerNode = template.statement(`${loggerId}()`)()
      // types.expressionStatement(
      //   types.callExpression(types.identifier(loggerId), [])
      // )
    },
    // FunctionDeclaration
    // 四种函数方式，这是插件能够识别的语法，这是四种函数的type
    "FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ClassMethod" (path, state) {
      const { node } = path
      if (types.isBlockStatement(node.body)) {
        // 如果是一个块级语句的话
        node.body.body.unshift(state.loggerNode)
      } else {
        // 处理箭头函数， 生成一个块级语句，在第一行中插入loggerNode, 然后return 之前的内容
        const newBody = types.blockStatement([
          state.loggerNode,
          types.returnStatement(node.body)
        ])
        node.body = newBody
      }
    }
  }
}
const result = core.transform(code, {
  plugins: [autoImportLogPlugin]
})

console.log('console2222', result.code)