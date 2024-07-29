/*
 * @Date: 2024-07-29 16:13:32
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 16:19:59
 * @Description:
 */
// SyncLoopHook是一个同步，循环类型的hook
// 循环类型的含义是不停的循环执行事件函数，直到所有函数的结果result === undefined，不符合条件就重新开始执行
const { SyncLoopHook } = require('tapable')
const hook = new SyncLoopHook([])
let count = 5

hook.tap('测试1', () => {
  console.log('测试1里面的count', count)
  if ([1, 2, 3].includes(count)) {
    return undefined
  } else {
    count--
    return '123'
  }
})

hook.tap('测试2', () => {
  console.log('测试2里面的count', count)
  if ([1, 2].includes(count)) {
    return undefined
  } else {
    count--
    return '123'
  }
})

hook.tap('测试3', () => {
  console.log('测试3里面的count', count)
  if (count === 1) {
    return undefined
  } else {
    count--
    return '123'
  }
})

hook.call()