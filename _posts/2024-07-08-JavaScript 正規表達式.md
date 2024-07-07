---
layout: post
title: "JavaScript 正規表達式"
date: 2024-07-08 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
---

正規表達式 (Regular Expressions) 是一種用於匹配字串模式的強大工具。在 JavaScript 中，正規表達式由 `RegExp` 物件表示，可以用來執行強大的字串搜索和替換功能。

### 基本語法

創建正規表達式的方法有兩種：

1. 使用正規表達式字面值（regular expression literal），包含兩個 `/` 字元之間的模式：
    
    ```js
    const regex = /pattern/flag;
    ```

2. 使用 `RegExp` 物件的建構函式：

    ```js
    const regex = new RegExp('pattern', 'flag');
    ```

我個人比較常用是 1，很多程式語言都是直接這樣寫的

- pattern 除了可以放字以外，還有一些常用的
    - `.` 匹配任意單個字符
    - `\d` 匹配一個數字
    - `\w` 匹配一個字母或數字或下劃線 `_`
    - `\s` 匹配一個空白字符
    - `^` 匹配字串的開頭
    - `$` 匹配字串的結尾
- flag 常用
    - `g` 全域搜索
    - `i` 忽略大小寫

#### 普通字元

```js
var regexp = /a/;
var str = "This is a apple";
console.log(regexp.test(str)); //true
```

#### 特殊字元

特殊字元 `[\^$.|?*+()` 前要用反斜線 `\`

```js
var regexp = /if\(true\)/;
var str = "if(true) { doSomething() }";
console.log(regexp.test(str)); //true
```

```js
var regexp = /\+/;
var str = "1+1=2";
console.log(regexp.test(str)); //true
```

#### 任意字元

`.` 來代表可以接受任意字元

```js
var regexp = /h.o/;

var str1 = "hao";
console.log(regexp.test(str1)); //true

var str2 = "h o";
console.log(regexp.test(str2)); //true

var str1 = "hello";
console.log(regexp.test(str1)); //false

var str3 = "ho";
console.log(regexp.test(str3)); //false
```

#### 多個字元

`[]` 匹配括號內所有字元即可

```js
var regexp = /[ab]/;    // 要出現 a 或 b

var str1 = "abc";
console.log(regexp.test(str1)); //true

var str2 = "apple";
console.log(regexp.test(str2)); //true

var str1 = "banana";
console.log(regexp.test(str1)); //true

var str3 = "cccc";
console.log(regexp.test(str3)); //false
```

- `[a-z]` 所有小寫英文字母 a ~ z
- `[a-zA-Z]` 所有大小寫英文字母 a ~ z 或 A ~ Z
- `[0~9]` 數字 0 ~ 9
- `[^a]` 不是 a 的字
- `[^0~9]` 不是所有數字

其他常見的

- `\w` 所有字母，等同於 `[a-zA-Z]`
- `\d` 所有數字，等同於 `[0~9]`
- `\s` space，等同於 `[\n\r\t]`
- `\W` 不是字母，等同於 `[^\w]`
- `\D` 不是數字，等同於 `[^\d]`
- `\S` 不是 space，等同於 `[^\s]`

#### 出現次數

- `*` 任意次數
- `+` 至少 1 次
- `?` 零或 1 次
- `{2}` 最少 2 次
- `{3,10}` 最少 3 次且最多 10 次

#### 開頭結尾

- `^` 開頭
- `$` 結尾

```js
var regexp = /^He/; // 要 He 開頭的

var str1 = "Hello";
console.log(regexp.test(str1)); //true

var str2 = "YoYo Hello";
console.log(regexp.test(str2)); //false
```

```js
var regexp = /o$/;  // 要 o 做結尾的

var str1 = "Hello";
console.log(regexp.test(str1)); //true

var str2 = "Hello Elaine";
console.log(regexp.test(str2)); //false
```

### JavaScript Methods

在 JavaScript 中，正規表達式通常會與以下幾個方法一起使用：

#### test

用於測試正規表達式是否能匹配一個字串

```js
const regex = /hello/;
const result = regex.test('hello world');
console.log(result); // true
```

#### exec

用於在一個字串中執行搜索，並返回一個包含匹配結果的數組。如果沒有找到匹配，則返回 `null`

```js
const regex = /(\d{4})-(\d{2})-(\d{2})/;
const result = regex.exec('2024-07-08');
console.log(result); // ["2024-07-08", "2024", "07", "08"]
```

#### match

用於在一個字串中搜索匹配，並返回一個包含所有匹配結果的數組

```js
const str = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const result = str.match(regex);
console.log(result);  // ["T", "I"]
```

#### matchAll

用於返回一個包含所有匹配結果的迭代器，包括捕獲組

```js
const str = 'test1test2';
const regex = /t(e)(st(\d?))/g;
const result = str.matchAll(regex);
for (const match of result) {
  console.log(match); // ["test1", "e", "st1", "1"] ["test2", "e", "st2", "2"]
}
```

#### replace

用於替換與正規表達式匹配的子字串

```js
const str = 'Hello world!';
const result = str.replace(/world/, 'JavaScript');
console.log(result); // Hello JavaScript!
```

#### search

用於在字串中搜索與正規表達式匹配的子字串，並返回匹配開始的索引，找不到則返回 -1

```js
const str = 'Hello world!';
const result = str.search(/world/);
console.log(result); // 6
```

#### split

用於使用正規表達式分割字串，並返回一個包含子字串的數組

```js
const str = 'Jan,Feb,Mar,Apr,May,Jun';
const result = str.split(/,/);
console.log(result); // ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
```

### 實際運用範例

#### 範例1 - 驗證電子郵件地址

```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = emailRegex.test('example@example.com');
console.log(isValidEmail); // true
```

#### 範例2 - 提取數字

```js
const str = 'I have 2 apples and 3 oranges.';
const numberRegex = /\d+/g;
const numbers = str.match(numberRegex);
console.log(numbers); // ["2", "3"]
```

#### 範例3 - 字串取代

將電話號碼格式化為 09xx-xxx-xxx 的形式

```js
const text = '我的電話是 0912345678';
const phoneRegex = /(\d{4})(\d{3})(\d{3})/;
const formattedText = text.replace(phoneRegex, '$1-$2-$3');
console.log(formattedText); // 我的電話是 0912-345-678
```

關於 `$1-$2-$3`：
- `$1`：代表正則表達式中第 1 個捕獲組的匹配結果，即電話號碼的前 4 位數字 0912
- `$2`：代表正則表達式中第 2 個捕獲組的匹配結果，即電話號碼的中間 3 位數字 345
- `$3`：代表正則表達式中第 3 個捕獲組的匹配結果，即電話號碼的最後 3 位數字 678

#### 範例4 - 群組

可以使用 `()` 來創建 group，可以從匹配中提取子字串

```js
const regex = /(\d{4})-(\d{2})-(\d{2})/;
const date = '2024-07-08';
const result = regex.exec(date);
console.log(result); // ["2024-07-08", "2024", "07", "08"]
```

可以使用 `(?:)` 來忽略該 group，結果就不會顯示那個 group

```js
const regex = /(?:\d{4})-(\d{2})-(\d{2})/;
const date = '2024-07-08';
const result = regex.exec(date);
console.log(result); // ["2024-07-08", "07", "08"]
```

正規表達式在 JavaScript 中是一種強大的工具，可以幫助我們進行複雜的字串操作。掌握正規表達式的基本語法和常見模式，可以極大提高我們處理字串的效率。

希望這篇文章對你有幫助！

### 參考資料

- [mdn - 正規表達式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_expressions)
- [[線上讀書會] 承億 主講 regular expression](https://www.youtube.com/watch?v=xrMH9uMNGt8)
- [正規表達式符號速查表](https://blog.fntsr.tw/articles/2017/02/05/regular-expression-cheatsheet/)
- [正则基础之——贪婪与非贪婪模式](https://blog.csdn.net/lxcnn/article/details/4756030)
- [贪婪量词和惰性量词](https://zh.javascript.info/regexp-greedy-and-lazy)
