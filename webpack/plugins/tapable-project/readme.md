<!--
 * @Date: 2024-07-29 14:56:15
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-07-29 15:13:55
 * @Description:
-->

webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，比如
  在打包前需要处理用户传过来的参数，判断是采用单入口还是多入口打包，就是通过EntryOptionPlugin插件来做的
  在打包过程中，需要知道采用哪种读文件的方式就是通过NodeEnviromentPlugin插件来做的
  在打包完成后需要先清空dist文件夹，就是通过CleanWebpackPlugin插件来完成的
而实现这一切的核心就是tapable. webpack内部通过tapable会提前定义好一系列不同阶段的hook,然后在固定的时间点去执行（触发call函数）。而插件要做的就是通过tap函数注册自定义时间，从而让其控制在webpack事件流上运行

tapable其他类型的hook
按同步/异步分类

sync（同步）
  SyncHook
  SyncBailHook
  syncWaterfallHook
  SyncLoopHook
Async（异步）
  Parallel（并行）
    AsyncParallelHook
    AsyncParallelBailHook
  Series（串行）
    AsyncSeriesHook
    AsyncSeriesBailHook
    AsyncSeriesWaterfallHook
按返回值分类
  basic（基本的）- 执行每一个事件函数，不关心函数的返回值
    SyncHook
    AsyncParallelHook
    AsyncSeriesHook
  Waterfall（瀑布式的）- 如果前一个事件函数的结果result !== undefined, 则result会作为后一个事件函数的第一个参数（也就是上一个函数的执行结果会成为下一个函数的参数）
    SyncWaterfallHook
    AsyncSeriesWaterfallHook
  Bail（保险的）- 执行每一个事件函数，遇到的第一个结果result !== undefined 则返回，不再继续执行（也就是只要其中一个有返回了，后面的就不执行了）
    SyncBailHook
    AsyncParallelHook
    AsyncSeriesBailHook
  Loop（循环的）- 不停的循环事件函数直到所有函数的结果result === undefined
    SyncLoopHook

