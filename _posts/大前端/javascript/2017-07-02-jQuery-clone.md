---
layout: article
title: jQuery clone()方法一个注意点
categories: [大前端]
tags: [框架与库, jQuery]
---

用jQuery clone()方法可以赋值一个节点，但是如果这个节点带有id属性，那么可能导致该id在同一个页面中被重复使用。比如我们在head>script:nth-of-type(3)中代码的最后一行复制了#target5元素。
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>test</title>
  <link rel="stylesheet" 
 href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.css">
  <script src="program.js"></script>
  <script src="http://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
  <script>
    $(document).ready(function() {
      $("#target1").css("color", "red");
      $("#target1").prop("disabled", true);
      $("#target4").remove();
      $("#target2").appendTo("#right-well");
      $("#target5").clone().appendTo("#left-well");
    });
  </script>

</head>
<body>
<!-- 请只修改这条注释以上的代码 -->

  <div class="container-fluid">
    <h3 class="text-primary text-center">jQuery Playground</h3>
    <div class="row">
      <div class="col-xs-6">
        <h4>#left-well</h4>
        <div class="well" id="left-well">
          <button class="btn btn-default target" id="target1">#target1</button>
          <button class="btn btn-default target" id="target2">#target2</button>
          <button class="btn btn-default target" id="target3">#target3</button>
        </div>
      </div>
      <div class="col-xs-6">
        <h4>#right-well</h4>
        <div class="well" id="right-well">
          <button class="btn btn-default target" id="target4">#target4</button>
          <button class="btn btn-default target" id="target5">#target5</button>
          <button class="btn btn-default target" id="target6">#target6</button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```
结果发现出现了两个id为`target5`的元素，这一点需要注意。
![使用clone()方法后的部分html](http://upload-images.jianshu.io/upload_images/6321648-20e3ea14087b89b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)