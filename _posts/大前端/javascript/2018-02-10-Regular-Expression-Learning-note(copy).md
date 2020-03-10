---
layout: article
title: 正则表达式学习笔记(转)
categories: [大前端]
tags: [javascript]
---

# 前言

转载自：[https://juejin.im/post/582dfcfda22b9d006b726d11](https://juejin.im/post/582dfcfda22b9d006b726d11)，有修改。

# 学习目标

- 了解正则表达式语法
- 在IDE中使用正则表达式
- 在javascript中使用正则表达式处理字符串

# 什么是正则表达式
> `正则表达式`，又称正规表达式、正规表示法、正规表达式、规则表达式、常规表示法（英文：`Regular Expression`，在代码中常简称`regex`、`regexp`或`RE`），计算机科学的一个概念。`正则表达式`使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串。在很多文本编辑器里，正则表达式通常被用来检索、替换那些匹配某个模式的文本。

通俗地讲就是按照某种规则去匹配符合条件的字符串

# 利用图形化工具理解正则表达式

有一个辅助理解正则表达式的在线工具（[regexper.com](https://regexper.com/)），可以自动将输入的正则表达式转换为`铁路图`（又叫`语法图`，`syntax diagrams`）下面是一些例子。

## 手机号正则

`/^1[34578][0-9]{9}$/`

![](http://upload-images.jianshu.io/upload_images/6321648-6b6d4886939a1845.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以1开头，第二位为`3 4 5 7 9`中某一个，以9为（本省1次加回转8次）0-9数字结尾。

## 单词边界

`/\bis\b/`

![](http://upload-images.jianshu.io/upload_images/6321648-cfacb91ff7fa6a88.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`is`前后都是单词的边界，下面的实验有助于理解。

```javascript
var reg1 = /\bis\b/g,
reg2 = /is/g,
str =  'this is a fish';
console.log(str.replace(reg1, 'X'));    //this X a fish
console.log(str.replace(reg2, 'X'));    //thX X a fXh
```

## URL分组替换

`/http:(\/\/.+\.jpg)/`

![](http://upload-images.jianshu.io/upload_images/6321648-38bcdc5ccbaec6eb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

正则表达式中括号用来分组，这个时候我们可以通过用`$1`来获取`group#1`的内容。

```javascript
var reg3 = /http:(\/\/.+\.jpg)/;
console.log('http://img.host.com.abc.jpg'.replace(reg3, '$1')); 
// //img.host.com.abc.jpg
```

说下这个正则的意义，如果网站用了`https`，网站引用静态资源也必须是`https`，否则报错。如果写成`//`会自动识别`http`或者`https`。

## 日期匹配与分组替换

`/^\d{4}[/-]\d{2}[/-]\d{2}$/`

![](http://upload-images.jianshu.io/upload_images/6321648-166c0c54d52024ee.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- `Start of line`是由`^`生效，表示以此开头
- 对应结尾`End of line`由`$`生效，表示以此结尾
- 接着看`digit`有`\d`生效，表示数字
- `3 times`由`{4}`生效表示重复4次，铁路图中实际是3+1
- `one of`表示在给出的所有可选项中选择一个

下面的代码使用它来验证日期字符串。

```javascript
var reg4 = /^\d{4}[/-]\d{2}[/-]\d{2}$/;
console.log(reg4.test('2018-2-7')); // false
console.log(reg4.test('2018-02-07'));   // true
console.log(reg4.test('2018/02/07'));   // true
```

结合URL分组替换所用到的分组特性，我们可以轻松写出日期格式化的方法，改造后的正则表达式如下。

`/^(\d{4})[/-](\d{2})[/-](\d{2})$/`
![](http://upload-images.jianshu.io/upload_images/6321648-eea71407b6f2492f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

轻松的拿到各个分组的内容后，就可以替换成我们期望的格式。

```javascript
var reg5 = /^(\d{4})[/-](\d{2})[/-](\d{2})$/,
    dateStr = '2018/02/07';
console.log(dateStr.replace(reg5, '$1年$2月$3日'));    
//"2018年02月07日"
console.log(dateStr.replace(reg5, '$1-$2-$3')); 
//"2018-02-07-"
console.log(dateStr.replace(reg5, '$2月'));  
//"02月"
```

到现在已经能结合图形化工具看懂正则表达式了，如果有自己写，还需要进一步深入。

# JavaScript中的RegExp对象

JavaScript通过内置的RegExp支持正则表达式，有两种方法实例化RegExp对象

## 字面量方法

```javascript
const reg = /\bis\b/g
```

## 构造函数

```javascript
const reg = new RegExp('\\bis\\b', 'g');
```

**注意**：构造函数第一个参数为正则表达式字符串，需要双重转义，第二个参数为修饰符，修饰符`g`代表全局搜索。

# 正则表达式语法

## 修饰符（`g` `i` `m`）

修饰符与其他部分语法不同，字面量方法声明的时候放到`//`后面，构造函数声明的时候，作为第二个参数传入。整个正则表达式可以理解为正则表达式规则字符串+修饰符。

- `g`：global，执行一个全局匹配
- `i`：ignore case，执行一个不区分大小写的匹配
- `m`： multiple lines，多行匹配

可以同时使用多个修饰符。

### g修饰符详例

```javascript
var reg6 = /is\b/,
    reg7 = /is\b/g,
    str = 'this is a sentence contaning many is.';
console.log(str.replace(reg6, 'O'));
//thO is a sentence contaning many is.
console.log(str.replace(reg7, 'O'));
//thO O a sentence contaning many O.
```

![](http://upload-images.jianshu.io/upload_images/6321648-2553d69fb51ce386.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到添加了`g`修饰符，所有模式匹配的字符串都替换了，而不添加的话，只会替换第一处。

### i修饰符详例

```javascript
var reg8 = /is\b/g,
    reg9 = /is\b/gi,
    str = 'Is this a kiss?';
console.log(str.replace(reg8, 'O'));
//Is thO a kiss ?
console.log(str.replace(reg9, 'O'));
//O thO a kiss ?
```

![](http://upload-images.jianshu.io/upload_images/6321648-407b462bc2410640.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

有`i`时是忽略大小写的。

## 元字符

正则表达式字面量中字符可分为原义字符、非打印字符、元字符，其中元字符在正则表达式中具有一种或多种特殊用途，如果要匹配它们，需要将它们转义，这些元字符包括`( { [ * + ? $ ^ . | \ ) } ] `。

## 原义字符

比如`/is\b/`中的`is`。

`\`将下一个字符标记为一个特殊字符、或一个原义字符、或一个向后引用、或一个八进制转义符。例如，`n`匹配字符`n`，`\n`匹配换行符。序列`\\`匹配`\`，而`\(`匹配`(`。

## 非打印字符

比如换页符`\f`、换行符`\n`、制表符`\t`等等，以`\n`为例。

```javascript
var reg10 = /\n/,
    str = 'sentence 1. \n sentence 2.';
console.log(str.replace(reg10, 'O'));
//sentence 1. O sentence 2.
```

其他非打印字符在前端用得少，通常在后端处理文本文件时才会用到。

## 字符类[]

前面的手机号的例子（`/^1[34578][0-9]{9}$/`）中，我们使用过`[]`，其中的`[34578]`表示`34578`中的任意一个数字即可。在日期匹配与分组替换的例子（`/^\d{4}[\-]\d{2}[\-]\d{2}$/`）中，`[\-]`表示`\`和`-`任选一个。

```javascript
var reg11 = /[abc]/g,
    str = 'a 1 b 2 c 3 d 4';
console.log(str.replace(reg11, 'O'));
//O 1 O 2 O 3 d 4
```

## 字符类取反[^]

表示给出的所有字符之外的任意字符。

```javascript
var reg12 = /[^abc]/g,
    str = 'a 1 b 2 c 3 d 4';
console.log(str.replace(reg12, 'O'));
//aOOObOOOcOOOOOO
```

## 范围类[-]

正则表达式支持一定范围规则，比如`[a-z]`、`[A-Z]`、`[0-9]`，也可以组合起来如`[a-z0-9]`，如果字符`-`本身也是可选项，加在最后即可。

```javascript
var reg13 = /[a-zA-C1-3]/g,
    reg14 = /[0-9-]/g,
    str1 = 'a A 1 b B 2 x X 9',
    str2 = '2016-11-11';
console.log(str1.replace(reg13, 'O'));
//O O O O O O O X 9
console.log(str2.replace(reg14, 'O'));
//OOOOOOOOOO
```

## 预定义类

为了编程方便，JavaScript中具有一些预定义类可以直接使用。

| 字符| 等价类| 含义 |
|- |- |-|
| `.`| `[^\n\r]`| 除了回车符和换行符之外的所有字符 |
| `\d` | `[0-9]` | 数字字符 |
| `\D` | `[^0-9]` | 非数字字符 |
| `\s` | `[\t\n\x0B\f\r]` | 空白符 |
| `\S` | `[^\t\n\x0B\f\r]` | 非空白符 |
| `\w` | `[a-zA-Z_0-9]` | 单词字符（字母、数字、下划线） |
| `\W` | `[^a-zA-Z_0-9]` | 非单词字符 |

有了这些预定义类，写一些正则就很方便了，比如我们希望匹配一个`ab`+数字+任意字符的字符串，可以写作`/ab\d./`。

![](http://upload-images.jianshu.io/upload_images/6321648-9344c2488b175237.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 边界
| 字符 | 含义 |
|-|-|
| `^` | 字符串开头 |
| `$` | 字符串结尾 |
| `\b` | 单词边界，指`[^a-zA-Z_0-9]` |
| `\B` | 非单词边界 |

边界指定义匹配的边界条件，上面基本都在例子中碰到了，下面演示下`\b`与`\B`。

```javascript
var reg15 = /\bdog/g,
    reg16 = /\Bdog/g,
    str = '@dog@dogdog@';
console.log(str.replace(reg15, 'X')); 
//@X@Xdog@
console.log(str.replace(reg16, 'X'));
//@dog@dogX@
```

## 量词

| 字符 | 含义 |
|-|-|
| `?` | 出现0或1次 |
| `*` | 出现0，1，2…次（任意次） |
| `+` | 出现1，2，3…次（正数次） |
| `{n}` | 正好出现n次 |
| `{m,n}` | 出现m到n次（含两端） |
| `{n,}` | 至少出现n次 |

这个正则表达式使用了上面的各种形式的量词：`/\d?@\d*@\d{10}@\d{10,20}@\d{10,}/`

![](http://upload-images.jianshu.io/upload_images/6321648-1ba34da12aea223b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 贪婪与（惰性）非贪婪

正则表达式默认会匹配贪婪模式，什么是贪婪模式呢？如其名，在符合规则的情况下尽可能多地匹配字符。如下面这个例子。

```javascript
var reg17 = /\d{3,6}/;
console.log('1234567890'.replace(reg17, 'X'));
//X7890
```

贪婪模式下，匹配了最多的情况。

与贪婪模式对应的就是惰性模式，此时尽可能少地匹配字符。如何开启懒惰模式呢？在量词后面加`?`。继续上面的例子：

```javascript
var reg18 = /\d{3,6}?/;
console.log('1234567890'.replace(reg18, 'X'));
//X4567890
```

更深入的介绍可参看[进阶正则表达式](https://segmentfault.com/a/1190000000426455)。

## 分组与反向引用

分组，又称为子表达式。把正则表达式拆分成小表达式。来看例子：

### 不分组

`/abc{2}/`

![](http://upload-images.jianshu.io/upload_images/6321648-100a3da3f2ce6ce2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


量词仅作用到最后的`c`。

### 分组

`/(abc){2}/`

![](http://upload-images.jianshu.io/upload_images/6321648-fd066b0a8f0e34f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  注意这里的`group#1`。

分组虽然和运算符`()`很像，但是分组在正则表达式中，需要着重理解其含义。比如如`/^(http|https)/`这样滥用分组没有必要，完全可以写作`/^https?/`。你写的正则特别长的时候，会出现一堆没用的结果。

`分组`往往和`反向引用`一起使用。具体来说，当一个正则表达式被分组以后，每个分组自动被赋予一个组号，从左到右是`$1 $2 …`。

在把之前的例子拿出来：`/^(\d{4})[/-](\d{2})[/-](\d{2})$/`。

![](http://upload-images.jianshu.io/upload_images/6321648-281a61fbbe90a524.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以很容易拿到分组`group#1`、`group#2`、`group#3`对应的匹配内容，分别是`$1`、`$2`、`$3`。

```javascript
var reg19 = /^(\d{4})[/-](\d{2})[/-](\d{2})$/,
    str = '2018/02/10';
console.log(str.replace(reg19, '$1年$2月$3日'));
//2018年02月10日
console.log(str.replace(reg19, '$1-$2-$3'));
//2018年02月10日
console.log(str.replace(reg19, '$2月'));
//02月
```

如果一个分组不想捕获，可以在括号内起始位置加上`?:`，如：`/^(?:\d{4})[/-](\d{2})[/-](\d{2})$/`。

![](http://upload-images.jianshu.io/upload_images/6321648-e49d88fa5e6a38e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 前瞻（进阶，选看）

正则表达式中有前瞻（Lookahead）和后顾（Lookbehind）的概念，这两个术语非常形象地描述了正则引擎的匹配行为。需要注意一点，正则表达式中的前和后和我们通常所理解的前后有所不同。一段文本，我们一般习惯把文本开头的方向称作前面，文本末尾方向称作后面。然而对于正则表达式引擎来说，因为它是从文本头部向尾部开始解析的（可以通过正则选项控制解析方向），因此对于文本尾部方向正则引擎还没走到那块，称作`前`，而文本起始位置已经走过了，称作`后`。需要注意的是，后顾性能损耗比较大，js只支持前瞻。按我个人的理解，前瞻的内容并不属于我们的匹配目标，而是我们在匹配目标时，需要向前查看的环境，这种环境要求就是前瞻。

前瞻分两种，正向前瞻（`?=xxx`）和负向前瞻（`?!xxx`）。下面是例子。

```javascript
var reg20 = /[a-z]{2}(?=\d{2})/g,
    reg21 = /[a-z]{2}(?!\d{2})/g,
    str = 'aa11bb22cc**';
console.log(str.replace(reg20, 'X'));
//X11X22cc**
console.log(str.replace(reg21, 'X'));
//aa11bb22X**
```

# 知识汇总应用

## 题目

将字符串`123456789`转换从低位起每三位用逗号区隔一次的货币形式，即`123,456,789`。

## 参考

`'123456789'.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')`
