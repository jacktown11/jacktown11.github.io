---
layout: article
title: 大前端杂记
categories: [大前端]
tags: [其他, 杂记]
---

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

- [CPU 位数、操作系统位数、计算机字长、C/C++基本数据类型长度](https://blog.csdn.net/qq_27565063/article/details/53748879)
- [关于 CPU 位数和操作系统位数](https://blog.csdn.net/u012861978/article/details/51871315)

# 前端

## vue

### 大小写的推荐写法

#### 单文件组件的文件名

建议始终使用`PascalCase`或`kebab-case`，前者利于编辑器自动提示并于在`js`文件中对它的引用更一致，不过在某些大写不敏感的文件系统中可能出现问题。

#### 组件名称

- 在字符串模板/单文件组件模板中建议：`PascalCase`或`kebab-case`
- 在`DOM`模板中使用：`kebab-case`（鉴于`html`大小写不敏感，这是必须的）
- 在`js`中建议：`PascalCase`
  - 但是使用`Vue.component()`注册全局组件的话，建议`kebab-case`.(因为它们会在`js`中用得少，而`kebab-case`和`html`一致)

#### 属性名称

- `html`中建议`kebab-case`
- `js`中建议`camelCase`

#### 事件名称

始终使用`kebab-case`（注意：`vue`不会将`js`中其他形式事件名自动转换为`kebab-case`，因为它几乎不被作为标识符使用）

#### 个人小结（一种参考）

- `html`(`DOM template`、`string template`、`single file component template`): `kebab-case`
- `js`
  - 组件名：`PascalCase`
  - 属性名：`camelCase`
  - 事件名：`kebab-case`
- 单文件组件文件名：`kebab-case`

## react

### react developer tools chrome 插件安装

- 谷歌浏览器中安装 ctx 格式的插件可能出现‘无法从该网站添加应用，拓展程序或脚本’的报错，此时可以将该文件后缀名修改为 rar 并解压，然后加载解压后的文件夹。
- 安装好以后，发现页面上提示说当前页面不是 react 应用，后来发现是因为该插件是在页面加载的过程中，创建一个 `__REACT_DEVTOOLS_GLOBAL_HOOK__` 全局变量来和页面交互的，重新加载就好了。

### redux dev tools chrome 浏览器插件安装

github: [https://github.com/zalmoxisus/redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)，可直接在上面下载，安装参考 react developer tools 的安装。

### 常用需求解决方案与相应的 api

- 数据管理
  - redux ，状态管理工具
    - combineReducers
  - react-redux，通过 mapStateToProps 和 mapDispatchToProps ，使得在组件中使用和修改数据更加方便
  - immutable.js
  - redux-immutable
  - redux-thunk，一个 redux 中间件，使得 store.dispatch() 方法可以接受函数类型的 action，这在异步数据请求时很常用
  - redux-saga，一个更加复杂的 redux 中间件
- 给组件添加样式
  - styled-components，可以方便地使用 js 写出带有样式的组件
- 路由
  - react-router-dom，提供 react 中的路由管理（另外一个包 react-router 更为基础，react-router-dom 是用于浏览器环境下的，引入 react-router-dom 的时候也会引入 react-router）
    - withRouter，使得内部被包裹的组件可以获取到外部 Route 中的参数
- 轮播图 - react-slick

### 将 react 项目部署到 github pages

- 在 package.json 中添加

```json
"homepage": "https::/username.github.io/project-name",
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
}
```

- 安装 gh-pages： `npm install --save-dev gh-pages`
- 部署： `npm run deploy`
- 更多参考：[ http://bit.ly/CRA-deploy](http://bit.ly/CRA-deploy)

### vscode 插件：

- ES7 React/Redux/GraphQL/React-Native snippets
- vscode-styled-components

## typescript

### 在 vscode 中自动编译 typescript 文件

- `npm install -g typescript`，全局安装 typescript
- `tsc --init`， 初始化 `tsconfig.json` 文件，可以参考[官网](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)根据需要配置
- 在 vscode 中使用快捷键 `Ctrl + Shift + B` 运行任务（或任务栏选择 Ternimal > Run build task），然后选择 `tsc:watch - tsconfig.json`
  - 不依赖于 vscode 更通用的方法是直接在命令行使用命令 `tsc -w`，可在官网查看[更多编译参数](http://www.typescriptlang.org/docs/handbook/compiler-options.html)
- 参考：[vscode 下的 typescript 自动编译方法](http://www.cnblogs.com/yanliangnh/p/8366655.html)

## vscode

### .vue 的格式化

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

- [VScode 格式化 ESlint-方法（最全最好用方法！）](https://www.jianshu.com/p/23a5d6194a4b)
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

### eslint 和 prettier 插件冲突问题

例如 prettier 默认在函数定义括号前不插入空格，但是标准的 eslint 要求插入，这时就会报错`Missing space before function parenthese`一种方案是修改该 prettier 的配置文件 `.prettierrc` 来符合 eslint 的要求；另一种方案是为将 eslint 扩展是的 prettier 的默认格式合法化，后一种方案可以参考文章：[Missing space before function parentheses 报错终极解决方案](https://blog.csdn.net/wxl1555/article/details/83032038)

=== 更新 ===

事实上，应该让 prettier 专门用于格式化，而让 eslint 用于代码检验。至于 prettier 格式化后的代码不符合 eslint 标准的问题，可以让 eslint 来进行修复（我个人没有启用自动格式化, 偶尔用 alt + shift + d 格式化文件，这时候在 ctrl + s 保存进行 eslint 修复），为此可以在配置文件（setting.json)中添加如下配置:

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true // 每次保存的时候将代码按eslint格式进行修复
}
```

参考：

- [github prettier: Linter Integration](https://github.com/prettier/prettier-vscode#linter-integration)

### vue 项目代码高亮、格式化和校验方案

安装插件 Vetur, Eslint, Prettier-Code Formatter，然后 vscode 用户全局配置如下

setting.json

```json
{
    "workbench.statusBar.visible": true,
    "workbench.colorTheme": "Monokai",
    "editor.tabSize": 2,
    "files.autoSave": "onFocusChange",
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[markdown]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html"
}
```

安装好插件后，如果不继续加以配置，prettier 自动格式化后的代码通不过 eslint 的语法格式检验，接下来有两种后续选择：

#### 文件保存自动格式化

可以通过如下的配置实现：

.vscode > setting.json

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // 每次保存的时候将代码按eslint格式进行修复
  }
}
```

上面的配置使得文件在保存的时候自动格式化，eslint自动修复，但是eslint的自动修复优先级好像不够高，所以最后仍然不符合eslint格式要求，为此还需要在项目中使用如下两个配置文件进一步配置 eslint 和 prettier ：

.prettierrc

```json
{
  "semi": false,
  "singleQuote": true
}
```

.eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0 // 忽略函数括号空格检查
  }
}
```

上面配置使得 prettier 格式化时去除分号、使用单引号以符合 eslint 的校验规则，另外还修改了 eslint 的配置，忽略对函数括号前的空格校验。

这样的优点是每次保存后自动格式化，同时不会出现语法报错，但是另外如果之后 prettier 和 eslint 还有更多规则冲突，还需要进一步添加配置。

如果想要一次性解决规则冲突，可以使用另外的 npm 包来解决，比如`eslint-config-prettier`，使用它可以使得 eslint 忽略那些和 prettier 格式化以后冲突的规则，详情可以参考：[Disable formatting rules](https://prettier.io/docs/en/integrating-with-linters.html#disable-formatting-rules)

但是不管怎样，这种方式在使用格式化插件以后，被迫修改了 eslint 的校验规则，这一点不太令人满意。

#### 文件保存不自动格式化

这是我个人选择的方案，这时只需要如下的配置：

.vscode > setting.json （注意如果 .vscode 文件夹写在了 .gitignore 文件中时不会给添加到版本管理仓库的，需要把它去掉）

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // 每次保存的时候将代码按eslint格式进行修复
  }
}
```

然后每次保存时，eslint 就会自动修复以满足格式要求，由于不自动格式化，所以规避了 prettier 自动代码格式化时的冲突问题。

因为平时自己些代码，格式化就挺OK的，只是偶尔需要格式化一下，这时只要手动 ctrl + alt + F ，然后再保存修复即可。这样一来，就不需要修改 eslint 校验规则，也不需要修改 prettier 的配置。

## electron

- [打造你的第一个 Electron 应用](https://electronjs.org/docs/tutorial/first-app)
- [electron 安装+运行+打包成桌面应用+打包成安装文件+开机自启动](http://www.cnblogs.com/kakayang/p/9559777.html)

## node

[windows 下更新 npm 和 node](https://www.cnblogs.com/xinjie-just/p/7061619.html)

## npm

### peer dependency

- 我根据`babel`的官方文档执行`npm install @babel/preset-env --save-dev`命令时,出现了`peerDependencies WARNING @babel/preset-env@* requires a peer of @babel/core@^7.0.0-0 but none was installed`报错。
  - 首先解释下`peerDependencies`，这是会发生在如下的情况：A 依赖于 B 和 C1，B 依赖于 C2 的一种插件，C1 和 C2 是同一种包的不同版本，在我的项目中，C1 直接可见，C2 并不直接可见，而 B 却是依赖于它，因此 B 在代码中可能会有类似`require(C)`之类的代码，两者版本不同，那么 B 就可能与实际引入的 C1 的代码不兼容，为此，B 可能需要明确指定它的同级依赖（`peerDependencies`）。
  - 解决办法：手动安装
  - 参考 1：[Peer Dependencies （同版本依赖）](https://blog.csdn.net/zhangchao19890805/article/details/78988364)
  - 参考 1：[探讨 npm 依赖管理之 peerDependencies](https://blog.csdn.net/whc996/article/details/82865474?utm_source=blogxgwz0)

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

```

- 创建 `index.js` 文件，用模块化的方式书写你的代码，如 `module.exports = 123;`
- 命令行运行 `npm login`，登录您的 npm 帐号，如果没有请到[官网](https://www.npmjs.com/)注册
- 登录以后，运行 `npm publish --access=public`，发布你的 npm 包；以后包需要更新的时候，你需要修改 `package.json` 中的版本号为新版本，否则会报错
- 到 `https://www.npmjs.com/package/包名` 查看您的 npm 包，您还可以另外创建项目 `npm i 包名` 来安装您的包，并测试
- 您可以在 24 小时内强制删除，`npm --force unpublish 包名`
- 参考： [创建发布自己的 npm 包](https://www.cnblogs.com/marymei0107/p/6339710.html)

## 工具

### charles

这是一个网页调试代理工具，官网：[https://www.charlesproxy.com](https://www.charlesproxy.com)。使用该工具可以在一个本地特定端口与路径的数据请求映射到本地文件，具体方法：

#### 破解

- 破解: [charles 在线破解工具](https://www.zzzmode.com/mytools/charles/)
- 参考文章: [charles4.2 下载与破解方法以及配置 https](https://www.cnblogs.com/rrl92/p/7928770.html)

#### 使用

- 软件菜单栏选择：Tools > Map Local，添加新的映射
- 填写相关信息：
  - Protocol: 协议
  - Host: 主机名，本地主机也就是 `127.0.0.0.1`
  - Port: 端口号，比如我们前端项目启动的服务在 3000 端口，那么我们也就可以将其设置为 3000 端口，也不存在跨域问题
  - Path: 请求的路径，如 `/api/dataList`
  - Local Path: 本地文件路径，可以写一个 json 文件，选择其路径
- 点击 ok 确认，就可以访问本地的模拟数据了（可以先直接在浏览器输入 url 测试一下）

## jekyll 博客

### jekyll 本地运行无法通过 ip 访问

使用带参命令运行： `jekyll serve -w --host=0.0.0.0:4000`

### 为博客添加流程图支持

使用 [mermaid](https://github.com/mermaid-js/mermaid/), 可参考文章 [Embed Mermaid Charts in Jekyll without Plugin](http://kkpattern.github.io/2015/05/15/Embed-Chart-in-Jekyll.html), 除了按照文章说的引入 mermaid.min.js 外，还需要引入 mermaid.css 文件，否则显示不正常。
```
