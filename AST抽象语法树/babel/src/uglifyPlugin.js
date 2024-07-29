// 代码压缩
const core = require('@babel/core')
const code = `
function getAge () {
  var age = 12
  console.log(age)
  var name = 'zhufeng'
  console.log(name)
}`

const uglifyPlugin = () => {
  return {
    visitor: {
      // 这是一个别名，用于捕获所有作用域节点：函数、类的函数、函数表达式、语句块、if else while for
      Scopable (path) {
        // path.scope.bindings 取出作用域内的所有变量
        // 取出后进行重命名
        Object.entries(path.scope.bindings).forEach(([key, binding]) => {
          const newName = path.scope.generateUid() // 在当前作用域生成一个新的uid，并且不会和任何本地定义的变量冲突的标识符
          binding.path.scope.rename(key, newName)
        })
      }
    }
  }
}

const result = core.transform(code, {
  plugins: [uglifyPlugin]
})


console.log(result.code)