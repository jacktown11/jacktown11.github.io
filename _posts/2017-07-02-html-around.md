---
layout: article
title: html相关
categories: abc all
tag_name: abc
backurl: abc.html
---
## 1. IE条件注释
#### 1.1 基本语法
```
<!-- [if (条件表达式)]>
  html元素
<![endif]-->
```
#### 1.2 条件表达式中的逻辑运算符
|运算符|示例|含义|
|-|-|-|
|!|[if !IE]|  NOT运算符.。被放置在要素、运算符或表达式之前，扭转表达式的布尔含义。|
|lt|[if lt IE 5.5]| 小于运算符。如果第一个参数小于第二个参数，返回true。|
|lte| [if lte IE 6]|  小于或等于运算符。如果第一个参数小于或等于第二个参数，返回true。|
|gt|  [if gt IE 5]| 大于运算符。如果第一个参数大于第二个参数，返回true。|
|gte| [if gte IE 7]|  大于或等于运算符。如果第一个参数大于或等于第二个参数，返回true。|
|( )| [if !(IE 7)]| 子表达式运算符。配合使用布尔运算符来创建更复杂的表达式。|
|&| [if (gt IE 5)&(lt IE 7)]| AND运算符。如果所有的子表达式的值为真，返回true。|
|单竖线| [if (IE 6)单竖线(IE 7)]| OR运算符。如果任何一个子表达式的计算结果为true，返回true。|
#### 1.3 示例
```html
<!--[if IE]><p>You are using Internet Explorer.</p><![endif]--> 
<![if !IE]><p>You are not using Internet Explorer.</p><![endif]> 

<!--[if IE 7]><p>Welcome to Internet Explorer 7!</p><![endif]--> 
<!--[if !(IE 7)]><p>You are not using version 7.</p><![endif]-->

<!--[if gte IE 7]><p>You are using IE 7 or greater.</p><![endif]--> 
<!--[if (IE 5)]><p>You are using IE 5 (any version).</p><![endif]--> 
<!--[if (gte IE 5.5)&(lt IE 7)]><p>You are using IE 5.5 or IE 6.</p><![endif]--> 
<!--[if lt IE 5.5]><p>Please upgrade your version of Internet Explorer.</p><![endif]-->

<!--[if true]>You are using an <em>uplevel</em> browser.<![endif]-->
<![if false]>You are using a <em>downlevel</em> browser.<![endif]>

<!--[if true]><![if IE 7]>
<p>This nested comment is displayed in IE 7.</p>
<![endif]><![endif]-->
```
From:[天堂的旋转木马](http://www.cnblogs.com/zhangjiehui/p/4262529.html)
## 2.