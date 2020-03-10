---
layout: article
title: 全栈课程03 ES6(2)
categories: [大前端]
tags: [其他, 全栈课程]
---

# promise

- 目的：解决异步操作复杂性问题
- 同步——串行    简单、方便
- 异步——并发    性能高、体验好

## Promise基本用法

```javascript
  let p=new Promise((resolve, reject)=>{
    resolve();
    reject();
  });

  // the two function params in then are just resolve and reject
  p.then(()=>{}, ()=>{}); 
```

## Promise.all()与Promise.race()

这两个静态方法可以实现让多个异步操作放在一起

```javascript
Promise.all([promise1, promise2, promise3])
.then(resArr => {})
.catch(reason => {});
```

- `all`，需要所有异步操作成功以后才算成功
- `race`，只要一个异步操作成功就可以

## 局限

`Promise`对于有依赖的异步操作嵌套仍然不方便

## 外话

`回调`和`轮询`是一对概念，前者更简便与节省资源。

# generator

一种可以中途暂停，分段执行的函数。

## 基本使用

```javascript
function * show(){
    console.log('a');
    yield;
    console.log('b');
}

let gen = show();
gen.next(); // a
gen.next(); // b
```

## yield传参与返回值

```javascript
function * show(){
    console.log('a');
    let a = yield 23;
    console.log(a);
}

let gen = show();
let res1 = gen.next(); // a
let res2 = gen.next(12); // 12
console.log(res1); // {value: 23, done: false} 
console.log(res2); // {value: undefined, done: true}
```

## generator与promise配合

- 需要外来的辅助封装执行——不统一、不标准、性能低
- `generator`函数不能写成=>

因此`generator`使用时间很短，是`promise`和`async/await`的过渡，现在并不常用。

# async/await

## 基本使用

```javascript
async function show(){
    console.log('a', Date.now());

    await new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
    });

    console.log('b', Date.now());
}

show();
```

`await`后可以放`Promise`对象、`generator`函数、`async/await`函数，即使后面不是同步操作，运行也会是异步的，类似`setTimeout(func, 0)`的效果。

## 用于ajax

```javascript
(async ()=>{
    let data1 = await $.ajax({url: './data/a.json', dataType: 'json'});
    if(data1.a > 2){
        let data2 = await $.ajax({url: './data/b.json', dataType: 'json'});
    }else{
        let data3 = await $.ajax({url: './data/c.json', dataType: 'json'});
    }
})();
```

## 错误处理

`try-catch`

# 工程化相关

- 兼容低版本浏览器：将ES6编译为ES5（工具babel）
- 问题：这些高级语法最终是要经过编译的，那么如果直接使用基础的语法写，避免编译，对性能有提升吗？
    * 首先，对于前端程序，各评价指标大致优先级是：用户体验、健壮性、可读可维护工程性、性能
    * 在性能方面，分为网络性能和执行性能，而前者的影响远大于后者
    * 为此使用高级语法整体性能反而更高些。
- `babel`，ES6->ES5编译工具
- `Node`
    * 语言、环境、平台，开发中的中间层
    * web后台(小规模)
    * 工具(grunt,gulp等都是基于它的)
- `npm`，node包管理(node package manager)
    * 自动下载、升级
    * 自动下载依赖包
    * npm原版慢，cnpm淘宝源：http://npm.taobao.org/

