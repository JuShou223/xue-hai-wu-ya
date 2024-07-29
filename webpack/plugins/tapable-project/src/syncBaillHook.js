/*
 * @Date: 2024-07-29 15:56:11
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 16:00:28
 * @Description:
 */
// SyncBailHook是一个同步保险的hook
const { SyncBailHook } = require('tapable')
const hook = new SyncBailHook(['author', 'age'])
hook.tap('测试1', (params1, params2) => {
  console.log('测试1接收到的参数', params1, params2)
})
hook.tap('测试2', (params1, params2) => {
  console.log('测试2接收到的参数', params1, params2)
  return '123'
})
hook.tap('测试3', (params1, params2) => {
  console.log('测试3接收到的参数', params1, params2)
})
hook.call('xym', 18)