---
layout: article
title: javase Exception
categories: [后端]
tags: [java]
---

# 异常

java代码在运行时期发生的问题就是异常。在java中，把异常信息封装成了一个类。当出现了问题时，就会创建异常类对象并抛出异常相关的信息（如异常出现的位置、原因等）

## 异常的继承体系

`java.lang`包中提供了`Throwable`类，是java中所有的错误和异常的超类，其子类`Excepiton`用以表示异常，而`Error`表示错误。

- Throwable
    * Error
    * Exception
        - RuntimeException
            * NullPointerException
            * IndexOutOfBoundsException
                - ArrayIndexOutOfBoundsException
        - ...

### 错误与异常区别

- `Exception`发生在编译、运行期间，我们可以对在运行中对异常进行具体的处理；若不处理异常，程序将会结束运行。
- `Error`更严重，出现在运行期间，错误通常没有具体的处理方式，程序将会结束运行；`Error`错误的发生往往都是系统级别的问题，都是`jvm`所在系统发生的，并反馈给`jvm`的。我们无法针对处理，只能修正代码。错误必须要修改程序让错误不发生。

## 异常的创建过程

- 运行发生异常时，`JVM`创建异常对象抛出
- `JVM`查看该异常是否在当前方法内部是否被处理
- 如果未被处理，该异常会被抛出给方法的调用者，让调用者处理，如果调用者也不处理，则一直向上抛出到`main`
- 如果直到`main`方法该异常仍旧不能被处理，那么`JVM`会输出异常信息，并停止执行程序
- 抛出的异常未被处理前，后续代码都不会被执行（即使被处理，有的代码也可能不会被执行了）

## 抛出异常

- `throw`关键字用于抛出异常对象，异常对象中含有异常的相关信息。
-  `throws`关键字在方法声明上标记该方法可能抛出异常

例如

```java
public void go() throws Exception{
    throw new Exception("一个异常");
}
```

## 异常处理
```java
try{

}catch(ExceptionType1 e1){

}catch(ExceptionType2 e2){

}finally{

}
```
`finally`即使有异常也会被执行，在`io`读取中释放资源很常用

### 多catch细节
多个`catch`匹配是，一旦匹配成功，后边的`catch`一律忽略，匹配成功的`catch`执行完毕直接执行`finally`（如果有）。因此如果两种有继承关系的异常分别放在某两个`catch`中，那么子类型应该放在前面，否则子类型永远不会执行。

## 运行时期异常的特点

`RuntimeException`，相对的编译时期异常。

方法的声明上不需要`throws`语句，调用者也不是必须要处理的。

设计原因： 运行异常是不该发生的，如果真的发生了，后面的代码不再具有意义，程序人员应该修改源代码。

## 子类重写父类方法时异常的处理

- 父类如果有抛出异常，子类只能声明父类异常或者该异常的子类，或者不声明。
- 当父类方法声明多个异常时，子类覆盖时只能声明多个异常的子集
- 当被覆盖的方法没有异常声明时，子类覆盖时无法声明异常
- 父类没抛出异常，但子类内部有可能出现异常时，可以通过`try-catch`处理，如果处理不了，也只能抛出运行时异常（该异常可以不声明）

## Throwable类的方法

|方法 |说明 |
|- |- |
|String `getMessage()` |返回异常信息详细描述 |
|String `toString`() |返回异常信息的简短描述 |
|void `printStackTrace`() |将异常信息追踪栈输出到到标准错误流 |

## 自定义异常
如果Java没有提供你需要的异常，则可以自定义异常类。

编译时异常继承`Exception`，运行时异常继承`RuntimeException`。
