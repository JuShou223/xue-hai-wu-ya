<!--
 * @Date: 2024-07-18 14:31:06
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-23 09:18:08
 * @Description:
-->
为什么会出现模块化？
  没有模块化之前的JavaScript开发存在全局污染和依赖管理混乱的问题。
  全局污染：
    没有模块化之前我们通常在html页面上会引入多个js文件, 假设html引入了2个js, 分别为a.js, b.js，顺序也是ab，ab.js中定义了相同的变量，那么a.js和b.js中定义的变量就发生了冲突，加载顺序靠后的变量会覆盖掉加载顺序靠前的变量，当然有一种方法可以解决这个问题，那就是使用匿名函数自执行的方式，形成独立的块级作用域，但是实际开发中的情况会更加复杂，比如想在b文件中调用a文件的方法，形成块级作用域后就不能调用了。
  依赖管理混乱：
    还是上面的例子a文件不能调用b文件内的方法，b文件可以调用a文件内的方法。

常见的模块化规范？
  1、AMD：异步模块定义，requirejs
  2、CMD：cmd规范
  3、ESM：ECMAScript模块化规范
  4、IIFE：立即执行函数表达式
  5、CommonJS：nodejs的模块化规范
  6、UMD：通用模块规范
  CommonJs规范：
    在ComminJs中每一个js都是单独的模块，模块中的核心变量是exports, module.exports, require。exports和module.exports可以对模块中的内容进行导出，require可以导入其他模块中的内容
    CommonJs的实现原理？
      在编译的过程中，实际CommonJs会生成一个包装函数，然后将js中的代码作为包装函数的执行上下文，使用的require、exports、module本质上是通过形參的方式传递到包装函数中。
    require加载流程？
      核心模块的优先级仅次于缓存加载，在Node源码编译中，已被编译成二进制代码，加载速度最快
      路径形式的文件模块处理
      自定义模块处理：查找原则会在当前node_modules目录下查找，找不到再往上一级目录查找，直到根目录，如果依然找不到，则报错，在 node 环境下会以此查找 index.js ，index.json ，index.node。
    require避免重复加载？
      module上保存了exports等信息之外，还有一个loaded表示该模块是否被加载过
      会用Module缓存每一个模块加载的信息
    exports和module.exports的区别？
      exports是module.exports的引用，默认情况下他们指向同一个对象，最终暴露出去的内容始终以module.exports指向的对象为准。
      对exports直接赋值的话，exports的引用将不再和module.exports相同，原因是exports是通过形參的方式传入的，所以对exports赋值后，exports和module.exports指向的对象就不同了。
      同时存在exports和module.exports的情况下，如果是给module.exports直接赋值，那么exports将会失效，应为开始时exports和module.exports都是指向同一个空对象，但是重新赋值后对象的引用从原来的空对象变成了赋值后的对象。
    总结：
      CommonJs如何解决变量污染问题？
        通过require函数来同步加载模块，每一个模块都在自己的作用域内执行，模块内部定义的变量和函数都是私有的，只用通过module.exports或exports对象暴露的属性和方法，才能被其他模块访问
        CommonJS源码学习 https://blog.csdn.net/weixin_51472145/article/details/131212853
  ES Module规范：
    EMS特性
      1、静态语法
        ES Module的引入和导出是静态的，import会自动提升到代码的顶层，import，export不能放在块级作用域或条件语句中。
      2、执行特性
        ESM在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子-》父。
      3、导出绑定
        不能修改import导入的属性
        使用import被导入的变量是只读的，可以理解默认为const装饰，无法被赋值
        使用import被导入的变量是与原变量绑定的，可以理解为import导入的变量无论是否为基本类型都是引用传递。
    ESM提供import()函数来支持动态引入模块，import()函数返回一个promise对象，可以异步加载模块。
    import()函数可以放在条件语句或函数执行上下文中。
    vue中的路由懒加载就是使用import()函数实现的。react中的路由懒加载也是使用import()函数实现的。import()这种加载效果，可以轻松的实现代码分割。避免一次性加载大量js文件，造成首次加载白屏时间过程的情况。
  CommonJs和ESM区别？
    CommonJs中的module和require本质是对象和函数，ESM中的import/export本质是js关键字
    参考链接 https://blog.csdn.net/weixin_44691608/article/details/117718502


参考文章：https://blog.csdn.net/weixin_66128399/article/details/136170107
1、require加载原理？
2、commonjs和esm的区别，他们的优势分别是什么？
commonjs和esm都是nodejs的模块化规范，但是它们之间有什么区别呢？
esm关于eventBus的思考，始终引用的是统一对象，所以能实现跨组件通信