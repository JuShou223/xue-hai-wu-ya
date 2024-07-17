<!--
 * @Date: 2024-05-16 18:34:06
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-06-13 15:58:30
 * @Description:
-->
Q1: JavaScript规定了几种语言类型？
A1: 7种数据类型 6种基础数据类型 Undefined Null number string boolean symbol 一种引用数据类型 object
扩展:
  1）Number类型整数值范围 +- 2 ** 53-1;
  2）symbol类型是es6新引入的类型，表示独一无二的值，最大的用法就是用来定义对象的唯一属性名。symbol作为属性名，是公有属性，无法被Object.keys()获取，可以通过Object.getOwnPropertySymbols()和Reflects.ownKeys()获取;
  3）bigInt 大整数 es10新增类型，解决精度缺失问题;
  4）object 类型包括 date,function,array类型
  5）Undefined 表示未定义，只有一个特殊值undefined，一般来说永远不要显式的将一个变量设置为undefined，而是尽量用其他类型的值来初始化，这是因为当使用typeof返回的是undefined的时候，我们就能知道这是因为这个变量未被声明，而不是声明了但未初始化，字面值undefined主要用于比较。
  6）Null 类型只有一个特殊值null, 表示空对象指针，使用typeof判断返回的是object, undefined是从Null值派生出来的为了区别空对象指针和未定义的变量，所以他们表面上是相等的，用等于操作符比较undefined和null返回的true。前面说永远不要将一个变量显式设置为undefined，但null恰恰相反，任何时候只要一个变量要保存为对象，但是没有对象值可以保存，就用null来填充该变量，这样可以保持null是空对象指针的语义，也可以和undefined区分开来
  7）Boolean类型有true和false两个值，使用像if等控制流语句会自动执行其他类型到布尔的转换
  8）Number类型
  9）String, Number, Boolean类型自带toString方法, 模版字符串内的插值都会调用其的toString方法转义成字符串，嵌套的模版字符串不需要转译
  10）Symbol值的特性：
    a）由Symbol函数生成，使用typeof，结果为 "symbol"；
    b）Symbol函数前不能用new命令，否则会报错，这是因为生成的Symbol是一个原始类型的值，不是对象；
    c）instanceof的结果为false；
    d）Symbol函数可以接收一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者在转为字符串的时候容易区分；
    e）如果Symbol的参数是个对象，会调用对象的toString函数，将其转换为字符串，然后才生成一个Symbol值；
    f）Symbol函数的参数只是表示对当前Symbol值的描述，相同参数的Symbol函数返回的值是不想等的；
    g）Symbol值不能与其他类型的值进行运算，否则会报错
    h）Symbol值可以显式的转换为字符串
    i）Symbol值作为标识符，用于对象属性名，可以保证不会出现同名的属性

  TODO 了解严格模式是什么
Q2: JavaScript对象的底层数据结构是什么？
A2: 对象数据存储在堆中，对象指针存储在栈中

Q3: Symbol类型在实际开发中的应用、可手动实现一个Symbol
