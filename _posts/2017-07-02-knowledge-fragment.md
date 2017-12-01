---
layout: article
title: 知识片段
categories: [abc,all]
tags: [abc]
---
### 1. 输入时字母间距突然变大
**解决方法：**1)Shift+Space;2)调整输入法半全角
### 2. 浏览器页面刷新
**解决方法：**有时F5刷新浏览器页面时，浏览器可能只会利用缓存重新加载，却不会向服务器重新请求有效数据；刷新方式有三种：
1)正常重新加载 Ctrl+R
2)硬性重新加载 Ctrl+Shift+R
3)清空缓存并硬性重新加载
按F12打开调试模式，右键工具栏的刷新按钮会出现。
### 3. 软件发布格式
软件的发布格式主要有四种：binary file、compact file、image file、source code四种，（二进制格式、压缩文件包、镜像、源代码），Windows Binary 就是指可以在Windows平台下运行的程序发布格式，可能可以直接运行，也可能需要安装，或者可能需要其他运行库（MFC、MSVCP、msi等），一般还要对Windows平台作具体要求说明（9x、2000、xp、server、directX、dotNetwork、IE、MediaPlayer等）