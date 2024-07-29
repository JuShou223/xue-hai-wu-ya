/*
 * @Date: 2024-07-29 15:22:41
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 15:40:15
 * @Description:
 */
const chalk = require('chalk') // 给日志加颜色插件
const execSync = require('child_process').execSync
const error = chalk.bold.red // 红色日志
const warning = chalk.keyword('orange') // 橙色日志
class DemoPlugin {
  apply (compiler) {
    compiler.hooks.done.tap('DemoPlugin', () => {
      let name = execSync('git config user.name').toString().trim()
      console.log(
        error(`${name},`),
        warning(
          '你好'
        )
      )
      // console.log('编译结束')
    })
  }
}

module.exports = DemoPlugin