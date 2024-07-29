// SyncWaterfallHook是一个同步的、瀑布类型的hook
// 瀑布类型的钩子就是如果前一个事件函数的结果result !== undefined,
// 则result会作为后一个事件函数的第一个参数，也就是上一个函数的执行结果会成为下一个函数的参数
const { SyncWaterfallHook } = require('tapable')
const hooks = new SyncWaterfallHook(['author', 'age'])
hooks.tap('测试1', (params1, params2) => {
  console.log('测试1接收的参数', params1, params2)
})
hooks.tap('测试2', (params1, params2) => {
  console.log('测试2接收的参数', params1, params2)
  return '123'
})
hooks.tap('测试1', (params1, params2, params3) => {
  console.log('测试1接收的参数', params1, params2, params3)
})

hooks.call('xym', 18)