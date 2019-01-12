---
layout: article
title: 全栈课程02 ES6(1)
categories: [前端]
tags: [全栈课程]
issueNum: 33
---

# ES6简述

- EMCAScript(ECMA、ES)标准
- JavaScript是EMCAScript的一种
- 从语言特性本身来说，JS特别特别烂

# 变量/赋值
 
- `var`，可以重复定义、不能限制修改、没有块级作用域
- `let`，不能重复定义、变量、块级作用域
- `const`，不能重复定义、常量、块级作用域

# 解构赋值

1. 左右两边必须一样；右边得是个东西
2. 必须定义和赋值同步完成

# 函数

## 箭头函数

```txt
    function (参数,参数){
      函数体
    }

    (参数,参数)=>{
      函数体
    }
```

- 如果有且仅有1个参数，()可以省
- 如果函数体只有一句话，而且是return，{}可以省
- 关于this

## 默认参数

`(a=xx, b=xx, c=xx)`

## `...`(剩余参数、数组展开)

- 用途1：接收剩余参数

`function show(a, b, ...more)`，剩余参数必须在参数列表的最后

- 用途2：展开一个数组

`let arr2 = [3, 4, ...arr1];`

# 数组/json新方法

## 数组

- `map`，映射

```javascript
let newArr = [1,2,4].map(item => 2*item); // [2, 4, 8]
```

- `filter`，过滤

```javascript
let filteredArr = [2,4,3,8].filter(item => item%2); // [3]
```

- `forEach`，遍历
- `reduce`，汇总

```javascript
let arr = [1, 2, 3, 4, 5, 6];
let avg = arr.reduce((prev, cur, index, arr) => {
    return index < arr.length-1 ? prev+cur : (prev+cur)/arr.length;
});
console.log(avg); // 3.5
```

- `Array.from`，新增静态方法

```javascript
let divs = Array.from(document.getElementsByTagName('p'));
```

## json

- 简写：名字和值一样的，可以省
- `function`可以不写

## 字符串

- 字符串模板：植入变量、任意折行

```javascript
let person = {
    name: 'Tom',
    age: 28
};
console.log(`一个${person.age}岁的名叫${person.name}的人`);
```

- `startsWith()`和`endsWith()`方法

## 面向对象

新的面向对象的语法：`class`/`constructor`/`extends`/`super`

### 关于this

- 普通函数：根据调用我的人，`this`老变
- 箭头函数：根据所在的环境，`this`恒定
- `bind()`方法——给函数定死一个`this`

