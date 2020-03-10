---
layout: article
title: typescript学习笔记
categories: [大前端]
tags: [javascript]
---

按：本笔记基于慕课网课程[TypeScript入门](https://www.imooc.com/learn/763)。

# 简介

`TypeScript`由微软公司开发，是`JavaScript`的超集，可以编译成纯`JavaScript`。它可以在任何浏览器、计算机和操作系统上运行，并且是开源的。

## 优势

- 支持`ES6`规范
- 强大的`IDE`支持
- `Angular`框架的开发语言

## 编译（转为js）

官网提供了一个[在线练习场所](https://www.tslang.cn/play/index.html)，可以实时查看编译后的代码。实际开发中都是本地编译，全局安装`typescript`工具方法如下：

```cmd
npm install -g typescript
tsc --version
```

利用`tsc`手动编译可以使用命令`tsc ts文件名`；在项目中也可以配置`tsconfig.json`进行自动的编译。

# 字符串新特性

- 多行字符串，可以换行
- 模板字符串，可以用`${}`的形式插入表达式
- 自动拆分字符串，在函数后紧接着写一个模板字符串，那么这个模板会被拆分，得到一个参数列表；其中第1个参数是一个数组，数组中有被内部的表达式分隔开的各个字符串常量，第2到n个参数则是那些表达式的值，这个参数列表会被作为函数的参数传入并调用函数。

示例：

```typescript
let myName = 'jack';
let age = 13;

function test (template, name, age) {
    console.log(template);
    console.log(name);
    console.log(age);
}

test`My name is ${myName} and I am ${age} years old`;

// [My name is ", " and I am ", " years old"]
// jack
// 13
```

# 变量新特性

## 参数类型

变量、函数参数、函数返回值都可以指定类型，默认情况下变量也会存在类型推断，类型还可以是自定义的`class`。使用示例如下：

```typescript
let myname: string = 'hello'
let hisName: any = 'x'
let age: number = 3
let gender: boolean = true

function test(name: string): void{
}

test(myname);
```

## 参数默认值

在函数参数中可以使用`=`指定默认值，必须放在必选参数的后边。

```typescript
function add (a: number, b: number = 1) : void {
    console.log(a + b);
}

add(3); // 4
add(3, 4); // 7
```

## 可选参数

函数参数列表中可以使用`?`表示该参数是可选的，必须放在必选参数的后边。

```typescript
function add (a: number, b?: number, c: number = 1) : number {
    return !b ?
        a + c :
        a + b + c;
}

console.log(add(3)); // 4
console.log(add(3, 4)); // 8
console.log(add(3, 4, 3)); // 10 
```

# 函数新特性

## rest和spread操作符

这两个操作符写法是一样的：`...`。

`rest`操作符可以用于传入不定个数的参数，实际在内部是作为数组来处理。

```typescript
function show(...args) {
    args.forEach((item) => {
        console.log(item);
    });
}

show(); // <nothing>
show(1, 2); // 1   2
```

反之`spread`操作符可用来用将数组展开。

```typescript
function show(a, b, c = 5) {
    console.log(a);
    console.log(b);
    console.log(c);
}

show(...[1, 2]);
// 1
// 2
// 5

show(...[1, 2, 3, 4, 5]);
// 1
// 2
// 3
```

## generator函数

可以控制函数的执行过程，手工暂停和恢复代码。比如下面的例子，`getStockPrice`是个`generator`函数，调用它获得一个股票价格的获取器`priceGetter`（这实际上是个遍历器对象），对它每一次调用`next`方法，都会执行到下一个`yield`为止，其返回值的`value`属性是`yield`后方表达式的值。

```typescript
function *getStockPrice(){
  while(true){
	yield Math.random()*100;
  }
}
let priceGetter = getStockPrice();

let currentPrice: number,
  limitPrice = 20;

setTimeout(function refresh () {
  currentPrice = priceGetter.next().value;
  if(currentPrice <= limitPrice) {
  	console.log(`Current price: ${currentPrice}, buy it!`);
  }else {
	console.log(`Current price: ${currentPrice}, too high!`);
  setTimeout(refresh, 1000);
  }
}, 1000);
```

## 解构赋值

对象结构赋值示例：

```typescript
let getStock = function () {
    return {
        name: 'IBM',
        price: 30
    }
};

let { name: sname, price } = getStock();

console.log(sname); // IBM
console.log(price); // 30
```

数组解构赋值示例：

```typescript
let arr1 = [1, 2, 3, 4];

let [,num1, ...rest] = arr1;

console.log(num1); // 2
console.log(rest); // [3, 4]
```

# 表达式与循环

## 箭头函数

可以较好的解决`javascript`中的`this`指向问题，其中的`this`指向其定义所在的对象；对于简单的函数也可以很好地简化函数的书写。

示例1：

```typescript
let arr = [1, 2, 3, 4, 5];

console.log(arr.filter(item => item % 2 === 0)); // [2, 4]
```

示例2：

```typescript
function Stock(name: string) {
    this.name = name;
    setInterval(() => console.log(`name: ${ this.name }`), 1000)
}

new Stock('hello');

// name: hello
// name: hello
// ...
```

## 新循环语法

`forEach`，用于数组元素的遍历，不支持`break`结束遍历，忽略非元素属性值。

```typescript
let arr = [1, 2, 3];
arr.desc = 'three items array';

arr.forEach(item => console.log(item));
// 1
// 2
// 3
```

`for in`主要用于对象的属性遍历，取出的是`key`，在数组中也就是数组的索引和绑定的属性名。

```typescript
let arr = [1, 2, 3];
arr.desc = 'three items array';

for (let key in arr) {
    console.log(key);
}
// 0
// 1
// 2
// desc
```

`for of`可以遍历对象（包括`Map`、`Set`、字符串）、数组的属性值，可以使用`break`；数组上绑定的属性不会被遍历。

```typescript
let arr = [1, 2, 3];
arr.desc = 'three items array';

for (let item of arr) {
    if (item > 2) break;
    console.log(item);
}
// 1
// 2
```

# 面向对象特性

## 类

### 定义

`typescript`中可以使用类，在其中可以定义属性、构造函数、方法等，并可以指定权限，控制是否静态。下面是类的定义示例，其中构造函数中的参数会自动作为对象属性，并且自动赋值；需要注意其中显式的权限声明`public`不能省略。

```typescript
class Person {
    constructor(public name: string) {
    }
    
    eat() {
        console.log(`${this.name} is eating.`); 
    }
}

let p1: Person = new Person('man');
p1.eat(); // man is eating.

let p2: Person = new Person('superMan');
p2.eat(); // superMan is eating.
```

`typescript`对类的权限提供了三个修饰符`private`,`protected`,`public`，默认是`public`权限。

### 继承

使用`extends`关键字实现类的继承；继承时可以使用`super`关键字调用父类的构造函数和方法。

```typescript
class Person {
    constructor(public name: string) {
        console.log('creating person...');
    }
    eat() {
        console.log(`${this.name} is eating.`); 
    }
}

class Employee extends Person {
    code: string
    constructor(name: string, code: string) {
        super(name);
        console.log('ceating employee...');
        this.code = code;
    }
    work() {
        super.eat();
        this.doWork();
    }
    private doWork() {
        console.log(`${this.name} (${this.code}) is working`)
    }
}

let e1: Employee = new Employee('tom', 'A-1');
e1.work();

// creating person...
// ceating employee...
// tom is eating.
// tom (A-1) is working
```


## 泛型

参数化类型，用于限制集合的类型。

```typescript
let workers: Array<Person> = [];

workers[0] = new Person('张三');
workers[1] = new Employee('jack', 'A001');
```

## 接口

interface，用来建立某种代码约定，使得其他开发者在调用某个方法或创建新的类时必须遵循接口所定义的代码约定。

示例1：下面的代码定义了`IPerson`，该接口要求具有`name`和`age`两个属性，由于`Person`类的构造函数中使用了该接口类型的参数，因此保证了在创建`Person`实例时传递的参数也必须具有这两个属性。

```typescript
interface IPerson {
    name: string;
    age: number;
}

class Person {
    constructor(public config: IPerson) {
        
    }
}

let p: Person = new Person({
    name: 'jack',
    age: 18
});
```

实例2：下面的代码定义了`Animal`接口，所有实现该接口的类都必须实现接口中声明的方法。

```typescript
interface Animal {
    eat();
}

class Sheep implements Animal {
    eat() {
        console.log('I eat grass');
    }
}

class Tiger implements Animal {
    eat() {
        console.log('I eat meat');
    }
}
```

## 模块

module，模块可以帮助开发者将代码分割为可重用的单元。开发者可以自己决定将模块中的哪些资源（类、方法、变量）暴露出去供外部使用。

下面的示例中`b.ts`暴露的变量、函数、类可以在`a.ts`中使用，后者也可以暴露自己的变量、函数、类等。

```typescript
// b.ts
export let prop1: string;
let prop2: string;

export function func1 () {}
function func2 () {}

export class Clazz1 {}
class Clazz2 {}



// a.ts
import { prop1, func1, Clazz1 } from "./b";

console.log(prop1);
func1();
new Clazz1();

export function func3(){}
```

## 注解

`annotation`，为程序的元素（类、方法、变量）加上更直观明了的说明，这些说明信息与程序的业务逻辑无关，而是供指定的工具或框架使用。

## 类型定义文件

`.d.ts`，用于帮助开发者在`TypeScript`中使用已有的`JavaScript`的工具包，如`jQuery`。github上的[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)仓库定义了各种库的类型定义文件，[types](https://github.com/typings/typings)仓库可以帮助我们下载类型定义文件
