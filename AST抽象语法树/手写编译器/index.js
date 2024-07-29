/*
 * @Date: 2024-07-24 15:07:14
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-24 18:08:24
 * @Description:
 */
// 将代码解析为tokens，整体思路就是通过遍历字符串，对每个字符都按一定的规则进行switch case，最终生成tokens数组
function tokenzier (input) {
  let current = 0 // 记录当前访问的位置
  let tokens = [] // 存放最终生成的tokens
  // 循环遍历input
  while (current < input.length) {
    let char = input[current]
    // 如果是开括号，我们把一个新的tokes放入数组中。类型是'paren'
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      })
      current++
      continue
    }
    // 闭括号做同样的操作
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      })
      current++
      continue
    }
    // 空格检查，我们关闭空格在分隔字符上是否存在，但是在token中他是无意义的
    const WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }
    // 接下来检测连续的数字
    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      let value = ''
      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }
      tokens.push({ type: 'number', value })
      continue
    }
    // 接下来检测字符串，这里我们只检测双引号，和上述同理也是街区连续完整的字符串
    if (char === '"') {
      let value = ''
      char = input[++current]
      while (char !== '"') {
        value += char
        char = input[++current]
      }
      ++current
      tokens.push({ type: 'string', value })
      continue
    }
    // 最后一个检测的是name和add这样，也是一串连续的数字，但是他是没有""的
    const LETTERS = /[a-z]/
    if (LETTERS.test(char)) {
      let value = ''
      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }
      tokens.push({ type: 'name', value })
      continue
    }
    throw new TypeError('I dont konw what this character is:' + char)
  }
  return tokens
}
// 生成AST
function parser (tokens) {
  let current = 0; // 访问tokens的下标
  // walk函数辅助我们遍历这个tokens
  function walk () {
    let token = tokens[current]
    // 现在就是遍历出每一个token, 根据其类型生成对应的节点
    if (token.type === 'number') {
      current++
      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }
    if (token.type === 'string') {
      current++
      return {
        type: 'StringLiteral',
        value: token.value
      }
    }
    // 这里处理调用语句
    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current]
      // 这里一个例子解释(add 2 3)这样的代码"("就是paren token. 而接下来的node其实就是那个name类型的token "add"
      let node = {
        type: "CallExpression",
        value: token.value,
        params: []
      }
      // 获取name后无门需要获取接下来调用语句的参数，知道我们遇到了")", 这里会存在嵌套的现象如下
      token = tokens[++current]
      // 这里我们通过递归调用不断的读取参数
      while (
        (token.type !== 'paren') || (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk())
        token = tokens[current] // 因为参数的if判断里会让current++实际就是持续向后遍历tokens，然后将参数推入params
      }
      current++
      return node
    }
    throw new TypeError(token.type)
  }
  // 现在我们创建AST，树的最根层就是program
  const ast = {
    type: 'Program',
    body: []
  }
  // 然后我们通过调用walk遍历tokens将tokens内的对象，转化为AST的节点，完成AST的构建
  while (current < tokens.length) {
    ast.body.push(walk())
  }
  return ast
}
// 遍历和访问生成好的AST
// 现在已经有AST了，然后我们希望能够通过访问其访问不同的节点，当遇到不同的节点的时候，调用访问器的不同函数
// traverse(ast, visitor) 迭代器（抽象语法树，访问器）
function traverse (ast, visitor) {
  function traverseArray (array, parent) {
    array.forEach(child => {
      traverseNode(child, parent)
    })
  }
  function traverseNode (node, parent) {
    // 判断访问器中是否有合适处理该节点的函数
    let methods = visitor[node.type]
    // 如果有就执行enter函数，因为此时已经进入这个节点了
    if (methods && methods.enter) {
      methods.enter(node, parent)
    }
    // 接下来就根据node级的点类型来处理了
    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node) // 如果你是ast的根部，就相当于树根，body中的每一项都是一个分支
        break
      case 'CallExpression':
        traverseArray(node.params, node) // 这个和program一样处理，但是这里是为了遍历params, 上面是为了遍历分支
        break
      case 'NumberLiteral':
      case 'StringLiteral':
        break
      default:
        throw new TypeError(node.type)
    }
    // 当执行到这里时，说明发节点已经遍历到尽头了，执行exit
    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }
  // 我们从ast开始进行节点遍历，因为ast没有父节点所以传入null
  traverseNode(ast, null)
}
// transformer转化
// 将刚生成的AST转化为新的AST。转化之前，必须要明确转化后的AST长什么样
function transformer (ast) {
  // 将要被返回的新AST
  let newAst = {
    type: 'Program',
    body: []
  }
  //  这里相当于将在旧的AST上创建一个_content, 这个属就是新的AST的body，因为是引用，所以后面可以直接操作的就是新的AST
  ast._context = newAst.body
  traverse(ast, {
    NumberLiteral: {
      enter (node, parent) {
        // 创建一个新的节点，其实就是创建新的AST的节点，这个新节点存在于父节点的body中
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value
        })
      }
    },
    // 针对文字片段的处理
    StringLiteral: {
      enter (node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value
        })
      }
    },
    CallExpression: {
      enter (node, parent) {
        // 在新的AST中如果调用语句，type是CallExpression，同时它还有一个Identifier,来标识操作
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.value
          },
          arguments: []
        }
        // 在原来的节点上再创建一个新的属性，用于存放参数，这样当自节点修改_context时，会同步到expression.arguments中，这里用的是同一个内存地址
        node._context = expression.arguments
        // 这里需要判断付节点是否调用语句，如果不是，那么就使用`ExpressionStatement`将CallExpression包裹，因为js中顶层的CallExpression是有效语句
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression
          }
        }
        parent._context.push(expression)
      }
    }
  })
  return newAst
}
// 最后一步，新代码生成。到这一步就是用新的AST,遍历起每一个节点，根据指定规则生成最终新代码
function codeGenerator (node) {
  // 我们以节点的种类拆解
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n')
    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) + ';'
      )
    // 如果是调用语句，我们需要打印出调用者的名字加括号，中间放置参数如生成这样add(2,2)
    case 'CallExpression':
      return (
        codeGenerator(node.callee) + '(' + node.arguments.map(codeGenerator).join(', ') + ')'
      )
    case 'Identifier':
      return node.name
    case 'NumberLiteral':
      return node.value
    case 'StringLiteral':
      return '"' + node.value + '"'
    default:
      throw new TypeError(node.type)
  }
}
const input = '(add 2 (subtract 4 2))'
// console.log('input', input[7], input[8])
const tokens = tokenzier(input)
// console.log(tokens)
const ast = parser(tokens)
// console.log(ast)
const newAst = transformer(ast)
// console.log(newAst)
const output = codeGenerator(newAst)
console.log(output)
// console.log(transformer(parser(tokenzier(input))))