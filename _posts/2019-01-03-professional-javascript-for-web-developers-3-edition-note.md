---
layout: article
title: 《JavaScript 高级程序设计》（第3版）笔记
categories: [草稿]
tags: [js基础]
issueNum: 44
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

操作数类型|返回字符串
-|-
Undefined |'undefined  |
Boolean  |'boolean'
Number |'number'
String |'string'
Null |'object'
Obejct |'object'
Function |'function'

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

#### 字符方法

- `charAt(i)`，获取位置i的字符
- `[i]`，获取位置i的字符（ ES5 方法），IE8+ 支持
- `charCodeAt(i)`，获取位置i的字符码值

#### 连接与裁剪

- `concat(moreStr)`，连接更多字符串
- `+`，连接多个字符串
- `trim()`，删除字符串前后的空格，ES5 方法，IE9+等支持
- `slice(start [,end])`，获取位置在`[start, end)`区间中的子字符串，负值会被加上字符串长度
- `substring(start [,end])`，获取位置在`[start, end)`区间中的子字符串，负值被转换成0
- `substr(start [,count])`，获取位置在`[start, start+count)`区间中的子字符串，第一个负值会被加上字符串长度，第二个负值被转换成0

#### 位置查找

- `indexOf(targetStr [, startPos])`，查找目标字符串从指定位置（包含，默认是0）往后，第一次出现的位置，没找到返回-1
- `lastIndexOf(targetStr [, startPos])`，查找目标字符串从指定位置（包含，默认是length-1）往前，最后一次出现的位置，没找到返回-1
- `search(pattern)`，查找通过字符串或正则表达式给定的模式第一次出现的位置，没找到返回-1

#### 模式匹配

- `match(reg)`
  * 参数：正则表达式
  * 返回结果和正则表达式的 [`exec()`](#exec) 方法是一致
- `replace(pattern, replacement)`，替换操作
  * 参数1：字符串或正则表达式
    + **默认只替换第一个**，需要全部替换的话，参数1需要使用带有 `g` 修饰符的正则表达式
  * 参数2：用于替换的字符串或返回字符串的函数
    + 参数2是字符串的话，可以引用正则表达式的匹配结果，如 `$n` 引用第n个捕获组
    + 参数2是函数的话，可以接收匹配字符串、位置、原字符串、捕获组等以实现更细致的控制
  * 返回替换后的结果字符串
- `split(pattern [, maxLength])`
  * 接收一个字符串或正则表达式表示的模式
  * 返回一个数组，数组的元素是原字符串根据传入模式分割后的各个子字符串，可控制结果数组最大长度

#### 其他方法

- `localCompare()`，比较两个字符串顺序，如果排在参数字符串之前返回负数，之后返回整数，相等返回0，实现和语言相关
- `fromCharCode(code [, code]...)`，**静态方法**，根据码值序列返回字符串

## 单体内置对象

内置对象是指由 ECMAScript 提供的，不依赖于宿主环境的对象，不必显式的实例化，如 Object, Array 等；
ECMAScript 中有两个单体内置对象： Global 和 Math 。

### Global 对象

ECMAScript 中的终极对象，全局的变量、函数都是它的属性和方法，浏览器环境下，它作为 window 对象的一部分来实现。在不同环境下通用地获取 Global 对象可以使用下面的方法：

```javascript
var global = (function(){return this;})();
```

#### URI 编码解码方法

- `encodeURI()`，编码整个 RUI（Uniform Resource Identifiers，统一资源标识符 ），不会对冒号、斜杠这些本身属于 URI 的特殊字符进行编码
- `encodeURIComponent()`，编码一切非标准字符（如空格），实际开发中常用，多用于对查询字符串进行编码
- `decodeURI()`，解码用 encodeURI 编码的字符串
- `decodeURIComponent()`，解码用 encodeURIComponent 编码的字符串

#### eval() 方法

将字符串解析成 ECMAScript 代码并执行，被执行的代码具有其所在环境相同的作用域链，因此在 eval 之内和之外可以交叉定义和使用变量与函数。（严格模式下则访问不到 eval 中创建的变量与函数）。

#### Global 对象的属性

undefined、NaN、Infinity、各个原生的构造函数等都是 Global 对象的属性

### Math 对象

该对象提供了一些方便数学计算的属性和方法，对  ECMAScript 的不同的实现可能采用不同的算法从而有不同的精度。

- 利用属性提供了一些数学常数如： `Math.PI` 、 `Math.E` 。
- 利用方法提供了一些数学函数如： `Math.abs()` 、 `Math.sin()`

#### max() 和 min() 方法

接受任意多个参数，求取最大或最小值。下面给出了几种求一个数值数组最大值的几种方法：

```javascript
let arr = [3, 4, 5, 1, 2, 8, 6];

let max1 = arr.reduce(function (prev, cur) {
  return prev < cur ? cur : prev;
});
let max2 = Math.max.apply(Math, arr);
let max3 = Math.max(...arr);

console.log(max1, max2, max3); // 8 8 8
```

#### 舍入方法

Math.ceil(), Math.round(), Math.floor() ，规则参见下表：

|方法|-0.8|-0.5|-0.2|0.2|0.5|0.8|
| -| -| -| -| -| -| -|
|ceil |0  |0  |0  |1  |1  |1  |
|round|-1 |0  |0  |0  |1  |1  |
|floor|-1 |-1 |-1 |0  |0  |0  |

#### random() 方法

获取一个 `(0,1)` 区间内的随机数。

# 第6章 面向对象的程序设计

## 理解对象

对象的属性包括两种类型：数据属性和访问器属性。属性( property )具有描述其特征的特性( attribute )，这些特性都是内部值，不能直接访问它们，规范中使用双中括号来表示。

### 数据属性

数据属性有如下四个特性：

- [[Configurable]]，是否可删除属性、修改特性或修改属性类型
- [[Enumerable]]，是否可 for-in 枚举
- [[Writable]]，是否可写入
- [[Value]]，实际读写的数据值

使用字面量方法定义的属性都是数据属性，这时上述四个特性默认值分别是 true, true, true, undefined ，也可通过 ES5 的 `Object.defineProperty()` 来间接设置数据属性。第三个参数是描述符对象，如果不指定前三个特性中的某些特性，会默认是 false 。

```javascript
let person = {};
Object.defineProperty(person, 'name', {
  configurable: true,
  writable: true,
  enumerable: true,
  value: 'jack'
});
```

### 访问器属性

访问器属性有如下四个特性：

- [[Configurable]]，是否可删除属性、修改特性或修改属性类型
- [[Enumerable]]，是否可 for-in 枚举
- [[Get]]，getter 函数，默认 undefined
- [[Set]]，setter 函数，默认 undefined

访问器属性必须通过 `Object.defineProperty()` 方法来定义

### 定义多个属性和获取属性描述符对象

- Object.defineProperties(obj, propterties)
- Object.getOwnPropertyDescriptor(obj, key)

## 创建对象

### 工厂模式

使用一个对象创建函数作为工厂，每次传入需要的参数来调用这个函数，返回出新的对象，如下所示；问题：

- 生产的对象只是 Object 的实例，没有特定的类型（从而用 instanceof 来检测）
- 各个生产出来的对象上的方法都是独立，没有复用

```javascript
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}
```

### 构造函数模式

将一个构造函数（本质也就是个函数）通过 `new` 的方式来创建对象，这样创建出来的函数有了确定的类型（可以用 instanceof 判断），问题：

- 方法没有复用（当然可以通过将方法声明在全局环境中来解决，但是这严重破坏封装性）

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  }
}
```

### 原型模式

```javascript
function Person() { }
Person.prototype = {
  name: 'jack',
  age: 25,
  job: 'developer',
  sayName: function () {
    console.log(this.name);
  }
};
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
});
```

上面是用 `defineProperty()` 方法是为了让 `constructor` 属性不可枚举(符合标准)；单独的原型模式中，所有的实例对象的属性都是默认相同而共享的，这对非函数属性通常都不是我们需要：

- 对于基本类型的共享属性，如果在实例中修改属性值时，会覆盖原型上的属性，而不会影响其他实例
- 但是对于引用类型的共享属性，如果在实例中对这个引用类型值的内容进行了修改，所有的实例都会受到影响

#### (构造)函数、原型对象、实例对象

- 每个函数都有一个 prototype 属性，指向原型对象；原型对象中 constructor 属性反过来指向这个函数
- 由构造函数创建的实例对象有一个内部属性 [[Prototype]] 指向原型对象，原型对象的获取与检测：
  * 使用实例对象的 `__proto__` 属性（非标准）可以获取原型对象
  * 使用 `Object.getPrototypeOf()` 传入实例对象，返回原型对象（ ES5 方法，IE9+ 等支持）
  * 在原型对象 A 上调用 `isPrototypeOf()` 方法，传入实例对象 B ，可检测 A 是否是 B 的原型对象

#### 实例对象与原型对象上的属性

- 在实例对象上访问属性，会沿着原型链逐步回溯；在实例对象上重写与原型对象同名的属性，会使得利用该实例访问该属性时，原型对象上的同名属性被覆盖掉；但这并不会重写原型对象上的属性，从而不会影响其他实例对象
- 单独使用 `in` 操作符，会对对象上可访问的**所有属性**（原型链上也可以）返回 true ，反之返回 false
- 在实例对象上使用 `for in` 可以遍历**可枚举的、所有属性**
- 在实例对象上调用 `hasOwnProperty()` 方法会对**实例属性**返回 true ，反之返回 false
- 使用 `Object.getOwnPropertyNames()` 方法会返回**实例属性**的字符串数组
- 使用 `Object.keys()` 方法获得**可枚举的、实例属性**的字符串数组

### 组合使用构造函数模式和原型模式

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
Person.prototype = {
  sayName: function () {
    console.log(this.name);
  }
};
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
});
```

定义引用类型的默认模式，实现了方法的复用和属性的参数化设置。

### 动态原型模式

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  if (typeof Person.prototype.sayName !== 'function') {
    Object.assign(Person.prototype, {
      sayName: function () {
        console.log(this.name);
      }
    });
  }
}
```

动态原型模式将在原型对象上添加方法的代码封装到了构造函数内部，这些代码只在第一次创建实例对象的时候真正执行（注意：由于原型对象的动态性，不能使用对象字面量直接赋值的方式修改原型，否则第一个创建出的实例会有问题）。

### 寄生构造函数模式

```javascript
function Person(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}
let p1 = new Person('jack', 25, 'developer');
```

这种模式其实和工厂模式差不多，不过借用了构造函数的 `new` 语法，创建出来的对象其实和构造函数没有关系，尽量不用。

### 稳妥构造函数模式

```javascript
function Person(name, age, job) {
  let o = new Object();
  o.sayName = function () {
    console.log(name);
  };
  return o;
}
let p1 = new Person('jack', 25, 'developer');
```

和借用构造函数模式类似，不过不使用 `new` 操作符，方法中不使用 `this` 对象，实例对象没法直接访问传入的参数，必须借助方法，主要用于某些安全环境下；创建出的对象一样和构造函数没有关系。

## 继承

### 原型链

```javascript
function SuperType(superName) {
  this.superName = superName;
  if (typeof SuperType.prototype.getSuperName !== 'function') {
    SuperType.prototype.getSuperName = function () {
      return this.superName;
    };
  }
}

SubType.prototype = new SuperType('super');

function SubType(subName) {
  this.subName = subName;
  if (typeof SubType.prototype.getSubName !== 'function') {
    SubType.prototype.getSubName = function () {
      return this.subName;
    };
  }
}

let sub1 = new SubType('sub1');
let sub2 = new SubType('sub2');
console.log(sub1.getSuperName()); // super
console.log(sub2.getSuperName()); // super
console.log(sub1.getSubName()); // sub1
console.log(sub2.getSubName()); // sub2
```

如上所示，我们手动的将 SubType 的原型对象设置为 SuperType 类型的实例对象，从而修改了原型链实现了继承。

其中的问题：没法在不影响其他实例对象的情况下向父类型传参，因为原型对象是同一父类的实例对象，而父类的属性就在这上面从而被共享，也因为如此，如果被共享的属性是引用类型值，在一个实例中对值进行内部修改（如数组的 push 方法）会影响所有实例。

### 借用构造函数

```javascript
function SuperType(name) {
  this.name = name;
}
function SubType(name, job) {
  SuperType.call(this, name);
  this.job = job;
}
```

通过借用构造函数，可以让超类型的实例属性成为子类型的实例属性，而非子类型的原型属性。不单独用。

### 组合继承

将原型链和借用构造函数的方式结合起来，也叫伪经典继承。

```javascript
function SuperType(superName) {
  this.superName = superName;
  if (typeof SuperType.prototype.getSuperName !== 'function') {
    SuperType.prototype.getSuperName = function () {
      return this.superName;
    };
  }
}

function SubType(subName, superName) {
  SuperType.call(this, superName);
  this.subName = subName;
  if (typeof SubType.prototype.getSubName !== 'function') {
    SubType.prototype.getSubName = function () {
      return this.subName;
    };
  }
}

SubType.prototype = new SuperType();
```

### 原型式继承

这种方式的目的在于直接通过一个已有的对象，创建一个类似的对象，而不必定义一种新的类型。

```javascript
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}
```

ES5 定义 Object.create() 方法可以实现原型式继承：

- 参数1：用作新对象原型的对象
- 参数2（可选）：新对象上的更多的属性，以对象的形式传入，所有属性作为键，对应的描述符对象作为值

### 寄生式继承

这种方式与寄生构造函数和工厂模式很类似，首先利用基于原始对象创建一个新的对象（比如使用原型式继承），然后对该对象做功能增强，最后返回这个新的对象。

```javascript
function createAnother(original){
  let o = object(original);
  o.anotherMethod = function(){
    //...
  }
  return o;
}
```
### 寄生组合式继承

组合式继承中，超类型的构造函数被重复调用了（借用构造函数添加实例属性、创建实例作为子类型原型），实际上子类型的原型上不需要那些多余的、只需要在实例上的属性；为此，可以利用寄生式继承的模式，创建一个超类原型的副本（干净的实例），将其作为子类的原型，即 inheritPrototype 函数。这种继承方式被普遍认为是理想的继承范式。

需要注意一下，下面的代码使用了动态原型模式添加原型的方法，此时一定不要采用重写原型的方式，否则第一个实例会有问题，继承也同样有问题（超类型的原型改了，子类型的原型链却没动！）；如果方法实在很多，可以使用 Object.assign() 来添加方法到原型上。

```javascript
let F = function () { };

function object(o) {
  F.prototype = o;
  return new F();
}
function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function SuperType(superName) {
  this.superName = superName;
  if (typeof SuperType.prototype.getSuperName !== 'function') {
    SuperType.prototype.getSuperName = function () {
      return this.superName;
    };
  }
}

function SubType(subName, superName) {
  SuperType.call(this, superName);
  this.subName = subName;
  if (typeof SubType.prototype.getSubName !== 'function') {
    SubType.prototype.getSubName = function () {
      return this.subName;
    };
  }
}

inheritPrototype(SubType, SuperType);

let sub = new SubType('sub', 'sup');
console.log(sub.getSubName()); // 'sub'
console.log(sub.getSuperName()); // 'sup'
console.log(sub instanceof SubType); // true
console.log(sub instanceof SuperType); // true
console.log(sub instanceof F); // true
```

# 第7章 函数表达式

## 递归函数

在不使用 arguments.callee 的情况下，可以使用命名函数表达式实现更通用健壮的递归函数：

```javascript
let rc = (function f(n){
  if (n <= 1) {
    return 1;
  }else {
    return n * f(n-1);
  }
});
```

## 闭包

### 定义

书中的定义：闭包是指有权访问另一个函数作用域中的变量的函数。

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) 上的定义：A closure is the combination of a function and the lexical environment within which that function was declared. 

### 内存泄漏

在 IE8- 中由于 COM 对象使用使用不同的垃圾搜集例程（引用计数），如果闭包的作用域链包含着对 HTML 对象的引用，那么该对象无法被销毁；为此，可以使用局部变量保存闭包中需要使用的值，并清除对 HTML 对象的引用。

```javascript
function setHandler(){
  let ele = document.getElementById('btn');
  let id = ele.id; // 局部变量保存
  ele.onClick = function(){
    console.log(id);
    // console.log(ele.id); // 这样导致了循环引用
  };
  ele = null; // 解引用
}
```

## 块级作用域

ES5 中没有块级作用域，但是可以通过立即执行函数来模仿；利用它可以避免过多的全局变量。

## 私有变量

### 构造函数模式

可以利用构造函数中的局部变量（或者直接使用参数）作为静态变量，它们没法在实例上直接通过属性访问，只有通过特权（公有）方法进行存取。这种方式的静态变量是每个实例单独拥有的，显然构造函数模式的公有方法没有做到复用。

```javascript
function Book(year) {
  let _edition = 1
    , _firstYear = year;
  this.year = year;
  this.getEdition = function () {
    return _edition;
  };
  this.setYear = function (year) {
    this.year = year;
    _edition = year - _firstYear + 1;
  };
}
```

### 静态私有变量

所谓静态，即与实例无关，这些静态的变量（/方法）能被所有实例共享，使用立即执行函数来实现。

```javascript
let Book = (function () {
  let bookCount = 0;
  let addBookCount = function () {
    bookCount++;
  }

  let _Book = function (name) {
    addBookCount();
    this.name = name;
  };
  _Book.prototype.getBookCount = function () {
    return bookCount;
  }

  return _Book;
})();
```

### 模块模式

该模式用于为单例添加静态变量和特权方法：

```javascript
let singleton = (function () {
  let privateVariable = 10;
  function privateMethod() {
    return false;
  }

  return {
    publicProperty: true,
    publicMethod: function () {
      privateVariable++;
      return privateMethod();
    }
  }
})();
```

### 增强的模块模式

如果需要单例本身是某种自定义类型，可以使用这种模式：

```javascript
let singleton = (function () {
  let privateVariable = 10;
  function privateMethod() {
    return false;
  }

  let o = new CustomType();

  o.publicProperty = true;
  o.publicMethod = function () {
    privateVariable++;
    return privateMethod();
  };

  return o;
})();
```

# 第8章 BOM

## window 对象

### 全局作用域

- 在 javascript 中 window 对象既表示浏览器窗口对象，也是 ECMAScript 中的 global 对象
- window 作为 global 对象，全局作用域中声明的变量和函数都会成为它的属性
- 全局声明的变量与函数和直接在 window 上挂载的属性的两点区别：
  * 直接挂载的属性可以通过 delete 操作符来删除
  * 直接挂载的属性如果不存在，访问也不会报错（属性查询），而未声明的全局变量直接访问则会报错

### 窗口关系及框架

- 每个框架有相应的 window 对象，top 始终指向最外层框架（浏览器窗口）
- 通过 `top.frames[序号]` 或 `top.frames[窗口名]` 可以访问到各窗口的 window 对象
- parent 指向父层框架（在没有框架的页面中，它和 top 是相等的，都指向 window）
- self 始终指向 window

### 窗口的位置

获取窗口的左边和上边的位置，事实上并不能真正做到兼容。

```javascript
var leftPos = (typeof window.screenLeft === 'number') ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop === 'number') ? window.screenTop : window.screenY;
```

两个移动浏览器窗口的方法（它们可能是被默认禁用的）：

- moveTo(x, y)
- moveBy(deltaX, deltaY)

### 窗口的大小

获取页面视口的通用方法（桌面浏览器）：

```javascript
var w = window.innerWidth,
  h = window.innerHeight;
if(typeof w !== 'number'){
  var ele = ducument.compatMode === 'CSS1Compat' ? 
    document.documentElement :
    document.body;
  w = ele.clientWidth;
  h = ele.clientHeight;
}
```

两个调整窗口大小的方法： resizeTo() 和 resizeBy() ，它们也可能是被默认禁用的。

### 导航和打开窗口

使用 window.open() 可以导航到一个新的网址。

#### 参数

它接收4个参数，只有第一个是必须的。

- URL
- 目标窗口，已有窗口或框架的名称，如果不存在则创建窗口并以其作为窗口名称
- 特性字符串，如果打开了新窗口，根据该参数设置新窗口的特性
- 新页面是否取代浏览器历史记录中的当前页面，只在不打开新页面的情况下使用

#### 返回值

- 该方法会返回打开的窗口的 window 对象的引用，该对象的 opener 属性反过来指向打开它的窗口对象
- 在新创建的窗口对象上调用 resizeTo() 、 moveTo() 等方法可以调整位置大小
- 调用 close() 方法可以关闭弹出窗口

通过检测返回的新窗口对象是否是 null，以及使用 try-catch 包裹打开新窗口的代码，可以检测新窗口是否被浏览器或用户插件阻止弹出。


