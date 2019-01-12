---
layout: article
title: jQuery源码解读笔记
categories: [js]
tags: [jquery]
issueNum: 37
---

# 前言

基于妙味课堂的`jQuery`源码视频的笔记，其中`jQuery`版本为2.0.3。

# 第1-94行

## 最外层的立即执行函数

`jQuery`的所有代码都被包含在一个立即执行函数（`Immediately Invoked Function Expression, IIFE`）中，如下所示：

```javascript
(function(window, undefined){
    // all the code included here
})(window);
```

这样做的好处在于避免全局变量污染。

传入`window`变量是为了减少在内部使用该变量时进行查找的作用域链长度，从而改善性能。

传入`undefined`是原因在于，它是全局对象的一个属性，在现代浏览器中是不可写的，而某些低版本浏览器却有可能在全局作用域下修改它的值；由于它不是一个`js保留字`，在非全局作用域下理论上用它作为标识符给它赋值都是可以的（虽然尽量不要这么做）；传入以后，不论外部代码如何，可以确保至少在我们的源代码内部`undefined`就是那个ECAMScript标准中的`primitive value`。

## 全局对象与方法的暂存

在源代码中将一些现有的对象属性和方法暂存在了一些变量中。这样做的原因，一是在使用时避免了属性读取，有性能好处，二是我们的变量在代码压缩时是会替换成短字符串的从而有利于减少文件大小，而`js`自带的一些对象、方法、属性却不行。

## jQuery对象

关于`jQuery`对象的代码大致如下：

```javascript
var jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context, rootjQuery);
    };
jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function(selector, context, rootjQuery) {
        // some code
    }
};
jQuery.fn.init.prototype = jQuery.fn;
```

我们可以看到`jQuery`本身是定义为一个函数的，在函数内部调用以构造函数的方式调用了它的原型对象`jQuery.prototype`的方法`init()`，`jQuery`和`init`共享了原型对象，这个原型对象的`constructor`设置为`jQuery`。看起来`jQuery`函数负责面子工程，而`init`函数做了实质工作，这样写使得我们在使用`$`或者`jQuery`时可以不用`new`操作符，而像一个纯粹的函数调用一样，而函数返回的结果却是一个`jQuery`实例（当然也是`init`实例，因为譬如`A instanceof B`，实际上只是检查`A`的原型链中是否有`B.prototype`）。我们可以用下图来表示它们之间的关系：

![jQuery函数及其原型][jQuery函数及其原型]

另外要说明一下`$(xxx)`返回的对象除了是`jQuery`实例，也是`init`实例，如果我们调用`$(null) instanceof jQuery.fn.init`，结果会是`true`。实际上譬如`A instanceof B`，实际上只是检查`A`的原型链中是否有`B.prototype`）。

```javascript
function F(){}
function test(){}
test.prototype = F.prototype;
console.log(new F() instanceof F);  // true
console.log(new F() instanceof test);   //true
```

# 第96-283行

## jQuery原型对象总览

这部分定义了`jQuery`函数的原型对象，提供了实例共享方法和属性。

```javascript
jQuery.fn = jQuery.prototype = {
    jquery  // 版本号
    constructor //修正constructor
    init()  // jQury()函数真正执行的方法
    selector    // 选择符
    length  // 结果长度
    toArray()   // 转为数组
    get()   // 取出jQuery对象结果“数组”中指定DOM节点
    pushStack() // jQuery对象入栈
    each()  // 循环处理jQuery对象的每一个结果项
    ready() // 文档加载结束所执行的函数
    slice() // 剪切以让jQuery对象结果“数组”部分保留
    first() // 让jQuery对象结果“数组”只保留第一项
    last()  // 让jQuery对象结果“数组”只保留最后一项
    eq()    // 让jQuery对象结果“数组”只保留指定某项
    map()   // 将jQuery对象结果“数组”内容映射修改
    (push())    // 原生数组push方法引用
    (sort())    // 原生数组sort方法引用
    (splice())  // 原生数组splice方法引用
};
```

## 关于jQuery.fn.init函数中的context参数

这一部分视频在讲解时认为有时这个参数完全是没有必要的，最主要集中在使用`jQuery`函数进行标签创建的时候，比如`jQuery(‘<li>’, context)`；实际上在该函数内部，调用了`jQuery.parseHTML()`函数，而该函数中创建标签最终工作是通过`context.createElement()`来实现的（当然这里的`context`已经进行了判断和处理）；而`createElement`函数创建标签时，实际上也为创建出来的标签绑定了`ownerDocument`属性，因此明确指定`context`是必要的，一个例子就是`iframe`。

因此函数中有` context && context.nodeType ? context.ownerDocument || context : document`这样的代码，这样不论调用时是否传递了该参数、该参数时候合理，都能让代码正常运行。

# 第285-347行

## jQuery拷贝继承函数

```javascript
jQuery.extend = jQuery.fn.extend = function(){
    // detail code
};
```

这部分实现了一个功能完善的对象拷贝功能，即`extend`函数。可以传参选择深拷贝/浅拷贝、传入单个对象实现插件扩展、传入多个对象时该函数作为一个工具性函数执行函数拷贝继承。

值得一提的是，在传入单个对象实现插件扩展时，函数内部实际上将传入的对象由`this`来继承，而`jQuery`和`jQuery.fn`虽然共享了这个函数，然而分别在它们上面调用该函数时，`this`是不一样的。在`jQuery`上调用`extend`，插件被扩展到`jQuery`上，使用插件方法的语法类似`jQuery.<extendedMethod>()`；而在`jQuery.fn`上调用`extend`，插件被扩展在`jQuery`实例的原型对象上，使用插件方法的语法类似`jQuery().<extendedMethod>()`。

# 第349-817行

## jQuery对象工具方法总览

```javascript
jQuery.extend({
    expando //生成唯一JQ字符串(内部)
    noConflict()    //防止变量名冲突
    isReady //DOM是否加载完(内部)
    readyWait   //等待多少文件的计数器(内部)
    holdReady() //推迟DOM触发
    ready() //准备DOM触发
    isFunction()    //是否为函数
    isArray()   //是否为数组
    isWindow()  //是否是window
    isNumeric() //是否是常规数字(不能是NaN、无穷)
    type()  //判断数据类型
    isPlainObject() //是否是对象字面量(或使用Object构造函数创建的对象实例)
    isEmptyObject() //是否是空对象(无自定义属性) 
    error() //抛出异常信息
    parseHTML()  //根据字符串解析成DOM节点数组
    parseJSON()  //解析JSON
    parseXML()   //解析XML
    noop()   //一个空匿名函数
    globalEval() //全局解析js代码字符串
    camelCase()  //将css属性名转为驼峰形式
    nodeName()   //比较判断dom节点的节点名
    each()  //遍历集合
    trim()  //去除字符串前后空格
    makeArray() //类数组转为真的数组
    inArray()   //数组版indexOf
    merge() //(类)数组合并
    grep()  //数组项过滤
    map()   //映射新数组
    guid    //唯一标识符(内部)
    proxy() //改this指向
    access()    //多功能值操作(内部)
    now //当前时间
    swap()  //css交换(内部)
});
```

这部分使用之前定义的拷贝函数`extend`为`jQuery`对象增加了一系列工具方法和属性。

## 插入script标签然后立即移除

在`globalEval`函数中，其中一个分支（541行）使用了插入`script`标签的方式来执行代码，源码如下：

```javascript
document.head.appendChild( script ).parentNode.removeChild( script );
```

这段代码将包含执行代码的`script`标签插入文档，然后立即移出，那么为什么在移出以前，`script`标签的内部代码一定执行完了呢？为此我在`segmentFault`就此提问，下面说说我的理解。

首先我写了下面这样的实验代码。

```javascript
var a = 1,
    code = 'a = 2; console.log(\'inner code\')',
    doc = document,
    body = doc.body,
    script = doc.createElement('script');
script.innerHTML = code;
console.log('outside code 1');
body.appendChild(script).parentNode.removeChild(script);
console.log('outside code 2');
console.log('a = ' + a);
```

运行结果如下：

![运行结果][运行结果]

我们可以看到插入`script`标签后代码执行进入了其内部，这就好像一个`中断`，上面结果图片我们可以看到`inner code`后面显示的`VM315:1`，这可能是内部引擎防止这段代码的地方；`中断`完成前，外层代码的`parentNode`属性读取和`removeChild`函数调用应该都不会执行，也就是说在移除`script`标签前其内部的代码已经执行完毕了。

# 第2847-3042行

## 功能概述

这部分提供一个统一的回调函数管理对象，通过`let callbackManager = $.Callbacks(模式选项);`的方式获得这个管理对象；内部实际上将各回调函数存储在一个数组中，它提供了`add`、`remove`、`fire`等方法来实现会回调函数的添加、删除、触发等操作。更多使用说明可查看[官网API](https://api.jquery.com/jQuery.Callbacks/)。如下是一段使用示例代码：

```javascript
function a(arg){
    console.log('a: ' + arg);
}
function b(arg){
    console.log('b: ' + arg);
}
let manager = $.Callbacks();
manager.add(a);
manager.add(b);
manager.fire('hello');
//a: hello
//b: hello
```

## 模式选项

上述的示例代码很类似事件绑定与触发的过程，但该回调函数管理对象通过给定**模式选项**参数可以实现更加灵活、强大的功能。其主要模式选项参数及其解释如下：

|模式|解释|
|- |- |
|`once` |只能被触发（`fire`）一次 |
|`memory` |记忆功能，添加新函数时，如果之前曾触发过，那么这个新添加的函数添加时会被传入之间的参数被触发 |
|`unique` |保持回调函数列表中函数的唯一性（不重复出现） |
|`stopOnFalse` |在某个函数调用返回`false`时，取消本次触发过程的后续函数的调用 |

## 各种模式的组合测试

下面的一段代码可以测试各种模式组合下的运行效果：

```javascript
function fn1(arg) {
    document.write(`<span style="color: #666;">fn1:${arg}</span>&nbsp;&nbsp;`)
    return false;
}
function fn2(arg) {
    document.write(`<span style="color: #666;">fn2:${arg}</span>&nbsp;&nbsp;`)
    return false;
}

let options = [''];
['once', 'memory', 'stopOnFalse', 'unique'].forEach(item => {
    let len = options.length;
    for (let i = 0; i < len; i++) {
        options.push((options[i] + ' ' + item).trim());
    }
});
options.sort((item1, item2) => {
    return item1.length - item2.length;
});

options.forEach(option => {
    document.write(`<h4 style="margin: 8px 0px 0px;">模式：${option}</h4>`);

    let cb = $.Callbacks(option);

    document.write('cb.add(fn1); <span style="color: #666;  ">&nbsp;// </span>');
    cb.add(fn1);

    document.write('<br>cb.fire(1); <span style="color: #666;">&nbsp;// </span>');
    cb.fire(1);

    document.write('<br>cb.add(fn2); <span style="color: #666;">&nbsp;// </span>');
    cb.add(fn2);

    document.write('<br>cb.add(fn2); <span style="color: #666;">&nbsp;// </span>');
    cb.add(fn2);

    document.write('<br>cb.fire(2); <span style="color: #666;">&nbsp;// </span>');
    cb.fire(2);

    document.write('<br>cb.remove(fn2); <span style="color: #666;">&nbsp;// </span>');
    cb.remove(fn2);

    document.write('<br>cb.fire(3); <span style="color: #666;">&nbsp;// </span>');
    cb.fire(3);
});
```

## 源码解读

```javascript
// 表示字符串格式的模式和对象格式的模式之间对应关系的缓存对象
var optionsCache = {};

/**
 * 该函数将字符串形式的配置参数转换为对象的形式
 * 如`memory unique`将转变为对象：
 * {
 *      memory: true,
 *      unique: true
 * }
 * 并且会以该对象为值、以`memory unique`为key存在optionsCache缓存对象中
 * @param {String} options 配置参数字符串
 */
function createOptions(options) {
    var object = optionsCache[options] = {}; // 初始化
    jQuery.each(options.match(core_rnotwhite) || [], function (_, flag) {
        // 以所有给定的模式为键，true为值放入选项对象中
        object[flag] = true;
    });
    return object;
}

/*
 * 使用如下的一些选项创建一个回调函数列表（数组）
 * options: 一个用空格分割的选项字符串或者选项对象，它们可以控制回调函数列表的行为
 * 默认情况下，这个回调函数列表表现得就像一个时间回调函数列表一样，并且可以被多次触发
 *
 * 可能的选项:
 *	once:			使得回调函数列表只能被触发一次(就像一个Deferred)
 *	memory:			记录之前回调触发是的参数值，如果列表已经被触发过，
 *                  那么后续有函数加入这个列表式它们会被传入记录的参数，立即执行 (就像一个Deferred)
 *	unique:			保证回调函数列表中的函数不会有重复
 *	stopOnFalse:	如果某一个回调函数返回了false，回调将会终止
 */
jQuery.Callbacks = function (options) {
    // 如果需要的话，讲一个字符串形式的参数列表转换为对象形式（过程中会首先查看缓存中是否已有）
    options = typeof options === "string" ?
        (optionsCache[options] || createOptions(options)) :
        jQuery.extend({}, options);

    var memory, // 上次触发的参数
        fired, // 列表是否已被触发过的标记
        firing, // 当且列表是否正在触发过程中
        firingStart, // 触发的遍历起始位置（被add和fireWith内部调用）
        firingLength, // 触发的回调函数列表总长度
        firingIndex, // 当前正在触发的回调函数的位置索引
        list = [], // 实际回调函数列表
        stack = !options.once && [], // 触发等待队列，用于可多次触发的回调函数列表，堆中保存的是后续各次调用的参数
        fire = function (data) {
            // 有memory选项时，保存参数data，否则将是falsy的（false或undefined）
            memory = options.memory && data; 
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for (; list && firingIndex < firingLength; firingIndex++) {
                if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                    // 在stopOnFalse模式下，确实返回了false，终止触发过程
                    memory = false; // 阻止后续通过add的方式触发
                    break;
                }
            }
            firing = false;
            if (list) {
                // 还没有被禁用（disable()）
                if (stack) {
                    // 可多次触发
                    if (stack.length) {
                        // 还有后续触发队列，继续下一轮触发
                        fire(stack.shift());
                    }
                } else if (memory) {
                    // 只能单次触发，但是还有是记忆模式，那么后续add的函数可能还会被触发
                    // 当前需要清空已经被触发过的所有函数
                    list = [];
                } else {
                    // 非记忆、单次触发模式，以后绝不可能以任何方式触发了
                    // 那么可以直接禁用该回调列表
                    self.disable();
                }
            }
        },

        // 实际回调对象
        self = {
            // 向list中添加函数（集合）
            add: function () {
                if (list) {
                    // 非禁用状态
                    var start = list.length; // 当前列表长
                    (function add(args) {
                        jQuery.each(args, function (_, arg) {
                            var type = jQuery.type(arg);
                            if (type === "function") {
                                if (!options.unique || !self.has(arg)) {
                                    // 在非单次触发模式或在单次触发模式时的新函数
                                    list.push(arg);
                                }
                            } else if (arg && arg.length && type !== "string") {
                                // 非空类数组参数，持续解构
                                add(arg);
                            }
                        });
                    })(arguments);

                    if (firing) {
                        // 正处在触发过程中，只需要将回调函数列表长度更新给待触发函数的索引上界
                        firingLength = list.length;
                    } else if (memory) {
                        // 当前不在触发过程中，且是记忆模式、且一定被调用过（否则memory会是undefined），即刻调用新添加的所有函数
                        firingStart = start;
                        fire(memory);
                    }
                }
                return this;
            },
            // 移除回调函数
            remove: function () {
                if (list) {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            // 持续移除（因为可能有重复）
                            list.splice(index, 1);
                            if (firing) {
                                // 处理正在触发中的情况
                                if (index <= firingLength) {
                                    // 移除了原本要触发的函数
                                    firingLength--;
                                }
                                if (index <= firingIndex) {
                                    // 移除了已被触发的函数
                                    firingIndex--;
                                }
                            }
                        }
                    });
                }
                return this;
            },
            // 检查列表中是否有给定的函数
            // 空参数表示返回列表是否已有函数
            has: function (fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
            },
            // 清空列表
            empty: function () {
                list = [];
                firingLength = 0;
                return this;
            },
            // 禁用列表
            disable: function () {
                list = stack = memory = undefined;
                return this;
            },
            // 判断列表是否被禁用
            disabled: function () {
                return !list;
            },
            // 将列表锁止在当前状态
            lock: function () {
                stack = undefined;
                if (!memory) {
                    self.disable();
                }
                return this;
            },
            // 列表是否处于锁止状态
            locked: function () {
                return !stack;
            },
            // 使用给定的上下文和参数调用所有的回调函数
            fireWith: function (context, args) {
                if (list && (!fired || stack)) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    if (firing) {
                        // 正在触发中，放在等待队列中
                        stack.push(args);
                    } else {
                        // 目前不在触发中，直接触发
                        fire(args);
                    }
                }
                return this;
            },
            // 使用给定的参数触发所有回调函数
            fire: function () {
                self.fireWith(this, arguments);
                return this;
            },
            // 列表是否被触发过
            fired: function () {
                return !!fired;
            }
        };

    return self;
};
```







[jQuery函数及其原型]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf0AAAEsCAIAAABGzP1VAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAKINJREFUeF7t3T2II8n5BvA1/LEnMOywXKDAwfiwz+ICo2B9DIvBExh7ErM6MHiceAcOFmUncLAKbNbZYM5YyyUDvkDOlHnAhhUXTShwolCGCyacUKHC+z/q91VNTX9NV6lH/VHPL9B2VVf3SK3up6s/tvXkWyIiCglzn4goLMx9IqKwMPeJiMLC3CciCgtzn4goLMx9IqKwMPeJiMLC3CciCgtzn4goLMx9IqKwMPeJiMLC3CciCgtzn4goLMx9IqKwMPeJiMLC3CciCgtzn4goLMx9IqKwMPeJiMLC3CciCgtzn4goLMx9IqKwMPeJiMLC3CciCkvQuT+bzU589fv9t77G4/G1r/l8ru+eiMhLuLmPAH3z5s2TwOhey8toNNIdlzvsYnXH5W61Wul3RkRlCDf3j46ONAupvbrdru613J2fn+tey91kMtG9lrvlcqnrKNHjYO4/mU6nusG5wFS6ibsbDocaLe6Oj4/lbRMlHR4e6oribpdTlxcXF7pheNFtkvYl3Nw3ARrOarder2Uz86ObuJfT01NNF3fIMvmmiJKwIeuK4m6XU5dXV1e6Ybi7vb3VbbIi4eY+vnVZb/A1aBW1zmKxkC3Nw+XlpW7i7s7PzyVZPHS7XVkziZImk4mu3DsIN/fRA5XliP22VhE1HDqSutdyhw1B91ru0HHWvZYX2RKpiJcvX2KB6/ftK9zcR49MlmMp+08iqoTutbxcXFzIfstDv9/XvZa7Tqcj4eNNP7wv5j5zn4iaQSILtOwr3NzHHluWIAa0ioioxiSyQMu+mPvMfSJqBoks0LKvcHN/PB7LEhwOh1pFRFRjElmgZV/h5v5kMpEleH5+rlVERDUmkQVa9sXcf3J2dqZVREQ1JpEFWvYVbu5fX1/LEjw5OdEqIqIak8gCLfti7jP3iagZJLJAy77Czf3FYiFLsNvtahURUY1JZIGWfYWb+zc3N7IEj46OtIqIqMYkskDLvpj7TzqdjlYREdWYRBZo2Ve4uQ+6CHdeiEREe6CBxdzfhS5C5j4RNYEGFnN/F+apeOZnEObz+WKxkGEiolqRvAIt+wor98fj8cnJyXQ6laL5qcWbmxsU5Yk9BwcH/IFTIqohySvQsq+wch+ZjkWGV+nUmx82QtCjyy9jAb1+aU9EVB8SUKBlX2HlPjr7stR6vd56vTbF6+vr4XAowxilrYmI6kQyCrTsK6zcR7/edOovLi5M7k+nU1PPn10konqSjAIt+wor9wFxLwsOQY+uvQybC7zs7BNRbUlMgZZ9BZf76/XaxH0SO/tEVFuaU8x9D4vFwpzVsbGzT0R1plHF3PczGo10+VnY2SeiOtOoYu77Wa/X5iZOcXp6quOIiGpJ04q5720+n+sijPC/6RJRzWlaMfd3MRgMZCH2+32tIiKqK8kr0LIvn+n/+9//fvXVV9fN9/XXX8sdnO34OH/9619Xq5V+SUTUOhL6oGVfPtP//Oc/Pzo6OmmFn/70px988IEWGu7g4ODLL7/UL4mIWkdTv5LcfxvRQvO1po+MnbE8YI6IWklTn7lPBnOfqN009Zn7ZDD3idpNU5+5X6Lk0tx9+e4Tc5+o3aLM39Cyr3bmvi6bDNpoy9TkDDQCc5+o3ZBIQsu+fKavf+5nyVpeUm+/it2X7z4x94naDYkktOzLZ/qG5v6DCyvZIFrCd7S2rpj7RO2mScTcT5KFYi+aaEFpUQbsYiq7DdjDtcXcJ2q3KJw2tOzLZ/pG5H7BASFF+9UegFj7emLuE7Ubgkho2ZfP9E3JfZBh+1WkDscGstrXFnOfqN0QRELLvnymb1Dui5wae1RyOLVZbTH3idoNQSS07Mtn+gblvgzbryK54JI1kJywzpxyf7lc6hARNQSySGjZl8/0Tcn9ggNJMgpk2K6pM6fc73a7x8fH6/X6+vpaq4io3qJ82tCyL5/pG5H79qJJDscWXFZjiBXrrHjuy2/OHB4eyu8Mdzodpj9R/WFrFVr25TN9I3JfyHByMSXbGPnFOiue++fn5/hc6O9fXV0Nh0MMI/p1HBHVFTZVoWVfPtM3KPchdRnZlZuluC3a9SDFWGVt5eT+7e0tvjIZu16vpZtvihg2n3EymWA+/NVJohqSTRW07Mtn+mblfqpkm2hhplSa1/rLyX35RUl08zGMZMfwycmJjMIuAUXsCaSIehRxKIBX/tY8Ua1gqxRa9uUzff1zvwhtHTE1dn3WcG3l5P7V1RUCXU7iS6b3ej0ZJed55BeGl8slhqHb7aKB7CcA+wbe/0NUOdk8Qcu+fKavee4XYRZcciFKMVYJyZq6KXJ+X5L98PAQr4h1CX2QEzuj0QjD9q/Mr1YrOQKATqczHo91RARjW/NrZUT1J1siaNmXz/QtyP1WKpL7EvR4lTM/wnyb8ivz8/lciiChj1e0wUEAhrFv0HHffntxcYGa6XSqZSJ6TNjchJZ9Mffb48HcX6/XkuzSu0e+I7hNyl9dXWEUwl2KMJvNUINJMCGKciUAZPj4+FiOG3gPKNF+yAYIWvbF3G+PIrmPbr45ax9zdnaG9Ql7Ai1vDw7s7zpa5Z4g9PGHpPsP/X7fPkQgokciWxxo2Rdzvz2KnOfJgTQfj8d41fL2Nv/JZCJFOSDAX5GijEX6HxwcXF5eSiURPZ5N5Ee07Iu53x475n6SueNztVphfyAdfLm0a/4TgL2fmE6np6encjHArieiUmwiP6JlXz7Tv3z58he/+IWkP9XH4eEhuuSDwaDEsy5y8seQR/qgHh18FO07f+QaL2D3g1e8Gfu8/2w2Q2P+dzCiXcgmBlr25TP97373O+Z+DSFq//KXv8hqgfBFTSndf8Q3ZoUdAHr6Evog9/mYO3nwh9D9B0l2TIKx8uwHTIKdhLTn6SCiXWy27YiWfflMH4UMz/PUDrIe+2NdL7YQuJPJxOR1WaRTb3r02CWgaF8xjv745iyQ7APEY7wTonDohsTcJwNZ/K9//WswGMjtlTb0xBHKs9lMm+7M3P4vp/vlGq/pzqP7jyLehhTN/w6Di4uL5XLJ+3+IPOhWxNwnA7kvJ3bQp5ZLrLqOWNBmNBqVcv4HfwKrgVy/lf/oa/5Ll+wVzs7OpCgHB1dXV+jvo71cCZAdBhEVhw1HaNkXc789TO4bCFnEq7nR3nZ8fIzueVlPWcAfkv8Rhp2N7G9whCFvRs7z2P8dDCsPaswqhAbYJcgwEeXAhiO07Iu53x7J3DcWi0XW+R/0yks5/4Pox5+Q9O/1eubWHbkjyO7dY+VBjaxCy+VS3hXeA44D5OiBiFJhSxFa9sXcb4+c3Dem02ns1kyBvB6NRo/x0E052rDv4MTKgxocbazXaxmLPy1XhjEgaxd3AERJ2EaEln0x99ujSO4LpCpiN/X8D7rqJZ7/AXns88n2KdCAlQc1k8mk3+9jQP4TAP7u5s9v4SCA0U8Uo5sHcx/ev37y5MW7b7QE37x7oUsn8vq91rdc8dw30MEfDodyciYGhwWlnHbHW5IjDNPll9yXoMcrev0YhWG8DXn/coXAXCUmIoHtQmjZV+tyXzLfivrN2Pu7hbbyyH0DEZ91/mcwGJR7/kdyX2Yub1ju/zErlTQ4Pz/HLkFGAY5OzBEDUZhkWwAt+2pD7ts2KR/v30e7ggA6/bvkvlitVpeXl3JmJgaxi1GlnHuR2/kPDg7kLn6Eu1zaNW9ezv+Mx2NzImg6neLTYZg3/lPIsAkILftqQ+5vcl079Gmxfy/4N4N3De41lyMFYSrR4sW79zLmxQv8Yx05WH+3FnbPfQMd/NFolHr+R1JY27mTZ/qDmQkGpEZWKiQ7hrFXMC3lBJEUsc+IJiIKkWwRoGVf7cr9rCS+y/es3I9CfzvCms2mxd2ITcnMP+uPVabE3DeQtmdnZ0jhaGW7gx76YDCw79IpAscTMiv73L08ukcOMsyhhtzYgwHZ9+BoQ05DMfcpZJttI6JlX8z9qBSfECOkeDdlxGqX9beq8xi5L5DXk8kk6/yP0333eIf2aXoUMRPsRfAnzAUGCXd59gN2PPbBB4oyIVGAou1jQ8u+2pX78ZhWmwYP535cNCI+Q/O3rD9aF4+X+wbmjwiWU+0xp6en0+l07fjYNaxImBaHDlq2yB39dgef13UpcNGmtqFlXy3L/Si/7ZzesCs3w3fj7+V+aoondyRSc38+9bCH3DcQweiPp57/QX3xq69yJTn1fiHsQswpIKxvOKrQEUShkq0MtOyrZbmvIW9H+Can06Jex2ghmiwlyJO5r5Oltq7WPnNfIJonk4mkcwzeDJJ69/dj5t/r9bSKKFSycYGWfbUu9ze2ySyi23CsmDZjY732KPrvSH1K7usMahf7FeS+gb+LlE89/4PURna7nv8hoiTdqJj7kMj9FBLq5WR1kb9XhQpz35jP5+fn53I/vu0g+gEAnqAn2oVuTsx9SOuTP6K6xn4tcl+gdz/N/gEArDx7fp9//OMfP/vsM1lviar1+eef//73v9dV05FuRaHnvp6b2WcM1zb2a5T7xm30KyupD4A7Pj6eTCar8h4Al+OTTz55+fKlrLdE1Xr16tWHH37od+ZTNx7298moYe4bi+wfADgv9QcgU+FPYB+jBaJKXV9fn5ycaMGRbjbMfTLqnPvGdDqVp+7EdB7tBwCAuU/1wdynMjUi90XODwAcl/oDkIK5T/XB3KcyNSj3DXTwB9tfZ4w5K+kHAIC5vyN8HTr0kJyWxWfSbk3N/dhPI1F9fPHFF/olNc00+wcgh8NhkfM/s9kMm1PqpYLQcl+X3UPyG8tYESvmyGoZzTKFjg5JU3Mfx+CN61dmQR9ZlmMLPpHr0zFrSB7bkNqxePAHAOSrPDg4wHalVVsB5r4ObSVrYkwDu2VqZb7UllmTF59tmzQ199ukTbnfJujgo5ufdf4HBwfazmL+u8Dh4WHs2ww892PFVKaN3TirMkZHRGJFkDb5tGkYmPvVY+7X3KzwDwDgUMB8mzg4sK8MB5v7sjRiZFSMqbcbpFbGyCi8JtljN0238outx9yvHnO/EeT8T9YPAIzHYzn/g92A2UOg+y/TQsi5LwNGrGazpDLIWNNMBpJio1Jb2pXJBjkzbyXmfvWY+82Cryn/BwBAy9az+5n7RrJGpE6SNZ+sekjWACrzabswMPerx9xvqNlshjRPPf8DWtj+ii/P89hklM2ufLCBkBpTnxxIhbH5DULA3K8ec7/Rcn4AQGDHII8IZX9fJGvArow1kOKDU0FOS0C9GWW3sYcDwdyvHnO/HfD1vX37NvX8T6fT+e1vf8vcFx41yQYitVnq3OxKGbZfQ8Pcrx5zvwVub2+xLSH30a+3T/IYz549+8c//qGtA4CPbAaSZJSIFUVqZYy0SbbMmRajzFh7ODTM/eqZUwT4MrSKmgPfWmofP+mXv/ylThMAfF4d2krW2KIllEfbWUxlbGyy8Wb6iJa3NTIgNUFh7lePud9og8FAvr6YTqfz0UcfPX/+/OOPP5aaX/3qVzpNAPB5HxzI8WAbu0Gscf60GCsNTDMzEA7mfvWY+402n8/R3//+97/f7XZ/9rOfIeufPXsmX2jMn/70J52m7fBhYwOQNZwqv4HfWNTbo7KGQ8Dcrx5zv+lS/zNXzNOnT8O5rovPa16TRWGPLU4mySINYs2i6Ta0nNtMC23H3K8ec7/Rbm5u5OvL1+v1Asl9fFgdsqRWPoaCf2hv76eemPvVY+433cXFBb7Es7Ozt2/fzmazy8vL5C09od3HSXXG3K8ec79NEPrybdqOj49D+39bVGfM/eox91tjOBzKVwlHERnGzoC5T/XB3K8ec78FVquVefg+oIO/WCxk+ODg4Pb2lrlP9cHcr16/35flWNZPudKe3dzc2L/PhYhfr9cXFxdSlKcxf/rpp2/evMH2Rrv4KqIF8jUej58/fy5rrytZq0HLvkLPfcSELEf2Bx8beuVmaUs664gdzOdz+you4l7qu92u1MjzOH/4wx+iBp0s2oWcPdMC+UI35dmzZ37rv6zVoGVfzH3m/p6g693pdAaDgfx64tnZmY7whUw3z2HGgDlis0/yyNaFb5nf7+7eRrRAvtDlR/prwZGs2KBlX8x95v4+YF3HQpZolrtuzI+i+BmNRtH3toEdif2Di/K3AF+u1DD3S8HcLwVzv3rM/f0Yj8dYyMh9GcArKufzucdjUNGFx7FC9KVt4KhZfmTRQAN8rTi8MPXM/VIw90vB3K8ec/9RIdaxliOIpQ9+eHh4cHAg59xXq9XR0ZFrrx9Rbl/F7ff7Rc6TMvdLUVXuY+W5uLjAzh5xiW8c70FWKh3dNMz9OPsjyXAWaSO0Kpc2TWDuPx5zQ32n05nNZnKrZbfbXUYQ39gNYEBbF7BYLLCrkHlC8X0Gc78U+8997ObtO3RtWJFwvKjtGoW5n8J8Krz+5je/iVXGhkWsJr8Yw9x/JNLBj24A2SS1XHe1u+qxk/IPwuT2VVyn74u5X4o95z6+8adPn8o3nsXcwdUgzP0U5lPhlbnfRDgAH41Gg8EAPTIMgyxk7ABWq9V4PMZKj80VwzpBAXJVQOAoAVuOjiiGuV+Kfeb+zc2N2c3nc10ZKsfcz4PPhtyXD2n87W9/kwFtFInV5BdjTO5fXl5qFe0AKT+bzWSLNXdqolJ6+nI/jxOz2xDYl3hcCs7P/fevdeYbr99rLSXsM/eRjPqNPAQHjk59iMox9/Pgszn19/Np0wSsx9Jgbyt0i93e3iKXh8Oh3KmJ9DdncmQ5y208xWF7trd/DPtt4dm5H2W+lfUov3j3jRZ2tpl7STuSEmflbZP6e9lM0D+Qb7yg/byrsjD379EPFJHiHs7zYI2RBs1adeoJuY+sPzw8RCdd7q+XK7rYjLE/QNHphP5yuZRrA2IwGOgId1m5vwnTEmM+gbnvB39Fv/Vi+v2+TtkEzP0U5lPJQBZpLGI1+cUYs4btZ4VuPfnBWzlpZt9lj52B05k0bBuYRCd2P1CIycj9/Cz95t0L/etWq03l6/ebCSPWTsPUwabanlxmgBYv3r2XarSQWenU99+LNe2mLjmr+23uJoz9Ca0tyyb197KZmKdmFWSvKoHQJeVr1+lLZz4VXk1/32YaGLGa/GIM1mNpsJ8VupUQyoh4Oe2OHj0WZq/XwzB6/fIjiKenpxiO2hYip4kENmkcMegIX+m5v0nOrHCMUnUbp1GkS0HSVqfa1MtgxqzuhbnM5q68meb+SOtPbEegWgbvzyrr7cX+RMmi2N/HZmIf51EqXVK+dp2+dOZT4dXpum4+bZqA9Vga7GeFbp/lcilXcfE6Go1W20ciyykdFGUbNtd4HyRHDALTOp0ayuKc+/dT1ipnhfVmKDmv+7OJzTRjVhnv6t7EsTndleMjyhXF/j42E/uiThGyBoYDR8O6pHw1I/fNqNLv58F6LA32s0K3A/JduvDD4RC5fHt7a/8XLTm9g6iVxjgOkMPwB2+1NvsMgWMFv6u4Sc7neTKDNSv3tRC5S+37s4nNNGNWsVZb96rjbR6auCRR7O9jMzGrU0FYbXTKJtjl/H5ZMgOxKvpNRpj7NWS68Ih4vJo0R77bp2XRBTOpjRUdo/JDHJPLtV+BnYfTqaF8GbmfHZOZwZqT+1ubSo3+++NjrdnfzzSdTnU9KKb4/9yuA+Z+Cv0mI07nebTA3H98s9lMFlryPor5fG4O0otfjM16jH5ZsnI/Ctl7SbkN402AmvpNQaO4QO5bwW1NqCW7tVXeDG4L0XvatsMIGUzOym5j/8Ftdfmi2N/HZoIugvQqikAPo5STgXvD3E8h36UMFLmuGytCrCZWjMF6LA32s0K3A2IUGxtguclD1mIQshiF/ruWc6GxzAowkDrDHWXm/oZk/9ZdakbZKu4CNyP3rbZw18DMe1OVDGUz2ev392Zszc7U3ZsVWG2ydy3limJ/T5uJ6Vvk+M53voPXxj2qgbmfB99oLPdR8+9//3vzhRfLfbwm28eYW0d2uT08NOv1erlcysE4klrut8HaLGOF9Ndu7z8hOSnnMfolys19KmqfuQ/2Ff4szTqzL5j7meRL1YIlVh8rJj3YQHqmgGjQKsqAZYXNDFujeVKCpDaiH5V4te/QH4/H+T137Dzs6wG9Xs/MtnTM/VLsOfcB31rOvfmN6+kL5n71mPtFIKPlTnxh31OP5SaVR0dHxYMbxwH2szmxAyjxKm4Sc78U+899kLvFEJTmZCCG0c9o6EOYgblfPeZ+ERLu6F5hlZXbNBH95hwOliFGFb/ncrFY2Fft9nAzBnO/FJXkfvsw96vH3H8QeuLoaqG/r+Xtf6MfjUZadrHLY/S9MfdLwdwvBXO/esz9pNgpFxSxfNDBN/U3Nzeo8Vh3cVgQLewNzBAbgI54ZMz9UjD3S8Hcrx5zPwaZfhT97C3WTvTx5WSOnNw3z1pYRA/hcTo/g30GlnC0pDf8HqPvjblfCuZ+KZj71WPuxyDTzXmYTqcjv38rQQ9YX7Hlox699eLBvVqt7MvCmEnxiwGlePbsmf5tohr47ne/Gzuq3jPmPnM/znTM7T4yOinIeqlH7hc/RVPiY/S9sb9fCvb3S8H+fvXMk0CKPzCy3dAN6Xa7ktTo+Nv/kQqddKTnbDYr3ltHY7O3gB0fo++NuV8K5n4pmPvVw3cgkVT5N1Eft7e3SP9h9ExEdO1vbm5Q9Php3NIfo++NuV8K5n4pmPvVY+6L5XKJIx4sBESkOXEv92sisnEEgL6/uWG/CPs/2ePowT5u2D/mfikqzP35fH5xcSGrKFZLvA1suTquaZj71WPuAxaCuZYL5nIuuvnmgfjFN/jVoz1G3xtzvxRR7O8797Eq2quTDd2RJv6vXeZ+NcYRGU7mPmqwnuFViq2HUJYePbr56NFjOWBp9Ho9c78BFkXx3jpmglnJIgV00Mx8KsTcL8X+c//y8vJ73/uerkwZGveUHuZ+Ba6urmR1kdvPY7mP4JOeL8Irat5+cmXbbM+IaQluj9Pxj/0YfW/M/VLsOfexOj0Y+vIoZo+LTxVi7lfABD2gGxvLffOESPuxBK2Ebr4cI8uOEIc4Ug84GEKNOSQqCMFqThZh4DEeo++NuV+KfeY+1k/79t98T58+dbr4VC3mfjXM6UIsfTv3kYMyDNVeh9wDLASkMz4+NrBO9JQ0s0nLJVmMkmIR+3mMvreM3I9+yuSBnykp0iYU+8x9fF+6PhXj97SoSjD3q7FcLk3P1Nx2gm/CPBkYvX5t2kboGUkfHx9ZeknmPzFgCchCQFBK4wet9/gYfW9l5f7j/pxV7e0z9+U24uIqT9LimPuVsfunwj5H0aBjRg/mcMeOQgybJYCFU/BiLBaU7CcEdgB1uIqbVNZ5Hub+3nLffrBHEf/3f/+nQ2HQxeQr0NxHPMnJjaQGHTD6QX9cPnvswWpYJnLaR8sPWez9MfresnLfyvFNv/71e/OjtcmfrI06/kaQ6b/P3LfvCqOkHb+LQHMfzI09NgRZPXus5ZrP59K7t38Z0QmWnn2EVEpv+vEUzH0T95v6bfJbbe4NB2jHrHFyFv28T3FZ3bh204XlLtzcB3PGw/DOwTrDnsxcxuj3+9KjN7s9j/s1q3qMvrfC/f1oEKwRzH1jn7kvN5UVh69Yp6y93c/v62dm7vuxL/BCr9fTEe0S24TwMeWYRuqxBIpficWE2MBkPiD/20vH1RhzvxT7zH1smw/evC/kFv4Kn/7kirlfPfsCb4NWnYLQtccRDA5r5A4lbEtyT7R5GPJwOCx+MRZzq/Yx+t6Y+6XYZ+4DvjKsZhLr+ep8bSmJuV89RJ6cGZRkbBlzQsacv1pEv6CCPr5rZGPCyh+j763M3L+74hucPec+2AeXWdAXKdhxqYlm535rbnaUS5Qt+I9ayW8E24Ncw7C3DemzO52Ux5GQ/QAG1//KW7mycj9qFblrGpD95z6gy/L06VNZ6knF7zmujwbnPnqLod0w2whffPGFfkNb+KbklrizszOscLKTc+rv25cHkP6Yg45ojqzcJyeV5D6gQzMcDpGVWG9lPcQwjjiX0VNjG6fZ/X28dac+Iz22o6Oj1Kus5oZ9gewu/vAccyMQVP4YfW/M/VJUlfstw9ynMmXlPiCvpa+EBCx4XIwDAnzFsnrB8fFxc8/sMfdLwdwvBXOfypSV+5LXs9lM1pUiJ2owH/s/TNbkMfremPulYO6XgrlPZUrNfXnuptyiam7Yzz9dg6/Vvorbgk2duV8K5n4pmPtuYp/T42PvsqRKkXwDJb6lrNzHnzD3cT54wz7y0Vw9w0CtHqPvjblfCuZ+KZj7mVI/Uqwy/2PbY81wziT5c0tC+xzaaMvU5AzsLjX3EfHFL8Zir4D3IzqdjvwwSwv85Cc/6Xa7WGNpF1jBQAvkq9frffDBB7pqetFNdIfo8J8SH+CRcj/r88TqH/zYpgEGkmSULbXSVdZMpN5+FaX8UZGa+wVh94DjALwZUc/H6Hv79NNP37x5g9WVdvHVV1+Nx2MtkC8sw+fPn+uq6UW30h2iw3/KR8r9nA8TGxV98Ht0xJbU2PXJNjEPNsjnMX/U2LTWi3fuY6rYY/Rd/zdvzfE8D9UHYhPhqQUvuqHuEBf+U+4t9+UT2qRSxhrJmqQH2xSZCSTfA4ZNUQbsYiq7DdjDfvxyf9Gcx+h7Y+5TfTD34/I/iT022TJrWtRn0Rb3ZdXbTJsiA0KK9qs9ALH2Hjxyfzqd2ldxW/kYamDuU30w9+NyPon9OZMDYFcaUuOkyFR2Gxm2X0XqcGwgq70f19xv3GP0vTH3qT6Y+3E5n0Q+J2g5YhdjoyBZU0SRqYr8LVNjj0oOpzbzUzz31+u1/XtG3W63oY86KYi5T/XB3I/L+iRSb7/aAyI5rd0ySUYl5Ywy7DYybL+K5HySNZCc0FvB3F819jH63pj7VB/M/bisTyL19mtW0VZkVFLOKCM55/yBJBkFMmzXeCuS+4vEY/Qb/QCGgpj7VB/M/bjUT2Iq7bHJ4eS0qROKZI2RM8qQNnbL5HBsPlmNIVb09mDuN/0x+t6Y+1QfzP0UOR/GHhV96jtSI6MMUxM1iZNRMVn1MXYzGU5OmGxj5Be95ed+Cx6j7425T/XB3E+R82GyRkl9cqypyRkVk1UfE2uWOpVdiWFTtOtBirFKPzm5347H6Htj7lN9MPfTZX2e/M8ZGytFp0VTvHGRlsk2qEmtNK87Ss39Nj1G3xtzn+qDuZ8p9SPlVMZG2UUM59BGGTPPItM+SFtHTI1dnzXsJ5n7KLbpMfremPtUH8x9N1mfc5fP/3jMu9p8P/ffoRRjlZCscRLLfXw7LXuMvjfmPtUHc5/KZOc+Yq59j9H3xtyn+mDuU5lM7rf1MfremPtUH8x9KhNy/3//+1+LH6Pvjbnv65t3L548efHuGwy+f4016vX7Te1mUCrJHXOfyvSDH/zg448/1jWijY/R98bc98XcL1+zc/9HP/rRq1ev5Cc3qQ6ePn364x//WFaIVj5G3xtzn+qjwbmPjuTR0RFzv1YODw+//PJLfC9tfYy+N+Y+1QfP81CZ5LpumHfo52PuU30w96lM5n4eimHuU30w96lMzP0szH2qD+Y+lYm5n4W5T/XB3KcyMfezfPLJJy9fvtTL30SVevXq1YcffrjLdThNfeY+AXM/yx/+8IfPPvtMNzuiSn3++ee//vWvddX0oqnP3E/3/nVJ/7tk8/9U5H+s1BlznygEmvrM/TSb/2q4Devovx0+kNx5bex51RZznygEmvrM/RT3oto59+M9/CYEP3OfKASa+sz9pE1Q73CSJ3FmpwGnepj7RCHQ1GfuJ8Vy2ipK131TEbnbOWzbRB1/YzsTjK35o6iY+0Qh0Ghi7ifEu/ux3Ddxv6nftrPa3BsWyZq6Ye4ThUBCH7Tsrq25b+f5hpXa0t+PBsEaYSd7MuXje5L6Ye4ThUBTn7mfwNwnonbS1GfuJ8RTevfcT9bUDXOfKASa+sz9pFhMW8XCuX+vd7+Zyp5hDTH3iUKgqc/cT4p1+F1zX3J+I21kPTH3iUIgyQRadtfa3I/F+67KndvjYO4ThUBTn7mfpsyobkLsM/eJgqCpz9xP957PZSOittHUZ+4TMPeJQqCpz9wnYO4ThUBTn7lPwNwnCoGmPnOfgLlPFAJN/f3n/nq9fvbsWa/XQ/q3wIsXL3SoyQ4ODv75z3/qN0RELaWpX0l//+9///t//vMfdPmbbjqddjqdr7/+WsuN9ec//3m1WunXQ0QtpalfSe63Rr/fxxJ8+/atlomIakxCH7TsLvTcv7q6kiV4cHBwe3urtUREdSWRBVp2F3Tur9fro6MjXYRPnpyfn+sIIqK60sBi7vsZjUa6/LYWi4WOIyKqJU0r5r6H5XJ5cHCgy2/r5ORERxMR1ZKmFXPfw+npqS68+66urrQFEVH9aFQx911Np1Ndcgndbne9Xms7IqKa0ahi7jtBrHc6HVlwvV5PBhD35rTPeDzWpkRENSMxBVp2F2LuD4dDWWpI/9lsJsMnJyeIexlGPe/pJKJ6kpgCLbsLLvcXi4Xp10+n0+vraxlG7tvHAdg36ARERHUiGQVadhdc7ptOvdy6Y+c+iua/cR0dHUXNiYjqRTIKtOwuuNy/ubnpRuTRlbHcB3lsA/8PFxHVk0QWaNldcLkfk8x9IqI6k8gCLbtj7jP3iahJJLJAy+5Cz31zI//Z2ZlWERHVmEQWaNld6Lk/mUxkCfKEPhE1gkQWaNkdc5+5T0RNIpEFWnbH3GfuE1GTSGSBlt0x95n7RNQkElmgZXfMfeY+ETWJRBZo2R1zn7lPRE0ikQVadsfcZ+4TUZNIZIGW3YWe+5eXl7IEB4OBVhER1ZhEFmjZXei5//btW1mCGNAqIqIak8gCLbtj7jP3iahJJLJAy+6Y+8x9ImoSiSzQsjvmPnOfiJpEIgu07I65z9wnoiaRyAItu2PuM/eJqEkkskDL7pj7zH0iahKJLNCyO+Y+c5+ImkQiC7TsLvTcHwwGsgQvLy+1ioioxiSyQMvuQs/98/NzWYKTyUSriIhqTCILtOyOuc/cJ6ImkcgCLbtj7jP3iahJJLJAy+6Y+8x9ImoSiSzQsjvmPnOfiJpEIgu07I65z9wnoiaRyAItu2PuM/eJqEkkskDL7kLP/bOzM1mC0+lUq4iIakwiC7TsLvTcPzk5kSV4fX2tVURENSaRBVp2x9xn7hNRk0hkgZbdMfeZ+0TUJBJZoGV3zH3mPhE1iUQWaNkdc5+5T0RNIpEFWnbH3GfuE1GTSGSBlt0x95n7RNQkElmgZXfMfeY+ETWJRBZo2V3oud/tdmUJLpdLrSIiqjGJLNCyu9Bz/+joSJbgzc2NVhER1ZhEFmjZHXOfuU9ETSKRBVp2x9xn7hMFbT6fX/saj8dvfZ2dnZ14kcgC/QDumPvMfaI7q9VKI83dbDbTSPOiqeZFtuJwvHnzBgtcvzN3zH3mPuVZLpcSah4mk4lGmrvBYKCR5s7crUBtteNz45n7zH03GmleLi4uNNXc9ft9TTV3h4eH8i0TJR0fH+uK4m44HOoK6m46neqG4e729lY3SC/M/Z1yH0tfvwd3V1dX+v27G41Gut65w1ouH5koCftIXVHcnZ6e6grqRTcML+v1WrdJKiD03D87O/voo490lSdKQM9AU83d+fm5Rpq7y8tLjTR3i8VC12+iNKHnPkwmE93EqYBdDopxmKKp5g6HR5pq7nY8KCZqGeb+Trm/y0Fxv9/XSHN3cXGhkeZFPzkRBYm5T0QUFuY+EVFYmPtERGFh7hMRhYW5T0QUFuY+EVFYmPtERGFh7hMRhYW5T0QUFuY+EVFYmPtERGFh7hMRhYW5T0QUFuY+EVFIvv32/wE56lmNgXmi6wAAAABJRU5ErkJggg==

[运行结果]: data:image/png;base64,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