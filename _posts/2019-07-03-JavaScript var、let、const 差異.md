---
layout: post
title: "JavaScript var、let、const 差異"
date: 2019-07-03 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

### JavaScript 作用域

1. 全域變數

   - 全域變數在整個程式中都可以被存取與修改

   ```js
   var name = "elaine";

   function showName() {
     console.log(name); //elaine
   }

   showName();
   console.log(name); //elaine
   ```

2. 區域變數

   - 每次執行函式時，就會建立區域變數再予以摧毀，而且函式之外的所有程式碼都不能存取這個變數

   ```js
   function showName() {
     var name = "elaine";
     console.log(name); //elaine
   }

   showName();
   console.log(name); //ReferenceError: name is not defined
   ```

- function 由內向外找

```js
var name = "elaine";

function showName() {
  var name = "amy";
  console.log(name); //amy
}

showName();
console.log(name); //elaine
```

### 宣告提升 Hosting

- var 有宣告提升

  ```js
  console.log(a); //undefined
  var a = 123;
  ```

  相當於

  ```js
  var a;
  console.log(a); //undefined
  a = 123;
  ```

- let/const 沒有宣告提升

  - let

    ```js
    console.log(a); //ReferenceError: Cannot access 'a' before initialization
    let a = 123;
    ```

  - const

    ```js
    console.log(a); //ReferenceError: Cannot access 'a' before initialization
    const a = 123;
    ```

### 函式作用域

- var 可用範圍以 function 為界，function 外讀不到值

  ```js
  var a = 10;

  function hi() {
    var b = 20;
  }

  console.log(a); //10
  console.log(b); //ReferenceError: b is not defined
  ```

  - 如果使用區塊語句像 if、else、for、while 等等區塊語句時，宣告的區域變數仍然可在整段程式碼做存取

  ```js
  var a = 10;

  if (true) {
    var b = 20; //全域宣告
  }

  console.log(a); //10
  console.log(b); //20
  ```

- let/const 可用範圍以 block 為界，block 外讀不到值

  - let

  ```js
  var a = 10;

  if (true) {
    let b = 20;
  }

  console.log(a); //10
  console.log(b); //ReferenceError: b is not defined
  ```

  - const

  ```js
  var a = 10;

  if (true) {
    const b = 20;
  }

  console.log(a); //10
  console.log(b); //ReferenceError: b is not defined
  ```

- 最大的差別

  - 使用 var

  setTimeout 在存取 i 的時候，存取到全域變數的 i，此時 i = 3;

  ```js
  for (var i = 0; i < 3; i++) {
    console.log(i); // 0 1 2
    setTimeout(function() {
      console.log("這執行第" + i + "次"); // 這執行第3次 這執行第3次 這執行第3次
    }, 10);
  }
  ```

  - 使用 let

  setTimeout 在存取 i 的時候，存取到區域變數的 i，所以可以正常運作

  ```js
  for (let i = 0; i < 3; i++) {
    console.log(i); // 0 1 2
    setTimeout(function() {
      console.log("這執行第" + i + "次"); // 這執行第0次 這執行第1次 這執行第2次
    }, 10);
  }
  ```

  - 非得要用 var 來完成的話，只好包成一個 IIFE (立即呼叫的函式)

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

### 重複宣告

- var 允許重複宣告

```js
var a = 123;
var a = 456;
console.log(a); //456
```

- let/const 不允許重複宣告

```js
let a = 123;
let a = 456; //SyntaxError: Identifier 'a' has already been declared
console.log(a);
```

```js
const a = 123;
const a = 456; //SyntaxError: Identifier 'a' has already been declared
console.log(a);
```

### const

- const 在宣告的時候一定要賦予值

  ```js
  const a;    // SyntaxError: Missing initializer in const declaration
  ```

- const 一旦被賦予值，就不可以再更改

  ```js
  const a = 1;
  a = 2; // TypeError: Assignment to constant variable
  ```

  - 但是物件和陣列，記憶體位置不改變，值可以變動

  ```js
  const a = ["第一個 value"];
  a[0] = "啦啦啦";
  console.log(a); //["啦啦啦"]
  a = 123; //TypeError: Assignment to constant variable
  ```

### 結論

1. 不要再用 var 來宣告變數，改用 let 與 const，而且優先使用 const，除非需要再指定值才用 let。(Google 5.1.1, Airbnb 2.1/2.2)
2. 不要使用逗號(,)在同一行來定義(宣告)多個變數或常數，例如`let a = 1, b = 2`是不必要的，應該是一行一個定義(宣告)(Google 5.1.2, Airbnb 13.2)
3. 並不是在區塊中或函式中區域的最上面來宣告變數/常數，而是在合理的位置，在變數/常數首次被使用時的上面一行來宣告變數(Google 5.1.3, Airbnb 13.4)

### 參考資料

- [鐵人賽：ES6 開始的新生活 let, const](https://wcc723.github.io/javascript/2017/12/20/javascript-es6-let-const/)
- [ES2015 筆記(1) var, let, const, scope](https://dotblogs.com.tw/acelee/2017/03/31/134427)
- [Day26 var 與 ES6 let const 差異](https://ithelp.ithome.com.tw/articles/10209121)
- [鐵人賽第 5 天: ES6 篇 - let 與 const](https://eyesofkids.gitbooks.io/react-basic-zh-tw/content/day05_es6_let_const/)
