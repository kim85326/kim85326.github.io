---
layout: post
title: "Javascript 型態轉換、相等性"
date: 2017-11-11 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

## 查看資料型態

### typeof() 可以查看資料型態

```js
typeof 101; // 回傳 number
typeof 1.01; // 回傳 number
typeof NaN; // 回傳 number
typeof "101"; // 回傳 string
typeof true; // 回傳 boolean
typeof [1, 2, 3, 4]; // 回傳 object
typeof { name: "Berry", age: 18 }; // 回傳 objcet
typeof new Date(); // 回傳 objcet
typeof null; // 回傳 objcet
typeof function() {}; // 回傳 function
typeof myCar; // 沒有定義所以回傳 undefined
```

## 轉換型態

### 數字轉字串

#### String() 可以轉換型態為字串

可用於任何型態的數字、文字、變數、表達式

```js
var x = 123;
String(x); // 將變數x轉為字串 "123"
String(123); // 將數字 123 轉為字串 "123"
String(100 + 23); // 將表達式 100+23 計算後轉為字串 "123"
String(false); // 返回字串 "false"
String(true); // 返回字串 "true"
String(Date()); // 將日期型態轉為字串型態 Sat Dec 10 2016 23:08:07 GMT+0800(台北標準時間)
```

#### toString() 也可以轉換型態為字串

功能和 `String()` 一樣

```js
var x = 123; // 定義變數 x 為字串 "123"
x.toString(); // 將變數 x 轉為字串 "123"
(123).toString(); // 將數字 123 轉為字串 "123"
(100 + 23).toString(); //將表達式 100+23 計算後轉為字串 "123"
```

### 字串轉數字

#### Number() 可以將物件轉化成數字

```js
Number(true); // 傳回 1
Number(false); // 傳回 0
Number(new Date()); // 傳回 1970/1/1 到現在的毫秒數
Number("123"); // 傳回 123
Number("123 456"); // 傳回 NaN
```

#### parseInt() 可以傳回由字串轉換而成的整數

```js
parseInt("abc"); // 傳回 NaN
parseInt("123abc"); // 傳回 123
parseInt("abc123"); // 傳回 NaN
parseInt("   123abc"); // 傳回 123
```

#### parseFloat() 可以傳回由字串轉換而成的浮點數

```js
parseFloat("20"); // 傳回 20
parseFloat("30.00"); // 傳回 30
parseFloat("10.68"); // 傳回 10.68
parseFloat("12 22 32"); // 傳回 12
parseFloat("     80  "); // 傳回 80
parseFloat("378abc"); // 傳回 378
parseFloat("abc378"); // 傳回 NaN
```

#### getTime()方法將日期轉為數字型態

將日期轉為數字，除了可以用 `Number()`，還可以用 `getTime()`

```js
var D = new Date();
D.getTime(); // 傳回 1970/1/1 到現在的毫秒數
```

### 運算式變更型態

JavaScript 做運算時，會自動將變數做型態的轉換
例如：數字和字串相加時

```js
var x = 5 * 2;
alert(x); // 輸出 10
x = "5" * "2";
alert(x); // 字串 5 乘字串 2 輸出 10
x = 5 * "2";
alert(x); // 數字 5 乘字串 2 輸出 10
x = 5 + "2";
alert(x); // 數字 5 加字串 2 輸出 52
x = "5" + 2;
alert(x); // 字串 5 加數字 2 輸出 52
```

### 相等性表格

![](https://i.imgur.com/eDm2Y4l.png)

### 存在

```js
Boolean(undefine); // false
Boolean(null); // false
Boolean(""); // false
```

所以

```js
var a;
if (a) {
  console.log("exist");
} else {
  console.log("not exist");
}
// 輸出 not exist，因為 undefine 是 false
```

### 參考資料

- [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- [parseInt()、parseFloat() 與 Number()](http://www.victsao.com/blog/81-javascript/86-javascript-parse-number)
- [[JavaScript] 型態轉換](https://dotblogs.com.tw/berrynote/2016/12/07/221015)
