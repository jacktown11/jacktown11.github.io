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
- 字符串转为数值： parseInt() 和 parseFloat()，相对通用方式更智能
  * parseInt()，字符串中可以有前导的空格，后面也可以有非数字字符；支持第二个可选参数转换的进制基数，如2、8、10、16等，建议始终使用，否则默认判断的进制可能不是想要的
  * parseFloat()，只支持十进制

### 转为字符串

- `toString()` 方法，非通用（非 null 和 undefined 值都可用）
- `String()` 函数，通用，非 null 和 undefined 值实际会调用相应的 toString() 方法
- `'' + 被转换者`，通用，将一个值和空字符串相加，会自动调用 toString() 方法或 String()函数
- 数字转字符串
  * `toString([radix])`，可以指定目标进制，参数默认值10
  * `toFixed([digits])`，指定小数位数（以0填充或舍入），参数默认值是0
  * `toExponential([fractionDigits])`，转为以科学表示法表示的字符串，可指定小数位数
  * `toPresion([precision])`，指定有效数字格式，自动推断是否使用科学表示法

## 逻辑与、逻辑或

- 逻辑与操作符`&&`规则：
  * 第一个操作数如果是falsy的值，就返回第一个操作数
  * 否则返回第二个操作数
- 逻辑或操作符`||`规则：
  * 第一个操作数如果是falsy的值，就返回第二个操作数
  * 否则返回第一个操作数

以上规则表明，这两个操作符的返回结果不一定是布尔类型。

## ==、===

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

### 获取日期特定部分值

以下方法可以获取年、月（0起始）、日、时、分、秒、毫秒值，还可调用相应的 set 方法设置日期特定部分。

- getFullYear()
- getMonth()
- getDate()
- getHours()
- getMinutes()
- getSeconds()
- getMilliSeconds()

### 日期字符串的解析与生成

Date 类型自带的 toString() 在不同浏览器中显示不一致，而且也不容易灵活的满足实际开发需求，为此笔者写了个 npm 包[@jacktown/simple-date-format](https://www.npmjs.com/package/@jacktown/simple-date-format)可以实现日期字符串和日期对象的简单转换。

## 正则表达式

### 创建

创建正则表达式有两种方式：字面量方式和构造函数方式。

#### 正则表达式字面量

如 `/[bc]at/i`

#### 使用 RegExp 构造函数

- RegExp 构造函数
  * 参数：两个字符串，分别为匹配模式和可选的标志字符串
  * 返回值：一个RegExp实例对象

#### 注意事项

由于匹配模式是以字符串的形式传入的，因此在某些情况下需要双重转义 。比如：所有元字符（如`[`字符）、已经转义过的字符（如 `\n` 字符）。特别地，字符 `\` 在普通字符串中需要转义为 `\\`，那么在匹配模式参数字符串中就要写作 `\\\\` 。下表是一些例子。

|字面量模式|	等价的匹配模式参数字符串|
|-|-|
|`/\[bc\]/`|	`'\\[bc\\]at'`|
|`/\.at/`|	`'\\.at'`|
|`/name\/age/`|	`'name\\/age'`|
|`/\d.\d{1,2}/`|	`'\\d.\\d\d{1,2}'`|
|`/\w\\hello\\123/`|	`'\\w\\\\hello\\\\123'`|

### 正则表达式模式

#### 元字符

  `( [ { \ ^ $ | ) ? * + . ] }`，如果要匹配这些字符需要转义。

#### 预定义的特殊字符（常见）

|字符	|含义|
|`\t`	|制表符|
|`\n`	|换行符|
|`\r`	|回车符|
|`\b`	|回退字符|
|`\v`	|垂直制表符|
|`\0`	|空字符|

#### 字符类

|类型|	示例|	含义|
|- |- |
|简单类|	`[abc]`|	匹配中括号中的任意字符|
|负向类|	`[^abc]`|	匹配中括号中所含之外的所有字符|
|范围类|	`[a-z]` `[A-Z]` `[0-4]`|	首末两个字符间（含两端）的所有字符|
|组合类|	`[3-5a-g\n]`|	各字符类的并|
|预定义类|	见下一个表||

|字符类	|等价写法	|含义|
|.	|`[^\n\r]`	|换行回车以外字符|
|\d	|`[0-9]`	|数字字符|
|\D	|`[^0-9]`	|非数字字符|
|\s	|`[\t\n\x0B\f\r]`	|空白字符|
|\S	|`[^\t\n\x0B\f\r]`	|非空白字符|
|\w	|`[a-zA-Z_0-9]`	|单词字符（字母数字连字符）|
|\W	|`[^a-zA-Z_0-9]`	|非单词字符|

#### 量词

|代码	|类型|	描述|
|- |- |- |
|？	|软性量词|	0，1|
|*		|软性量词|	0，1，2，3，…|
|+	|软性量词|	1，2，3，…|
|{n}	|硬性量词|	n|
|{n,m}	|软性量词|	n,n+1,…,m|
|{n,}	|软性量词|	n,n+1,…|

#### 分组

用 `()` 将一些字符串模式放在一起作为一组。

#### 反向引用

`\1 \2 …` 分别表示第1个、第2个…分组。

#### 候选

在分组中插入管道符号 `|` ，表示多个候选项。

#### 非捕获性分组

`(?: )`，由于匹配非捕获性分组，其不能创建反向引用

|正则	|名称	|描述|
|- |- |- |
|(?=exp)|	先行断言(lookahead)|	匹配exp前面的位置|
|(?!exp)|	先行否定断言(negative lookahead)|	匹配不在exp前面的位置|
|(?<=exp)|	后行断言(lookbehind)|	匹配exp前面的位置(es6提案)|
|(?<!exp)|	后行否定断言(negative lookbehind)|	匹配不在exp前面的位置（es6提案）|

#### 边界

|正则|	名称|	描述|
|- |- |
|^	|开头|	紧跟在左中括号后含义不同|	
|$  |结尾|	|

### 正则表达式标志（flags）

|标识|含义|
|- |- |
|g|	global，全局模式，模式应用于所有字符串，并不会在发现第一个匹配项时停止|
|i|	case-insensitive，不区分大小写模式|
|m|	multiline，多行模式，到达一行文本末尾时还会继续查找下一行|
|u|	es6新增，Unicode模式，用于支持识别Unicode码点超过U+FFFF的四字节字符|
|y|	es6新增，粘连模式|

### RegExp 实例属性	

|属性|	说明|
|- |- |
|global|	布尔值，是否设置了g标志|
|ignoreCase|	布尔值，是否设置了i标志|
|multiline|	布尔值，是否设置了m标志|
|source|	正则表达式的字符串表示，按照字面量形式而非传入构造函数的字符串模式返回|
|lastIndex|	整数，下一次匹配是起始位置，从0算起|
|flags|	正则表达式的标志符，es6|
|sticky|	布尔值，是否设置了y标志，es6|

### RegExp 实例方法

#### exec()	

|- |- |
|参数|	应用模式的字符串|
|返回值|	无匹配项：返回null;<br>有匹配性：返回一个Array实例，该实例额外含有index（匹配项位置）和input（参数字符串）属性|
|功能详述|	1. 其返回值数组第一项为与整个模式匹配的字符串，其他项依次是各个捕获组匹配的字符串；<br>2. 如果正则表达式含有g标志，该表达式每次调用一次该方法，其lastIndex会自动变化，从而可以对字符串依次向后应用模式，否则每次返回结果都一样即第一个匹配项信息|

#### test()

|- |- |
|参数	|应用模式的字符串|
|返回值	|如果参数能与模式匹配，则返回true,否则返回false|


### RegExp 构造函数

RegExp 构造函数除了可以用于生成正则表达式，函数本身还有一些属性（可以通过两种属性名来访问），其值基于作用域内的所有正则表达式，并只和最近一次正则表达式操作相关。其兼容性不够好，特别是`Opera`和`IE`。

|长属性名|	短属性名	|说明|
|- |- |
|`input`  |`$_` |最近一次要匹配的字符串|
|`lastMatch`	|`$&` |最近一次的匹配组|
|`lastParen`  |`$+` |最近一次匹配的捕获组|
|`multiline`  |`$*` |布尔值，是否所有的表达式都采用多行模式|
|`leftContext`  |`$\` |`input`字符串中`lastMatch`之前的文本|
|`rightContext`	|`$’` |`input`字符串中`lastMatch`之后的文本|

### 正则表达式的性能

- 回溯是其基本工作原理，也是性能问题主要源头；
- 避免回溯失控方法：让相邻字元互斥、避免嵌套量词对同一字符串的相同部分多次匹配、重复利用预查原子组去除不必要回溯；
- 更多优化方法：
  * 提高匹配失败速度；
  * 以简单、必要的字元开头；
  * 使用量词模式，使其与后面的字元互斥；
  * 减小分支数量、缩小分支范围；
  * 使用捕获组；
  * 让捕获组只捕获需要的文本，较少后处理；
  * 暴露必须的字元；
  * 使用合适的量词；
  * 把正则表达式赋给变量，避免重复编译；
  * 将复杂正则表达式拆分为多个简单的正则表达式；
- 充分利用字符串自有的一些方法，其速度都较快。

## Function 类型

### 创建函数三种方式

- 函数声明：`function sum(a, b){ return a + b; }`
- 函数表达式：`var sum = function (a, b){ return a + b; }`
- 使用 Function 构造函数：`var sum = new Function('a', 'b', 'return a + b;');`

其中只有函数声明的方式会被提升（function declaration hoisting），即解析器会率先读取函数声明，将其放到源码树的顶部，这样在真正执行任何代码之前就可以访问函数了。

使用构造函数的方式不推荐，因为会有二次解析，性能差。

### 函数内部属性

- arguments，一个类数组对象，保存着实际传入的所有参数
  * arguments.callee，对拥有这个 arguments 对象的函数的引用
- this，函数执行时的环境对象，web 中全局环境下默认是 window

### 实例属性和方法

- length，希望接受到的命名参数的个数
- caller，调用本函数的外层函数
- prototype，函数的原型对象，借由它可访问 toString() 、 valueOf() 等方法
- call()，指定函数内的 this，并以逐个列出的方式传入参数，调用函数，非继承方法
- apply()，指定函数内的 this，并以（类）数组的方式传入参数，调用函数，非继承方法
- bind()，es5方法（IE9+等支持），传入一个对象，返回将 this 值绑定为该对象后的函数

## 基本包装类型

布尔、数字、字符串有三个对应的引用类型（基本包装类型）：Boolean, Number, String ，这些包装类型上提供了一些方法；在基本类型上可以直接调用这些方法，这时后台会自动完成如下的处理：

- 创建相应的基本包装类型的实例
- 在这个实例上调用指定的方法
- 销毁这个实例

基本包装类型实例都是引用类型，使用 typeof 操作符会返回 `'object'` ，转为布尔类型值都是 true。

### Booelean 类型
### Number 类型

提供了一些转换为字符串的方法，如 valueOf(), toString(), toFixed() 等，更多参见本笔记第3章类型转换。

### String 类型


