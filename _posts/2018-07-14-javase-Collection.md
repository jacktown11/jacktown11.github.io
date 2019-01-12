---
layout: article
title: javase 集合框架
categories: [java]
tags: [javase]
issueNum: 28
---

# 集合框架概述

## 概念
集合是对象存储的容器，在`java.util`包中有相关的抽象类、接口和实现类。

## 集合体系
- Collection（接口）
    * List（接口）
        - ArrayList（类）
        - LinkedList（类）
        - ...
    * Set（接口）
        - HashSet（类）
        - LinkedHashSet（类）
        - ...
    * ...
- Map（接口）
    * HashMap（类）
        - LinkedHashMap（类）
        - ...
    * Hashtable（类）
        - Properties（类）
        - ...
    * ...

## 常见数据结构

### 堆栈
- 先进后出
- 存数据：压栈
- 取数据：弹栈

### 队列
- 先进先出

### 数组
- 查找速度快（通过索引）
- 增删元素慢（需要创建新数组）

### 链表
- 后一个元素的位置被前一个元素所存储
- 查找慢
- 增删快

### 哈希表（Hash Table）
链表数组结合体，每一个元素都映射到一个确定的哈希值，同一个哈希值的元素放在同一个链表中，各个哈希值放在数组中

#### 哈希值的计算
java的Object对象声明了`int hashCode()`方法，这表示每一个java中的对象都可以调用该方法的某种特定实现计算出一个哈希值。

java语言官方约定：

- 同一个对象，多次调用hashCode()，必须返回一个相同的确定值
- 两个对象，如果调用equals()方法返回true,那么他们的hashCode()返回值应该相同
- 两个对象，如果其hashCode()方法返回了相同值，不要求它们之间调用equals()方法返回true，但是为不同对象提供不同的hash值有利于提高性能

# Colletion接口及其实现类

## Collection接口

### 基本方法

|方法|解释|
|-|-|
|boolean `add`(E e) |添加(确保存在)某元素 |
|void `clear`()|清空元素 |
|boolean `contains`(Object o) |判断是否包含某元素 |
|boolean `remove`(Object o) |删除一个元素实例 |
|int `size`() |已存元素总数量 |
|Object[] `toArray`() |返回包含所有元素的数组 |
|Iterator&lt;E&gt; `iterator`() |获取集合的迭代器 |

### Iterable超接口
`JDK1.5`之后，`Collection`接口继承了`Iterable`接口（该接口在`java.lang`包中）,上述`Collection`的基本方法中的`iterator`方法实际上在`Iterable`接口中就已经声明了。

另外，具有`Iterable`接口的对象都可以使用`forEach`
循环（数组也实现了该接口），java中并没有`forEach`关键字，使用格式如下：

```java
for(T item : IterableObject){

}
```

## Iterator接口
迭代器，为java的集合框架提供一种通用的枚举方式。

### 方法

|方法|解释|
|-|-|
|boolean `hasNext`() |是否还有下一个迭代元素 |
|E `next`() |获取下一个迭代元素 |

### 并发修改异常
在迭代过程中，不应该修改正在迭代的集合（或数组），特别是不能修改其长度，否则会出现并发修改异常。

## 泛型（Generic）
泛型，即“参数化类型”。类似于方法中的变量参数，数据类型（类）也可定义成有参形式，然后在使用时传入具体的类型。泛型提供了编译时类型安全检测机制，该机制允许在编译时检测到非法的类型。

java的泛型是伪泛型，只是编译的手段；编译后的`class`文件中是没有泛型的任何信息的。

### 泛型方法
格式：`修饰符 <T> 返回值类型 方法名(引用T的类型 方法参数)`

- `<>`内为类型参数声明部分，放在修饰符之后，返回值类型之前
- 每一个类型参数声明部分包含一个或多个类型参数，参数间用逗号隔开。一个泛型参数，也被称为一个类型变量，是用于指定一个泛型类型名称的标识符
- 类型参数能被用来声明返回值类型，并且能作为泛型方法得到的实际参数类型的占位符
- 泛型方法体的声明和其他方法一样。注意类型参数只能代表引用型类型，不能是原始类型（像int,double,char的等）

### 泛型的限定
可以对类型参数声明中的类型参数做范围限定
- `<? extends A>`，上限限定，必须是A或A的子类/实现对象
- `<? super A>`，下限限定，A或A的父类对象

### 泛型类
类型参数声明部分放在类名后边

### 泛型继承
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

### 泛型通配符
`?`可用替代具体的类型参数，可免去类型参数声明部分

### 优点
- 避免类型强转，更加安全
- 将错误由运行时提前到编译时

## List接口
Collection的子接口

### 特点
- 有序
- 具有整数索引
- 可以储存重复元素

### 常用方法
- boolean `add`(int index, E e)，在指定索引位置插入元素
- E `set`(int index, E e)，覆盖指定索引位置为给定值，返回原来的值
- E `remove`(int index)，移出指定索引位置元素，返回移出的元素
- E `get`(int index)，获取指定索引位置的元素
- boolean `isEmpty`()，是否为空

## ArrayList类
- List的大小可变的数组的实现，此实现是不同步的（线程不安全）。
- 增删慢，查找快；由于日常开发中使用较多的是查询数据和遍历数据，因此该类型较常用。

## LinkedList类
- List链表实现（增删速度快，查找慢），线程不同步。
- 提供了大量操作首尾元素的方法

|方法 |解释|
|-|-|
|void `addFirst`(E e)|在头部插入元素|
|void `addLast`(E e) |在尾部插入元素 |
|E `getFirst`() |获取第一个元素 |
|E `getLast`() |获取最后一个元素 |
|E `removeFirst`() |移出第一个元素 |
|E `removeLast`() |移出最后一个元素 |
|E `pop`() |弹栈得到一个元素，相当于removeFirst |
|void `push`(E e) |将一个元素压栈，相当于addFirst |
|boolean `isEmpty`() |是否无元素判断 |

## Vector类
List中的子类，JDK中最早的集合，线程同步，现在的开发中多被ArrayList取代。

### 常见方法
- void addElement(E e)，添加元素
- E elementAt(int index)，返回指定元素处的组件
- Enumeration elements()，返回向量组件的枚举

### Enumeration
Enumeration是早期的迭代器
- boolean hasMoreElements()，是否还能继续枚举取出
- E nextElement()，枚举获取下一个元素

## Set接口
- 无序（存储与取出顺序不保证相同）
- 不允许重复
- 无整数索引，只能通过迭代器和增强for取出

Set的方法基本全是Collection的方法

## HashSet
- 实现了Set接口，由哈希表（实际是个HashMap实例）支持
- 不保证set的迭代顺序，允许使用null元素
- 存取比较快，线程不安全，允许速度快

### 存储过程
1. 获取元素的哈希值，查看hash值数组中是否有该哈希值；若没有，走步骤2，若有，走步骤3
2. 在hash值数组中新加一个hash值，并在其对应链表中存入第一个值
3. 用该元素调用equals()方法，传入各个同hash值的已有元素与之比较，如果都返回false，那么在该hash值对应链表中加入该元素；否则，放弃存入该元素

### LinkedHashSet类
具有可预知迭代顺序的`Set`接口的哈希表和链表实现，是`HashSet`的子类；线程不安全，运行速度快

### 重复元素的判断和ArrayList的比较
比如`ArrayList`的`contains()`、`HashSet`的`contains()`和`add()`方法都需要判断是否有相同元素

- ArrayList，直接依赖于equals()方法
- HashSet，依赖于hashCode()和equals()方法

# Map接口及其实现类

## Map接口

`Map`（将键映射到值的对象）中的集合称为双列集合，`Collection`中的集合称为单列集合。

`Map`集合中键名不能重复，键值没有关系，当键名是对象时，作为键名的对象通常要重写`hashCode()`和`equals()`。

### 常用方法

|方法 |解释 |
| - | - |
|V `put`(K key, V value) |放入一对键值，注意：返回的是同键名被覆盖之前的值，否则返回null |
|V `get`(K key) |通过键获取值，无该键返回null |
|V `remove`(K key) |移出给定键名的键值对，返回该键名对应的值，无键名返回null |
|int `size`() |返回已存储的键值对数目 |

### 遍历
`Map`本身没有实现`Iterable`接口，不能直接用`forEach`遍历，但可以借用两个实例方法间接遍历。

- `Set<E> keySet()`

    获取所有的键名，放入`Set`集合中，然后遍历`Set`集合，通过键名在`Map`中取值，从而实现`Map`的遍历
- `Set<Map.Entry<K, V>> entrySet()`

    `Entry<K,V>`是`Map`中的内部静态接口（因为`Map`抽象类中不可能实例化），用于代表映射关系对象

    该方法将每一个键值对以`Entry<K,V>`的形式存储，然后全部放入一个`Set`集合中，通过遍历`Set`集合可以获得这些`Entry<K,V>`，然后调用`getKey()`和`getValue()`可以获得键与值。

## Map的实现类

### 体系

- HashMap（类）
    * LinkedHashMap（类）
    * ...
- Hashtable（类）
    * Properties（类）
    * ...
- ...

### 注意

- `HashMap`和`LinkedHashMap`都是线程不安全的集合，其中`LinkedHashMap`是有序的。
- `Hashtable`是线程安全的，性能差，使用不多；而其子类`Properties`在`IO流`中应用较多
- `HashMap`运行存储`null`键与值，`Hashtable`则不行

# Collections工具类
`java.util`中除了有一个`Collection`接口，另一个`Collections`类，提供了大量静态方法，用于操作集合类对象。

## sort
`static <T extends Comparable<? super T>> void sort(List<T> list)`

对`List`集合的升序排序

## binarySearch
- `static <T> int binarySearch(List<? extends Comparable<? super T>> list, T key)`
- `static <T> int binarySearch(List<? extends T> list, T key, Comparator<? super T> c)`

`List`集合的二分查找

## shuffle
`static void shuffle(List<?> list)`

随机打乱

## reverse
`static void reverse(List<?> list)`

翻转


