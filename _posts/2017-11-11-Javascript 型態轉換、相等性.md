---
layout: post
title: "JavaScript 型態轉換、相等性"
date: 2017-11-11 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

### JavaScript 資料型態

JavaScript 資料型態可分為「基本型」、「參考型」，差別在於「參考型是傳記憶體地址」

- 基本型
  - number 數值
  - string 字串
  - boolean 布林值
  - symbol 符號
  - undefined 未定義
  - null 空
- 參考型
  - array 陣列
  - object 物件
  - function 函數

### typeof() 查看資料型態

```js
console.log(typeof 101); // number
console.log(typeof 1.01); // number
console.log(typeof NaN); // number
console.log(typeof "101"); // string
console.log(typeof true); // boolean
console.log(typeof [1, 2, 3, 4]); // object
console.log(typeof { name: "Berry", age: 18 }); // objcet
console.log(typeof new Date()); // objcet
console.log(typeof function() {}); // function
console.log(typeof myCar); // undefined
console.log(typeof null); // objcet
```

### instanceOf() 查看哪一個型態的實例

- 基本型態並不是物件

```js
console.log(101 instanceof Number); // false
console.log(101 instanceof Object); // false
console.log("101" instanceof String); // false
console.log("101" instanceof Object); // false
console.log(true instanceof Boolean); // false
console.log(true instanceof Object); // false
```

```js
console.log([1, 2, 3, 4] instanceof Object); // true
console.log([1, 2, 3, 4] instanceof Array); // true
console.log({ name: "Berry", age: 18 } instanceof Object); // true
console.log({ name: "Berry", age: 18 } instanceof Array); // false
console.log(new Date() instanceof Object); // true
console.log(function() {} instanceof Object); // true
console.log(undefined instanceof Object); // false
console.log(null instanceof Object); // false
```

奇葩的 null

```js
console.log(typeof null); // object
console.log(null instanceof Object); // false
```

### 轉換型態

#### 轉字串

- String() 可以轉換型態為字串

可用於任何型態的數字、文字、變數、表達式

```js
var x = 123;
console.log(String(x)); // "123"
console.log(String(123)); // "123"
console.log(String(100 + 23)); // "123"
console.log(String(false)); // "false"
console.log(String(true)); // "true"
console.log(String(Date())); // Sat Dec 10 2016 23:08:07 GMT+0800(台北標準時間)
```

- toString() 也可以轉換型態為字串

功能和 `String()` 一樣

```js
var x = 123;
console.log(x.toString()); // "123"
console.log((123).toString()); // "123"
console.log((100 + 23).toString()); // "123"
console.log(true.toString()); // "true"
```

#### 轉數字

- Number() 可以將物件轉化成數字

```js
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(new Date())); // 1970/1/1 到現在的毫秒數
console.log(Number("123")); // 123
console.log(Number("123 456")); // NaN
```

- parseInt() 可以傳回由字串轉換而成的整數

```js
console.log(parseInt("abc")); // NaN
console.log(parseInt("123abc")); // 123
console.log(parseInt("abc123")); // NaN
console.log(parseInt("   123abc")); // 123
```

- parseFloat() 可以傳回由字串轉換而成的浮點數

```js
console.log(parseFloat("20")); // 20
console.log(parseFloat("30.00")); // 30
console.log(parseFloat("10.68")); // 10.68
console.log(parseFloat("12 22 32")); // 12
console.log(parseFloat("     80  ")); // 80
console.log(parseFloat("378abc")); // 378
console.log(parseFloat("abc378")); // NaN
```

- getTime()方法將日期轉為數字型態

將日期轉為數字，除了可以用 `Number()`，還可以用 `getTime()`

```js
var D = new Date();
D.getTime(); // 傳回 1970/1/1 到現在的毫秒數
```

### 運算式變更型態

- JavaScript 做運算時，會自動將變數做型態的轉換
  - 例如：數字和字串相加時，會全轉為字串串接
  - 例如：數字和字串相乘時，會全轉為數字運算

```js
console.log(5 * 2); // 10
console.log("5" * "2"); // 10
console.log(5 * "2"); // 10
console.log(5 + "2"); // "52"
console.log("5" + 2); // "52"
```

### if 判斷

```js
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
console.log(Boolean("")); // false
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
```

所以

```js
var a;
if (a) {
  console.log("exist");
} else {
  console.log("not exist");
}
// 輸出 not exist，因為 undefined 是 false
```

### 相等性

- `==`

  - 兩邊型態相等時

    - number、string、boolean 判斷值是否相等
    - 物件、陣列 判斷參考的目標是否相等
    - null 判斷兩邊是否都為 null
    - undefined 判斷兩邊是否都為 undefined

    ```js
    var a = ["JavaScript", "Ajax", "PHP"];
    var b = ["JavaScript", "Ajax", "PHP"];
    console.log(a == b); //false
    ```

  - 兩邊型態不相等時

    - number、string、boolean 皆轉為 number 判斷
    - 物件轉為基本型態後判斷

    ```js
    console.log(1 == true); //true
    ```

- `===`
  - 連型態都要相等才可以

![](https://i.imgur.com/eDm2Y4l.png)

### 參考資料

- [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- [parseInt()、parseFloat() 與 Number()](http://www.victsao.com/blog/81-javascript/86-javascript-parse-number)
- [[JavaScript] 型態轉換](https://dotblogs.com.tw/berrynote/2016/12/07/221015)
