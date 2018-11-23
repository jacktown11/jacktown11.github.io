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

## tomcat

- tomcat启动太慢问题
    * 将`$JAVA_PATH/jre/lib/security/java.security`这个文件，找到下面的内容：`securerandom.source=file:/dev/urandom`，替换成`securerandom.source=file:/dev/./urandom`
    * 参考：[tomcat启动慢， Creation of SecureRandom instance for session ID generation using SHA1PRNG took xx mil](https://blog.csdn.net/u011627980/article/details/54024974)
# js

# 后端

## mysql

## linux

- centos6.9 安装完毕后，输入提示光标闪烁太快
    * 问题描述：如上
    * 解决：
        + 修改`/etc/rc.local`文件权限：`chmod a+x /etc/rc.local`
        + 修改`/etc/rc.local`文件内容：`echo 0 > /sys/class/graphics/fbcon/cursor_blink`
    * 参考：[设置禁止centos7 控制台光标闪烁『disable blinking cursors』](https://blog.csdn.net/buxiaoxindasuile/article/details/80793139)


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