/*
 * @Date: 2024-07-29 14:42:46
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 14:52:17
 * @Description:
 */
const { SyncHook } = require('tapable')

// 第一步 实例化钩子函数，可以在这里定义形參
const syncHook = new SyncHook(['author'])

// 第二步：注册事件1
syncHook.tap('监听器1', name => {
  console.log('监听器1', name)
})

// 第二步：注册事件2
syncHook.tap('监听器2', name => {
  console.log('监听器2', name)
})

// 第三步：触发事件
syncHook.call('不要秃头啊');