---
layout: article
title: java 集合框架
categories: [java]
tags: [javase]
---

# 概述

## 概念
集合是对象存储的容器，在`java.util`包中有相关的抽象类、接口和实现类。

## 集合体系
- Collection(接口)
    * List(接口)
        - ArrayList(类)
        - LinkedList(类)
        - ...
    * Set(接口)
        - HashSet(类)
        - LinkedHashSet(类)
        - ...
    * ...

# Colletion接口

## 基本方法

|方法|解释|
|-|-|
|boolean `add`(E e) |添加(确保存在)某元素 |
|void `clear`()|清空元素 |
|boolean `contains`(Object o) |判断是否包含某元素 |
|boolean `remove`(Object o) |删除一个元素实例 |
|int `size`() |已存元素总数量 |
|Object[] `toArray`() |返回包含所有元素的数组 |
|Iterator<E> `iterator`() |获取集合的迭代器 |

## Iterable超接口
`JDK1.5`之后，`Collection`接口继承了`Iterable`接口（该接口在`java.lang`包中）,上述`Collection`的基本方法中的`iterator`方法实际上在`Iterable`接口中就已经声明了。

另外，具有`Iterable`接口的对象都可以使用`forEach`
循环（数组也实现了该接口），java中并没有`forEach`关键字，使用格式如下：

```java
for(T item : IterableObject){

}
```

# Iterator接口
迭代器，为java的集合框架提供一种通用的枚举方式。

|方法|解释|
|-|-|
|boolean `hasNext`() |是否还有下一个迭代元素 |
|E `next`() |获取下一个迭代元素 |

# 泛型（Generic）
泛型，即“参数化类型”。类似于方法中的变量参数，数据类型（类）也可定义成有参形式，然后在使用时传入具体的类型。泛型提供了编译时类型安全检测机制，该机制允许在编译时检测到非法的类型。

java的泛型是伪泛型，只是编译的手段；编译后的`class`文件中是没有泛型的任何信息的。

## 泛型方法
格式：`修饰符 <T> 返回值类型 方法名(引用T的类型 方法参数)`

- `<>`内为类型参数声明部分，放在修饰符之后，返回值类型之前
- 每一个类型参数声明部分包含一个或多个类型参数，参数间用逗号隔开。一个泛型参数，也被称为一个类型变量，是用于指定一个泛型类型名称的标识符
- 类型参数能被用来声明返回值类型，并且能作为泛型方法得到的实际参数类型的占位符
- 泛型方法体的声明和其他方法一样。注意类型参数只能代表引用型类型，不能是原始类型（像int,double,char的等）

## 泛型的限定
可以对类型参数声明中的类型参数做范围限定
- `<? extends A>`，上限限定，必须是A或A的子类/实现对象
- `<? super A>`，下限限定，A或A的父类对象

## 泛型类
类型参数声明部分放在类名后边

## 泛型继承
以泛型接口接口为例

- 固定下泛型的类型
    ```java
    public interface A<E>{}
    public class B implements A<String>{}
    ```
- 保留泛型
    ```java
    public interface A<E>{}
    public class B<E> implements A<E>{}
    ```

## 泛型通配符
`?`可用替代具体的类型参数，可免去类型参数声明部分

## 优点
- 避免类型强转，更加安全
- 将错误由运行时提前到编译时

