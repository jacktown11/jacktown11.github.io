---
layout: article
title: css 垂直居中
categories: [前端]
tags: [css]
issueNum: 45
---

# 前言

本文着重参考[vertical-center](https://github.com/yanhaijing/vertical-center)，总结常用的在父级元素中让子级元素垂直居中的解决方案，父级和子级是否要定高使用 `(父级定高否, 子级定高否)` 方式来标注，定高的元素使用 `size` 类名指定高度。所有案例可以[在线查看](https://jacktown11.github.io/practice/css-vertical-align/index.html)，每个案例的大致 html 结构（可能有些许变化）和公用的 css 如下：

```html
<style>
  body {
    margin: 20px;
  }

  p {
    margin: auto;
  }

  .wp {
    margin-top: 20px;
    border: 4px solid #f08;
  }

  .box {
    background: #23272a;
    color: #fff;
  }

  .wp.size {
    height: 160px;
  }

  .box.size {
    height: 100px;
  }
</style>
<div class="wp size wp1">
    <div class="box size box1"> content content content content content content content content content content content
      content content content content content content content
      content content content content content content content content content content content
      content content content content content content content content content content content content
      content content content content content content content content content content content conten tcontent content
      content content content
      content</div>
    <p>more more more ...</p>
    <p>more more more ...</p>
    <p>more more more ...</p>
    <p>more more more ...</p>
    <p>more more more ...</p>
    <p>more more more ...</p>
    <p>more more more ...</p>
    <p>more more more ...</p>
    <p>more more more ...</p>
  </div>
```

# (不定，定) absolute + 负margin 

这种方式让子级绝对定位，相对父级偏移50%，然后设置负的margin-top，这个负值是子级的高度的一半（不能使用百分比，因此需要知道子级的高度）。

```css
.wp1 {
  position: relative;
}

.box1 {
  position: absolute;
  top: 50%;
  margin-top: -50px;
}
```

# (不定，定) absolute + auto-margin 

将 margin 设置为 auto ，不仅能用于实现宽度确定的、普通流中的水平居中，也可用于高度确定的、绝对定位中用于垂直居中。

```css
.wp2 {
  position: relative;
}

.box2 {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}
```

# (不定，定) absolute + calc 

在浏览器支持的情况下，可以用 css3 的计算属性 calc 整合负的 margin 值，简化书写。

```css
.wp3 {
  position: relative;
}

.box3 {
  position: absolute;
  top: calc(50% - 50px);
}
```

# (定，不定) line-height + vertical-align 

如果父级高度确定，line-height 与高度设为一致不仅可以用于单行文本的垂直居中，也可用于子级元素；这时需要配合子级的 vertical-align 属性设置为 middle，同时子级需要修复一下字体大小和行高。（由于 IE7- 的 `display: inline-block;` 对块级元素不支持，如果需要兼容的话，子级元素必须是行内元素）

```css
.wp4 {
  line-height: 160px;
  font-size: 0;
}

.box4 {
  display: inline-block;
  vertical-align: middle;
  line-height: 1.2;
  font-size: 16px;
}
```

# (不定，不定 ) absolute + transform 

如果子级的高度不定，那么没有办法使用绝对定位配合负 margin 了，而 css3 的 transform 就很方便，因为其中的百分比是相对于子级的高度的。

```css
.wp5 {
  position: relative;
}

.box5 {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

# (不定，不定) css-table 

这种方式非常简单，兼容性也好；常见的一个应用场景是将一个段落的多行文本垂直居中，此时这种方式就非常方便。

```css
.wp6 {
  display: table-cell;
  vertical-align: middle;
}
.box6{
  display: inline-block;
}
```

# (不定，不定) flex 

这种方式比较新，但是非常强大；在移动端很常用。

```css
.wp7 {
  display: flex;
  align-items: center;
}
```

# 更多方案

- table 布局，这不符合规范，而且很麻烦，虽然兼容性很好
- writing-mode，有点另类、有点复杂
- grid，太新，兼容性不好

# 兼容性与选择建议

- PC端有兼容性要求，宽高固定，推荐absolute + 负margin
- PC端有兼容要求，宽高不固定，推荐css-table
- PC端无兼容性要求，推荐flex
- 移动端推荐使用flex（flex的兼容性决方案: [移动端flex布局实战](//yanhaijing.com/css/2016/08/21/flex-practice-on-mobile/)）

| 方法   | 居中元素定宽高固定 | PC兼容性 | 移动端兼容性 |
| ---------------------- | --------------- | ---------------------------- | --------------- |
| absolute + 负margin     | 是         | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| absolute + margin auto | 是         | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| absolute + calc        | 是         | ie9+, chrome19+, firefox4+   | 安卓4.4+, iOS6+   |
| absolute + transform   | 否         | ie9+, chrome4+, firefox3.5+  | 安卓3+, iOS6+     |
| lineheight             | 否         | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| css-table              | 否         | ie8+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| flex                   | 否         | ie10+, chrome4+, firefox2+   | 安卓2.3+, iOS6+   |

# 更多参考文章

- [CSS实现水平垂直居中的1010种方式（史上最全）](https://juejin.im/post/5b9a4477f265da0ad82bf921#heading-7)
- [16种方法实现水平居中垂直居中](https://juejin.im/post/58f818bbb123db006233ab2a)
- [把简单做好也不简单-css水平垂直居中](https://juejin.im/post/5854e137128fe100698e6271)
- [CSS垂直居中的11种实现方式](https://www.cnblogs.com/zhouhuan/p/vertical_center.html)
