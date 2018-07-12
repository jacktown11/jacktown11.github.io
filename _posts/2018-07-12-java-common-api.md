---
layout: article
title: java常用API
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

