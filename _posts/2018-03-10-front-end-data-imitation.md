---
layout: article
title: 前端数据模拟
categories: [前端]
tags: [杂]
---

# 前言

本文参考了博文：[玩转前端之模拟数据](https://www.cnblogs.com/Leo_wl/p/6001952.html) ，但有大幅修改。

# 为什么要模拟数据

前端开发中，往往需要从后台获得数据，但是开发阶段这些实际数据接口并没有部署好，因此需要模拟数据，让我们能够进行具有完整交互流程的开发。我们期望在前后联调，转而使用真实接口时，代码的改动尽可能小。

我在github上开了一个[数据模拟示例仓库](https://github.com/jacktown11/data-imitation)，其中的demo实现了下面提到的各种数据模拟方式，欢迎star和fork。下面正式介绍几种数据模拟的方式。

# 使用（全局）变量

先上代码：
```javascript
;(function(){

var isDev = true;
var data = {
    "status": 3,
    "message": "hello world",
    "string": "★★★",
    "number": 69,
    "boolean": true,
    "object": {
        "110000": "北京市",
        "120000": "天津市",
        "130000": "黑龙江省"
    },
    "array": [
        {
            "name": "Hello"
        },
        {
            "name": "Mock.js"
        },
        {
            "name": "!"
        },
        {
            "name": "Hello"
        },
        {
            "name": "Mock.js"
        },
        {
            "name": "!"
        }
    ],
    "regexp": "6288712123-",
    "time": "2014-01-16 21:21:22",
    "color": "rgba(121, 242, 135, 0.94)",
    "word": "jztuqwmur",
    "text": "而风气究及。",
    "name": "崔杰",
    "url": "news://imkpjsnq.ev/dhthtrgqy"
};

$(init);

function init(){
    $('#data-get').on('click', function(){
        if(isDev){
            showData(data);
        }else{
            $.ajax({
                url: '/list',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    showData(data);
                }
            });
        }
    })    
}
function showData(data){
    $('#data-show').JSONView(data, {collapsed: false});
}

})();
```

可以看到，这段代码中定义了两个变量，`data`和`isDev`，在开发阶段，`isDev`设置为`true`，这时直接把本地变量`data`拿过来，传递给`showData`函数处理；转换到生产环境下，需要做的事情包括：删除`data`和`isDev`对象，删除关于代码环境的`if`判断，直接使用`ajax`。

其问题主要就是删除这些变量和调整代码结构的时候会非常麻烦，很容易出错，因为这些变量和`if`结构可能散落在各个代码文件的各个角落里。另外这种模拟本身没有使用`ajax`，和实际的数据请求过程有较大差异，而且数据是死的，不够灵活。

# 使用数据存储文件
存放在js代码里的数据变量确实很丑，为此可以把它存成一个数据文件，比如下图的`data.json`：

![文件目录](https://upload-images.jianshu.io/upload_images/6321648-9c930e35ff1e83b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样一来，数据和`javascript`代码就隔离开来了，获取数据时也使用真实的`ajax`方式获取。

![数据请求ajax](https://upload-images.jianshu.io/upload_images/6321648-7e34f5b5ca7125d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下面是请求数据的代码：
```javascript
;(function(){

$(init);

function init(){
    $('#data-get').on('click', function(){
        $.ajax({
            url: './data.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                showData(data);
            }
        });
    });    
}
function showData(data){
    $('#data-show').JSONView(data, {collapsed: false});
}

})();
```

转换为生产环境时，只需要修改 `url`以符合实际的接口，用于模拟数据的文件`data.json`不进行打包即可。然而这样也有一些缺点：数据不够灵活，是写死的，没有状态判断，返回的数据真实度不够高。

# 使用mockjs

使用一个`javascript`库`mockjs`，你可以访问[它的github仓库](https://github.com/nuysoft/Mock) ，查看详细文档。文件目录如下，其中`data/list.js`用于数据模拟。
 
![目录结构](https://upload-images.jianshu.io/upload_images/6321648-8cda0f058c53777c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

自然，我们需要在`index.html`引入这两个文件。
 
![文件引入](https://upload-images.jianshu.io/upload_images/6321648-fe0dde516fb5b19a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下图是`list.js`模拟对`/list`数据请求的代码。
 
![list.js](https://upload-images.jianshu.io/upload_images/6321648-6b4e579dd161f9be.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

使用了`mockjs`，再来看看我们在`javascript`文件中是如何请求数据的：

```javascript
;(function(){

$(init);

function init(){
    $('#data-get').on('click', function(){
        $.ajax({
            url: '/list',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                showData(data);
            }
        });
    });    
}

function showData(data){
    $('#data-show').JSONView(data, {collapsed: false});
}

})();
```

可以看到，和使用本地数据存储文件的方式几乎是一样的，不过这次请求的`url`参数是`/list`，而不是`data.json`，这样在转换到生产环境时，我们甚至都不用修改这些`ajax`代码了，直接删除`mockjs`和`list.js`就好了。而且生成的数据也更真实、可定制。

然而这种方式对数据的模拟，是通过拦截`ajax`请求来实现的，所以在浏览器的控制台，我们是看不到数据请求的。

 ![ajax被拦截](https://upload-images.jianshu.io/upload_images/6321648-474e1f6a39325a61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 使用nodejs

`nodejs`作用一种后端语言，用它来模拟数据除了数据的内容真实性，其他方面可以说是最接近真实数据请求的。



```javascript
let http = require('http'),
    url = require('url'),
    fs = require('fs');

http
.createServer(function(request, response){
    let pathname = url.parse(request.url).pathname;
    console.log('requesting ' + pathname);
    switch(pathname){
        case '/list': 
            provideData(response);
            break;
        case '/':
        case '/index.html':
            provideIndexPage(response);
            break;
        default: 
            provideStatic('.'+ pathname, response);
            break;
    }
})
.listen(4000);
console.log('The node server is listening 4000');
```

上面是`server.js`文件的部分代码，通过`createServer`方法创建了服务器，通过`switch`语句判断请求的路径，在请求`/list`时，我们就用`provideData`函数返回请求的数据，`provideData`中实际是用`nodejs`的`fs`模块读取了本地的`./static/data.json`文件，事实上和前面的在本地提供`data.json`文件直接请求的方法是一致的，不过现在我们可以控制服务器的行为，因此可以在`ajax`请求的url是`/list`的时候也能返回该文件，这样我们的前端代码在转换到生产环境的时候也不用修改了。

而真正使用`nodejs`搭建开发环境的话，数据模拟就可以看作只是路由的一部分，可以借用`express`、`koa`这样的框架。
