#!/usr/bin/env node

import { program } from 'commander' // 脚手架框架
import chalk from 'chalk' // 彩色输出
import inquirer from 'inquirer' // 命令行交互工具
import ora from 'ora' // 终端微调库
import figlet from 'figlet' // 字符画

// 欢迎语
console.log(chalk.yellow(figlet.textSync('XYM CLI', { horizontalLayout: 'full' })))

program.version('0.0.1').description('my first node-cli')
  // .option('-n, --name <type>', 'add you name')
program.action(() => {
  // console.log(chalk.blue(`Hey, ${options.name}!`)); // 蓝色问候
  // console.log(chalk.green(`Welcome to the CLI world, ${options.name}!`)); // 绿色欢迎
  // console.log(chalk.red(`It's great to have you here, ${options.name}!`)); // 红色欢迎

  // 提示器
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '请输入你的名字',
      default: 'xuyiming'
    },
  ]).then(answers => {
    const spinner = ora('Loading').start()
    setTimeout(() => {
      spinner.stop()
      console.log(chalk.green(`It's great to have you here, ${answers.name}!`)) // 红色欢迎
    }, 2000)
    // console.log(chalk.blue(`Hey, ${answers.name}!`)) // 蓝色问候
    // console.log(chalk.green(`Welcome to the CLIworld, ${answers.name}!`)) // 绿色欢迎
  })
})
// process.argv  命令行参数
program.parse(process.argv)