---
layout: post
title: "JavaScript 字串比對有哪些"
date: 2024-07-03 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
---

在 JavaScript 中，字串比對有多種方法，每種方法都有其特定的用途和優點。以下是一些常用的字串比對方法：

### 直接比較

1. 使用 `===`

    ```js
    const str1 = "hello";
    const str2 = "hello";
    const str3 = "Hello";

    console.log(str1 === str2); // true
    console.log(str1 === str3); // false
    ```

2. 使用 `<` 和 `>`

    可以用來比較字串的字典順序

    ```js
    const strA = "apple";
    const strB = "banana";

    console.log(strA < strB); // true
    console.log(strA > strB); // false
    ```

### 使用 localeCompare 方法

`localeCompare` 方法返回一個數字，表示參數字串在當前字串之前、之後或相同的位置。特別適合用於需要考慮本地化（locale）和排序規則的情況

語法：

```js
str1.localeCompare(str2, [locales, [options]])
```

- locales（可選）：
    - 一個 BCP 47 語言標籤字串或字串陣列，用於指定比較應使用的語言。若未提供，則使用默認語言環境
    - 常見有 `en`, `th-TH`, `vi-VN`, `zh-Hans`, `id-ID`, `ja-JP`, `ko-KR`, `my-MM`, `pt-br`
    - 中文可以使用 `zh-Hans`
    - 可以參考 [ISO Language Code Table](http://www.lingoes.net/en/translator/langcode.htm)
- options（可選）：一個對象，用於定義比較行為。常用的選項包括：
    - `sensitivity`：控制比較的敏感度，有以下值：
        - `'base'`：僅比較字母和數字，忽略重音符號和大小寫
        - `'accent'`：比較字母和數字及重音符號，忽略大小寫
        - `'case'`：比較字母和數字及大小寫，忽略重音符號
        - `'variant'`：比較字母和數字、重音符號和大小寫
    -  `numeric`：`true` 為數字排序，`false` 為字典排序

- 回傳值
    - 當 `str1` 出現在 `str2` 之前時，返回負數
    - 當 `str1` 出現在 `str2` 之後時，返回正數
    - 如果兩者相等，則返回 0
    - 注意：**請勿依賴返回值精確為 -1 或 1！**
        - 負數和正數的返回結果在不同的瀏覽器之間（以及不同版本的瀏覽器之間）可能會有所不同，因為 ECMAScript 規範僅要求返回負值和正值。某些瀏覽器可能返回 -2 或 2，甚至其他的負數或正數

例子：

```js
const a = "réservé";
const b = "reserve";

console.log(a.localeCompare(b)); // 返回 1，表示 'réservé' 大於 'reserve'
console.log(a.localeCompare(b, 'en', { sensitivity: 'base' })); // 返回 0，忽略重音符號後兩者相等
```

```js
const str1 = "ä";
const str2 = "z";

// 使用德語環境
console.log(str1.localeCompare(str2, 'de')); // 返回負數，表示 'ä' 小於 'z'

// 使用瑞典語環境
console.log(str1.localeCompare(str2, 'sv')); // 返回正數，表示 'ä' 大於 'z'
```

### 使用正規表達式

正規表達式可以用於更複雜的字串比對需求，如模式匹配和部分字串檢查。

1. 測試是否匹配

    `test` 方法返回一個布爾值，表示是否找到了匹配。

    ```js
    const str = "Hello, world!";
    const regex = /hello/i; // i 為忽略大小寫

    console.log(regex.test(str)); // true
    ```

2. 查找匹配

    `match` 方法返回一個包含所有匹配結果的陣列。

    ```js
    const str = "The quick brown fox jumps over the lazy dog.";
    const regex = /the/gi;  // i 忽略大小寫, g 為全局匹配，也就是說不僅匹配第一個符合條件，是匹配所有符合條件的

    console.log(str.match(regex)); // ["The", "the"]
    ```

### 使用 includes 方法

`includes` 方法用於檢查一個字串是否包含另一個子字串，返回 `boolean`

```js
const str = "Hello, world!";
console.log(str.includes("world")); // true
console.log(str.includes("earth")); // false
```

### 使用 indexOf 方法

`indexOf` 方法返回子字串在父字串中首次出現的位置，若未找到則返回 `-1`

```js
const str = "Hello, world!";
console.log(str.indexOf("world")); // 7
console.log(str.indexOf("earth")); // -1
```

### 使用 startsWith 和 endsWith 方法

這些方法用於檢查字串是否以某個子字串開始或結束

```js
const str = "Hello, world!";
console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("world!")); // true
```

### 使用 substring 或 slice 方法

這些方法可以提取字串的一部分，然後進行比較。

```js
const str = "Hello, world!";

const subStr1 = str.substring(0, 5); // "Hello"
console.log(subStr1 === "Hello"); // true

const subStr2 = str.slice(0, 5); // "Hello"
console.log(subStr2 === "Hello"); // true
```

### 使用 toLowerCase 或 toUpperCase 方法

這些方法可以用於進行不區分大小寫的比較。

```js
const str1 = "Hello";
const str2 = "hello";

console.log(str1.toLowerCase() === str2.toLowerCase()); // true
```

### 小心瀏覽器支援度

大部分現代的字串比對方法在主流現代瀏覽器中都有良好的支持，但對於 `localeCompare`、`includes`、`startsWith` 和 `endsWith` 這些較新的方法，在使用時需要考慮較舊瀏覽器的兼容性問題。可以通過 Polyfill 來確保功能的一致性。如果擔心兼容性，也可以使用 `indexOf` 取代 `includes`。此外，若你使用打包工具和 Babel，它也可以幫你生成向下兼容的程式碼。可以到 [can i use](https://caniuse.com) 看看他的瀏覽器兼容性。

#### 更安全的 localeCompare

為了實作 `localeCompare` 過程中避免瀏覽器不支援，可以採取一些 fallback 策略，確保在不支持的情況下仍能進行有效的字串比較。以下是幾種實現策略：

1. 檢查 localeCompare 支援度

    可以檢查當前環境是否支持 `localeCompare`，並根據檢查結果選擇相應的處理方式：

    ```js
    function basicStringCompare(str1, str2) {
        if (str1 > str2) return 1;
        if (str1 < str2) return -1;
        return 0;
    }

    function isSupportLocales() {
        try {
            "foo".localeCompare("bar", "i");
        } catch (e) {
            return e.name === "RangeError";
        }
        return false;
    }

    function safeLocaleCompare(str1, str2, locales, options) {
        if (isSupportLocales()) {
            // 瀏覽器支持 localeCompare
            return str1.localeCompare(str2, locales, options);
        } else {
            // 瀏覽器不支持 localeCompare
            // 使用基本字串比較作為降級方案
            return basicStringCompare(str1, str2);
        }
    }

    // 使用 safeLocaleCompare 進行字串比較
    const str1 = "hello";
    const str2 = "Hello";
    console.log(safeLocaleCompare(str1, str2));
    ```

2. 使用 Polyfill

    如果需要更多的功能，特別是在不支持 `localeCompare` 的環境中，可以使用 polyfill。這裡提供了一個簡單的 polyfill 實現：

    ```js
    if (!String.prototype.localeCompare) {
        String.prototype.localeCompare = function (str, locales, options) {
            if (locales || options) {
                console.warn("Custom locales and options are not supported in this polyfill.");
            }
            
            // 簡單的比較方法作為降級策略
            if (this > str) return 1;
            if (this < str) return -1;
            return 0;
        };
    }

    // 還是可以使用 localeCompare
    const str1 = "hello";
    const str2 = "Hello";
    console.log(str1.localeCompare(str2));
    ```

或是你也可以去安裝第三方的 Polyfill

### 參考資料

- [String.prototype.localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
- [解決 Chrome 下 Javascript 中文排序問題](https://ww.wfublog.com/2018/10/chrome-javascript-chinese-sort.html)
- [JavaScript 中文排序問題](https://blog.darkthread.net/blog/javascript-chinese-char-sorting/)
