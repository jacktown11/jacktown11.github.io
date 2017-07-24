---
layout: article
title: word/excel
categories: others all
tag_name: others
backurl: others.html
---
>begin: 20170702  
>version: 20170724

1. 为什么我的WORD中复制,粘贴的快捷键用不了CTRL+C,CTRL+V不管用了。  

不知道你是在什么情况下出现的问题？我出现问题时因为在跟mathtype 关联的时候出现的！这个主要是关联的时候，解决方法:
在MathType 后，找到下面的两个文件:
<Mathtype 安装路径>\MathPage\MathPage.wll
<Mathtype 安装路径>\Office Support\(32/64)\MathType Commands 6 For Word.dotm
把它们复制到下面的目录中：
<Office 安装路径>\Office14\STARTUP\
而非  Commands 6 For Word.doc     切记切记！！ 
From: [知道链接](https://zhidao.baidu.com/question/448814288.html)
