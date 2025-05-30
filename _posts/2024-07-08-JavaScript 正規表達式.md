---
layout: post
title: "JavaScript 正規表達式"
date: 2024-07-08 00:00:01 +0800
categories: JavaScript
tags: ["JavaScript"]
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
- `\S`
