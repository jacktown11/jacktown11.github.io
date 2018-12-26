---
layout: article
title: fcc项目总结系列1：个人作品展示页面制作项目源码阅读
categories: [前端]
tags: [项目总结]
---
该文起源于一个fcc项目（[个人作品展示页面制作](https://freecodecamp.cn/challenges/build-a-personal-portfolio-webpage)），之前写过一篇（[fcc portfolio项目总结](http://www.jianshu.com/p/f7fa57cd1189)），是自己独立搭建这个页面的总结；而本文是阅读其示例项目的源代码的总结。

# 1.外部文件
- bootstrap3.3.5(css)
- font-awesome4.4.0(css)  (以使用font awesome图标)
- bootstrap3.3.5(js)
- jquery2.1.3(js)
- jquery-easing(js)插件，用于扩展jquery动画可用的缓动函数选项
**插件概述**，$.animate()方法在使用时，可以指定以easing字符串参数，以指定缓动函数，如jquery默认参数是的是`'wing'`，直接可有的还有`'linear'`等，该插件扩展了一些可选的缓动函数，只需以字符串形式指定它们的名字即可如：`'easeInCubic'`、`'easeOutExpo'`等。

# 2.css
## 弹性盒子
css中用到了弹性盒子，解读如下：
- 在父元素上引用`display:flex;`，为了兼容之前还有两条规则`display:-webkit-box;`、`display:-ms-flexbox;`；这样父元素的空间就可以被子元素分配了；
- `flex-flow:row wrap;`水平显示，必要时拆行；
- `-ms-flex-pack:distribute;`、`justify-content:around;`，空白部分在所有子元素间平均分配；
- `-webkit-box-align: start;`、`-ms-flex-align: start;`、`align-items:flex-start;`，纵轴起始边界对齐；

该属性兼容性不高，上述考虑了兼容的规则ie9中都不行。  
**相关文章**：
- [flexbox-CSS3弹性盒模型flexbox布局完整版教程](http://caibaojian.com/flexbox-guide.html)
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/?utm_source=caibaojian.com)

## font awesome
常规用法，在html中使用`i`标签，添加相应的类，例如
```
<i class="fa fa-align-justify"></i>
```
另外一种方式是在css中用unicode编码生成：
```css
.icon:before{
    content: '\f039';
    font-family: FontAwesome;
}
```
各图标对应的unicode编码可以在官网查到。
# 3.javascript
## 尺寸与位置
js文件中大量用到了元素的各种尺寸属性，在此做一个总结：

|属性|含义|
|-|-|
|offsetHeight offsetWidth|描述元素外尺寸，元素内容+内边距+边框，不包括外边距和滚动条|
|offsetLeft offsetTop|描述元素的左上角（边框的外边缘）与已定位的父容器（offsetParent对象——元素最近的定位为relative或absolute的祖先元素，若没有则返回null）左上角的距离|
|clientWidth clientHeight|描述元素内尺寸，元素内容+内边距，不包括边框（IE下实际包括）、外边距、滚动条。滚动条占据父元素的内容区+padding空间。|
|scrollWidth scrollHeight|元素内容+内边距+溢出尺寸，当内容没有溢出时，scrollWidth和scrollHeight一般分别与clientWidth和clientHeight相等，但实际上不同浏览器有不同处理，它们未必相等。|
|scrollLeft scrollTop|描述元素滚动条的位置，可写|
|**jquery方法**|
|.width() .height()|获取元素的计算样式宽高，不论采用哪种盒模型，只表示内容区宽度；$( window ).width();获取浏览器视口宽度，$( document ).width();获取页面宽度|
|.offset()|获取元素（不含外边距）相对于页面的偏移量对象（其中有left,top属性）|
|.position()|获取元素（不含外边距）相对于已定位父容器的偏移量对象（其中有left,top属性）|
|**应用**|
|window.innerWidth window.innerHeight|浏览器视口宽高，包括滚动条，css媒体查询（如min-width）依据的是此分辨率而不是屏幕分辨率|
|window.screen.width window.screen.height|屏幕宽高分辨率|
|$(window).width() $(window).height()|浏览器视口宽高，不包括滚动条|
|document.body.offsetHeight document.body.offsetHeight|页面总高度，body元素margin应该对其有影响|
|window.pageXOffset window.pageYOffset|pageXOffset 和 pageYOffset 属性返回文档在窗口左上角水平和垂直方向滚动的像素,ie8-可以用document.documentElement.scrollLeft 和 document.documentElement.scrollTop 属性替代|

- **获取浏览器视口宽高**  
视口高度: 
```
window.innerHeight || 
document.documentElement.clientWidth || 
document.body.clientWidth
```
视口宽度: 
```
window.innerHeight || 
document.documentElement.clientHeight || 
document.body.clientHeight
```
(对于运行在混杂模式下IE，用document.body代替document.documentElement，可参看《js高程》相关代码)
- **获取基于视口的最小高度的文档总宽高**  
文档总高度: 
```
Math.max(document.documentElement.scrollHeight || 
    document.documentElement.clientHeight)
```
文档总宽度:
```
Math.max(document.documentElement.scrollWidth || 
    document.documentElement.clientWidth)
```
(混杂模式下IE，还要用document.body代替document.documentElement，可参看《js高程》相关代码)
- **获取文档滚动宽高量**

```javascript
//from MDN
var x = (window.pageXOffset !== undefined)
  ? window.pageXOffset
  : (document.documentElement || 
    document.body.parentNode || 
    document.body).scrollLeft;

var y = (window.pageYOffset !== undefined)
  ? window.pageYOffset
  : (document.documentElement || 
    document.body.parentNode || 
    document.body).scrollTop;
```

来自[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollX)
## 事件相关
### .on()
jquery的.on()方法在把同个函数绑定到多个不同事件时，可以合并写，如：
```javascript
$('body')
  .on('input propertychange','.form-item',function(event){
    //这里采用jquery实现了多事件绑定，
    //等效于分别绑定到同一个函数
    //propertychange事件用于低版本ie（8-）兼容
    $(this).toggleClass('form-item-filled',!!$(event.target).val());
  })
```
另外，利用该方法进行事件委托时，第二个参数是选择符，只有在事件冒泡过程中的元素中，存在**满足选择符**同时是被委托元素的**后代**的元素，就会触发事件（并不一定需要event.target符合选择符）。
### input和propertychange事件
`input`事件在` input` 或 `textarea `元素的值发生改变时触发。该事件类似于[onchange](https://www.w3cschool.cn/jsref/jsref-event-onchange.html) 事件。不同之处在于 oninput 事件在元素值发生变化是立即触发， onchange 在元素失去焦点时触发。另外一点不同是 onchange 事件也可以作用于 `keygen`和 `select` 元素.

propertychange事件则用用兼容低版本IE.
### 几个jquery函数

|函数|说明|
|-|-|
|.stop|停止当前动画|
|.offset()|获取元素相对于页面偏移量|  

### bootstrap插件函数

|函数|说明|
|-|-|
|.collapse('hide')|隐藏元素可折叠元素，来自collapse插件|
|.scrollspy()|在被监听元素（常常是`body`）上调用该方法，参数指定使用需要跟随被激活的链接的位置，来自scrollspy插件|  
