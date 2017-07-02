---
layout: article
title: 样式测试文章
categories: sundries all
tag_name: sundries
backurl: sundries.html
---
# 标题1
## 标题2
### 标题3
#### 标题4
##### 标题5
###### 标题6
# 各种格式
## 表格

| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机     | \$1600 |   5     |
| 手机        |   \$12   |   12   |
| 管线        |    \$1    |  234  |

## 列表
* 整理知识，学习笔记
* 发布日记，杂文，所见所想
* 撰写发布技术文稿（代码支持）
* 撰写发布学术论文（LaTeX 公式支持）

## 代码引用
这是行内`genTitleLink(clsName,href,c`代码引用；
以下是段落代码引用
```javascript
function genTitleLink(clsName,href,content){
    /*build a div containing a title link
    the div's class name is clsName,the link content is content, the link's href is #href */
    if(typeof clsName === "string" && typeof href === "string" && typeof content === "string"){
        var divEle = document.createElement("div"),
            aEle = document.createElement("a");
        aEle.appendChild(document.createTextNode(content));
        aEle.href = "#" + href;
        divEle.appendChild(aEle);
        divEle.className = clsName; 
        return divEle;      
    }else{
        return null;
    }
}
```
## 文本引用
> * 整理知识，学习笔记
> * 发布日记，杂文，所见所想
> * 撰写发布技术文稿（代码支持）
> * 撰写发布学术论文（LaTeX 公式支持）

## 文本格式
这是**黑体**，这是*斜体*；

这是脚注[^foot]，注意脚注标识符用汉字不行；

这是一个到[百度首页](http://www.baidu.com)的链接；

以下是张图片:
![图片标题](http://imgsrc.baidu.com/imgad/pic/item/caef76094b36acaf0accebde76d98d1001e99ce7.jpg)

# 这是一片测试混合格式效果的文章1
## 式效果quet et2
Ut non vehicula mi, faucibus dapibus quam. Donec ac nulla dui. Curabitur aliquet elementum ligula, nec vehicula arcu pretium a. Integer non cursus qu
## e式效果letum2 
### us.的工具3
 aliquam lobortis mauris sit amet rutrum. Nam consequat justo a mi tempus suscipit. Morbi consectetur pulvinar velit, vitae imperdiet erat luctus ac. Ut ut purus ex. Ut volutpat `sollicitudin ex`, eu aliquam lectus hen
```js
m lobortis mauris sit amet rutrum. Nam consequat just
o a mi tempus suscipit. Morbi conse
```
### 业的工具3 
Morbi consectetur pulvinar velit, vitae imperdiet erat luctus ac. Ut ut purus ex. Ut volutpat `sollicitudin ex`
- [ ] 支持以 PDF 格式导出文稿
- [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
- [x] 新增 Todo 列表功能
- [x] 修复 LaTex 公式渲染问题
- [x] 新增 LaTex 公式编号功能

, eu aliquam lectus hendrerit ut. Integer ac tortor et mi dictum porta. Donec viverra a ante et faucibus.的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，**Cmd Ma
### 业的工具。 3
am. Sed molestie tempor erat non fringilla. Sed faucibus ullamcorper suscipit. Mauris aliquam lobortis mauris sit amet rutrum. Nam consequat justo a mi tempus suscipit. Morbi consectetur pulvinar velit, vitae imperdiet erat luctus ac. Ut ut purus ex. Ut volutpat `sollicitudin ex`, eu aliquam lectus hendrerit ut. Integer ac tortor et mi dictum porta. Donec viverra a ante et faucibus.的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，**Cmd Markdown** 是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：
#### 段落4
c. Ut ut purus ex. Ut volutpat `sollicitudin ex`, eu aliquam lectus hendrerit ut. Integer ac tortor et mi dictum 
> 享知识提供更专业的工具。 您可以 享知识提供更专业的工具。 您可以sddddddsdfdddddd享知识提供更
可以 享知识提供更专业的工具。 您可sddddddsdfddddddddddddddddddd


porta. Donec viverra a ante et faucibus.的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，**Cmd 
##### 段落5
c. Ut ut purus ex. Ut volutpat `sollicitudin ex`, eu aliquam lectus hendrerit ut. Integer ac tortor et mi dictum porta. Donec viverra a ante et faucibus.的工具记录思想，整理

---
笔记、知识，并将其中承载的价值传播给他人，**Cmd 
###### 段落6
at `sollicitudin ex`, eu aliquam lectus hendrerit ut. Integer ac tortor et mi dictum porta. Donec viverra a ante et faucibus.的工具记录思想，整理笔记、知识，
- [ ] 支持以 PDF 格式导出文稿
- [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
- [x] 新增 Todo 列表功能
- [x] 修复 LaTex 公式渲染问题
- [x] 新增 LaTex 公式编号功能
at `sollicitudin ex`, eu aliquam lectus hendrerit ut. Integer ac tortor et mi dictum porta. Donec viverra a ante et faucibus.的工具记录思想，整理笔记、知识，

## 我们理解2
us suscipit. Morbi consectetur pulvinar velit, vitae imperdiet erat luctus ac. Ut ut purus 您需要更便捷更高效

# 这是一片测试混合格式效果的文章1
## 我们理解2
我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：
## 我们理解2
、知识，并将其中承载的价值传播给他人，**Cmd Markdown** 是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：
# 这是一片测试混合格式效果的文章1
的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，Cmd Markdown是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：的工具记录思想，整理笔记、知

识，并将其中承载的价值传播给他人，Cmd Markdown是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，Cmd Markdown是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，Cmd Markdown是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：