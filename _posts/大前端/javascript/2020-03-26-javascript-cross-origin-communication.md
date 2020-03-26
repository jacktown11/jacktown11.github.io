---
layout: article
title: javascript 跨域通信
categories: [大前端, javascript, 跨域通信]
---

# 浏览器同源策略

## 含义

出于安全考虑，浏览器对不同页面之间、页面与服务器之间的通信实行同源策略限制。同源的含义：

- **相同协议**
- **相同域名**
  + 相同主域，不同子域也属于不同源
  + 域名和其对应的ip也属于不同源
- **相同端口**

## 限制

非同源时的行为限制包括：

- 不能获取 Cookie, LocalStorage, IndexDB
- 不能获取 DOM
- 不能发送 AJAX 请求

注意到图片、CSS、JS文件的获取都不受同源策略限制。

## 跨域方案总览

同源策略的规避方法：

- ajax 跨域方案
  + 图像 Ping
  + JSONP
  + CORS
  + WebSocket
  + 后端代理
    - Nginx 反向代理([反向代理与正向代理的通俗解释](https://www.jianshu.com/p/e233dcf003c6) )
    - node 中间件
- 页面间通信跨域方案
  + window.postMessage
  + window.name
  + document.domain
  + location.hash

下面详述各种跨域方案。

# 图像 Ping

由于请求图片不受同源策略限制，因此可以通过在 `js` 中创建图片，并以在其 `src` 中添加查询参数的方式向服务器发送数据。浏览器端并不能得到具体的有效数据，但是可以监听图像的 `onload` 和 `onerror` 事件，从而知道响应什么时候返回。实践代码：

先在3000端口启动一个服务器：

```javascript
const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '../src')))

app.listen(3000, () => {
  console.log('listening at 3000...')
})
```

3000端口托管的 `../src/index.js` 静态文件（在 `../src/index.html` 文件中引入)：

```javascript
/**
 * 使用图像 Ping 实现跨域发送数据
 * @param {Object} queryObj 查询字符串对象
 */
function send(url, queryObj){
  if(typeof url !== 'string' || typeof queryObj !== 'object' || queryObj == null) return
  let img = new Image()
  img.onload = img.onerror = () => {
    console.log('done')
  }
  let queryArr = []
  for(let key in queryObj){
    queryArr.push(key + '=' + queryObj[key])
  }
  img.src = url + '?' + queryArr.join('&')
}

// test 
send('http://127.0.0.1:3001/test.png', {
  name: 'jack',
  age: 27
})
```

3001端口接收图像 Ping 的服务器

```javascript
const express = require('express')

const app = express()

app.get('*', (req, res) => {
  console.log(req.url)
  res.end('got')
})

app.listen(3001, () => {
  console.log('listening at 3001...')
})
```

限制：

- 只能发送 `GET` 请求，数据长度也就因 `url` 长度限制（通常在几个KB级别）而不能太大
- 只能向服务器单向发送数据

# JSONP

图像 `Ping` 利用了图像资源的获取不受同源策略限制，类似地， `JSONP` 则利用了 `js` 文件不受同源策略限制。

其原理是：前端事先定义好数据处理函数，然后以 `script` 标签向后端动态地请求一个 `js` 文件，并把函数的名字以查询字符串的方式放在请求路径中。后端准备好数据后，将数据和函数名字以 `函数名字(数据)` 方式进行字符拼接，将结果作为 `js` 文件的内容。返回前端的 `js` 文件会直接执行，也就是执行数据处理函数的调用，因为函数的名字是前端事先定义好传给后端的，所以自然能够在作用域链中找到这个函数。

实践代码：

仍旧在3000端口启动一个服务器，托管 `../src` 下的文件，内容参照上节。在`../src/index.html`中引入的`../src/index.js`内容如下：

```javascript
function jsonp(url, callbackName){
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url + '?callback=' + callbackName
  document.body.append(script)
}

function sayHello(person){
  console.log(`Hello, I'm ${person.name} and I'm ${person.age} years old.`)
}

jsonp('http://127.0.0.1:3001/some/path', 'sayHello')
// Hello, I'm jack and I'm 27 years old.
```

后端3001端口服务器代码:

```javascript
const express = require('express')
const url = require('url')
const querystring = require('querystring')

const app = express()

// data from database or other sources
const data = {
  name: 'jack',
  age: 27
}

app.get('*', (req, res) => {
  const params = querystring.parse(url.parse(req.url).query)
  let jsStr = params.callback + '(' + JSON.stringify(data) +  ')'
  res.end(jsStr)
})

app.listen(3001, () => {
  console.log('listening to 3001...')
})
```

