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
            res.writeHead('404');
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

## v2.2 简单实现登录注册

实际开发中该功能会需要在数据库获取数据和写入数据；前端不能直接操作数据库，都是由服务端做中间人，前后端需要指定一套接口（确定、并且写成接口文档）。

对于后台来说，安全性很重要，而99.9%的漏洞都是懒。

- 一切来自前台的数据都不可信
- 前后台都得进行数据校验，但是目的不同 
    * 前台校验：用户体验
    * 后台校验：安全性

下面的例子中，在不使用数据库的情况下，后台程序简单地用一个`users`对象来完成注册与登录用户数据的存储。基本思路如下：

- 用户注册：
    * /reg?user=xxx&pass=xxx => {err: 0, msg: '说明'}
- 用户登陆：
    * /login?user=xxx&pass=xxx => {err: 0, msg: '说明'}

前端通过`/reg`和`/login`两个接口访问后台，后台代码通过判断请求的访问路径`pathname`，来将请求分为登录、注册、静态资源，对于找不到/不存在的静态资源，返回`Not Found`。

### 前端代码

```html
<div class="regOrLogin">
        用户名: <input type="text" id="username"><br>
        密码：<input type="password" id="password"><br>
        <button id="reg">注册</button><button id="login">登录</button>
</div>
<script src="./jquery-2.0.3.js"></script>
<script>
    $('#reg').on('click', e=>{
        let username = $('#username').val(),
        password = $('#password').val();
        if(!username || !password){
            // simple front end validation
            alert("用户名密码不可为空");
        }else{
            // post to backend using ajax
            $.ajax({
                url: '/reg',
                method: 'POST',
                data: {username, password},
                dataType: 'json',
                success(data){
                    if(!data.error){
                        alert('恭喜您，注册成功！')
                    }else{
                        alert('抱歉，注册失败：' + data.msg);
                    }
                },
                error(err){
                    alert('数据提交失败')
                }
            });
        }
    });
    $('#login').on('click', e=>{
        let username = $('#username').val(),
            password = $('#password').val();
        if(!username || !password){
            // simple front end validation
            alert("用户名密码不可为空");
        }else{
            // post to backend using ajax
            $.ajax({
                url: '/login',
                method: 'POST',
                data: {username, password},
                dataType: 'json',
                success(data){
                    if(!data.error){
                        alert('恭喜您，登录成功！');
                    }else{
                        alert('抱歉，登录失败：' + data.msg);
                    }
                },
                error(err){
                    alert('数据提交失败');
                }
            });
        }
    });
</script>
```

### 后端代码

```javascript
const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

let users = {
    // "name": "password"
};

let server = http.createServer((req, res)=>{
    let {pathname, query} = url.parse(req.url);
    
    let str = ''; // 暂时使用string,待改进
    req.on('data', data=>{
        str += data;
    });
    req.on('end', ()=>{
        let params = querystring.parse(str);
        let {username, password} = params;
        switch(pathname){
            case '/reg':
                // 注册接口
                if(!username){
                    res.write('{"error": 1, "msg": "用户名不能为空"}');
                }else if(!/^\w{6,20}$/.test(username)){
                    res.write('{"error": 1, "msg": "用户名必须为6-20位的数字、字母、下划线"}');
                }else if(users[username]){
                    res.write('{"error": 1, "msg": "该用户名已被占用"}');
                }else if(!password || !/.{8,16}/.test(password)){
                    res.write('{"error": 1, "msg": "密码必须为8-16位字符"}');
                }else if(/['"]/.test(password)){
                    res.write('{"error": 1, "msg": "密码不能包含引号"}');
                }else{
                    users[username] = password;
                    res.write('{"error": 0, "msg": "register succeed."}');
                }
                res.end();
                break;
            case '/login':
                // 登录接口
                if (!username || !password) {
                    res.write('{"error": 2, "msg": "用户名与密码不能为空"}');
                } else if (!users[username] || users[username] !== password) {
                    res.write('{"error": 2, "msg": "用户名或密码有误"}');
                } else {
                    res.write('{"error": 0, "msg": "log in succeed."}');
                }
                res.end();
                break;
            default:
                // 静态资源
                fs.readFile(`htdocs${pathname}`, (err, data)=>{
                    if(err){
                        res.writeHead('404');
                        res.write('Not Found')
                    }else{
                        res.write(data);
                    }
                    res.end();
                });
                break;
        }
    });

});
server.listen(8080);
```

### 数据库基础知识

#### 数据库（SQL）

- 关系型数据库：如`MySQL`、`Oracle`
    * 最常见、最常用，数据之间是有关系的
    * 大型系统的主数据库通常是关系型数据库
    * `MySQL`
        - 商业免费，绝大多数普通应用
        - 性能很高、安全性很高
        - 容灾略差
    * `Oracle`
        - 商业收费且昂贵，如金融、医疗常用
        - 容灾特别强
- 文件型数据库：如`sqlite`，简单、小，比如保存手机通信录、通话记录
- 文档型数据库：如`MongoDB`，直接存储异构数据——方便
- 其他

#### NoSQL

- 没有复杂的关系
- 对**性能**有极高的要求
- `redis`、`memcached`、`hypertable`、`bigtable`

#### 数据仓库

海量数据

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

- ctrl+c退出是不是会被监测到，上次在生产环境用了，被批评了
    * 确实不好，它是强制退出

- 前端容灾：磁盘增量镜像

- node有缓存的概念吗？
    * 有

- `node`的垃圾回收
    * 也就是`JavaScript`的`gc`，和`Java`的`gc`很类似
    * 只要某个东西不再使用了，释放掉所占据的内存
    * 没有自动垃圾回收的语言（如`C`语言）
        - 程序员自己动手释放
        - 忘了释放，会造成内存泄漏
            ```c
            int *arr=(int*)malloc(sizeof(int)*100);
            //...
            free(arr);     
            ```
    * 自动垃圾回收，通常会采用引用计数的方式
        ```java
        Person p=new Person();
        Person p2=p;
        p=null;   //还剩1个
        // ...
        p2=null;  //还剩0个，可以回收了
        ```

- 重新发布程序后，浏览器每次需要ctrl+r来强制刷新，如何做到F5刷新就可以获取最新资源呢？
    * 后台配置
    * `<script src="a.js?v=2018012323"></script>`

- 服务器的缓冲池怎么理解
    * 最近使用的、最常使用的资源(文件、数据)，直接留在内存里
    * 策略->提高缓冲命中率(和具体场景关系很大)
