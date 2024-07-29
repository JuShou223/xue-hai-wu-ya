/*
 * @Date: 2024-07-29 16:21:19
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 16:34:21
 * @Description:
 */
// 前面四个都是同步的hook,接下来开始看看异步的hook。
// AsyncParallelHook是一个异步并行基本类型的hook,它与同步hook不同的地方在于
  // 他会同时开启多个异步任务，而且需要通过tapAsync方法来注册事件（同步Hook是通过tap方法）
  // 在执行注册事件时需要使用callAsync方法来触发，同步Hook使用的是call方法
  // 同时在每个注册函数的回调中，会多一个callback参数，他是一个函数，执行callback函数相当于告诉hook它这一个异步任务执行完成了
  const { AsyncParallelBailHook } = require('tapable')
  const hook = new AsyncParallelBailHook(['author', 'age'])
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