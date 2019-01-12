---
layout: article
title: 全栈课程05&06 Node.js入门
categories: [前端]
tags: [全栈课程]
issueNum: 36
---

# 概述

- 优势
    * 对象、语法和`javascript`一样，适于前端使用，但使用习惯不同
    * 前后台配合方便
    * 性能挺优秀（相对`php`、`java`、`python`）
- 缺点
    * `Java`有及其丰富的库支持，而`Node.js`当前的框架、库还不够丰富
- 用处
    * 服务器：小型后台系统、中间层（使用中间层的目的：两层多一点安全性、性能更高、与前台交互方便）
    * 工具：测试、构建（`grunt`、`gulp`、`webpack`）、数据抓取
- 环境配置
    * 在开发环境通常不需要配置
    * 在生产环境可通过配置文件或环境变量的方式配置版本、数据库等
- 更多...
    * 关于并发：`Node.js`和`javascript`一样都是单线程、单进程的，优点在于简单；为了提高性能，使用非阻塞的异步交互

# 常用模块概览

## assert

断言，一个应用是函数的参数检查。

```javascript
let assert = require('assert');
function add(a, b){
    assert(arguments.length == 2, '必须传入两个参数');
    assert(typeof a === 'number', '第一个参数必须是数字');
    assert(typeof b === 'number', '第二个参数必须是数字');
    return a+b;
}
console.log(add(3, '3')); // AssertionError [ERR_ASSERTION]: 第二个参数必须是数字
```

## Buffer、File System

- `Buffer`: 用于处理二进制数据
- `File System`: 文件系统操作

```javascript
let fs = require('fs');
// ./1.txt文件内容：am
fs.readFile('./1.txt', (err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data instanceof Buffer); // true
        console.log(data); // <Buffer 61 6d>
        console.log(data.toString()); // am （注意：不要对非文本执行调用该方法）

        // copy to 2.txt
        fs.writeFile('./2.txt', data, err => {
            if(err){
                console.log(err);
            }else{
                console.log('succeed');
            }
        });
    }
});
```

## C++ Addons

借用该模块可以写些插件，利用C语言极大提高性能。

## 多进程

`js`本身是单进程、单线程，通过以下的模块来实现多进程：`Child Processes`、`Cluster`、`Process`。


### 关于进程和线程

- 进程拥有独立的执行空间、存储；同一个进程内的所有线程共享一套空间、代码
- 多进程，如`PHP`、`Node`，慢、简单、安全
    * 成本高(慢)
    * 安全(进程间隔离)
    * 进程间通信麻烦
    * 写代码简单
- 多线程，如`Java`、`C`，快、复杂、脆弱
    * 成本低(快)
    * 不安全(线程要死一块死)
    * 线程间通信容易
    * 写代码复杂

## Crypto

用于加密（签名），实现了`md5`、`sha`常用算法，使用示例：

```javascript
let crypto = require('crypto');
let obj = crypto.createHash('md5');
obj.update('12');
obj.update('3456');
console.log(obj.digest('hex')); // e10adc3949ba59abbe56e057f20f883e
```

- 如何加密才安全？
    * 理论上可以做到100%安全，要求：一次一密，密钥长度>内容长度
    * 目前应用最广泛的加密算法：`RSA`
- `md5`如何破解：`md5`和`sha1`都是单向散列算法，所谓的破解只是一种暴力手法：记录了一些常见明文的加密值，反向查找。
- 双层`md5`：`md5(md5(明文)+混淆串)`

## http
  HTTP/HTTPS
  HTTP/2
## OS

提供系统信息等，比如：

```javascript
let os = require('os');
console.log(os.cpus()); // 查看系统CPU信息
```

## Path

路径处理:

```javascript
let path = require('path');
let str1 = '/a/b/c/r.txt',
    str2 = '/a/b/c/';
console.log(path.basename(str1)); // r.txt
console.log(path.dirname(str1)); // /a/b/c
console.log(path.extname(str1)); // .txt
console.log(path.basename(str2)); // c
console.log(path.dirname(str2)); // /a/b
console.log(path.extname(str2)); // 
```

## Events

事件队列，在`async`函数之前主要用来处理异步，现在作用减弱。和函数调用的最大区别在于可以解除耦合。

```javascript
const event = require('events').EventEmitter;
let ev = new event();
// 监听（接收）
ev.on('msg', (a, b, c) => {
    console.log(a+b+c);
});
// 派发（发送）
ev.emit('msg', 1, 2, 5); // 8
```

## Query Strings

```javascript
let querystring = require('querystring');

let str = 'wd=sd&rsv_spt=1&rsv_iqid=0xed7cab150005e7f5&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&rsv_sug3=3&rsv_sug1=1&rsv_sug7=100&prefixsug=sd&rsp=0&inputT=2407&rsv_sug4=2896';

let obj = querystring.parse(str);
console.log(obj);
// {
//     wd: 'sd',
//     rsv_spt: '1',
//     rsv_iqid: '0xed7cab150005e7f5',
//     issp: '1',
//     f: '3',
//     rsv_bp: '0',
//     rsv_idx: '2',
//     ie: 'utf-8',
//     tn: 'baiduhome_pg',
//     rsv_enter: '0',
//     rsv_sug3: '3',
//     rsv_sug1: '1',
//     rsv_sug7: '100',
//     prefixsug: 'sd',
//     rsp: '0',
//     inputT: '2407',
//     rsv_sug4: '2896'
// }
```

`querystring`很方便，但是`url`用得更多。

```javascript
let url = require('url');

let obj = url.parse('https://www.baidu.com/s?wd=sd&rsv_spt=1&rsv_iqid=0xed7cab150005e7f5&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&rsv_sug3=3&rsv_sug1=1&rsv_sug7=100&prefixsug=sd&rsp=0&inputT=2407&rsv_sug4=2896', true);
console.log(obj);
// {
//   protocol: 'https:',
//   slashes: true,
//   auth: null,
//   host: 'www.baidu.com',
//   port: null,
//   hostname: 'www.baidu.com',
//   hash: null,
//   search:
//    '?wd=sd&rsv_spt=1&rsv_iqid=0xed7cab150005e7f5&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&rsv_sug3=3&rsv_sug1=1&rsv_sug7=100&prefixsug=sd&rsp=0&inputT=2407&rsv_sug4=2896',
//   query:
//    { wd: 'sd',
//      rsv_spt: '1',
//      rsv_iqid: '0xed7cab150005e7f5',
//      issp: '1',
//      f: '3',
//      rsv_bp: '0',
//      rsv_idx: '2',
//      ie: 'utf-8',
//      tn: 'baiduhome_pg',
//      rsv_enter: '0',
//      rsv_sug3: '3',
//      rsv_sug1: '1',
//      rsv_sug7: '100',
//      prefixsug: 'sd',
//      rsp: '0',
//      inputT: '2407',
//      rsv_sug4: '2896' },
//   pathname: '/s',
//   path:
//    '/s?wd=sd&rsv_spt=1&rsv_iqid=0xed7cab150005e7f5&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&rsv_sug3=3&rsv_sug1=1&rsv_sug7=100&prefixsug=sd&rsp=0&inputT=2407&rsv_sug4=2896',
//   href:
//    'https://www.baidu.com/s?wd=sd&rsv_spt=1&rsv_iqid=0xed7cab150005e7f5&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&rsv_sug3=3&rsv_sug1=1&rsv_sug7=100&prefixsug=sd&rsp=0&inputT=2407&rsv_sug4=2896' } 
```

## 网络

- `TCP`-稳定(对用`Node`中`Net`)
- `UDP`-快(对应`Node`中`UDP/Datagram`)

## 域名解析

`DNS`，可以通过它向`DNS`服务器请求将域名解析为`IP`地址。

```javascript
let dns = require('dns');

// 请求DNS服务器解析域名，网络操作，异步故需要回调
dns.resolve('baidu.com', (err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

// [ '123.125.115.110', '220.181.57.216' ]
```

`Domain`，域名相关处理。

## Stream

- 不是某一模块，是指一种操作——流操作。
- 连续数据都是流——视频流、网络流、文件流、语音流

## TLS/SSL

加密、安全，目前人类常用的加密协议都是靠`SSL`（安全套接层）实现的。

## ZLIB

gz压缩（流）

# 搭建web服务器

## v0.1

```javascript
const http = require('http');
let server = http.createServer((req, res)=>{
    console.log(req.url);
    res.write('some data');
    res.end();
});
server.listen(8080);
```

- 用`node`运行`js`文件：进入目录，运行`node 文件名`
- 创建服务器需要使用`http`模块
- 一台服务器上通常会运行多个程序，每个程序会监听不同的**端口号**，外界访问该服务器时需要指定端口号以访问特定的后台程序；一些服务的默认端口号：
    * `http`: 80
    * `ftp`: 21
    * `mysql`: 3306
- 在一些高级浏览器发现：访问根目录会提交两次请求，额外的一次请求`favicon.ico`是请求网站图标

## v1.0

```javascript
let http = require('http'),
    fs = require('fs');

let server = http.createServer((req, res) => {
    fs.readFile(`htdocs${req.url}`, (err, data) => {
        if(err){
            console.log(err);
            res.write('404'); // 待改进
        }else{
            res.write(data);
        }
        res.end();
    });
});

server.listen(8080);
console.log('server is listening 8080 ...')
```

对于前一个版本，无论前端发来的请求路径如何，返回结果总是不变，而且总是`200`状态码。现在，将所有可以被前端访问的资源文件放在`htdocs`目录中，当从前端获得请求时，直接以`htdocs`为更目录，读取相关文件。如果文件存在，则返回给前端，反之则返回`404`（显然当前这种写法不是真的`404`）。需要注意`res.end()`一定要放在回调中。

# 外话

- **负载均衡**：一个网站可能有多个服务器，尽量让所有用户的请求比较均衡地让各服务器处理。
- **代理跨域**，反向代理
- `ssh`是一个基于`ssl`的协议

