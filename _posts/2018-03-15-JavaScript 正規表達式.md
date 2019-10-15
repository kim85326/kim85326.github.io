---
layout: post
title: "JavaScript 正規表達式"
date: 2018-03-15 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

正規表達式 Regular Expression，簡寫 regex、regexp 都可

### 普通字元

```js
var regexp = /a/;
var str = "This is a apple";
console.log(regexp.test(str)); //true
```

### 特殊字元

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

### 任意字元

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

### 多個字元

`[]` 匹配中括號內所有字元

```js
var regexp = /[ab]/;

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

縮寫

- `\w` 所有字母，等同於 `[a-zA-Z]`
- `\d` 所有數字，等同於 `[0~9]`
- `\s` space，等同於 `[\n\r\t]`
- `\W` 不是字母，等同於 `[^\w]`
- `\D` 不是數字，等同於 `[^\d]`
- `\S` 不是 space，等同於 `[^\s]`

### 出現次數

- `*` 任意次數
- `+` 至少 1 次
- `?` 零或 1 次
- `{2}` 最少 2 次
- `{3,10}` 最少 3 次且最多 10 次

### 開頭結尾

- `^` 開頭
- `$` 結尾

```js
var regexp = /^He/;

var str1 = "Hello";
console.log(regexp.test(str1)); //true

var str2 = "YoYo Hello";
console.log(regexp.test(str2)); //false
```

```js
var regexp = /o$/;

var str1 = "Hello";
console.log(regexp.test(str1)); //true

var str2 = "Hello Elaine";
console.log(regexp.test(str2)); //false
```

### 參考資料

- [[線上讀書會] 承億 主講 regular expression](https://www.youtube.com/watch?v=xrMH9uMNGt8)
- [正規表達式符號速查表](https://blog.fntsr.tw/articles/2017/02/05/regular-expression-cheatsheet/)
- [正则基础之——贪婪与非贪婪模式](https://blog.csdn.net/lxcnn/article/details/4756030)
- [贪婪量词和惰性量词](https://zh.javascript.info/regexp-greedy-and-lazy)
