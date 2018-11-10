---
layout: article
title: 万有笔记
categories: [草稿]
tags: [万有笔记]
---
# 问题与待学习

- js对象深浅拷贝

 
# 工作

# 编程相关

# java

# js

# 后端

## mysql

### 重命名数据库

网上查到几种`RENAME`命令在很多版本下都不行，为此采用了直接修改本地数据库文件名的方式。（win7开发环境）

- `net start mysql57`
- 找到数据库的文件，我个人的数据库文件位置：`C:\ProgramData\MySQL\MySQL Server 5.7\Data`，直接修改重命名数据库对应的文件夹名
- `net stop mysql57`

ref: 

- [MySQL中数据库重命名](https://blog.csdn.net/zyz511919766/article/details/49335897)
- [MySQL数据库改名的三种方法](https://www.cnblogs.com/gomysql/p/3584881.html)

# 前端

## electron

- [打造你的第一个 Electron 应用](https://electronjs.org/docs/tutorial/first-app)
- [electron安装+运行+打包成桌面应用+打包成安装文件+开机自启动](http://www.cnblogs.com/kakayang/p/9559777.html)

## node

[windows 下更新 npm 和 node](https://www.cnblogs.com/xinjie-just/p/7061619.html)

## npm

- 我根据`babel`的官方文档执行`npm install @babel/preset-env --save-dev`命令时,出现了`peerDependencies WARNING @babel/preset-env@* requires a peer of @babel/core@^7.0.0-0 but none was installed`报错。
    * 首先解释下`peerDependencies`，这是会发生在如下的情况：A依赖于B和C1，B依赖于C2的一种插件，C1和C2是同一种包的不同版本，在我的项目中，C1直接可见，C2并不直接可见，而B却是依赖于它，因此B在代码中可能会有类似`require(C)`之类的代码，两者版本不同，那么B就可能与实际引入的C1的代码不兼容，为此，B可能需要明确指定它的同级依赖（`peerDependencies`）。
    * 解决办法：手动安装
    * 参考1：[Peer Dependencies （同版本依赖）](https://blog.csdn.net/zhangchao19890805/article/details/78988364)
    * 参考1：[探讨npm依赖管理之peerDependencies](https://blog.csdn.net/whc996/article/details/82865474?utm_source=blogxgwz0)

### tricks and debug

# 读书与生活

# temp