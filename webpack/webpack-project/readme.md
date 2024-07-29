<!--
 * @Date: 2024-07-17 15:28:45
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 11:49:34
 * @Description:
-->
webpack入门

webpack构建流程可以分为三大阶段：初始化、编译、输出
  1、初始化阶段
    会先从配置文件和命令行中读取与合并配置参数，在这一过程中还会执行配置文件中的插件实例化语句new Plugin()。
    接下来用上一步得到的参数初始化Complier实例。Complier负责文件监听和启动编译。Complier实例包含了完整的Webpakc配置，全局只有一个Complier实例。
    初始化Complier后会开始加载配置的插件，会依次调用插件的apply方法、让插件可以监听后续的所有故事节点同时给插件传入complier实例的引用，以方便插件通过complier调用webpack提供的api
  2、编译阶段
webpack最后输出的文件为什么能够运行在浏览器上？

AST语法树
  1、AST是什么？
  抽象语法树（Abstract Syntax Tree）是源代码的抽象表示，他以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。可以将代码转换成一份JSON数据，可以对这份数据做增删改查。AST的应用非常广泛，我们在开发时的使用的sass/less, eslint,babel,webpack等工具都依赖AST。

Webpack打包原理
  参考链接：https://segmentfault.com/a/1190000015088834?utm_source=tag-newest
  1、基本概念
    1.1、入口(entry)
    入口起点(entry point)指示 webpack 以哪个模块为入口，分析出这个模块的依赖关系，打包生成 bundle。
    1.2、输出(output)
    output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
    1.3、loader
    loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。（延伸了解loader的原理）
    1.4、插件(plugin)
    插件(Plugin)是 webpack 的支柱功能。插件可以执行范围从打包优化和压缩，到重新定义构建的启动和结束等。
    1.5、模式(mode)
    mode 属性用于指定构建环境，可选值 production development none
  2、Webpack 流程概括
    Webpack的运行流程是一个串行的过程，从启动到结束会依次执行以下流程
    2.1 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
    2.2 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始编译。
    2.3 确定入口：根据配置参数确定入口文件，根据入口文件(入口起点)找出该文件依赖的其它文件（以及其它文件依赖的其它文件，依此类推）；
    2.4 编译模块：对入口文件进行编译，编译过程中会递归处理其依赖的模块
    2.5 完成模块编译：webpack 会遍历所有模块，完成对模块的编译，最后将结果输出。
    2.6 输出资源：根据入口和模块之间的依赖关系、组装成一个个包含多个模块的Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。
    2.7 输出完成：在确定好输出内容后，根据配置参数确定输出的路径和文件名，把文件内容写入到文件系统
  3、流程细节
    3.1 初始化：启动构建，读取与合并配置参数，加载Plugin，实例化Compiler
    3.2 编译：从entry发出，针对每个module串行调用对应的loader去翻译文件内容，再找到该Module依赖的Module，递归进行编译处理
    3.3 输出：对编译后的Module组合成Chunk，把Chunk转换成文件，输出到文件系统

webpack中是怎么把代码转换成AST的
acorn原理复杂还没看懂
从webpack原理学习中学到了什么

心得体会：了解webpack的编译阶段做了什么有助于在项目中作出最佳的优化实践