/*
 * @Date: 2024-07-30 09:59:24
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-30 10:19:01
 * @Description:
 */
import name from './name'
import age from './age'

const render = () => {
  const rootDom = document.getElementById('root')
  rootDom.innerText = name+age
}

render()

if (module.hot) {
  module.hot.accept('./name', function () {
    console.log('模块热更新')
    render()
  })
}