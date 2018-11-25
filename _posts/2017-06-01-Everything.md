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

## 恶魔分金

### 题目

现在有10个足够聪明且贪婪的人，有机会从恶魔那里得到1000斤黄金（1000等份，每斤不可分割），但是恶魔对黄金的分配提供了如下的规则：

- 10个人按顺序给出分配提案
- 这个提案会所有活着的人投票表决，每个人只能赞同或反对，且必须投票
- 如果超过一半（含一半）的人反对，提案的人会被恶魔吃掉；反之投票通过，实施提案
- 直到有提案被通过，恶魔才会离去

那么如果你正好是第一个给出提案的人，那么你该如何分配？

### 解答思路

按照分金人数，用递归的方式，先从基本情况考虑。下面的叙述以数组形式表示分金方案，第`s`个提案的人标记为`Ps`。另外，一个不言自明的事实是：提出方案的人必然会投赞成票。

#### 1个人

此时，方案必然是`[1000]`，且通过

#### 2个人

此时`P1`事实上没有决定权，但是只要自己不为0，必然会被（足够贪婪的）`P2`否掉，因此他必须分配成`[0,1000]`，如果`P2`善良的话，会直接同意，让`P1`保命。所以，最终的结果是：`P1`分金为0，且存在被吃掉的风险。

#### 3个人

此时不论`P1`如何分配，`P2`必然会同意，因为如果他不通过，就会沦为2个人的情况，自己不但没金子还有被吃的风险。那么由于`P1`、`P2`都赞成，那么提案必然通过，因此`P1`为了最大利益，分配情况是`[1000,0,0]`。

#### 4个人

我们先来看要使得`P2`到`P4`都通过，`P1`该如何分配？此时，需要使得提案通过时，`P2`到`P4`得到的金子多于不通过时（此时变为3人分配的情况）的金子就可以了。

- 给`P2`的只要大于1000，他必然接受，也就是1001
- 给`P3`大于0，他必然接受，所以给1
- 同理，给`P4`也为1就可以了
- 因此如果提案为`[x, 1001, 1, 1]`，所有人都会通过，我们称该方案为**完美方案**

但事实上，`P1`只需要让分配方案后面3人中的2人通过就可以，为了自己得到更多的金子，他应该选择完美方案中，分配额最少的2人，即`P3`和`P4`，而`P2`就直接分配0。所以最后的分配方案是`[998, 0, 1, 1]`。

#### 5个人

此时的完美方案是：`[x, 999, 1, 2, 2]`，实际方案有两种都可以：

- `[997, 0, 1, 2, 0]`
- `[997, 0, 1, 0, 2]`

#### 6个人

此时的完美方案是：`[x, 998, 1, 2, 2, 2]`，这里需要注意一下由于5人的情况下，`P1`的选择有两种，所以最后两人最后可以获得2斤金子，但是只有50%的概率。因此，6人情况下，`P1`分配时，只要让他们100%地获得2，那么他们都必然会接受。

此时的实际方案有三种：

- `[995, 0, 1, 2, 2, 0]`
- `[995, 0, 1, 2, 0, 2]`
- `[995, 0, 1, 0, 2, 2]`

...

#### 10个人

以此类推，10人时，`P1`应该给出的提案数共有`C(7,3)`种，需要满足前三人的分配额是：`[991, 0, 1]`，后面7人中4人分配2，3人分配0。比如`[991, 0, 1, 0, 2, 2, 2, 2, 0, 0]`。



