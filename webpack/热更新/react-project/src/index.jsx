/*
 * @Date: 2024-07-30 10:26:36
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-30 11:12:29
 * @Description:
 */
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
console.log(root.render)
root.render(
  <StrictMode>
    <App/>
  </StrictMode>
)