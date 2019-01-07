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

# 第4章 变量、作用域和内存问题

- javascript 中五种基本类型是 Null, Undefined, Boolean, Number, String，它们占用固定大小的空间，被保存在栈内存中
- 引用类型都继承 Object，它们保存在堆内存中
- javascript 中函数传参始终是按值传递
- **执行环境**定义了变量和函数能够访问的其他数据及其自身的行为
- 每个执行环境中有一个**变量对象**包含当前环境可访问的变量与函数；函数的执行环境的变量对象就是它的活动对象
- 各执行环境的变量对象的嵌套构成了**作用域链**，其最前端是当前执行环境的变量对象，全局执行环境的变量对象则是最后一个对象
- 标识符按照作用域链进行查找，通常执行环境只有两种：全局和局部（函数），有两种情况会延长作用域链： with 语句和 try-catch 语句中的 catch 块
- javascript 中有自动垃圾收集机制：标记清除与引用计数
- 标记清除是主流算法，引用计数在循环引用情况下会导致内存泄漏，如 IE9 之前的非原生 javascript 对象都是是采用引用计数算法来清除的
- 不使用的全局变量及时解引用，有助于消除循环引用、进行有效的垃圾回收

# 第5章 引用类型

## 数组

### 类型检测

instanceof 操作符在非单一执行环境（如有框架）下可能有问题，Array.isArray() 方法需要较高版本浏览器（IE9+等），兼容低版本浏览器的通用方法：

```javascript
function isArray(arr){
  return Object.prototype.toString.call(value) === '[object Array]';
}
```

### 修改方法

以下的这些'修改方法'都会直接在原数组上操作。

```javascript
var arr = [1, 2]; // arr: [1, 2] 
arr[0] = 0; // arr: [0, 2] 
arr[arr.length] = 3; // arr: [0, 2, 3] 
arr.push(1, 5); // arr: [0, 2, 3, 1, 5](返回新数组长度) 
arr.pop(); // arr: [0, 2, 3, 1](返回弹出的元素) 
arr.shift(); // arr: [2, 3, 1](返回弹出的元素) 
arr.unshift(7); // arr: [7, 2, 3, 1](返回新数组长度) 
arr.reverse(); // arr: [1, 3, 2, 7] 
arr.sort(function (a, b) { return a - b; }); // arr: [1, 2, 3, 7] 
arr.splice(1, 2, 3, 4); // arr: [1, 3, 4, 7]
```

### 生产方法

以下这些'生产方法'基本不会直接操作原数组，而是使用原数组作为材料，返回一个新数组或者原数组的相关信息。

```javascript
function log(x) { console.log(x); };
var arr = [1, 2, 3, 4, 3, 5];
log(arr.join('_')); // 1_2_3_4_3_5
log(arr.concat([6, 7])); // [1, 2, 3, 4, 3, 5, 6, 7]
log(arr.slice(1)); // [2, 3, 4, 3, 5]
log(arr.slice(1, -1)); // [2, 3, 4, 3]

// 后面这些方法需要高版本浏览器（IE9+等）。
log(arr.filter(function (item) { return item > 3; })); //[4, 5]
log(arr.map(function (item) { return item * 2; })); // [2, 4, 6, 8, 6, 10]
log(arr.every(function (item) { return item > 2; })); // false
log(arr.some(function (item) { return item > 2; })); // true
var sum = 0;
arr.forEach(function (item) { sum += item; });
console.log(sum); // 18 
log(arr.reduce(function (prev, cur) { return prev + cur; }, 0)); // 18
log(arr.reduceRight(function (prev, cur) { return prev + cur; })); // 18
log(arr.indexOf(3, 3)); // 4
log(arr.lastIndexOf(3)); // 4
```

## Date

### 日期创建

```javascript
// 基于当前时间创建的日期
var d1 = new Date();
// 指定相对于UTC1970-01-01 00:00:00过去的毫秒数来创建日期
var d2 = new Date(0);
// 指定日期参数的方式来创建日期（月份以0开始，基于本地系统时区，年和月是必须的，后面的参数可选）
var d3 = new Date(2019, 0, 7, 11, 20, 35);
```

### 日期转毫秒数值

```javascript
var t1 = d1.getTime();
var t2 = +d1;
// 获取当期时间毫秒值，IE9+等
var now = Date.now();
// 日期的 valueOf 方法默认返回的是毫秒值而非字符串，故可以直接比较大小
console.log(d1 < d2); // false
```

### 日期字符串的解析与生成

