---
layout: post
title: "JavaScript parseInt 記得給我帶兩個參數"
date: 2024-07-08 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
---

猜猜這段程式碼，最後會印出什麼？

```js
var a = ["1", "2", "3", "4", "5", 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log(a.map(parseInt));
```

登登~~ 答案是...

```js
[1, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 9, 11, 13, 15, 17, 19]
```

意不意外？驚不驚喜？

首先，了解 `map` 和 `parseInt` 的工作原理：

### array 的 map

`map(callbackFn)`

`Array.prototype.map` 對陣列中的每個元素調用提供的函式，並返回一個新的陣列

- map 參數是一個 function，該 function 可以接收三個參數：
    - 當前元素
    - 當前 Index
    - 原本的陣列

```js
const a = [1, 2, 3];
const result = a.map((x) => Math.pow(x, 2)); // [1, 4, 9]
```

```js
const numbers = [1, 2, 3, 4];
const filteredNumbers = numbers.map((num, index) => { 
  if (index < 3) {
    return num;
  }
});

// index 從 0 開始
// filteredNumbers 最後是 [1, 2, 3, undefined]
// numbers 還是 [1, 2, 3, 4]
```

### parseInt

`parseInt(string, radix)`

`parseInt` 解析字符串並返回一個整數

- string
    - 待轉成數字的字串
    - 若不是字串型態，會先將其轉為字串
    - 無法被解析為任何數字，parseInt 會回傳 NaN
- radix
    - 基數，代表幾進制，例如二進制、十進制
    - 範圍是 `2 ~ 36`
    - 為 `undefined`、`0`、`null` 的時候
        - 如果 string 由 `0x` 或 `0X` 開始，radix 會變成代表十六進位的 16，並解析字串的餘數
        - 如果 string 由 `0` 開始，則 radix 會變成代表八進位的 8 或十進位的 10，但到底會變成 8 還是 10 則取決於各實做。ECMAScript 規定用代表十進位的 10，但也不是所有瀏覽器都支持。因此，使用 `parseInt` 時一定要指定 radix
        - 如果 string 由其他字串開始，radix 就會是十進位的 10

### 問題的根源

```js
["1", "2", "3"].map(parseInt)
```

當 `map` 方法與 `parseInt` 一起使用時，實際上發生了以下情況：

```js
["1", "2", "3"].map((element, index) => parseInt(element, index));
```

在這裡，`parseInt` 接受兩個參數：`element` 和 `index`。我們來看看每次調用 `parseInt` 時發生了什麼：

| 迭代次數 | `element` | `index` | `parseInt` 調用                       | 結果  |
| -------- | --------- | ------- | ------------------------------------- | ----- |
| 1        | `"1"`       | 0       | `parseInt("1", 0)`                    | 1     |
| 2        | `"2"`       | 1       | `parseInt("2", 1)`                    | NaN   |
| 3        | `"3"`       | 2       | `parseInt("3", 2)`                    | NaN   |

第一次調用：`parseInt("1", 0)`
- 字符串 `"1"` 被解析為基數為 `0` 的整數。在這種情況下，基數為 `0` 被解釋為基數為 `10`（十進制）
- 結果為 `1`

第二次調用：`parseInt("2", 1)`
- 字符串 `"2"` 被解析為基數為 `1` 的整數
- 基數 `1` 是無效的，因此結果為 `NaN`

第三次調用：`parseInt("3", 2)`
- 字符串 `"3"` 被解析為基數為 `2`（二進制）的整數
- `"3"` 在二進制中是無效的，因此結果為 `NaN`

這就是為什麼最終結果是 `[1, NaN, NaN]`

### 如何正確使用 parseInt 與 map

要正確地將字符串陣列解析為整數陣列，可以明確指定 `parseInt` 的基數為 10。例如：

```js
["1", "2", "3"].map(element => parseInt(element, 10));  // 結果為 [1, 2, 3]
```

這樣，每個字符串都會被解析為基數為 10 的整數，結果符合預期。

### 總結

`["1", "2", "3"].map(parseInt)` 結果為 `[1, NaN, NaN]` 的原因在於 `parseInt` 接受兩個參數，其中第二個參數（基數）實際上是 map 方法的 Index。通過明確指定基數，我們可以避免這種意外情況，確保結果符合預期。

**所以說在使用 `parseInt` 的時候記得給我寫好兩個參數！**

### 參考資料

[mdn - Array.prototype.map()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
[mdn - parseInt()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
