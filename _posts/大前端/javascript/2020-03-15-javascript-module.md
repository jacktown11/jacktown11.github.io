---
layout: article
title: javascript 模块化
categories: [大前端, javascript, 模块化]
---

# 缺少模块化主要问题

- 命名冲突
- 文件依赖

# 浏览器端模块化规范

- AMD require.js 
- CMD sea.js

# 服务器端模块化规范

CommonJS

- 模块分为单文件模块与包
- 模块成员导出：module.exports 和 exports
- 模块成员导入： `require(‘模块标识符’)`

# ES6 模块化规范

统一浏览器端和服务器端，是通用的模块化标准

## 主要规范定义

- 每个js文件都是一个独立的模块
- 导入模块成员：import
- 暴露模块成员：export
- 和 CommonJS 规范不同，模块的引入的模块不是对象，模块编译时加载或叫静态加载的，效率更高，也使得静态分析成为可能

## 通过babel使用 ES6 模块化

- 安装依赖

```bash
npm i -D @babel/core @bable-cli @babel/preset-env @babel/node
npm i -S @babel/polyfill
```

- 创建 babel.config.json 文件，并添加如下代码

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        }
      }
    ]
  ]
}
```

- 通过 npx babel-node <script-name> 执行代码

## ES6 模块化基本语法

### 按需导入导出

a.js

```javascript
// 导出变量
export var name = 'jack' 
// 导出函数
export function sayHi() {
  console.log('hello')
}
// 导出类
export class A {}

let a = 1
let b = 2
function sum(a, b) {
  return a + b
}
// 导出一系列接口
// 其中变量 b 被导出了两次，其中一次使用了别名
export { a, b, b as theB, sum }

```

index.js

```javascript
// 模块导入，其中使用别名 theName 来访问 a.js 中导出的 name
import {name as theName, sayHi, A, a, b, theB, sum} from './a'

// 加载整个模块，命名为 modA
import * as modA from './a'

console.log(theName, sayHi, A, a, b, theB, sum) 
// jack [Function: sayHi] [Function: A] 1 2 2 [Function: sum]

console.log(modA)
// {
//   sayHi: [Function: sayHi],
//   sum: [Function: sum],
//   name: 'jack',
//   A: [Function: A],
//   a: 1,
//   b: 2,
//   theB: 2
// }

```

### 默认导入导出

b.js

```javascript
// 导出函数，是否具名没关系
export default function (a, b) {
  return a + b
}
```

index.js

```javascript
// 将 b.js 中默认导出的函数命名为 func
import func from './b'
console.log(func) // [Function: _default]
```


和按需导入导出配合使用：

b.js

```javascript
// 
let a = 1
export default a

export let b = 2
```

index.js

```javascript
// 将 b.js 中默认导出值命名为y，因为默认导出实际上时导出了default变量
import { default as y, b} from './b'
// 整体加载
import * as modB from './b'

console.log(modB, y, b) // { default: 1, b: 2 } 1 2
```

### 导入执行模块

b.js

```javascript
for(let i = 0; i < 3; i++){
  console.log(i)
}
```

index.js

```javascript
import './b'
// 0 1 2
```

