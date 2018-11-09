---
layout: article
title: 《计算机科学导论》笔记
categories: [草稿]
tags: [计算机科学]
---

# 第一章  绪论

## 1.图灵模型

- 数据处理器：一个接受输入数据、处理数据并产生输出数据的黑盒。这种对计算机的定义太宽泛。
- 可编程数据处理器：计算机的输出数据除依赖于输入数据外，还依赖于程序，`输出数据=f(输入数据,程序)`。
- 通用图灵机：一种只要提供了合适的程序就能做任何运算的机器，这是对现代计算机的首次描述。

## 2.冯.诺依曼模型

- 程序和数据在逻辑上是相同的，因此程序也应该存储在计算机的存储器中。
- 该模型包括四个子系统
    * **存储器**，存储数据与程序
    * **算术逻辑单元**，进行算术逻辑运算
    * **控制单元**，控制其他几个子系统
    * **输入/输出**
        - 输入接受输入数据和程序
        - 输出将结果送到计算机外部
- 存储的程序（指令）是按照顺序执行的（虽然可能会有跳转）

## 3.计算机的组成部分

- **计算机硬件**，依据冯.诺依曼模型且包含四部分
- **数据**
    * 存储数据，以01位模式存储在计算机内部
    * 组织数据，数据存储在计算机中前，可以有效组织成不同的实体和格式
- **计算机软件**，冯.诺依曼模型的主要特征是程序的概念
    * 程序必须是存储的
    * 程序必须是有序的指令集，指令集使得重用成为可能
    * 算法，通过合适组织指令来给出解决问题的一系列步骤
    * 语言，（高级）计算机语言使得能以方便人理解与编写的方式来生产程序，避免直接使用机器语言编程的低效
    * 软件工程，结构化程序的设计和编写中应遵循的原理和规则
    * 操作系统，最初是为程序访问计算机部件提供方便的一种管理程序，如今功能更加强大
    
## 4.历史

- 机械计算机器（1930年以前）
- 电子计算机的诞生（1930年-1950年）
    * 早期的电子计算机（ENIAC等）
    * 基于冯.诺依曼模型的计算机（EDVAC等）
- 计算机的诞生（1950年至今）

## 5.社会问题和道德问题（略）

## 6.计算机作为一门科学

- 系统领域：计算机体系结构、计算机网络、安全问题、操作系统、算法、程序设计语言、软件工程等
- 应用领域：数据库、人工智能等

# 第二章 数字系统

**数字系统**定义了如何用独特的符号来表示一个数字。可分为**位置化数字系统**和**非位置化数字系统**。

## 位置化数字系统

- 通用表示方法：`+/-(Sk-1 ... S2 S1 S0 . S-1 S-2 S-l)b`
- 常见位置化数字系统
    * 十进制(`decimal`)
    * 二进制(`binary`)
    * 八进制(`octol`)
    * 十六进制(`hexadecimal`)

### 其他进制转换为十进制

直接用各数位上的十进制值乘以相应的位置量值，然后相加。例如：`-(A1.C)16 = -(10*16^1 + 1*16^0 + 12*16^-1) = -161.75`。

### 十进制转换为其他进制

根据书中的算法，将其以`javascript`实现如下：

```javascript
let assert = require('assert');
/**
 * 将十进制实数字符串转换为其他进制(2-16)的字符串表示
 * @param {String} numStr 十进制实数字符串
 * @param {number} radix 目标进制（2-16）
 * @param {number} precision 小数最长保留位数，默认值12
 */
function radixConvert(numStr, radix, precision){
    numStr = numStr.toUpperCase();
    assert(/^[\+\-]?((\d+)|([\dA-F]+\.[\dA-F]+))$/.test(numStr), '非法十进制实数');
    assert(radix>=2 && radix<=16, '不满足进制取值的合法区间[2,16]');
    precision = precision || 12;

    let getCharOf = num=>num<10?''+num:String.fromCharCode(55+num);
    
    // 符号
    let symbol = '';
    if(/^[\+\-]/.test(numStr)){
        symbol = numStr[0];
        numStr = numStr.slice(1);
    }
    
    // 分解整数和小数部分
    let parts = numStr.split('.');

    // 转换整数部分
    let int = parseInt(parts[0]);
    let intTarget = [];
    while(int > 0){
        intTarget.unshift(int%radix);
        int = (int-intTarget[0])/radix;
    }
    intTarget = intTarget.map(item=>getCharOf(item));

    // 转换小数部分
    let floatTarget = [];
    if(parts.length > 1){
        let float = parseFloat('0.'+parts[1]);
        while(float > 0 && floatTarget.length < precision){
            float *= radix;
            floatTarget.push(Math.floor(float));
            float -= floatTarget[floatTarget.length-1];
        }
        floatTarget = floatTarget.map(item=>getCharOf(item));
    }

    return symbol + 
        (intTarget.length>0? intTarget.join('') : '0')+ 
        (floatTarget.length>0 ? '.'+floatTarget.join('') : '');
}

let num = -101.625;
// 测试
console.log(radixConvert(num.toString(), 16));// -65.A
console.log(radixConvert(num.toString(), 8));// -145.5
console.log(radixConvert(num.toString(), 2));// -1100101.101

// js的原生转换方法
console.log(num.toString(16));// -65.a
console.log(num.toString(8));// -145.5
console.log(num.toString(2));// -1100101.101
```

其主要思路是：

- 对于整数部分，不断除以进制，将各次的余数从右到左排列起来
- 对于小数部分，不断乘以进制，将各次的结果的整数部分从左到右排列起来
- 十进制有限小数可能在其他进制中不能以有限位小数准确表示，为此通常需要指定精度

### 其他进制间的转换

- 二进制和八进制：每三个二进制位对应一个八进制位
- 二进制和十六进制：每四个二进制位对应一个八进制位
- 八进制和十六进制：以二进制为中介

## 非位置化数字系统

- 这种系统仍旧使用有限的数字符号，但是他们的值和位置没有关系
- 为求其值，将各数字符号的代表值相加即可；一个
- 罗马数字系统是个例子（虽然各符号的值和位置无关，但是有一定的书写规范）


