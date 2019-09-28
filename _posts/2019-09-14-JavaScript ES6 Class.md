---
layout: post
title: "JavaScript ES6 Class"
date: 2019-09-14 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

- `JavaScript` 並沒有提供物件導向的語法，而是透過 `function` 來建立物件

  ```js
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype.sayHi = function() {
    console.log("Hi! " + this.name);
  };

  const person1 = new Person("Elaine", 18);
  person1.sayHi(); // "Hi! Elaine"
  ```

- ES6 建立物件

  - 在 ES6 中的 `Class` 語法，也並不是真的是以類別為基礎的物件導向
  - 在骨子裡仍然是以原型為基礎的物件導向
  - 它只是個語法糖
  - 加入 `Class` 語法的目的，並不是要建立另一套物件導向的繼承模型，而是為了提供更簡潔的語法來作物件建立與繼承

  ```js
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    sayHi() {
      console.log("Hi! " + this.name);
    }
  }

  const person1 = new Person("Elaine", 18);
  person1.sayHi(); // "Hi! Elaine"
  ```

### 參考資料

- [Day 10: ES6 篇 - Class(類別)](https://ithelp.ithome.com.tw/articles/10185583)
- [JS 的 new 到底是干什么的？](https://zhuanlan.zhihu.com/p/23987456?refer=study-fe)
