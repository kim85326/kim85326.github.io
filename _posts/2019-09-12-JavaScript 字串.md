---
layout: post
title: "JavaScript 字串"
date: 2019-09-12 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

### 取得長度

- `length`

  - 取得字串長度
  - `stringObject.length`

  ```js
  var str = "Hello world";
  console.log(str.length); // 11
  ```

### 搜尋

- `indexOf`

  - 從字串前端(或是第 fromIndex + 1 個字開始)搜尋 searchValue，並回傳位置
  - 如果沒有出現，會回傳 `-1`
  - 大小寫要相符
  - `stringObject.indexOf(searchValue [,fromIndex])`
    - fromIndex 參數為負數的話，會從後面開始往前數，來知道指定的開始位置

  ```js
  var str = "ABCABCABC";
  console.log(str.indexOf("ABC")); // 0
  console.log(str.indexOf("ABC", 2)); // 3
  console.log(str.indexOf("ABC", 4)); // 6
  console.log(str.indexOf("C", -3)); // 2，從倒數第三個位置開始找
  console.log(str.indexOf("ABC", -1)); // 0，從倒數第一個位置開始找
  console.log(str.indexOf("abc")); // -1
  console.log(str.indexOf("DD")); // -1
  ```

- `lastIndexOf`

  - 和 `indexOf` 類似，只是是最後出現的位置
  - `stringObject.lastIndexOf(searchValue [,fromIndex])`
    - fromIndex 參數為負數的話，會視為 0

  ```js
  var str = "ABCABCABC";
  console.log(str.lastIndexOf("ABC")); // 6
  console.log(str.lastIndexOf("ABC", 2)); // 0
  console.log(str.lastIndexOf("ABC", 4)); // 3
  console.log(str.lastIndexOf("C", -3)); // -1，負數等同於指定為 0
  console.log(str.lastIndexOf("ABC", -1)); // 0，負數等同於指定為 0
  console.log(str.lastIndexOf("abc")); // -1
  console.log(str.lastIndexOf("DD")); // -1
  ```

- `includes`

  - ES6 新語法
  - 和 `indexOf` 差不多，只是回傳 boolean 值
  - `stringObject.includes(searchString[, fromIndex])`
    - fromIndex 參數為負數的話，會視為 0

  ```js
  var str = "ABCABCABC";
  console.log(str.includes("ABC")); // true
  console.log(str.includes("ABC", 2)); // true
  console.log(str.includes("ABC", 4)); // true
  console.log(str.includes("C", -3)); // true，負數等同於指定為 0
  console.log(str.includes("ABC", -1)); // true，負數等同於指定為 0
  console.log(str.includes("abc")); // false
  console.log(str.includes("DD")); // false
  ```

- `match`

  - 以正規表示式或字串來搜尋字串
  - 類似 `indexOf` 或 `lastIndexOf`，但是是回傳指定的值
  - 大小寫要相符
  - `stringObject.match(searchValue)`
  - `stringObject.match(regexp)`

  ```js
  var str1 = "Hello world world";
  console.log(str1.match("world")); // ["world"]
  console.log(str1.match("World")); // null
  console.log(str1.match("worlld")); // null
  console.log(str1.match("o")); // ["o"]

  var str2 = "1 plus 2 equal 3";
  console.log(str2.match(/\d+/g)); // ["1", "2", "3"]
  ```

- `search`

  - 和 `indexOf` 很像，只是是用正規表達式
  - `stringObject.search(regexp)`

  ```js
  var str = "Hello world world";
  console.log(str.search(/world/)); // 6
  ```

### 取得部分字串

- `charAt`

  - 取出第 index + 1 的字
  - `stringObject.charAt(index)`

  ```js
  var str = "Hello world";
  console.log(str.charAt(1)); // "e"
  ```

- `slice`

  - 複製開始與結束點（結束點不算）中的內容
  - `stringObject.slice(start [,end])`
    - 擷取 start + 1 ~ end 的字串
    - 沒有給第二個參數，會一直擷取到字串結束
    - 負數的參數會從後面開始往前數

  ```js
  var str = "Hello world";
  console.log(str.slice(6)); // "world"
  console.log(str.slice(6, 9)); // "wor"
  console.log(str.slice(9, 6)); // ""
  console.log(str.slice(-5, 9)); // "wor"
  console.log(str.slice(-9, -1)); // "llo worl"，結尾往前數9個~結尾往前1個(不含)
  ```

- `substring`

  - 和 `slice` 一樣，只差別在於 `substring` 把負數的參數視為 0
  - 但 start 和 stop 輸入相反時，會幫忙交換
  - `stringObject.substring(start [,stop])`

  ```js
  var str = "Hello world";
  console.log(str.substring(6)); // "world"
  console.log(str.substring(6, 9)); // "wor"
  console.log(str.substring(9, 6)); // "wor"
  console.log(str.substring(-5, 9)); // "Hello wor"，負數視為0
  console.log(str.substring(-9, -1)); // ""，負數視為0，所以是第0個~第0個
  ```

- `substr`

  - 和 `slice` 差不多，只差別在於第二個參數是長度
  - `stringObject.substr(start [,length])`

  ```js
  var str = "Hello world";
  console.log(str.substr(6)); // "world"
  console.log(str.substr(6, 2)); // "wo"
  console.log(str.substr(9, 100)); // "ld"
  console.log(str.substr(100, 2)); // ""
  console.log(str.substr(-5, 9)); // "world"，後面數來第5個，長度為9
  console.log(str.substr(-9, -1)); // ""，第二個參數為負數，將視為0
  ```

### 取代

- `replace`

  - 取代符合字串或正規式的字串，並回傳字串
  - `stringObject.replace(regexp, replacement)`
  - `stringObject.replace(substr, replacement)`

    - regexp 正規式
      - `g` 代表 global 全局
      - `i` 代表 ignore 忽略大小寫
    - replacement 如果是字串，就直接替換

    ```js
    var str = "Hello world world";
    console.log(str.replace("world", "Elaine")); // "Hello Elaine world"
    console.log(str.replace(/world/, "Elaine")); // "Hello Elaine world"
    console.log(str.replace(/world/g, "Elaine")); // "Hello Elaine Elaine"
    console.log(str); // "Hello world world"
    ```

    - replacement 如果是 \\\\\$\$
      - 第一個 `()` 是 `$1`，第二個 `()` 是 `$2`

    ```js
    var str = "Elaine, Li";
    console.log(str.replace(/(\w+), (\w+)/, "$2, $1")); // "Li, Elaine"
    ```

    - replacement 如果是方法

    ```js
    var str = "aaa bbb ccc";
    console.log(
      str.replace(/\b\w+\b/g, function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
      })
    ); // "Aaa Bbb Ccc"，將第一個字元轉成大寫
    ```

### 大小寫轉換

- `toLowerCase`

  - 將字串轉為小寫
  - `stringObject.toLowerCase()`

  ```js
  var str = "Hello world";
  console.log(str.toLowerCase()); // "hello world"
  ```

- `toUpperCase`

  - 將字串轉為小寫
  - `stringObject.toUpperCase()`

  ```js
  var str = "Hello world";
  console.log(str.toUpperCase()); // "HELLO WORLD"
  ```

### 去除前後空白

- `trim`

  - 去除前後空白
  - `stringObject.trim()`

  ```js
  var str = "    Hello world     ";
  console.log(str.trim()); // "Hello world"
  ```

### 串接字串

- `concat`

  - 串接字串
  - 類似 `array` 的 `concat`
  - 但用 `+` 會比較易讀
  - `stringObject.concat(stringX, stringX, ..., stringX)`

  ```js
  var str1 = "Hello ";
  var str2 = "world";
  console.log(str1.concat(str2)); // "Hello world"
  ```

### 轉為陣列

- `split`

  - 將字串轉換為陣列
  - `stringObject.split(separator [,limit])`
    - 以 separator 作為分割字元，limit 為最大分割數

  ```js
  var str = "How are you doing today?";
  console.log(str.split(" ")); //["How", "are", "you", "doing", "today?"]
  console.log(str.split("")); //["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "d", "o", "i", "n", "g", " ", "t", "o", "d", "a", "y", "?"]
  console.log(str.split(" ", 3)); //["How", "are", "you"]
  ```

### 參考資料

- [mdn - String.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
- [JS 不再百度系列-字串的基本操作](https://www.itread01.com/hkliyqf.html)
