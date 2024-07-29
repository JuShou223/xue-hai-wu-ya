// style-loader会接收css-loader返回的代码，他需要返回一段Js，这点很重要
// 因为webpack值人士Js和json,因此最左侧的Loader必须返回的是js代码。
// 实现思路：创建一个style标签，将css代码添加到head中去

function styleLoader (cssSource) {
  let script = `
    let style=document.createElement('style')
    style.innerHTML = ${JSON.stringify(cssSource)}
    document.head.appendChild(style)
  `
  return script
}

module.exports = styleLoader