---
layout: article
title: javase 常用API
categories: [java]
tags: [javase]
---

# Object
java中所有引用类型的父类，定义了一系列方法，如`equals`、`toString`、`hashCode`等，因此java所用的引用类型都有了这些方法。

## equals()方法
java源码中该方法的实现如下：
```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

根据这个实现，两个对象相等意味着他们必定是同一个对象（如果`equals`方法未被重写）。然而，java中可用这个方法来比较两个字符串是否相等，这说明`String`类一定重写过该方法，通过查看源码确实在`String`类找到了该方法的覆盖，如下所示：
```java
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}

```

上述代码首先进行了类型判断与显式转换，在传入参数确实是字符串的情况下，逐个字符进行比较。（上述代码中`value`是`String`对象内的私有`char`数组常量,储存了字符串的所有字符）。

### equals()方法官方约定
- 自反性
- 对称性
- 传递性
- 一致性
- 任何非空对象不和hull相等

以上约定说明了`equals()`方法上建立了的二元关系是等价关系。

重写`equals()`方法时通常需要重写`hashCode()`方法，以维护`hashCode()`方法的**对象相等时哈希值必相等的约定**。

## toString()方法
返回对象的字符串表示，通常是形如`类名+内存地址`，实际开发使用时通常要重写。

# String
`String`类实际字符内容都存储在一个字符数组常量`value`中，因此字符串创建后其内容是不可变的，如下源码所示：
```java
private final char value[];
```

## 对象创建

### 使用字面量
`String str = "xxx";`

### 使用构造函数

构造函数有重载

- `new String()`, 返回空字符串
- `new String("xxx")`, 返回参数字符串
- `new String(byte[] bytes)`, 将数组各元素根据平台默认字符编码表解码成字符，并返回合并后的字符串
- `new String(byte[] bytes, int offset, int len)`, 剪切版本
- `new String(char[] chars)`, 返回所有字符合并后的字符串
- `new String(char[] chars, int offset, int len)`, 剪切版本

## 常用方法

|方法|解释|
|-|-|
|int `length`()| 字符串长度|
|String `subString`(int beginIndex, int endIndex)|字符串截取[beginIndex, endIndex)|
|boolean `equals`(Object obj)| 字符串比较|
|boolean `equalsIgnoreCase`(Object o)|字符串比较（忽略大小写）|
|boolean `contains`(CharSequence cs)| 是否包含参数|
|int `indexOf`(String str)| 参数第一次出现的位置索引|
|char `charAt`(int index)| 某位置的字符|
|boolean `startsWith`(String str)| 是否以参数为前缀|
|boolean `endsWith`(String str)| 是否以参数为后缀|
|byte[] `getBytes`()| 转换成byte数组(使用平台默认字符编码表)|
|char[] `toCharArray`()| 转换成char数组|

# StringBuffer
一种线程安全的可变字符序列，和`String`相比，其用于存储内容的字符数组是可变长、可修改的。

## 常用方法
- StringBuffer `append`(CharSequence cs)
    * 添加字符序列
- StringBuffer `delete`(int start, int end)
    * 删除[start, end)部分字符
- StringBuffer `insert`(int dstOffset CharSequence cs)
    * 插入字符序列到目标位置
- StringBuffer `replace`(int start, int end, String)
    * 删除后插入
- StringBuffer `reverse`()
    * 翻转字符序列
- String `toString`()
    * 转换为字符串

## StringBuilder
一个线程不安全的类，但是速度更快，可能的情况下，优先使用`StringBuilder`。


# 包装类型

基本数据类型的包装类储存了一些与本数据类型相关的静态常量，通过构造方法可以将一个基本类型包装起来，包装类实例可以转换为基本类型和字符串；包装类还提供一些静态方法用于基本类型和字符串的相互转换。（下面以`int`和其包装类`Integer`为例）

|类型|基本类型关键字|包装类型|
|-|-|-|
| 字节型| byte| Byte|
| 短整型| short| Short|
| 整型| int| **Integer**|
| 长整型| long| Long|
| 字符型| char| **Character**|
| 布尔型| boolean| Boolean|
| 浮点型| float| Float|
| 双精度浮点型| double| Double|

## 常量
- `Integer.MAX_VALUE`，最大的`int`整型
- `Integer.MIN_VALUE`，最小的`int`整型

## 基本类型和包装类型的转换(构造器与实例方法)

### 包装
- `new Integer(int i)`
- `new Integer(String s)`

### 解包装
- `int intValue()`
- `String toString()`
- `static String toBinaryString(int i)`
- `static String toHexString(int i)`
- `static String toOctalString(int i)`

## 基本类型和字符串的转换(静态方法)

### 字符串解析
- `static int parseInt(String s)`
- `static int parseInt(String s, int radix)`，其中radix为进制

### 转换为字符串
- `基本类型+""`
- 调用包装类的静态方法
    * `static String toString(int i);`
    * `static String toString(int i, int radix);`，其中`radix`是进制
- 调用`String`的静态方法
    * `static String.valueOf(int i)`

## 自动装箱与拆箱

```java
Integer i = 1;
i = i + 1;
```

上面的代码是合法的，给引用类型`i`赋值时，传入了`int`基本类型，这时会自动装箱为引用类型；用`Integer`引用类型变量`i`进行数学运算，这时会进行自动拆箱；运算结果是基本类型，再赋值给`i`时又会自动装箱。

### 疑难解析

```java
Integer a = 38;
Integer b = 38;
System.out.println(a == b); //true
```

上面的自动装箱过程中由于38在`byte`范围内，此时重复出现的数字不会新建包装类，而是重复引用。相当于：

```java
Integer a = new Integer(38);
Integer b = a;
```

# System
- Long `currentTimeMillis`()
    * 获取当前时间（ms）
- static void `exit`(int status)
    * 终止当前正在运行的虚拟机（0为正常中止）
- static void `gc`()
    * 让java虚拟机运行垃圾收集器
- static Properties `getProperties`()
    * 获取当前操作系统的属性
- static void `arraycopy`(Object src,int srcPos,Object dest,int destPos,int length)
    * 复制数组，将src数组从srcPos起的length个元素赋值到dest数组的destPos位置(目标数组的原有元素会被覆盖)

# Math
提供了大量的静态工具方法，基本都有重载。

|方法名|作用|
|-|-|
|PI |圆周率常量 |
|abs|绝对值 |
|round |四舍五入 |
|floor |向下取整 |
|ceil |向上取整 |
|random |[0,1)随机数 |
|power |乘方|
|sqrt |开平方 |
|max |二者最大值 |
|min |二者最小值 |
|log |ln函数 |

# BigInteger
来自`java.math`包，用于不可变的任意精度的整数。

## 常用构造方法
- `BigInteger(String val)`
- `BigInteger(String val, int radix)`

另外还可以用静态方法`BigInteger.valueOf(long l)`将整型转为`BigInteger`对象。

## 运算

|方法|解释|
|-|-|
|BigInteger `add`(BigInteger b)|+|
|BigInteger `subtract`(BigInteger b)|-|
|BigInteger `multiply`(BigInteger b)|*|
|BigInteger `divide`(BigInteger b)|/|
|int `compareTo`(BigInteger b)|比较大小,返回-1，0，1|
|BigInteger `abs`(BigInteger b)|绝对值|
|boolean `equals`(BigInteger b)|相等判断|

# BigDecimal
来自`java.math`包，用于不可变的任意精度的浮点数。使用类似`BigInteger`。

需要注意的是小数的除法可能结果是无穷小数，所以通常需要给定精度，如下是除法的其中一个实现：

`BigDecimal divide(BigDecimal val, int scale, int roundMode)`

其中`scale`是小数精度位数，`roundMode`是舍入模式，`BigInteger`中提供了舍入模式的静态常量，如`BigInteger.ROUND_CEILING`表示向上截取。

# Arrays
来自`java.util`包，提供大量数组操作的静态工具方法，这些方法大多都有重载。
- `sort`，升序排序
- `binarySearch`，二分查找，无法找到的话，返回`-插入点索引-1`
- `toString`，数组字符串

# 正则表达式
`java.util.regex`包提供了`Matcher`和`Pattern`两个类。

## Pattern

### 静态compile()方法

```java
static Pattern compile(String regex);
static Pattern compile(String regex, int flags);
```

这是一个静态方法,可根据模式字符串返回正则表达式。

### matcher()方法

```java
Matcher matcher(CharSequence input);
```
用一个`Pattern`实例对象调用该方法，可以获得一个`Matcher`对象

## Matcher


## String对象中的正则表达式方法

|方法|解释|
|-|-|
|boolean `matches`(String regex)|模式匹配检查|
|String[] `split`(String regex)|字符串分割|
|String `replaceAll`(String regex, String replacement)|按照规则替换字符串|

# 日期

## java.util.Date

### 构造方法

- Date(), 以当前时间创建Date对象
- Date(long date), 根据毫秒值参数创建Date对象

### 实例方法

- long `getTime`(), 返回毫秒值
- void `setTime`(), 设置毫秒值

## java.text.SimpleDateFormat

继承自`DateFormat`抽象类，用于格式化日期

### 构造方法
- SimpleDateFormat(String datePatternStr), 参数是日期格式模式字符串，例如“yyyy-MM-dd”.
- 常用日期和时间模式
    * y  年  
    * M  年中的月份  
    * d  月份中的天数 
    * H  一天中的小时数（0-23） 
    * m  小时中的分钟数 
    * s  分钟中的秒数 
    * S  毫秒数 

### 实例方法
- String `format`(Date date), 根据格式输出参数日期的格式化字符串
- Date `parse`(String str), 根据格式将日期字符串转换成日期对象

## java.util.Calendar

不可通过`new`的方式产生对象实例，而是通过静态方法`getInstance()`

### 常用方法
- int `get`(int field), 获取日期某各个字段，`field`传入`Calendar`类的静态常量。
- void `set`(int field, int value), 设置日期某字段
- void `set`(int year, int month, int day), 一次性设置年月日
- void `add`(int field, int offset), 以字段为单位偏移
- Date `getTime()`, 转换成对应`Date`对象
- void `setTime`(Date date), 用`Date`对象设置日历

### 注意
- 西方星期的开始为周日，中国为周一。
- 在Calendar类中，月份的表示是以0-11代表1-12月。
- 日期是有大小关系的，时间靠后，时间越大。
