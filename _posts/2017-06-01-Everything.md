---
layout: article
title: 万有笔记
categories: [草稿]
tags: [万有笔记]
issueNum: 2
---

# 工作

# 编程相关

## 计算机基础

### 计算机中的位

- `CPU`位数，是从计算机硬件层面来看，指的是一个时钟周期内处理器同时寄存和处理的二进制位数，也就是字长，通常等于数据总线的宽度。
- 操作系统位数，是从计算机软件层面来看， 其概念是基于`CPU`的位数的，且操作系统的位数是依赖于指令集的位数的。
- 注意：按“字”寻址，说明是存储单元大小为字长的位数，按“字节”寻址，说明存储单元是一个字节的大小 。

通常：

- `CPU`位数 = `CPU`中寄存器的位数 = `CPU`一次并行处理的数据宽度 = 数据总线的宽度
- 操作系统位数 = 其所依赖的指令集位数 <= `CPU`位数

参考：

- [CPU位数、操作系统位数、计算机字长、C/C++基本数据类型长度](https://blog.csdn.net/qq_27565063/article/details/53748879)
- [关于CPU位数和操作系统位数](https://blog.csdn.net/u012861978/article/details/51871315)

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

## vue

### 大小写的推荐写法

#### 单文件组件的文件名

建议始终使用`PascalCase`或`kebab-case`，前者利于编辑器自动提示并于在`js`文件中对它的引用更一致，不过在某些大写不敏感的文件系统中可能出现问题。

#### 组件名称

- 在字符串模板/单文件组件模板中建议：`PascalCase`或`kebab-case`
- 在`DOM`模板中使用：`kebab-case`（鉴于`html`大小写不敏感，这是必须的）
- 在`js`中建议：`PascalCase`
  * 但是使用`Vue.component()`注册全局组件的话，建议`kebab-case`.(因为它们会在`js`中用得少，而`kebab-case`和`html`一致)

#### 属性名称

- `html`中建议`kebab-case`
- `js`中建议`camelCase`

#### 事件名称

始终使用`kebab-case`（注意：`vue`不会将`js`中其他形式事件名自动转换为`kebab-case`，因为它几乎不被作为标识符使用）

#### 个人小结（一种参考）

- `html`(`DOM template`、`string template`、`single file component template`): `kebab-case`
- `js`
  * 组件名：`PascalCase`
  * 属性名：`camelCase`
  * 事件名：`kebab-case`
- 单文件组件文件名：`kebab-case`

## react

### react developer tools chrome插件安装

- 谷歌浏览器中安装 ctx 格式的插件可能出现‘无法从该网站添加应用，拓展程序或脚本’的报错，此时可以将该文件后缀名修改为 rar 并解压，然后加载解压后的文件夹。
- 安装好以后，发现页面上提示说当前页面不是 react 应用，后来发现是因为该插件是在页面加载的过程中，创建一个 `__REACT_DEVTOOLS_GLOBAL_HOOK__` 全局变量来和页面交互的，重新加载就好了。

### redux dev tools chrome浏览器插件安装

github: [https://github.com/zalmoxisus/redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)，可直接在上面下载，安装参考 react developer tools 的安装。

## typescript

### 在 vscode 中自动编译 typescript 文件

- `npm install -g typescript`，全局安装 typescript
- `tsc --init`， 初始化 `tsconfig.json` 文件，可以参考[官网](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)根据需要配置
- 在 vscode 中使用快捷键 `Ctrl + Shift + B` 运行任务（或任务栏选择 Ternimal > Run build task），然后选择 `tsc:watch - tsconfig.json`
  * 不依赖于 vscode 更通用的方法是直接在命令行使用命令 `tsc -w`，可在官网查看[更多编译参数](http://www.typescriptlang.org/docs/handbook/compiler-options.html)
- 参考：[vscode 下的 typescript 自动编译方法](http://www.cnblogs.com/yanliangnh/p/8366655.html)


## vscode

### .vue的格式化

安装`vetur`插件

```json
{
  "editor.formatOnSave": true,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatterOptions": {
      "js-beautify-html": {
        "wrap_attributes": "force-expand-multiline"
      },
      "prettyhtml": {
        "printWidth": 100,
        "singleQuote": false,
        "wrapAttributes": false,
        "sortAttributes": false
      },
      "prettier": {
        "singleQuote": true
      }
    }
}
```

参考：

- [VScode格式化ESlint-方法（最全最好用方法！）](https://www.jianshu.com/p/23a5d6194a4b)
- [聊一聊 vscode 的代码格式化](https://blog.csdn.net/userkang/article/details/84305689)

### 让 .js 文件关联 jsx 语法模式

打开 vscode 的配置（`ctrl + ,`），添加如下的配置；可以将其作为工作空间配置，从而不影响其他项目。

```json
{
  "files.associations": {
    "*.js": "javascriptreact"
  }
}
```

## electron

- [打造你的第一个 Electron 应用](https://electronjs.org/docs/tutorial/first-app)
- [electron安装+运行+打包成桌面应用+打包成安装文件+开机自启动](http://www.cnblogs.com/kakayang/p/9559777.html)

## node

[windows 下更新 npm 和 node](https://www.cnblogs.com/xinjie-just/p/7061619.html)

## npm

### peer dependency

- 我根据`babel`的官方文档执行`npm install @babel/preset-env --save-dev`命令时,出现了`peerDependencies WARNING @babel/preset-env@* requires a peer of @babel/core@^7.0.0-0 but none was installed`报错。
    * 首先解释下`peerDependencies`，这是会发生在如下的情况：A依赖于B和C1，B依赖于C2的一种插件，C1和C2是同一种包的不同版本，在我的项目中，C1直接可见，C2并不直接可见，而B却是依赖于它，因此B在代码中可能会有类似`require(C)`之类的代码，两者版本不同，那么B就可能与实际引入的C1的代码不兼容，为此，B可能需要明确指定它的同级依赖（`peerDependencies`）。
    * 解决办法：手动安装
    * 参考1：[Peer Dependencies （同版本依赖）](https://blog.csdn.net/zhangchao19890805/article/details/78988364)
    * 参考1：[探讨npm依赖管理之peerDependencies](https://blog.csdn.net/whc996/article/details/82865474?utm_source=blogxgwz0)

### 创建自己的 npm 包

- 新建一个项目文件夹，进入该文件夹，执行 `npm init -y`，将会在该目录下生成一个默认的 package.json 文件，这个文件中你可以指定该 npm 包的名称和版本，同时使用可以使用语义化的版本号给出你依赖的包及其版本信息；另外还有其他一些信息，你可以手动修改。更多参见[官网：package.json 文件创建](https://docs.npmjs.com/creating-a-package-json-file)
  ```json
  {
    "name": "package-name", // 必填，不能有空格
    "version": "1.0.0", // 必填，x.x.x格式
    "description": "", 
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/ashleygwilliams/my_package.git" // 远程仓库
    },
    "keywords": [],
    "author": "Your Name <email@example.com> (http://example.com)", // 邮箱和个人主页都是可选的
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/ashleygwilliams/my_package/issues" // bug提交页
    },
    "homepage": "https://github.com/ashleygwilliams/my_package" // 项目主页
  }
  ```
- 创建 `index.js` 文件，用模块化的方式书写你的代码，如 `module.exports = 123;`
- 命令行运行 `npm login`，登录您的 npm 帐号，如果没有请到[官网](https://www.npmjs.com/)注册
- 登录以后，运行 `npm publish --access=public`，发布你的 npm 包；以后包需要更新的时候，你需要修改 `package.json` 中的版本号为新版本，否则会报错
- 到 `https://www.npmjs.com/package/包名` 查看您的 npm 包，您还可以另外创建项目 `npm i 包名` 来安装您的包，并测试
- 您可以在24小时内强制删除，`npm --force unpublish 包名`
- 参考： [创建发布自己的npm包](https://www.cnblogs.com/marymei0107/p/6339710.html)

## 工具

### charles

这是一个网页调试代理工具，官网：[https://www.charlesproxy.com](https://www.charlesproxy.com)。使用该工具可以在一个本地特定端口与路径的数据请求映射到本地文件，具体方法：

- 软件菜单栏选择：Tools > Map Local，添加新的映射
- 填写相关信息：
  * Protocol: 协议
  * Host: 主机名，本地主机也就是 `127.0.0.0.1`
  * Port: 端口号，比如我们前端项目启动的服务在3000端口，那么我们也就可以将其设置为3000端口，也不存在跨域问题
  * Path: 请求的路径，如 `/api/dataList`
  * Local Path: 本地文件路径，可以写一个 json 文件，选择其路径
- 点击 ok 确认，就可以访问本地的模拟数据了（可以先直接在浏览器输入 url 测试一下）

# 读书与生活

## 吃货

### 菜单

- 土豆烧肉
- 胡萝卜烧肉 
- 无筋豆烧肉
- 烧鸭子
- 酸菜鱼
  * 锅中加油（多一点），加热
  * 加入花椒、豆瓣、酸菜、生姜末、干辣椒面炒一两分钟，这些料都要稍微多一些鱼汤才有味
  * 炒香以后加水（水量以之后刚好可以淹没鱼为准），加入大蒜块，尝下汤的味道咸味是否够，不够味的话再加些盐，否则鱼没味道
  * 水烧开以后，中小火多熬一会汤，汤泛白为佳
  * 加入鱼片（鱼头和比较厚大的鱼块可以先煮一会，再加入薄的鱼片）
  * 起锅前加闫旭和葱花

- 青椒炒肉 
- 芹菜炒肉
- 甜椒炒肉
- 蒜苗回锅肉 
- 麻婆豆腐
- 蚂蚁上树
  * 用冷水将粉丝提前浸泡半小时。（大致有些软就可以了）。
  * 锅内冷油，放入姜蓉，蒜蓉爆香，放入肉沫煸炒至熟。
  * 放入豆瓣酱2/3大匙，料酒1大匙，炒至出红油。
  * 倒入高汤2/3杯，生抽1/2大匙，中火煮开。
  * 放入泡软粉丝后，转小火煮至水即干未干的状态。
  * 最后临出锅前撒上些香菜葱花就行了。

- 西红柿炒蛋 
- 炒莲花白
- 炒莴笋
- 炒莴笋叶
- 炒土豆丝
- 炒茄子
- 酸辣白菜
- 
- 莴笋叶汤
- 青菜汤
- 白菜汤


# temp

## 恶魔分金

### 题目

现在有10个足够聪明且贪婪的人，有机会从恶魔那里得到1000斤黄金（1000等份，每斤不可分割），但是恶魔对黄金的分配提供了如下的规则：

- 10个人按顺序给出分配提案
- 这个提案会被所有活着的人投票表决，每个人只能赞同或反对，且必须投票
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



