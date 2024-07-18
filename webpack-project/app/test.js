/*
 * @Date: 2024-07-17 11:34:25
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-17 11:59:58
 * @Description:
 */
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const read = filename => {
  const buffer = fs.readFileSync(filename, 'utf-8')
  const AST = parser.parse(buffer, {
    sourceType: 'module'
  })
  console.log(JSON.stringify(AST))
}
read('app/test2.js')