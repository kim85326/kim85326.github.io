---
layout: post
title: "JavaScript var、let、const 差別 (上)"
date: 2024-06-29 00:00:00 +0800
categories: 前端開發
tags: ["JavaScript"]
mathjax: true
description: ""
redirect_from: 
  - "/2019/07/02/JavaScript-var-let-const-差異/"
  - "/posts/JavaScript-var-let-const-差異/"
  - "/posts/JavaScript-var-let-const-差別/"
---

JavaScript 是一門強大且靈活的語言，但靈活性有時也會帶來困惑，特別是在變數宣告方面。`var` 是 JavaScript 中最早的變數宣告方式，但在 ES6 中，`let` 和 `const` 的引入讓我們有了更多選擇。這篇文章將比較 `var`、`let` 和 `const`，討論它們的差異及各自的優缺點，幫助你更好地理解和應用這些關鍵字，提高你的程式碼質量。

### JavaScript 作用域

在深入探討 var、let 和 const 對作用域的影響之前，我們先來了解什麼是**全域變數**和**區域變數**

#### 全域變數

全域變數在整個程式中都可以被存取與修改

```js
var name = "elaine";

function showName() {
  console.log(name); // elaine
}

showName();
console.log(name); // elaine
```

#### 區域變數

每次執行 `function` 時，就會建立區域變數再予以摧毀，而且 `function` 之外的所有程式碼都不能存取這個變數

```js
function showName() {
  var name = "elaine";
  console.log(name); // elaine
}

showName();
console.log(name); // ReferenceError: name is not defined
```

`function` 會優先查找其內部定義的變數，若在內部找不到，才會逐層向外查找，直到全域範圍。

```js
var name = "elaine";

function showName() {
  var name = "cindy";
  console.log(name); // cindy
}

showName();
console.log(name); // elaine
```

#### var、let、const 作用域

`var` 可用範圍以 `function` 為界，`function` 外讀不到值

```js
var a = 10;

function hi() {
  var b = 20;
}

console.log(a); // 10
console.log(b); // ReferenceError: b is not defined
```

如果使用區塊語句 (`block`) 像 `if、else、for、while` 等等區塊語句時，宣告的區域變數仍然可在整段程式碼做存取

```js
var a = 10;

if (true) {
  var b = 20; // 全域宣告
}

console.log(a); // 10
console.log(b); // 20
```

`let` 和 `const` 可用範圍以 `block` 為界，`block` 外讀不到值

let

```js
var a = 10;

if (true) {
  let b = 20;
}

console.log(a); // 10
console.log(b); // ReferenceError: b is not defined
```

const

```js
var a = 10;

if (true) {
  const b = 20;
}

console.log(a); // 10
console.log(b); // ReferenceError: b is not defined
```

#### var 和 let 最大的差別

##### 使用 var

```js
for (var i = 0; i < 3; i++) {
  console.log(i); // 0 1 2
  setTimeout(function() {
    console.log("這執行第" + i + "次"); // 這執行第3次 這執行第3次 這執行第3次
  }, 10);
}
```

`var` 的作用域是以 `function` 為主，這個例子可以把他想像是 `var` 被提升到全域變數

```js
var i;
for (i = 0; i < 3; i++) {
  // ...
}
```

執行順序是
1. 宣告全域變數 i
2. for 迴圈 i = 0
3. `console.log(i);` -> 0
4. 設定定時器到背景
5. for 迴圈 i = 1
6. `console.log(i);` -> 1
7. 設定定時器到背景
8. for 迴圈 i = 2
9. `console.log(i);` -> 2
10. 設定定時器到背景
11. for 迴圈 i = 3，達到 i < 3 條件，因此停止 for 迴圈，但 i = 3
12. 執行第 1 個定時器，去存取 i，此時 i = 3
13. 執行第 2 個定時器，去存取 i，此時 i = 3
14. 執行第 3 個定時器，去存取 i，此時 i = 3

每次在執行 `setTimeout` 在存取 `i` 的時候，都是存取到全域的 `i`，所以都是 `i = 3`

##### 使用 let

因為 `let` 會產生新的作用域，`i` 會被鎖在 `for…` 後方的 `{}` 內，所以 `setTimeout` 在存取 `i` 的時候，是三個不同的作用域 (第一個作用域 `i = 0`、第二個作用域 `i = 1`，第三個作用域 `i = 2`)

```js
for (let i = 0; i < 3; i++) {
  console.log(i); // 0 1 2
  setTimeout(function() {
    console.log("這執行第" + i + "次"); // 這執行第0次 這執行第1次 這執行第2次
  }, 10);
}
```

非得要用 `var` 來完成的話，只好包成一個 立即呼叫的函式 (`IIFE`)，利用 `function` 來產生新的作用域

```js
for (var i = 0; i < 3; i++) {
  console.log(i); // 0 1 2
  (function(j) {
    setTimeout(function() {
      console.log("這執行第" + j + "次"); // 這執行第0次 這執行第1次 這執行第2次
    }, 10);
  })(i);
}
```

### 宣告提升 Hoisting

`var` 有宣告提升

```js
console.log(a); // undefined
var a = 123;
```

相當於

```js
var a;
console.log(a); // undefined
a = 123;
```

`let` 和 `const` 其實也有宣告提升，但沒有初始化為 `undefined`，而且在賦值之前試圖取值會發生錯誤，這叫做 **暫時性死區 (Temporal Dead Zone)**

let

```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 123;
```

const

```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization
const a = 123;
```

#### 暫時性死區（Temporal Dead Zone, TDZ）

暫時性死區（Temporal Dead Zone, TDZ）是 `JavaScript` 在使用 `let` 和 `const` 宣告變數時的一個概念。它描述了在變數被宣告和初始化之前，變數處於不可訪問狀態的區間。這個區間從變數進入作用域開始，到變數初始化為止。

什麼是暫時性死區？
當 `JavaScript` 引擎解析代碼時，變數宣告會被提升到其作用域的頂部，但只有 `var` 變數會被初始化為 `undefined`。`let` 和 `const` 變數雖然也會被提升，但不會被初始化為 `undefined`，因此在初始化之前訪問這些變數會導致引用錯誤（ReferenceError）。

例子
以下範例展示了暫時性死區的行為：

```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
```

在這段代碼中，變數 `a` 在進入作用域時即被提升，但它直到 `let a = 10;` 這一行執行前都處於暫時性死區中，因此在宣告之前訪問 `a` 會引發錯誤。

暫時性死區的範例解析

```js
function example() {
  console.log(b); // ReferenceError: Cannot access 'b' before initialization
  let b = 20;
}

example();
```

在這個範例中：

1. 當進入 `example` 函式的作用域時，變數 `b` 會被提升，但不會初始化。
2. 在 `let b = 20;` 行之前，`b` 處於**暫時性死區**中，因此試圖訪問 `b` 會引發引用錯誤。
3. 一旦執行到 `let b = 20;` 行，`b` 才會被初始化，此後才能正常訪問。

為什麼**暫時性死區**很重要？
1. 安全性：**暫時性死區**可以防止變數在初始化之前被訪問，從而避免意外的行為和錯誤。
2. 清晰性：**暫時性死區**促使開發者在宣告變數之前不要使用它們，這樣可以提高代碼的可讀性和可維護性。
3. 一致性：**暫時性死區**保證了 `let` 和 `const` 變數的行為一致，無論它們在哪裡被宣告，都會在進入作用域時被提升，但在初始化之前不能被訪問。

總結來說，**暫時性死區**是 `JavaScript` 在處理 `let` 和 `const` 變數時的一個重要概念，理解**暫時性死區**可以幫助開發者寫出更健壯和可預測的代碼。

### 重複宣告

`var` 允許重複宣告

```
