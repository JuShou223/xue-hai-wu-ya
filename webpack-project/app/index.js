/*
 * @Date: 2024-07-17 10:10:13
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-17 17:32:31
 * @Description:
 */
import '@/assets/index.css'
import '@/assets/reset.less'
import imgSrc from '@/assets/img.jpeg'
const sub = require('./sub')
// if (process.env.NODE_ENV === 'production') {
//   console.log = function () {}
// }
const app = document.createElement('div')
app.innerHTML = '<div>Hello World</div>'
const img = document.createElement('img')
img.src = imgSrc
app.appendChild(sub())
app.appendChild(img)
document.body.appendChild(app)