---
layout: article
title: 全栈课程05&06 Node.js入门
categories: [前端]
tags: [全栈课程]
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

# 搭建web服务器

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

# 外话

- **负载均衡**：一个网站可能有多个服务器，尽量让所有用户的请求比较均衡地让各服务器处理。
- **代理跨域**，反向代理