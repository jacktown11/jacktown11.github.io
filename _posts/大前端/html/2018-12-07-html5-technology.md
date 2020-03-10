---
layout: article
title: HTML5 新特性
categories: [大前端]
tags: [html]
---

按：在[我的练习](https://jacktown11.github.io/practice/)中可以找到本文中的`html5`新特性相关demo。

# 零、HTML5 新特性总览（10个）

- 新的语义标签和属性
- 表单新特性（表单2.0）
- 视频和音频
- Canvas绘图
- SVG绘图
- 地理定位
- 拖放API
- WebWorker
- WebStorage
- WebSocket

# 一、新的语义标签和属性



# 二、HTML5增强型表单

- `input`标签的新`type`属性
- 新的表单标签
- 表单标签的新属性

## 1. input标签的新type属性

### h4中的type属性

- `text`
- `password`
- `radio`
- `checkbox`
- `file`
- `submit`
- `reset`
- `button`
- `image`
- `hidden`

### h5中新type属性

- `email`：邮件输入域，在表单提交时提供简单的邮箱格式验证，并弹出一个提示窗口(可定制内容不能定制样式)。`<input type="email">`
- `url`：URL地址输入域，在表单提交时提供简单的URL地址格式验证，并弹出一个提示窗口(可定制内容不能定制样式)。`<input type="url">`
- `number`：数字输入域，在表单提交时提供简单的数字格式验证，并弹出一个提示窗口(可定制内容不能定制样式)。`<input type="number" min="" max="" step="">`
- `tel`：电话号码输入域，在手机浏览器中弹出数字输入键盘。`<input type="tel">`
- `search`：搜索输入域，在手机浏览器中右下角呈现搜索按键。`<input type="search">`
- `range`：范围选择控件，帮助用户在一定范围内选择一个数字。`<input type="range" min="" max="" step="">`
- `color`：颜色选择控件，浏览器并未自己实现颜色选择框，而是使用操作系统自带的颜色选择控件。`<input type="color">`
- `date`：日期选择控件，`FF`没有实现，推荐使用第三方插件代替，如`jQueryUI-datepicker`、`laydate`等。`<input type="date">`
- `month`：月份选择控件，FF没有实现。`<input type="month">`
- `week`：星期选择控件，FF没有实现。`<input type="week">`

## 2. 新的表单标签
- h4: input, button, select/option, textarea, label
- h5: datalist, progress, meter, output

### datalist

本身不可见，它为`input`提供输入列表，用户可以从中选取，也可以手动输入。

```html
<datalist id="listA"> 
    <option>xx</option>
    <option>yy</option>
    <option>zz</option>
</datalist>
listA: <input type="text" list="listA">
```

### progress

进度条，有两种显示形式

1. 左右晃动的进度条
2. 具有一定进度值（0-1）的进度条

```html
<!-- 左右摇晃的进度条 -->
进度条1：<progress></progress><br>
<!-- 具有进度值的进度条 -->
进度条2：<progress value="0" id="progress"></progress><br>
```

### meter

刻度尺，用于表示一个值所处范围：不可接受（红色），可以接受（黄色），非常优秀（绿色）

```html
刻度：<meter min="0" max="100" low="60" high="85" optimum="100" value="0" id="meter"></meter>
```

### output

输出，语义标签，没有任何样式，样式等同于`span`。（下面的例子中表示语义，并不自动计算，也没有样式）

```html
商品价格：3.5
购买数量：<input type="text" value="3">
小计：<output>10.5</output>
```

## 3. 表单标签的新属性

- `placeholder`: 占位符
- `autofocus`: 自动获取输入焦点
- `multiple`: 允许输入框中出现多个值
- `form`: 用于把输入域放置在`form`外部，其值为绑定到的`form`元素的`id`

验证相关

- `required`: 必填项，内容不能为空
- `maxlength`: 字符串最大长度
- `minlength`: 字符串最小长度
- `max`: 指定数字的最大值
- `min`: 指定数字的最小值
- `pattern`: 正则表达式

# 三、视频和音频

## 1. Flash被H5取代各方面

|Flash技术| H5技术|
|-|-|
|绘图（AS/Flex）| Canvas/SVG|
|动画           | Canvas+(定时器，替换新技术)|
|视频和音频     | video+audio|
|客户端存储     | WebStorage|

## 2. H5视频

提供新的标签用于播放视频，但是视频格式很多，浏览器不一定都有它们的解码器，为此通常需要提供多种选择。

`video`本身是一个`300*150`的`inline-block`元素。

### html成员属性

- `autoplay`: `false`, 自动播放
- `controls`: `false`, 是否显示播放空间
- `loop`: `false`, 是否循环播放
- `muted`: `false`, 是否静音
- `poster`: `""`, 是否在第一帧之前显示海报（图片）
- `preload`:, 视频的预加载策略，比如手机端考虑到流量问题，通常不能- `使用auto`
- `auto`: 预加载视频的元数据（时长、名字等）以及缓冲一定时长的视频
- `metadate`: 预加载视频的元数据
- `none`: 不预加载任何数据

```html
<video src="static/aaa.mp4" id="v1" controls poster="static/play.png" preload="metadate"></video>

<video id="v2"> 
    <source src="static/aaa.mp4">
    <source src="static/aaa.ogg">
    <source src="static/aaa.webm">
    您的浏览器版本太低，无法播放，请升级。
</video>
```

### js对象属性

`currentTime`; 当前播放的时长
`duration`: 总时长
`paused`: `boolean`值，当前视频是否处于暂停状态
`volume`: 1, 当前音量
`playbackRate`: 1 播放速率，大于1快放，小于1慢放

### js成员方法

- `play()` 播放视频
- `pause()` 暂停播放

### js成员事件

- `onplay`, 当前视频开始播放时触发的事件
- `onpause`, 当前视频暂停播放时触发的事件

## 3. H5音频

`H5`提供了一个`audio`标签用于播放音频，其属性和`video`几乎一样。

```html
<audio src="static/stayAlive.mp3" controls autoplay></audio>
```

# 四、Canvas

网页中可绘制实时走势图、统计图、在线画图板、网页游戏、地图应用。目前有三种绘图技术。

- `SVG`绘图，`2D`矢量图技术，2000就出现了，现属于`H5`标准
- `Canvas`绘图，`2D`位图技术，`H5`提出的绘图技术
- `WebGL`绘图，`3D`绘图，尚未纳入`H5`标准

Canvas的学习难点：坐标系、单词比较多

## 1. Canvas画布

`Canvas`画布，是`H5`提供`2D`绘图技术，其默认是`300*150`的`inline-block`，画布的宽高只能使用`html/js`属性来赋值，不能使用`css`样式来赋值！

```html
<canvas width="800" height="600">您的游览器版本太低，请升级！</canvas>
```

每个画布上有且仅有一个“画笔”对象，使用它进行绘图。

```javascript
let ctx = canvas.getContext('2d');
```

坐标系：左上角为原点，向右为`x`轴正方向，向下为`y`轴正方向

## 2. 绘制矩形

```javascript
// 绘制一个矩形
ctx.lineWidth = 1; // 描边宽度（空心）
ctx.strokeStyle = '#f00'; // 描边样式（空心）
ctx.fillStyle = '#000'; // 填充样式/样色（实心）
ctx.strokeRect(0, 0, 100, 50); // 描边一个矩形(x,y,w,h)
ctx.fillRect(100, 0, 100, 50); // 填充一个矩形
ctx.clearRect(50, 0, 100, 100); //清除一个矩形范围内的所有绘图
```

## 3. 绘制文本

```javascript
// 绘制文本
let ctx4 = document.getElementById('c4').getContext('2d');
ctx4.fillStyle = '#080';
ctx4.strokeStyle = '#008';
ctx4.strokeRect(0, 20, 100, 80);

ctx4.font = '30px sans-serif'; // 设置字体与大小
ctx4.textBaseline = 'bottom'; // bottom alphabetic 文本基线（垂直对齐方式）
ctx4.fillText('hello, tom', 0, 20); // 在(x,y)坐标位置填充一段文本

ctx4.textBaseline = 'top';
ctx4.strokeText('China',0, 100); // 在(x,y)位置描边一段文本
let info = ctx4.measureText('good morning'); // 测量文本宽度，返回对象｛width: x｝
console.log(info.width);
```

## 4. 渐变对象

- 线性渐变: `linearGradient`
    * 设置渐变对象
    * 设置颜色点	
    * 将渐变对象应用填充或描边样式
    * 画矩形/文本
- 径向渐变: `radialGradient`

```javascript
let ctx7 = document.getElementById('c7').getContext('2d');

// 创建渐变对象(x1,y1, x2, y2)
let g = ctx7.createLinearGradient(0,0,100,0);

// 设置颜色点
g.addColorStop(0, '#008');
g.addColorStop(0.5, '#f00');
g.addColorStop(1, '#080');

// 将该渐变对象设置为画笔填充样式
ctx7.fillStyle = g;

ctx7.fillRect(0,0, 200, 100); 
```

## 5. 绘制路径

`Path`: 由多个坐标点组成任意形状，路径本身不可见，可描边、填充、裁剪。

```javascript
let ctx9 = document.getElementById('c9').getContext('2d');
ctx9.beginPath(); // 开始路径
ctx9.moveTo(50,10); // 移动到指定点(x,y)
ctx9.lineTo(150,10); // 从当前点到指定点绘制一条线段
ctx9.lineTo(150,110);
ctx9.lineTo(50,110);
ctx9.closePath(); // 闭合路径

ctx9.arc(100,10, 50, 0, Math.PI/2, false); // 绘制圆拱形路径(x,y,r, startArc, endArc)
ctx9.stroke();
// ctx9.clip(); // 对当前路径进行裁剪
```

## 6. 绘制图像

`canvas`属于客户端技术，图片在服务器上，所有的浏览器必须先下载，等待图片加载成功以后，再绘制图片。

```javascript
let img = new Image(); // 创建图片对象
img.src = './img/p3.png'; // 加载图片
// 图片加载完成处理事件
img.onload = function(){
    console.log(img.width); // 200
    ctxa.drawImage(img, 10, 10); // 原大小绘制
    ctxa.drawImage(img, 400, 10, 50, 50); // 拉伸绘制
};
```

## 7. 异步加载多张图片

`Canvas`问题：`Ajax`异步加载，无法预测加载完成顺序。

异步和同步是网络中程序工作方式:

- 同步：有序，（前端工作 后端等待） 与（前端等待 后端工作）
- 异步：无序，前后端都在工作，不相互等待

解决方案：使用整型数字，通过计算完成图片加载。

```javascript
let progress = 0;
let img1 = new Image();
img1.src = '1.png';
img1.onload = ()=>{
    progress+=50
    if(progress == 100) draw();
};
let img2 = new Image();
img2.src = '2.png';
img2.onload = ()=>{
    progress+=50
    if(progress == 100) draw();
};
```

## 8. 图形变换操作

`canvas`可以对一个图像/图形在绘制过程中进行变换，旋转、平移；旋转与平移都具有累加效果。

```javascript
ctx.rotate(angle); //旋转绘图对象，旋转中心是画布原点（0，0）
ctx.translate(x,y); //将整个画布的原点平移到指定位置
ctx.save(); //保存画笔的所有变换状态值
ctx.restore(); //恢复画布变换状态值到最近一次保存值
```

# 五、SVG绘图

| |canvas绘图| svg绘图|
|-|-|-|
|类型| `2D`位图| `2D`矢量图|
|如何绘图| 使用`JS`代码绘图| 使用标签绘图|
|事件绑定| 每个图形不是元素，不能直接绑定事件| 每个图形都是元素，可以直接绑定事件|
|应用场合| 游戏，特效| 地图，图标|

`SVG`诞生于2000年，早期作为`XML`的扩展应用，`H5`标准将常用的`SVG`标签采纳为标准。

- `SVG`技术在`H5`之前使用方法
    * 在一个`XML`文档声明绘制图形
    * 再编写`HTML`文档，使用`IMG/OBJECT`应用
- `SVG`技术在`H5`出现之后使用方法
    * 直接在`H5`文档中使用`SVG`标准

`<svg></svg>`本身是一个默认`300*150`的`inline-block`，可以绘制
`<rect>`矩形，`<circle>`圆形，`<ellipse>`椭圆，`<line>`直线，`<polyline>`折线，`<polygon>`多边形，`<text>`文本，图像

`<g>`分组标签，内部可以含有多个图形标签，并且可以在它上面指定共有属性值。

绘制复杂图形：贝塞尔曲线，路径（`path`）。

## 1.绘制矩形

`<rect></rect>`，属性包括：

- `width`
- `height`
- `x`
- `y`
- `fill`
- `fill-opacity`
- `stroke`
- `stroke-width`
- `stroke-opacity`

```html
<svg id="s1" width="600" height="400">
    <rect width="100" height="100"></rect>
    <rect width="100" height="100" x="400" y="0" stroke="#088" stroke-width="3" fill="transparent"></rect>
    <rect width="100" height="100" x="0" y="300" fill="#f00" fill-opacity="0.5"></rect>
</svg>
```

## 2. 绘制圆形

`<circle></circle>`，属性包括:

- `cx`
- `cy`
- `r`
- `fill`
- `fill-opacity`
- `stroke`
- `stroke-opacity`

## 3. 绘制椭圆

`<cllipse cx="" cy="" rx="" ry=""></ellipse>`

`rx`: 水平半径
`ry`: 垂直半径

## 4. 绘制直线

```html
<g stroke="#222" stroke-width="8" stroke-linecap="round">
    <line x1="60" y1="200" x2="70" y2="200" ></line>
    <line x1="60" y1="220" x2="70" y2="220" ></line>
    <line x1="60" y1="240" x2="70" y2="240" ></line>
    <line x1="85" y1="200" x2="140" y2="200" ></line>
    <line x1="85" y1="220" x2="140" y2="220" ></line>
    <line x1="85" y1="240" x2="140" y2="240" ></line>
</g>
```

## 5. 绘制折线

```html
<polyline points="50,50 100,50 100,100 50,100" 
fill="transparent" stroke="#444" stroke-width="2"></polyline>
```

## 6. 绘制多边形

```html
<polyline points="100,100 115,150 77,120 123,120 85,150 100,100" 
fill="#080" stroke="#008" stroke-width="2"></polyline>
```

## 7. 绘制文本

```html
<text font-size="48" fill="#088" stroke="#f00" 
x="50" y="50" alignment-baseline="before-edge">
hello,汉字
</text>
```

## 8. 绘制图像

```html
<image xlink:href="./img/play.png" 
width="300" height="200" x="150" y="100"></image>
```

## 9. 渐变对象

使用`linearGradient`标签，定义`id`，并使用；它属于特效，放在`defs`标签内。

```html
<svg id="se" width="600" height="400">
    <defs>
        <linearGradient id="ge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect x="0" y="0" width="300" height="200" fill="url(#ge)" ></rect>
    <circle cx="100" cy="100" r="50" fill="url(#ge)"></circle>
    <text font-size="60" x="0" y="300" fill="url(#ge)">快乐每一天</text>
</svg>
```
   
## 10. 滤镜

```html
<svg id="sg" width="600" height="400">
    <defs>
        <filter id="sf1">
            <feGaussianBlur stdDeviation="3"></feGaussianBlur>
        </filter>            
    </defs>
    <circle cx="150" cy="150" r="50" fill="#f40" filter="url(#sf1)"></circle>
    <circle cx="150" cy="300" r="50" fill="#f40"></circle>
</svg>
```

## 第三方库

使用`canvas`/`svg`/`webGL`，一些第三方库可以帮助我们快速完成某些功能，如:

- `tow.js`，一个2D绘图函数库，提供了一套`API`，可以用于绘制各种图形（`canvas`/`svg`/`webGL`）。
- `echarts.js`，百度开发，对地图支持比较好
- `animate.css`
- `three.js`
- `d3.js`

# 六、地理定位

`Geolocation`: 地理定位，使用`JS`获取当前浏览器所在地理坐标（经度、纬度、海拔、速度）数据用于实现应用，如饿了么、高德导航。

手机浏览器如何获取定位信息（应用较多）

- 首选手机中`GPS`芯片与卫星通信，定位精度在米
- 次选手机通信基站进行定位获取，定位精度低（公里）

`PC`浏览器如何获取定位信息

- 通过`IP`地址进行反向解析，定位精度取决于`IP`库，通常误差大

## 使用navigator.geolocation

`H5`中提供了一个新对象，用于获取当前浏览器定位信息。

```javascript
window.navigator.geolocation = {
    getCurrentPosition, // 获取定位信息
    watchPosition, // 监听定位数据的改变
    clearWatch // 去除监听
};
```

但是这个功能并不实用，比如在`chrome`浏览器中会收到`Network location provider at 'https://www.googleapis.com/' : No response received.`错误，无法获得有效的定位信息。

## 使用百度地图

- 注册百度开发者账户
- 创建一个网站，登录百度地图，为该网站申请`AccessKey`
- 在自己的网页中嵌入百度地图提供的`API`

# 七、拖放API

`Drag and Drop`,拖动和释放，`H5`提供了7个事件。

拖动源对象（会移动），会触发的事件:

- `dragstart`
- `drag`
- `dragend`

拖动的目标对象，会触发的事件:

- `dragenter`
- `dragover`
- `dragleave`
- `drop`

拖动整体过程：

- `dragenter*1 + dragover*n + drageleave*1`
- `dragenter*1 + dragover*n + drop*1`

必须阻止`dragover`的默认行为（一旦悬停立即离开）
 
# 八、WebWorker

- 进程：操作系统分配内存的单位（工厂）
- 线程：处理进程内部，用于执行代码（生产线）
- 线程并发：操作系统中所有的线程宏观上看“同时执行”，微观上看是“依次交替执行”

## 单线程的问题

`chrome`中线程的模型：请求资源，6个线程；运行代码、渲染内容，1个线程。

```html
<button>按钮一</button>
<!-- 下面这个js执行很长时间的话，会导致页面阻塞 -->
<script src="./js/1.js"></script>
<button>按钮二</button>
```

## 解决方法

1. 将所有的`js`程序的执行放在`</body>`前，作为最后一个元素
2. 创建新的线程，由它来执行耗时的`js`任务，`UI`的主线程继续执行后续的`HTML`的渲染

```javascript
let w = new Worker('./js/1.js');
```

## 缺陷

浏览器不允许`Worker`线程操作`DOM`/`BOM`元素的操作。

原因：浏览器只允许`UI`主线程操作`DOM`/`BOM`，若多个`Worker`线程同时操作`DOM`结构的话，会造成页面的混乱。

## 数据传输

`Worker`线程可以给`UI`主线程发送数据

```javascript
// UI主线程
let w = new Worker('1.js');
w.onmessage = function(e){e.data};

// Worker线程
postMessage(StringMsg);
```

`UI`主线程也可以给`Worker`线程发送数据

```javascript
// UI主线程
let w = new Worker('1.js');
w.postMessage(stringMsg);

// Worker线程
onmessage = function(e){e.data};
```

# 九、Web Storage

在浏览器中存储当前用户专用的数据：访问历史、购物车、内容定制、样式定制...

## 客户端存储技术

- `Cookie`技术；浏览器兼容性好，一个`Cookie`不能超过4KB，老浏览器对`Cookie`个数也有限制（<=30），操作复杂
- `Flash`存储：依赖于`Flash`播放器，用的比较少了
- `H5 WebStorage`：不能超过8MB（标准，实际可能小写），操作简单，比较新
- `IndexDB`：可存储大量数据，还不是标准

## WebStorage

`WebStorage`技术中，浏览器为用户提供两个对象：

### window.sessionStorage

类数组对象，会话级别数据存储。浏览器进程所分得内存中存储一次`WEB`会话的数据，可供本次会话的页面共同使用，浏览器一旦关闭就消失。

`Session`：会话，浏览器从打开某个网站的一个页面开始，中间可能打开很多个页面，直到关闭浏览器，整个过程称为浏览器与`WEB`服务器的一次会话。

作用：在同一个会话中所有的页面之间共享的数据，例如登录用户名/登录用户编号（通常存编号，否则中文用户名可能导致错误）。

|操作|API|
|-|-|
|存数据| `sessionStorage[key] = val;`|
| | `sessionStorage.setItem(key, val);`|
|读取数据| `let val = sessionStorage[key];`|
| | `let val = sessionStorage.getItem(key);`|
|清除指定数据| `sessionStorage.removeItem(key);`|
|清空所有数据| `sessionStorage.clear();`|
|数据个数| `let len = sessionStorage.length;`|
|获取第`i`个`key`| `let key = sessionStorage.key[i];`|

### window.localStorage

本地存储对象，跨会话级存储。在浏览器能管理外存（磁盘），可在其中存储用户数据，可供此次会话及后续会话的页面共同使用；即使浏览器关闭了，也不会消失，永久存在。

作用：存储用户样式风格（比如`qq`空间）

|操作           |API|
|-              |-      |
|存数据         | `localStorage[key] = val;`|
|               | `localStorage.setItem(key, val);`|
|读取数据       | `let val = localStorage[key];`|
|               | `let val = localStorage.getItem(key);`|
|清除指定数据   | `localStorage.removeItem(key);`|
|清空所有数据   | `localStorage.clear();`|
|数据个数       | `let len = localStorage.length;`|
|获取第i个key   | `let key = localStorage.key[i];`|

`localStorage`中若数据发生了修改，会触发事件`window.onstorage`，可以监听事件，可以监视`localStorage`数据改变（注意`sessionStorage`没有此功能；`chrome`浏览器中，该事件只能被其他页面触发，不能被当前页面触发）。

# 十、WebSocket

## http协议

`HTTP`协议，属于“请求-响应”模型，只有客户端发起请求消息，服务器才会返回响应消息，没有请求就没有响应，一个请求也只能 得到一个响应；这在有些场景下很不方便（如实时走势应用）。

解决方案：长轮询（`Long-Polling`）/心跳请求，定时器+`ajax`，请求太频繁，服务器压力大，不够频繁，客户端数据延迟太大。

## WebSocket协议

`WebSocket`，作为`HTTP`的补充，属于“广播-收听”模型，客户端连接到就不再断开，持续连接，双方随时向对方发送消息，且是全双工、不对等发送。

`ws`协议分为客户端和服务器端程序。客户端应用主动发起连接请求，保持连接，向对方发送消息，并接收消息。客户端可以是`php`、`java`、`nodejs`、`html5`。

## 使用H5创建ws协议客户端应用

- 连接`ws`服务器
- 向服务器发送消息
- 接收服务器发来的消息
- 断开到`ws`服务器的连接（可选）

```javascript
let socket = new WebSocket('ws://127.0.0.1:9001');
socket.send(msg);
socket.onmessage = function(e){
    console.log(e.data);
}
socket.close();
```

