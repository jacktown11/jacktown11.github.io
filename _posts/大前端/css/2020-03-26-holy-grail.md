---
layout: article
title: 圣杯与双飞翼布局
categories: [大前端, css]
tags: [经典布局]

---

# 问题引入

所谓圣杯布局，基本要求是：

- 页面分为：固定高度的头部、固定高度的底部、自适应内容的中间区域
- 中间区域水平三栏布局
- 三栏之中，两侧固定宽度，中间栏自适应，中间区域总高度为为三栏之中最高者的高度

可参看文章 [In Search of the Holy Grail](https://alistapart.com/article/holygrail/) 。双飞翼布局是对圣杯布局的一种实现方式，本文还给出了 `flex` 的实现方式。文中所有示例可以[到这里在线查看效果](http://localhost/practice/holy-grid-layout/index.html)。

# 圣杯布局的实现

直接上代码：

```html
<body>
  <div class="header">.header</div>
  <div class="container">
    <div class="center column"></div>
    <div class="left column">.left</div>
    <div class="right column">.right</div>
  </div>
  <div class="footer">.footer</div>
</body>
```

```css
body {
  min-width: 550px;
}
.header,
.footer {
  background-color: #369;
  height: 60px;
}
.footer {
  /* clear: both; */
}
.container {
  padding-left: 200px;
  padding-right: 150px;
  overflow: hidden;
}
.column {
  float: left;
  padding-bottom: 2000px;
  margin-bottom: -2000px;
}
.center {
  width: 100%;
  background-color: #ccc;
}
.left {
  width: 200px;
  margin-left: -100%;
  position: relative;
  left: -200px;
  background-color: rgb(120, 187, 223);
}
.right {
  width: 150px;
  margin-right: -150px;
  background-color: rgb(255, 102, 51);
}
```

其思路如下：

- 顶部和底部直接给定固定高度就可以
- 中间区域以 `div.container` 包裹, 该容器通过左右 `padding` 为左右侧边栏预留位置，`overflow: hidden` 同时实现了清楚浮动和隐藏超出部分的内容的功能
- 中间区域三栏全部左浮动
- `.center` 取包裹容器全部宽度，实现了自适应
- `.left`，取 `margin-left: -100%;` 使得其浮动结果和 `.center` 是相同的；然后再相对定位左偏移到目标位置
- `.right`，取 `margin-right: 150px;` 即可浮动到目标位置
- 三栏全部加了大的下 `padding`，同时以相同负值的 `margin` 将盒子高度拉回来，这样，如果三栏有背景色，那么它们就再 `footer` 的位置实现了对齐
- 另外页面最小宽度，以免小屏错乱（`左右栏宽度+左栏相对定位前需要在中间区域占的宽度 = 200 + 150 + 200`）

# 双飞翼布局

该方式和圣杯布局很类似，主要区别在于，给三栏布局的中间栏又添加了一层嵌套，从而让 `.container` 不用负责左右边距，而交给 `center-wrap` 来处理，那么左右侧边栏就可以直接通过负外边距与浮动到达目标位置，而不再需要相对定位。额外带来的好处还包括可以容许更小的屏幕宽度而不引起样式错乱（理论上为 `左右侧边栏宽度和 = 200 + 150`）。

```html
<body>
  <div class="header">.header</div>
  <div class="container">
    <div class="center-wrap column">
      <div class="center"></div>
    </div>
    <div class="left column">.left</div>
    <div class="right column">.right</div>
  </div>
  <div class="footer">.footer</div>
</body>
```

```css
body {
  min-width: 500px;
}
.header,.footer{
  height: 60px;
  background-color: #369;
}
.container{
  overflow: hidden;
}
.column{
  float: left;
  padding-bottom: 2000px;
  margin-bottom: -2000px;
}
.center-wrap{
  width: 100%;
}
.center{
  margin-left: 200px;
  margin-right: 150px;
  background-color: #ccc;
}
.left{
  width: 200px;
  margin-left: -100%;
  background-color: rgb(120, 187, 223);
}
.right{
  width: 150px;
  margin-left: -150px;
  background-color: rgb(255, 102, 51);
}
```

# 使用 flex

flex 布局是一种较新的强大的布局方式，在移动端使用广泛。可以看到，这种方式及其简单方便。

```html
<body>
  <div class="header">.header</div>
  <div class="container">
    <div class="left">.left</div>
    <div class="center"></div>
    <div class="right">.right</div>
  </div>
  <div class="footer">.footer</div>
</body>
```

```css
body{
  min-width: 500px;
}
.header, .footer{
  height: 60px;
  background-color: #369;
}
.container{
  display: flex;
}
.left{
  width: 200px;
  background-color: rgb(120, 187, 223);
}
.right{
  width: 150px;
  background-color:rgb(255, 102, 51);
}
.center{
  flex: 1;
  background-color: #ccc;
}
```

# 更多方式

前面的的圣杯布局和双飞翼布局中都使用了浮动的方式，不过其中给负 `margin` 的方式，虽然很巧妙，却不直观易懂，反正孤陋的笔者以前没这么用过:(。为了省去浮动的麻烦，可以考虑采用绝对定位来代替。

# 参考

- [In Search of the Holy Grail](https://alistapart.com/article/holygrail/)
- [圣杯布局和双飞翼布局的理解与思考](https://www.jianshu.com/p/81ef7e7094e8)


