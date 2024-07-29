/*
 * @Date: 2024-07-17 10:10:20
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-17 17:13:07
 * @Description:
 */
function generateText () {
  const element = document.createElement('h2')
  element.innerHTML = 'Hello World'
  console.log(process.env.NODE_ENV)
  return element
}
module.exports = generateText