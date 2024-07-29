/*
 * @Date: 2024-07-29 16:21:19
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 16:36:24
 * @Description:
 */
// AsyncSeiesHook是一个异步串行基本类型的hook,只有前面的执行完成了，后面的才会一个接一个的执行
  const { AsyncSeriesHook } = require('tapable')
  const hook = new AsyncSeriesHook(['author', 'age'])
  console.time('time')
  hook.tapAsync('测试1', (param1, param2, callback) => {
    setTimeout(() => {
      console.log('测试1接收的参数', param1, param2)
      callback()
    }, 2000)
  })
  hook.tapAsync('测试2', (param1, param2, callback) => {
    setTimeout(() => {
      console.log('测试2接收的参数', param1, param2)
      callback()
    }, 1000)
  })
  hook.tapAsync('测试3', (param1, param2, callback) => {
    setTimeout(() => {
      console.log('测试3接收的参数', param1, param2)
      callback()
    }, 1500)
  })
  hook.callAsync('xym', 18, (err, result) => {
    console.log('成功会调', err, result)
    console.timeEnd('time')
  })