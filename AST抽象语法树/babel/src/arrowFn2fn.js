// 简易版箭头函数转换插件
// 转化前 const fn = (a, b) => {}
// 转化后 const fn = function (a, b) {}
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const generator = require('@babel/generator')
const types = require('@babel/types')

const code = `const fn = (a, b) => {
  console.log(this)
  return a + b
}`
// 怎么处理箭头函数中的this
// 整体思路：
// 第一步：找到当前箭头函数要使用哪个作用域内的this,暂时称为父作用域
// 第二步：往父作用域加入_this变量，也就是添加语句：var _this = this
// 第三步：找出当前箭头函数内所有用到this的地方
// 第四步：将当前箭头函数的this，统一替换成_this

// 新增hoistFunctionEnviroment函数
function hoistFunctionEnviroment (path) {
  // 确定当前箭头函数要使用哪个地方的this
  // 第一步：从当前节点开始向上查找，直到找到一个不是箭头函数的函数，最后还找不到的那就是根节点
  const thisEnv = path.findParent((parent) => {
    return (
      (parent.isFunction() && !parent.isArrowFunctionExpression())
      || parent.isProgram()
    )
  })
  // 第二步：向父作用域内放入一个_this变量
  thisEnv.scope.push({
    id: types.identifier('_this'), // 生成标识符节点，变量名
    init: types.thisExpression() // 生成this节点，变量值
  })
  // 第三步：找出箭头函数内所有使用到this的地方
  const thisPaths = [] // 获取当前节点的this的路径
  // 遍历当前节点的子节点
  path.traverse({
    ThisExpression (thisPath) {
      thisPaths.push(thisPath)
      // thisPath.replaceWith(types.identifier('_this'))
    }
  })
  thisPaths.forEach(thisPath => {
    thisPath.replaceWith(types.identifier('_this'))
  })
}

// 生成语法树
const ast = parser.parse(code)
// 访问器
const visitor = {
  ArrowFunctionExpression: {
    enter (path) {
      const { node } = path
      // console.log(node)
      // 先将body存起来
      // const tempBody = node.body
      // 新的body
      // const newBody = {
      //   type: 'BlockStatement',
      //   body: [{
      //     type: 'ReturnStatement',
      //     argument: node.body
      //   }]
      // }
      // node.body = newBody
      node.type = 'FunctionExpression'
      // 如果函数体不是块语句
      if (!types.isBlockStatement(node.body)) {
        node.body = types.blockStatement([types.returnStatement(node.body)])
      }
      // 提升函数环境，解决this作用域问题
      hoistFunctionEnviroment(path)
    }
  }
}

// 遍历树生成新的语法树
traverse.default(ast, visitor)

const result = generator.default(ast)

console.log(result.code)

// const core = require('@babel/core')
// const code = 'const arrowFn = (a, b) => { return a + b }'

// 箭头函数转普通函数插件
// const arrowFunctionPlugin = {
//   visitor: {
//     ArrowFunctionExpression ({ node }) {
//       node.type = 'FunctionExpression'

//     }
//   }
// }

// const result = core.transform(code, {
//   plugins: [arrowFunctionPlugin]
// })

// console.log(result.code)