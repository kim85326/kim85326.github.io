---
layout: post
title: "JavaScript null、undefined、undeclared 差別"
date: 2024-07-01 00:00:00 +0800
categories: 前端開發
tags: ["JavaScript"]
mathjax: true
description: ""
redirect_from: 
  - "/posts/JavaScript-null-undefined-undeclared-差異/"
---

在 JavaScript 中，`null`、`undefined` 和 `undeclared` 都代表不同的概念和用法。以下是它們的區別：

### null

- 類型：`object`
- 意義：`null` 表示一個有意的空值，通常用來表示變數應該有值但目前是空的
- 使用場景：
  - 當你想明確表示某個變數沒有值時，可以將它設為 `null`
  - 清除引用，方便做 Garbage Collection (GC)

#### 表示有意的空值

```js
let user = null; // 明確表示 user 目前沒有值

console.log(user); // null
console.log(typeof user); // object
```

#### 清除引用

```js
let data = { key: "value" };
// 使用完 data 後
data = null; // 清除引用，便於垃圾回收
```

### undefined

- 類型：`undefined`
- 意義：`undefined` 表示變數沒有被宣告，或是已經宣告但尚未賦值
- 使用場景：
  - 當變數被宣告但沒有被賦予值時，自動初始化為 `undefined`
  - 函數沒有 `return` 語句時也會返回 `undefined`

#### 宣告了，但是還沒有賦值

```js
var a = undefined;
console.log(a); // undefined
console.log(typeof a); // undefined

var b;
console.log(b); // undefined
```

#### 物件沒有該屬性

```js
var person = {
  name: "elaine",
};
console.log(person.age); // undefined
```

#### 函式沒有回傳值

```js
function sayHi() {}
console.log(sayHi()); // undefined
```

#### 呼叫函式，沒有帶入參數

```js
function sayHi(name) {
  console.log(name); // undefined
}
sayHi();
```

### undeclared

- 意義：`undeclared` 表示變數尚未宣告。在使用未宣告變數時會引發 `ReferenceError` 錯誤
- 使用場景：
  - 當試圖訪問或操作一個未經宣告的變數時，會產生這種錯誤。這通常是由於拼寫錯誤或變數作用域問題引起的

#### 未宣告直接取值會噴錯

```js
console.log(a); // Uncaught ReferenceError: a is not defined
```

#### 在嚴格模式，沒有宣告變數就直接賦值，會噴錯 `Uncaught ReferenceError: a is not defined`

```js
"use strict";
a = 10; // 嚴格模式，Uncaught ReferenceError: a is not defined
```

#### 在非嚴格模式，沒有宣告變數就直接賦值，該變數會變成**全域變數**

```js
a = 10; // 非嚴格模式，直接賦值 a，a 會變成全域變數
console.log(a); // 10
```

### Best Practice

#### 避免手動設置 undefined

儘量避免手動將變數設置為 `undefined`，因為這是 JavaScript 的默認值。當需要表示未定義狀態時，考慮使用 `null` 或其他更具描述性的值

```js
var a = undefined; // 不推薦
var a = null; // 更具描述性
```

#### 函式參數的默認值

使用函式參數的默認值來避免未定義的情況

```js
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}
greet(); // 輸出: Hello, Guest!
```

#### 使用嚴格模式

使用嚴格模式 (strict mode) 可以幫助捕捉未宣告變數的錯誤，從而避免未預期的全域變數

```js
"use strict";
try {
  a = 10; // 會引發 ReferenceError
} catch (error) {
  console.log(error.message); // 輸出: a is not defined
}
```
