---
layout: article
title: 基于vue-cli3仿制饿了么WebApp项目总结
categories: [前端]
tags: [项目总结]
issueNum: 42
---

使用`vue-clie3`仿制的饿了么外卖`WebApp`，这是一个`SPA`（单页面应用，`Single Page Application`）。主要技术包括`Vue.js`、`vue-router`、`Axios`，使用`better-scroll`插件优化页面滚动，`css`使用`stylus`编写，采用`flex`布局、`sticky footer`等技术。

- `github`：[https://github.com/jacktown11/order-app](https://github.com/jacktown11/order-app)
- `github pages`：[https://jacktown11.github.io/order-app](https://jacktown11.github.io/order-app/)

# stiky footer

- [CSS秘密花园： Sticky footers](https://www.w3cplus.com/css3/css-secrets/sticky-footers.html)

# flex布局

- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

# better-scroll使用注意事项

- [better-scroll](https://github.com/ustbhuangyi/better-scroll)是一个滚动插件，可以查看其[中文文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/)了解更多
- `new`新的滚动控制器时，传入的包裹元素，通常情况下内部有唯一一个元素，是实际内容；实际内容溢出包裹元素时就可以滚动；如果内部有多个元素，那么只针对第一个元素。
- 默认情况下，使用了滚动控制的部分，禁用了点击事件，可以在创建时提供参数项`click: true`来使用点击；此时点击事件是插件内部触发的，其事件对象有一个`_constructed`属性；在`pc`浏览器下，同时原生点击事件也会触发，导致一次点击触发两次事件，为此可以检测该`_constructed`属性，只响应派发的事件，从而使得移动端和桌面端一致
- 如果需要监听`scroll`事件，可以在参数项中控制[probeType](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#probetype)的值
- `new`出来的滚动控制器有[refresh()](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#refresh)方法，调用时重新计算 `better-scroll`，当`DOM`结构发生变化的时候务必要调用确保滚动的效果正常
- 利用`scrollTo`和`scrollToElement`可以代码触发滚动

# vue中动画注意事项

- 如果一个元素需要它完成一个动画后，让其执行另一个动画，前一个动画的结束可以利用`after-leave`钩子事件来监听
- 利用一个变量来控制动画元素时，如`v-show="isShow"`，如果我们利用代码修改了变量`isShow`的值，`DOM`通常不能立即被修改，可以用`vm.$nextTick(()=>{...})`的方式，使得`DOM`修改生效后再执行后续任务

# 配置文件vue.config.js（vue-cli3.x）

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

# 图标代码生成工具

- [阿里图标库：iconfont](https://www.iconfont.cn/)
- [icomoon](https://icomoon.io/app/#/select)

以上两个工具的介绍文章：[前端字体图标的使用（阿里、icomoon）](https://blog.csdn.net/huangxiaoguo1/article/details/79623573)

# 在vscode中stylus自动格式化插件

安装插件`stylus supremacy`，`vscode`中使用快捷键`ctrl ,`打开配置页，进行相关配置（搜索`supremacy`可以看到28项配置），控制自动格式化时是否使用大括号、分号等，`vscode`中自动格式化快捷键：`alt+shift+F`。

# 安装JSONView

这是一个浏览器插件，可以在浏览器中格式化地查看`json`数据，可参考文章：[谷歌浏览器中安装JsonView扩展程序](https://www.cnblogs.com/whycxb/p/7126116.html)。另外实际上在`chrome`中打开开发这工具，在`network`中查看相应的请求的`response`，点击左下角的`{}`符号，也可以查看格式化好的`json`数据。

# vscode为.vue单文件设置模板

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

# 手机无法通过该ip地址访问项目

- 确认可以使用`ip`地址方式在电脑上访问项目，注意需要将`devServer.host`配置为`0.0.0.0`，否则可能不行
- 确认手机和电脑是一个局域网下（比如`wifi`或数据线共享网络）
- 检查一下电脑防火墙是否拦截掉了请求，参考文章[解决apache服务器本地可以访问，同局域网内他人不能访问的问题](https://www.2cto.com/os/201203/123953.html)

# 项目部署baseUrl

整个项目完成以后，我希望将项目放到`github`上，这时候配置文件需要有些改动。

在`vue.config.js`中，`baseUrl`修改如下：

```javascript
{
  baseUrl: process.env.NODE_ENV === 'production' ? "/order-app/" : '/',
}
```

这样一来，生产环境下，请求的`js`和`css`文件地址就会自动加上`order-app`，这个目录是项目部署成`github`项目主页后的根目录，即`https://xxxx.github.io/order-app`

如果希望在本地运行打包后的项目，需要将`dist`文件夹放到一个本地服务器中，如`apache`服务器，也可以自己用`node`搭建个简单的服务器，那么上面的生产环境下的`baseUrl`需要修改为项目打包后的文件夹相对服务器根路径的地址，比如服务器根路径为`some/path/htdocs`，项目打包好后在其下的`projects/order-app/dist`目录中，那么就将后面这个目录设为`baseUrl`就可以了。

# 项目部署mock数据处理

在开发环境下，使用了`vue-resource`进行数据请求，借助了`express`读取本地根目录下的`mock`文件夹中的数据文件（详见`vue.config.js`）。但是这样一来，生产环境下有两个问题：

- `mock`文件夹不会被打包到`dist`中
- `express`服务器只是用于开发环境的，生产环境不能起作用

为了解决上面的问题，可以将数据文件作为静态资源，直接放在`public`目录下，这样就会被打包到`dist`目录中，由于修改了位置，`vue.config.js`中需要将`require('./mock/data.json')`修改为`require('./public/mock/json')`；另外需要为生产环境的`ajax`请求做些封装。在不修改之前的源码的情况下，使用了`axios`替代`vue-resource`，只需要在入口文件中设置`Vue.prototype.$http = axios;`，就可以仍旧使用原来的`vm.$http.get(...).then(...)`的接口，不过获取的响应结果的结构可能略有不同，需要稍微修改下处理代码（此处不详述）。

另一个问题，现在还没解决，开发环境使用`express`处理`/api/xxx`这样数据请求，但是打包后的文件夹可没有对应的`/api/xxx`（要注意：`github`项目主页是静态网站），为此我们需要在生产环境中将这个请求拦截，修改请求地址，并对请求结果做预处理，这就需要使用`axios`的`interceptors`接口。以以上分析为基础，我们在`src`下新建`api`文件夹，新建`config.js`，内容如下：

```javascript
import axios from 'axios';

// 设置分别设置开发环境和生产环境下axios的全局baseURL默认参数
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  axios.defaults.baseURL = '/';
} else {
  // 把项目放到github上发布后的根地址
  axios.defaults.baseURL = '/order-app/';

  // 这是项目本地build后的地址（前面的projects是由于我把整个项目放在了本地的apache服务器htdocs根目录下的projects子目录中
  // 额外说明：开发环境下用的是vue-cli提供的本地服务器，端口是设定的8080，apache服务不起作用；本地build后，仍然需要一个本地服务器来访问，这时apache服务器就起作用了，端口是默认的80）
  // axios.defaults.baseURL = '/projects/order-app/dist/';
}

// 生成环境下的axios的拦截器（实际上开发环境中也有代理的，在vue.config.js的devServer中配置的）
if (process.env.NODE_ENV === 'production') {
  axios.interceptors.request.use(function (config) {
    // eslint-disable-next-line
    let url = config.url.replace(/api\/([^\/\?]+)/, 'mock/data.json');
    config.url = url;
    config.dataKey = RegExp.$1;
    return config;
  });
  axios.interceptors.response.use(function (res) {
    res.data = {
      errNum: 0,
      data: res.data[res.config.dataKey]
    };
    return res;
  });
}
```

在生产环境下，项目的根目录是`order-app`，将其设置为`axios`请求的默认全局根路径。接着，在生产环境下，对请求和响应都进行拦截，将请求的`api/xxx`路径修改为对应的静态`json`文件的路径；并对响应的数据结果，更具请求进行了预处理（和开发环境中`express`对数据的预处理类似）。

接着，我们只需要在`main.js`中`import @src/api/config;`就可以了。

参考：[vue打包后如何区分开发、测试和生产等不同的开发环境](https://blog.csdn.net/qq_35430000/article/details/80485311)

# 开发环境下手机端调试

在手机和电脑在同一局域网的情况下，可以通过直接访问电脑的`ip`地址和端口，访问到页面，就和电脑浏览器中访问一样。但是在项目快要完工的时候，突然出现了电脑端完全正常，手机页面空白的情况。

通过插入`js`文件的方式调试，比较能够确定页面是加载了的，很可能是内部的出现了错误，为此找到一个浏览器端的控制台插件[eruda](https://github.com/liriliri/eruda)，之后在控制台中看到了`use of const in strict mode.`报错，查到了类似下面的`issue`：

- [使用webpack-dev-server在移动端调试时，出现"SyntaxError: Use of const in strict mode."的问题 #35](https://github.com/mrdulin/blog/issues/35)
- [Webpack Dev Server No Longer Runs On Older Browsers #1105](https://github.com/webpack/webpack-dev-server/issues/1105)

其原因应该是高版本的`webpack-dev-server`中使用的`es6`语法在一些低版本浏览器中不被支持。这和项目代码中的`es6`语法不一样，它们默认情况下不会被`babel`这样的插件转义，因为它们用在开发环境中，并不会对生成环境的代码造成影响，这些`issue`中给出的解决方案是降低`webpack-dev-serve`的版本。

由于不太想修改`vue-cli`的开发环境，笔者没有尝试过这一方案，而是使用高版本一些的手机浏览器，发现问题被解决了。

# 项目部署gh-pages分支

打包后的文件在`dist`文件夹中，为了在`github`项目主页中直接使用这个子文件中的内容，我们可以另外创建一个`gh-pages`分支，每次打包都要推送以更新该分支。然后在`github`中的`Setting > Github Pages`中选择该分支作为项目主页。

```batch
git subtree push --prefix build/dist origin gh-pages
```

参考：[我可以在存储库的子文件夹中拥有我的Github Pages index.html吗？](https://cloud.tencent.com/developer/ask/66544)
