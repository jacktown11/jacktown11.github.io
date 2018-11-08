---
layout: article
title: 全栈课程07 数据交互
categories: [前端]
tags: [全栈课程]
---

# 搭建Web服务器

## v2.0 请求结果404的正确写法

```javascript
const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res)=>{
    fs.readFile(`htdocs${req.url}`, (err, data)=>{
        if(err){
            res.writeHeader('404');
            res.write('Not Found');
        }else{
            res.write(data);
        }
        res.end();
    });
});
server.listen(8080);
```
在`v1.0`中，没找到资源的情况下直接通过`res.write('404')`写返回前端的内容，但是这是写在返回结果的`体`中的，此时如果在浏览器端查看状态码依然是`200`，为此需要使用`writeHead()`方法，这使得状态码真的变成`404`。

## v2.1 处理GET和POST请求


作为一个web服务器，其工作包括：

- 返回文件
- 与前端数据交互(`GET`、`POST`)
    * `GET`数据：`url`里面，小，最多32K
    * `POST`数据：作为`body`，大，最多1G
- 与数据库交互

之前的版本，可以让前端访问`htdocs`文件夹中存在的文件，但是没有实现后面两个功能，下面实现处理`GET`和`POST`请求。

### 处理GET

```html
<form action="http://localhost:8080/api" method="get">
    用户名：<input type="text" name="username"><br>
    密码：<input type="password" name="password"><br>
    <input type="submit" value="提交">
</form>
```

```javascript
const http = require('http');
const url = require('url');

let server = http.createServer((req, res)=>{
    let {pathname, query} = url.parse(req.url, true);
    console.log(pathname); // /api
    console.log(query); // { username: 'jacktown', password: '122345' }
    res.end()
});
server.listen(8080);
```

`GET`请求的参数放在`url`中，使用`node`中的`url`模块来解析就可以了。

### 处理POST

```javascript
const http = require('http');
const querystring = require('querystring');

let server = http.createServer((req, res)=>{
    let str = ''; // 暂时使用string,待改进
    req.on('data', data=>{
        str += data;
    });
    req.on('end', ()=>{
        let params = querystring.parse(str);
        console.log(params); // { username: 'jacktown', password: '123' }
        res.end()
    });

});
server.listen(8080);
```

- `POST`请求中，表单的数据在请求体中，需要从中解析数请求参数
- 请求体的数据可能是很大，需要切成很多个小数据包传输，原因：
    * 方便所有人（否则如果允许很大数据包一次性传输，这可能需要很长时间，那么该网络通路上其他用户网络就相当于断掉了）
    * 容错强得多（如果某数据包有错，只需要重传错误的包就可以了）
- 每次数据数据到达触发`request`的`data`事件，传输完成触发`end`事件


# 接口

前端不能直接操作数据库，都是由服务端做中间人，前后端需要指定一套接口（确定、并且写成接口文档）

用户注册：
/reg?user=xxx&pass=xxx
=>{err: 0, msg: '说明'}

用户登陆：
/login?user=xxx&pass=xxx
=>{err: 0, msg: '说明'}

--------------------------------------------------------------------------------

安全性：99.9%的漏洞都是懒
1.一切来自前台的数据都不可信
2.前后台都得进行数据校验
  前台校验：用户体验
  后台校验：安全性

--------------------------------------------------------------------------------

http://localhost:8080/1.html      =>    /1.html
`www/1.html`

http://localhost:8080/www/1.html  =>    /www/1.html
`www/www/1.html`

--------------------------------------------------------------------------------

数据库：
1.关系型数据库——MySQL、Oracle    最常见、最常用
  数据之间是有关系的
2.文件型数据库——sqlite
  简单、小
3.文档型数据库——MongoDB
  直接存储异构数据——方便

MySQL     80%         免费    绝大多数普通应用
  性能很高、安全性很高
  容灾略差

Oracle                要钱    金融、医疗
  容灾特别强

--------------------------------------------------------------------------------

NoSQL   没有复杂的关系、对性能有极高的要求
redis、memcached、hypertable、bigtable

--------------------------------------------------------------------------------

数据库
数据库+接口+前台
ajax
formData
WebSocket

--------------------------------------------------------------------------------



# 外话

- 程序员内功
    * 算法
    * 设计模式
    * 架构
- 如何应对页面被运营商劫持
    * `HTTPS`
- 进程之间怎么通信
    * 管道
    * 共享内存
    * `socket`
- 单线程和非阻塞`IO`

    * 阻塞`IO`：导致整个程序卡住不动
    ```c
    FILE *fp=fopen("a.txt", "r");
    size=fread(buffer, sizeof(buffer), fp);
    // <-等待20s
    fclose(fp);
    ```

    * 非阻塞`IO`：继续往下执行，不卡
    ```javascript
    fs.readFile('a.txt', (err, data)=>{       // <-等待0s
        console.log(data);
    });
    console.log('a');
    ```

- 前端把加密数据传到后台，后台怎么进行校验的
    * 校验签名

- 怎么加密的 怎么解密
    * 极其成熟的算法——`RSA`（一类算法的总称）

- `request.on('data', data=>{})`的`on`是一直轮寻吗？
    * 不是，是监听、通知、回调、异步


天天听后台说 sip2 协议，这是现在接口的标准协议吗


讲下Graphql么？

--------------------------------------------------------------------------------

可以用assert

--------------------------------------------------------------------------------

ctrl+c退出是不是会被监测到，上次在生产环境用了，被批评了。。

--------------------------------------------------------------------------------

前端容灾 都包括啥
磁盘镜像(增量)

--------------------------------------------------------------------------------

node有缓存的概念吗？

--------------------------------------------------------------------------------

node的垃圾回收、JavaScript的gc、Java的gc
1.只要某个东西不再使用了，释放掉所占据的内存

--------------------------------------------------------------------------------

C语言：
int *arr=(int*)malloc(sizeof(int)*100);
...
...
...
...
free(arr);      //程序员自己动手释放

忘了释放

内存泄漏

--------------------------------------------------------------------------------

Person p=new Person();
Person p2=p;

p   -> 空
p2  -> 间

p=Null;   //还剩1个
...
...
...
p2=Null;  //还剩0个

--------------------------------------------------------------------------------

还想请教一个问题：重新发布程序后，浏览器每次需要ctrl+r来强制刷新，如何做到F5刷新就可以获取最新资源呢？
1.后台配置
2.<script src="a.js?t=2018012323"></script>

a.php?user=xxx&pass=123456

--------------------------------------------------------------------------------

服务器的缓冲池怎么理解
最近使用的、最常使用的资源(文件、数据)，直接留在内存里

策略->缓冲命中率

--------------------------------------------------------------------------------

简单讲讲SSO、OAuth

--------------------------------------------------------------------------------
