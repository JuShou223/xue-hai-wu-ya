/*
 * @Date: 2024-07-29 14:53:00
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 14:55:46
 * @Description:
 */
// tapable采用的是发布订阅模式，通过tap函数注册监听函数，然后通过call函数按顺序执行之前注册的函数
// 大致原理
class SyncHook {
  constructor () {
    this.taps = []
  }

  // 注册监听函数，这里name其实没啥用
  tap (name, fn) {
    this.taps.push({ name, fn })
  }

  // 执行函数
  call (...args) {
    this.taps.forEach(tap => {
      tap.fn(...args)
    })
  }
}