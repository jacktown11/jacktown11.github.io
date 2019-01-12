---
layout: article
title: fcc项目总结系列1：个人作品展示页面制作项目
categories: [前端]
tags: [项目总结]
issueNum: 10
---
## 导言
近两天勉强完成了free code camp的[portfolio](https://codepen.io/jacktown/full/eRrYyJ/)项目（[题目地址](https://freecodecamp.cn/challenges/build-a-personal-portfolio-webpage)），自己原生写的，感觉不用框架确实挺麻烦（虽然我目前只接触过一点点bootstrap，但是感觉用起来应该会节省非常多代码），而且做出来的东西我估计在移动端就不能看了。不过做这个项目过程中还是感觉颇有收获。
## 主要技术点
### 1.表单label动态隐藏/显示
通过对表单项`focus`和`blur`事件监听，修改相应label项的样式（颜色、可见性、相对定位位置），特别是label项的显示并不是以`focus`的触发为标准，而是要检测表单项中是否有有效字符输入，这一点通过利用超时调用模仿间歇调用，不断查询表单项的value值，来确定是否显示label。
### 2.点击导航栏链接时，渐变地改变页面滚动位置
在此过程中需要动态地获取和设置整个页面滚动条的位置，为此定义了两个函数，可以在跨浏览器条件下获取和设置页面相对视口滚动的高度（scrollTop）:
```
function getDocScrollTop(){
  return Number(document.documentElement.scrollTop 
  || window.pageYOffset 
  || document.body.scrollTop);
}
function setDocScrollTop(height){
  document.documentElement.scrollTop = height;
  if(getDocScrollTop() !== height){
    // unsucceed
    document.body.scrollTop = height;
    if(getDocScrollTop() !== height){
      // unsucceed yet
      if(window.pageYOffset){
        window.pageYOffset = height;
      }
    }
  }
}
```
另外我们要做的就是获取链接目标元素在页面中的位置，可以利用如下的函数实现：
```javascript
function getOffsetTop(ele){
  //get element(ele)'s position from the start of the document
  var top = 0;
  do{
    top += ele.offsetTop;
    ele = ele.offsetParent;
  }while(ele !== null);
  return top;
}
```
定义好这些函数以后，我们只需要监听导航栏中各个链接的`click`事件，事件触发时，先取消其默认操作，然后将整个页面的滚动高度（`scrollTop`）渐变地修改到等于链接目标在页面中位置高度。
### 3.根据页面滚动位置，动态修改导航栏链接的样式
这一点和上面一个技术点有点反向操作的意味，我们需要检测页面滚动高度，检测出当前是哪一个区块在视窗内（比较页面的scrollTop和各区块元素位置（调用getOffsetTop()），然后让导航栏中与这个区域对应的那个链接突出显示。页面的滚动我们检测鼠标滚动，普遍支持的是`mousewheel`事件（firefox不支持），实际上这个事件不是标准事件，标准是[wheel](https://developer.mozilla.org/en-US/docs/Web/Events/wheel)事件（高版本firefox将其实现了），为了兼容老版本firefox，可以检测`DOMMouseWheel`事件（我没有在老版本测试验证）。如此，各个浏览器能较好兼容。
```javascript
  document.onmousewheel = handleScroll;
  document.onDOMMouseWheel = handleScroll;//for lower edition ff
  document.onwheel = handleScroll;//for lower edition ff
```
### 4.twitter,linkedin等外链图标
通过引入font-awesome字体：
```html
<link rel="stylesheet" 
href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">  
```
## bugs
### 一直不能完成加载
通过移出脚本后测试、注释主函数调用后测试、注释代码行后测试逐步确定问题的位置，最后发现是代码中出现了无限循环。
## 项目github地址
[https://github.com/jacktown11/fcc/tree/master/Build_a_Personal_Portfolio_Webpage0](https://github.com/jacktown11/fcc/tree/master/Build_a_Personal_Portfolio_Webpage0)