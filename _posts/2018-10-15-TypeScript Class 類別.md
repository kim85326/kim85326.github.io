---
layout: post
title: "TypeScript Class 類別"
date: 2018-10-15 00:00:00 +0800
categories: JavaScript
tags: JavaScript TypeScript
mathjax: true
---

### class

```js
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
```

我們聲明一個 Greeter 類別
這個類別有 3 個成員：一個叫做 greeting 的屬性，一個構造函數 constructor 和一個 greet 方法
我們在引用任何一個類成員的時候都用了 this，它表示我們訪問的是類的成員
最後一行，我們使用 new 構造了 Greeter 類別的一個實例
它會調用之前定義的 constructor，創建一個 Greeter 類型的新對象，並執行 constructor 初始化它

### 繼承

```js
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

### public 與 private 與 protected 的修飾符

如果都沒有加這些修飾符的話，會默認為 public

```js
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```

### readonly 修飾符

可以使用 readonly 關鍵字將屬性設置為唯讀的
只讀屬性必須在宣告時或 constructor 裡被初始化

```
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name 是唯讀的.
```

### 參考資料

- [TypeScript 類](https://www.tslang.cn/docs/handbook/classes.html)
- [TypeScript 初學之路系列 第 7 篇 Classes](https://ithelp.ithome.com.tw/articles/10191249)
