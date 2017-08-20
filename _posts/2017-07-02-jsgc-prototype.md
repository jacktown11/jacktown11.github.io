---
layout: article
title: 《javascript高级程序设计》对象创建与继承 总结笔记
categories: js all
tag_name: js
backurl: js.html
---
>begin: 20170702  
>version: 20170724

# 1. 创建对象
# 2. 继承
## 1)原型链
**将超类型实例直接作为子类型的原型对象**
- **优点**
子类型实例可以在原型链中找到所有超类型的属性和方法。
- **缺陷**
  + 超类型包含引用类型值属性时，会出现问题
  + 子类型实例无法独立向超类型构造函数传递参数

## 2)借用构造函数
**在子类型构造函数内部，将this（调用子类型构造函数时它指代子类型实例）作为环境对象用call方法调用超类型构造函数。**
- **优点**
属性都被定义在实例中，可以向超类型构造函数传递参数
- **缺陷**
  + 不能实现函数复用
  + 超类型原型中的方法对子类型实例不可见，结果所有引用类型都只能使用构造函数模式来创建

## 3)组合继承
**借用构造函数让超类型属性直接定义在子类型实例中；用原型链继承超类型的方法。**
- **优点**
结合了原型链和借用构造函数的优点
- **缺陷**
超类型构造函数被两次调用，子类型实例的原型中同时含有超类型的属性

## 4)原型式继承
**定义一个对象创建函数，将基础对象传入，函数内部创建一个新对象，该新对象以传入的基础对象为原型对象。**
- **优点**
基于对象而不是基于构造函数建立新对象

## 5)寄生式继承
**借鉴原型式继承的思路，定义一个对象创建函数，函数接收一个基础对象，基于它创建一个新对象（比如利用原型式继承来创建），然后对新对象增强后返回。**
- **优点**
基于对象创建功能增强的新对象

## 6)寄生组合式继承
**对组合式继承加以改进：基于超类型的原型对象，利用寄生式继承创建一个新对象，用这个新对象代替超类型的实例作为子类型的原型对象。**
- **优点**
在组合式继承中，我们继承方法时实际上只需要超类型的原型对象，我们可以借用寄生继承；避免对超类型构造函数的二次调用，子类型实例中不再出现超类型属性。