---
layout: post
title: "JavaScript null、undefined 與 undeclared"
date: 2019-09-10 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

- `undefined` 是一種型態，代表此處應有`值`，但是現在還沒有`值`

  - 宣告了，但是還沒有賦值

    ```js
    var a = undefined;
    console.log(a); // undefined
    console.log(typeof a); // undefined

    var b;
    console.log(b); // undefined
    ```

  - 物件沒有該屬性

    ```js
    var person = {
      name: "elaine",
    };
    console.log(person.age); // undefined
    ```

  - 函式沒有回傳值

    ```js
    function sayHi() {}
    console.log(sayHi()); // undefined
    ```

  - 呼叫函式，沒有帶入參數

    ```js
    function sayHi(name) {
      console.log(name); // undefined
    }
    sayHi();
    ```

- `undeclared` 代表未宣告

  - 在嚴格模式，會噴錯 `Uncaught ReferenceError: a is not defined`

    ```js
    // 嚴格模式，Uncaught ReferenceError: a is not defined
    "use strict";
    a = 10;
    console.log(a);
    ```

  - 在非嚴格模式，該變數會變成`全域變數`

    ```js
    // 非嚴格模式，變成全域變數
    a = 10;
    console.log(a);
    ```

    ```js
    console.log(a); // 未宣告直接取值，Uncaught ReferenceError: a is not defined
    ```

- `null` 是一種型態，代表`空值`

  - 物件原型鍊的終點

  ```js
  var a = null;
  console.log(a); // null
  console.log(typeof a); // object
  ```
