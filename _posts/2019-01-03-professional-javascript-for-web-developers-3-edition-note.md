---
layout: article
title: 《JavaScript 高级程序设计》（第3版）笔记
categories: [草稿]
tags: [js基础]
---

# 第1章 JavaScript简介

JavaScript 于1995年由当时就职于 Netscape 公司的 Brendan Eich 开发，最初是为了通过提供前端表单校验，在当时普遍低网速的情况下极大提升用户体验。

JavaScript 包括三部分：

- 核心( ECMAScript )
  * 其标准是[ ECMA-262 ](http://www.ecma-international.org/publications/standards/Ecma-262.htm)，由 ECMA (欧洲计算机制造商协会)下的 TC39 技术委员会制定
  * 2009年发布了第5版，2015年发布第6版（ ES2015 ），之后每年都会有版本更新，直接有年份表示版本（如 ES2018 ）
- 文档对象模型( DOM )
  * 定义访问与操作网页内容的方法与接口
  *  DOM1 ，1998年10月成为 W3C 推荐标准，包括 DOM Core 和 DOM HTML ，主要映射文档结构
  *  DOM2 ，给出很多新模块：DOM视图、DOM事件、DOM样式、DOM遍历和范围
  *  DOM3 ，引入了DOM加载与保持模块、DOM验证模块、开始支持 XML1.0 规范
  * 其他DOM标准： SVG 、 MathMl 、 SMIL 
  * IE6~8 支持 DOM1 （几乎全部），IE9+ 支持 DOM1~3 
- 浏览器对象模型( BOM )
  * 提供与浏览器交互的方法和接口
  *  HTML5 之前没有正式规范，但有如 window 对象、 navigator 对象等事实标准

JavaScript 的版本通常以 ECMAScript 的版本为准，只有 Mozilla 公司还在沿用原来的 JavaScript 的版本序号。

# 第2章 在HTML中使用JavaScript

- 使用 script 标签在 html 页面中插入脚本，通常认为使用 `src` 属性指定外部脚本要优于嵌入代码，因为具有可维护性和可缓存的优点
- 利用 `src` 属性加载外部文件不受浏览器同源策略的限制，这也是 jsonp 跨域的基础。
- 默认情况下，页面都是从上往下加载和执行，因此通常将 `js` 脚本放在页面最后以避免其阻塞页面加载；但是 `defer` 和 `async` 属性（仅外部文件可用）也可以改变其默认行为：
  * `defer` 让浏览器立即加载，延迟执行（遇到`</html>`后）
  * `async` 让浏览器异步地加载和执行
  * 使用这两个属性时，代码的执行顺序通常是不确定的，因此一定要确认文件间的依赖不会因此破坏
- `type` 属性默认是 `text/javascript` ，通常省略

# 第3章 基本概念

本章介绍了 javascript 中的语法、关键字和保留字、变量、数据类型、操作符、语句、函数等，下面是部分要点总结。

## typeof 操作符

`typeof <操作数>`，总是返回一个字符串。

|操作数类型|返回字符串|
|-|-|
|Undefined |'undefined'  |
|Boolean  |'boolean'|
|Number |'number'|
|String |'string'|
|Null |'object'|
|Obejct |'object'|
|Function |'function'|

## undefined 和 null

- 如果一个变量声明时未初始化，其值为 undefined
- 对包含 undefined 值的变量和未定义的变量，使用 typeof 操作符，结果都是 undefined
- `null == undefined` 的结果是 true
- undefined 表示缺少值（应该有值，但未定义，如未初始化的变量、未传入值的函数参数、无返回语句的函数返回值等），没必要显式的将一个变量赋值为 undefined
- null 表示空对象（比如 Object 对象的原型就是 null），可以显式地用来表示空对象指针
- [undefined与null的区别](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

## 六个falsy值

有六个值强制转换为 Boolean 类型时结果是 false: `false` 、 `0` 、 `NaN` 、 `''` 、 `undefined` 、 `null`。

## 类型转换

### 转为布尔值

- `Boolean()`
- `!` 或 `!!`

### 转为数值

- 通用转换方式： Number() 或一元加操作符 `+`，可以将任何类型转为数值
  * 用于字符串时格式要求严格，如果确定字符串是严格的数字格式（可以有正负号和小数点，但是没有空格及其他非数字字符），这种方式比较简单
- 字符串转换： parseInt() 和 parseFloat()，相对通用方式更智能
  * parseInt()，字符串中可以有前导的空格，后面也可以有非数字字符；支持第二个可选参数转换的进制基数，如2、8、10、16等，建议始终使用，否则默认判断的进制可能不是想要的
  * parseFloat()，只支持十进制

### 转为字符串

- `toString()` 方法，除了 null 和 undefined可用
- `String()` 函数，通用，非 null 和 undefined 值实际会调用相应的 toString() 方法
- 加法，`'' + 被转换者`，将一个值和空字符串相加，会自动调用 toString() 方法或 String()函数

### 逻辑与、逻辑或

- 逻辑与操作符`&&`规则：
  * 第一个操作数如果是falsy的值，就返回第一个操作数
  * 否则返回第二个操作数
- 逻辑或操作符`||`规则：
  * 第一个操作数如果是falsy的值，就返回第二个操作数
  * 否则返回第一个操作数

以上规则表明，这两个操作符的返回结果不一定是布尔类型。

### ==、===

- 相等操作符 `==` 会遵循一套比较复杂的规则进行类型转换以后再比较，比如 `undefined == null` 结果是 true
- 全等操作符 `===` 不会进行类型转换，也就是说只要类型不同就一定不会相等，推荐始终使用全等操作符

