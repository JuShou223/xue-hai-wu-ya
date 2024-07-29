/*
 * @Date: 2024-07-25 17:14:59
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-25 18:07:52
 * @Description:
 */
const core = require('@babel/core')
const types = require('@babel/types')

const visitor = {
  ImportDeclaration (path, state) {
    const { libraryName, libraryDirectory = 'lib' } = state.opts // 获取选项中的支持的库的名称
    const { node } = path
    const { specifiers } = node // 获取批量导入声明数组
    // 如果当前的节点的模块名称是我们需要的库名称，并且导入不是默认导入才会进来
    if (
      node.source.value === libraryName
      && !types.isImportDefaultSpecifier(specifiers([0]))
    ) {
      //
      const declarations = specifiers.map(specifier => {
        // 返回一个importDeclaration节点，这里也可以用template
        return types.importDeclaration(
          // 导入声明importDefaultSpecifier flatten
          [types.importDefaultSpecifier(specifier.local)],
          types.stringLiteral(
            libraryDirectory
            ? `${libraryName}/${libraryDirectory}/${specifier.imported.name}`
            : `${libraryName}/${specifier.imported.name}`
          )
        )
      })
      path.replaceWidthMultiple(declarations) // 替换当前节点
    }
  }
}

module.exports = function () {
  return {
    visitor
  }
}