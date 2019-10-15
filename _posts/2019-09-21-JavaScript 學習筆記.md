---
layout: post
title: "JavaScript 學習筆記"
date: 2019-09-21 00:00:00 +0800
categories: JavaScript
tags:
mathjax: true
---

- JavaScript 是弱型別語言
  - 一開始宣告的時候不用給定型態
  - 在過程中隨時可以轉換型態
- JavaScript 資料型態可分為
  - 基本型態 `布林值`、`數值`、`字串`
  - 參考型態 `陣列`、`物件`、`函式`
    - 傳記憶體地址
- Java 之於 JavaScript 的關係，就如同狗和熱狗

### 基本型態

```js
var boo = true;
var boo = false;
var num = 123;
var num = 123.456;
var str = "str";
var str = "str";
```

- Boolean 布林值
- Number 數值

  - [浮點數陷阱](https://juejin.im/entry/59e40ba951882546b15b8d00)
    ![](https://i.imgur.com/HnQlxib.png)

    - 這不是瀏覽器的問題，而是由於某些浮點數沒辦法用二進位準確的表示
    - 解決方法 1
      - 將小數轉為整數進行運算，運算完再轉回小數
    - 解決方法 2
      - 安裝大神套件

- String 字串
  - 單引號和雙引號沒有差別
  - [更多字串筆記](https://kim85326.github.io/2019/09/11/JavaScript-%E5%AD%97%E4%B8%B2/)
- `typeof()` 查看型態

  ```js
  console.log(typeof 101); // number
  console.log(typeof 1.01); // number
  console.log(typeof NaN); // number
  console.log(typeof "101"); // string
  console.log(typeof true); // boolean
  ```

### null、undefined 與 undeclared

```js
var n = null;
var undefinedVariable;
var iUndefinedVariable = undefined;
```

- [JavaScript null、undefined 與 undeclared](https://kim85326.github.io/2019/09/09/JavaScript-null-undefined-%E8%88%87-undeclared/)

### 陣列

```js
var arr = ["字串", false, 123, [1, 2, 3]];
console.log(arr.length); // 4
arr.push("a"); // 新增元素
arr.splice(2, 1); // 移除 index 為 2 (含)之後的 1 個元素
arr.reverse(); // 反轉陣列
arr.join("、"); // 用 、 將陣列串起來變成字串型態
```

- es6 陣列操作

  - map
  - some
  - every
  - filter
  - find
  - findIndex
  - reduce

- [更多陣列筆記](https://kim85326.github.io/2019/09/12/JavaScript-%E9%99%A3%E5%88%97/)

### 變數宣告

- 作用域
  - 全域
  - 區域
- 宣告變數的方法

  - var
    - 作用範圍為函式
  - let
    - es6
    - 作用範圍為 `{}`
  - const
    - es6
    - 作用範圍為 `{}`
    - 宣告常數

- [更多 JavaScript 作用域筆記](https://kim85326.github.io/2019/07/02/JavaScript-var-let-const-%E5%B7%AE%E7%95%B0/)

### 判斷式

- if

  ```js
  var a = 1;

  if (a < 2) {
    console.log("a 小於 2");
  } else if (a == 2) {
    console.log("a 等於 2");
  } else {
    console.log("a 大於 2");
  }
  ```

- switch

  ```js
  var a = 1;

  switch (a) {
    case 0:
      console.log("a 為 0");
      break;
    case 1:
      console.log("a 為 1");
      break;
    default:
      console.log("a 不為 0，也不為 1");
  }
  ```

- `===` 嚴格相等

  - 基本型態 `布林值`、`數值`、`字串`

    - 判斷`值`與`型別`是否相同

      ```js
      console.log(1 === "1"); // false
      console.log(1 === 1); // true
      ```

  - 參考型態 `陣列`、`物件`

    - 判斷`記憶體位置`是否相同

      ```js
      var a = [];
      var b = [];
      var c = a;
      console.log(a === b); // false
      console.log(a === c); // true
      ```

- `==` 寬鬆相等

  - 兩邊型態相等時
    - 基本型態 `布林值`、`數值`、`字串`判斷值是否相等
    - 參考型態 `陣列`、`物件`會判斷`記憶體位置`是否相等
    - `null` 判斷兩邊是否都為 `null`
    - `undefined` 判斷兩邊是否都為 `undefined`
  - 兩邊型態不相等時
    - 基本型態 `布林值`、`數值`、`字串` 皆轉為 `數值` 判斷
    - 參考型態 `陣列`、`物件`轉為基本型態`布林值`、`數值`、`字串`後判斷

- `&&`、`||`、`!`
- JavaScript 是弱型別語言，在過程中可以任意轉變型態，分為顯性轉換、隱性轉換

  - 顯性轉換為布林值

    ```js
    console.log(Boolean(undefined)); // false
    console.log(Boolean(null)); // false
    console.log(Boolean("")); // false
    console.log(Boolean(0)); // false
    console.log(Boolean(NaN)); // false
    ```

  - 隱性轉換為布林值

    ```js
    var a;

    if (a) {
      console.log("exist");
    } else {
      console.log("not exist");
    }
    // 輸出 not exist，因為 undefined 是 false
    ```

### 迴圈

- while

  ```js
  var i = 0;

  while (i < 10) {
    i++;
  }

  do {
    i++;
  } while (i < 10);
  ```

- for

  ```js
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }
  ```

  ```js
  var array1 = ["a", "b", "c"];
  for (index in array1) {
    console.log(index); // 0, 1, 2
  }
  ```

  ```js
  var array1 = ["a", "b", "c"];
  for (element of array1) {
    console.log(element); // es6 語法 'a', 'b', 'c'
  }
  ```

### 副程式

```js
sayHi(); // 這種宣告函式的方式有「宣告提升」的效果
function sayHi() {
  console.log("hi");
}
```

```js
sayHi(); // Uncaught ReferenceError: Cannot access 'sayHi' before initialization
const sayHi = function() {
  console.log("hi");
};
```

### try...catch...

```js
try {
  if (!a) {
    throw new Error("a 不存在");
  }
} catch (error) {
  console.log(error);
} finally {
  console.log("結束");
}
```

### 物件

- 宣告物件

  - 物件實字

    ```js
    var person = {
      name: "elaine",
      age: 20,
    };
    ```

  - 建構式

    ```js
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    var person = new Person("elaine", 20);
    ```

- 存取物件屬性與方法 `.`、`[]`

  ```js
  console.log(person.name);
  console.log(person["name"]);
  ```

- 物件是 call by reference

  ```js
  var person = {
    name: "小明",
    money: 1000,
  };

  var person2 = person;
  person2.name = "杰倫";

  console.log(person);
  console.log(person2);
  console.log(person === person2);
  ```

  ![](https://i.imgur.com/r9PN8s7.png)

- JavaScript 並沒有物件導向的概念，他是利用 `Prototype` 和閉包來達到物件導向的效果

  ```js
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype.sayHi = function() {
    console.log("Hi! " + this.name);
  };

  const person1 = new Person("Elaine", 20);
  person1.sayHi(); // "Hi! Elaine"
  ```

- ES6 語法 Class

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

  const person1 = new Person("Elaine", 20);
  person1.sayHi(); // "Hi! Elaine"
  ```

- 其他常用的物件

  ```js
  var now = new Date();
  var num = Math.floor(Math.random() * 100 + 1); // 隨機產生 1 ~ 100
  var str = "hello world world";
  var regex = /world/g;
  regex.test(str); // true
  str.match(regex); // ["world", "world"]
  ```
