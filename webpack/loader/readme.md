<!--
 * @Date: 2024-07-29 09:12:21
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 11:10:31
 * @Description:
-->
1、loader的本质是什么?
2、在webpack中如何使用自定义loader？有几种方式？
3、loader类型有哪几种？他们的运行顺序是怎么样的？如何控制他们的运行顺序？
4、什么是Normal Loader？什么事pitching loader他们的运行机制有什么不同？
5、如果一个文件指定了多个loader，如何控制使得只执行特定的loader，忽略其他的loader？
6、loader为什么事自右向左执行的？如何做到的？
7、项目中对css、less、scss、tsx、vue、等文件是如何做解析？他们的原理是什么？
8、webpack中完整的loader运行机制是怎样的？
9、为什么最后的loader处理结果必须是js类型额度字符串？
10、给你个需求需要在打包过程中移除console.log函数，你会痛骨那种方式进行处理？是通过loade还是babel plugin再或者是webpack plugin？给出你的理由

1、loader的本质是什么?
  loader的本质是导出为函数的javascript模块。他接收资源文件或者上一个loader产生的结果作为入參，也可以用多个loader函数组成loader chain，最终输出转换后的结果。loader chain的执行顺序是从右向左。loader chain这样设计的好处是可以保证每个loader的职责单一。方便后期loader的组合和扩展。
2、在webpack中如何使用自定义loader？有几种方式？
  第三方loader会默认在node_modules下查找
  有三种方式：
  a、配置loader绝对路径
  b、配置resolveLoader.alias配置别名（不推荐、多个自定义loader的话比较繁琐）
  c、配置resolveloader.modules 会去modules里对应的目录下查找，查找顺序是从左至右
3、loader类型有哪几种？他们的运行顺序是怎么样的？如何控制他们的运行顺序？
  前置 pre、普通 normal、行内 inline、后置 post
  我们大多数使用的就是normal类型的、通过enforce配置类型
  所有一个接一个静如的loader都有两个阶段：
  1、pitching阶段：loader上的pitch方法，按照后置、行内、普通、前置的顺序调用
  2、normal阶段：loader上的常规方法、按照前置、普通、行内、后置的顺序调用、模块源码的转换、发生在这个阶段。
  3、同等类型的loader执行顺序才是从右向左执行的
  应用场景：在项目开始构建之前，为了更早的发现错误、一般会先进行eslint校验，这个时候需要前置（pre）loader，如果在前置loader中发现了错误那就提前退出构建，前置loader校验完一个文件编译一个文件
4、什么是Normal Loader？什么事pitching loader他们的运行机制有什么不同？
  模块导出的函数就是normal Loader, loader函数上有一个可选属性pitch，他的值也是一个函数，该函数就被称为pitching loader。
  如果pitch阶段有返回值，将直接进入到上一个loader的normal阶段
  pitch阶段的参数解析：
    previousRequest, CurrentRequest、RemainingRequest
    previousRequest代表的是之前执行过pitch阶段的loader，CurrentRequest代表的是当前正在执行pitch阶段的loade和后面未执pitch阶段的loader, remainRequest代表未执行pitch阶段的loader
    其中remainRequest和PreviousRequest作为pitchLoader作为Pitch函数的默认参数，第三个参数data,可以用于数据传递，即在pitch函数中往data对象上添加数据，之后在normal函数中通过this.data的方式读取已添加的数据，也就是注入上下文
    runloader根据loaderindex索引执行pitch阶段和normal阶段
5、如果一个文件指定了多个loader，如何控制使得只执行特定的loader，忽略其他的loader？
6、loader为什么事自右向左执行的？如何做到的？
7、项目中对css、less、scss、tsx、vue、等文件是如何做解析？他们的原理是什么？
8、webpack中完整的loader运行机制是怎样的？
9、为什么最后的loader处理结果必须是js类型额度字符串？
10、给你个需求需要在打包过程中移除console.log函数，你会痛骨那种方式进行处理？是通过loade还是babel plugin再或者是webpack plugin？给出你的理由

