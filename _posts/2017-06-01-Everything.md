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

## vscode

### js的格式化

可以安装这三个插件：`eslint`,`prettier`,`vetur`。其中最后一个是专门用于`.vue`文件的，实际上，如果不安装前两个，它仍能工作（内部集成）；`prettier`内部也有选项控制是否使用集成`eslint`的格式化。

用户配置文件添加如下一些项目：

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "eslint.autoFixOnSave": true,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
}
```

这样每次保存文件会自动格式化并修复。

以下两篇文章可供参考（并非完美）：

- [VScode格式化ESlint-方法（最全最好用方法！）](https://www.jianshu.com/p/23a5d6194a4b)
- [聊一聊 vscode 的代码格式化](https://blog.csdn.net/userkang/article/details/84305689)

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

### 外卖webapp项目

#### 知识点

##### stiky footer

- [CSS秘密花园： Sticky footers](https://www.w3cplus.com/css3/css-secrets/sticky-footers.html)

##### flex布局

- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

##### better-scroll使用注意事项

- [better-scroll](https://github.com/ustbhuangyi/better-scroll)是一个滚动插件，可以查看其[中文文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/)了解更多
- `new`新的滚动控制器时，传入的包裹元素，通常情况下内部有唯一一个元素，是实际内容；实际内容溢出包裹元素时就可以滚动；如果内部有多个元素，那么只针对第一个元素。
- 默认情况下，使用了滚动控制的部分，禁用了点击事件，可以在创建时提供参数项`click: true`来使用点击；此时点击事件是插件内部触发的，其事件对象有一个`_constructed`属性；在`pc`浏览器下，同时原生点击事件也会触发，导致一次点击触发两次事件，为此可以检测该`_constructed`属性，只响应派发的事件，从而使得移动端和桌面端一致
- 如果需要监听`scroll`事件，可以在参数项中控制[probeType](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#probetype)的值
- `new`出来的滚动控制器有[refresh()](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#refresh)方法，调用时重新计算 `better-scroll`，当`DOM`结构发生变化的时候务必要调用确保滚动的效果正常
- 利用`scrollTo`和`scrollToElement`可以代码触发滚动

##### vue中动画注意事项

- 如果一个元素需要它完成一个动画后，让其执行另一个动画，前一个动画的结束可以利用`after-leave`钩子事件来监听
- 利用一个变量来控制动画元素时，如`v-show="isShow"`，如果我们利用代码修改了变量`isShow`的值，`DOM`通常不能立即被修改，可以用`vm.$nextTick(()=>{...})`的方式，使得`DOM`修改生效后再执行后续任务

#### 工具、配置、debug

##### 使用vue-cli3.x的配置文件vue.config.js

```javascript
const path = require('path')
const express = require('express')

// mock code
const mockData = require('./mock/data.json')

function resolve (folder) {
  return path.join(__dirname, folder)
}  

module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  // 基本路径
  baseUrl: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => { },
  configureWebpack: {
    resolve: {
      alias: {
        '@src': resolve('src'),
        '@components': resolve('components')
      }
    }
   },
  //如果想要引入babel-polyfill可以这样写
  // configureWebpack: (config) => {
  //   config.entry = ["babel-polyfill", "./src/main.js"]
  // },

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/outer': {
        target: 'http://localhost:8080/api/seller',
        onProxyReq (proxyReq, req, res) {
          console.log(proxyReq, req, res)
        },
        onProxyRes(proxyRes, req, res) {
          console.log(proxyRes, req, res)
        },
        pathRewrite: {
          '^/outer': '' // 这里一定要删掉，不然会导致死递归
        }
      }
    },
    before: app => { 
      const apiRoutes = express.Router()
      const pathArr = ['/seller', '/goods', '/ratings']
      pathArr.forEach((urlPath) => {
        apiRoutes.get(urlPath, (req, res) => {
          console.log(urlPath)
          res.json({
            errno: 0,
            data: mockData[urlPath.slice(1)]
          });
        });
      })

      app.use('/api', apiRoutes)
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}

```
##### 图标代码生成工具

- [阿里图标库：iconfont](https://www.iconfont.cn/)
- [icomoon](https://icomoon.io/app/#/select)

以上两个工具的介绍文章：[前端字体图标的使用（阿里、icomoon）](https://blog.csdn.net/huangxiaoguo1/article/details/79623573)

##### 在vscode中stylus自动格式化插件

安装插件`stylus supremacy`，`vscode`中使用快捷键`ctrl ,`打开配置页，进行相关配置（搜索`supremacy`可以看到28项配置），控制自动格式化时是否使用大括号、分号等，`vscode`中自动格式化快捷键：`alt+shift+F`。

##### 安装JSONView

这是一个浏览器插件，可以在浏览器中格式化地查看`json`数据，可参考文章：[谷歌浏览器中安装JsonView扩展程序](https://www.cnblogs.com/whycxb/p/7126116.html)。另外实际上在`chrome`中打开开发这工具，在`network`中查看相应的请求的`response`，点击左下角的`{}`符号，也可以查看格式化好的`json`数据。

##### vscode为.vue单文件设置模板

`File > Preferences > User Snippets`，输入`vue.json`，即可配置，如下：

```json
{
	"Vue Single File": {
		"prefix": "vue",
		"body": [
			"<template>\n",
			"</template>\n",
			"<script>",
			"export default {",
			"  data() {",
			"    return {\n",
			"    }",
			"  },",
			"  components: {\n",
			"  }",
			"}",
			"</script>\n",
			"<style scoped lang=\"stylus\">\n",
			"</style>",
			"$2"
		],
		"description": "generate snippets for .vue single file"
	}
}
```
配置好以后，我们新建一个`.vue`文件，在其中输入`vue`，然后按`Tab`键（或者回车键），就会自动填充设置的模板代码。

参考：[在vscode里使用.vue代码模板的方法](https://segmentfault.com/a/1190000014653201)

##### 手机无法通过该ip地址访问项目

- 确认可以使用`ip`地址方式在电脑上访问项目，注意需要将`devServer.host`配置为`0.0.0.0`，否则可能不行
- 确认手机和电脑是一个局域网下（比如`wifi`或数据线共享网络）
- 检查一下电脑防火墙是否拦截掉了请求，参考文章[解决apache服务器本地可以访问，同局域网内他人不能访问的问题](https://www.2cto.com/os/201203/123953.html)

##### 滚动插件

`better-scroll`，`github`地址是[https://github.com/ustbhuangyi/better-scroll](https://github.com/ustbhuangyi/better-scroll)

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



