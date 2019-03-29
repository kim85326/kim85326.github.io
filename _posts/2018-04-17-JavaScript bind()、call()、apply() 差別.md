---
layout: post
title: "JavaScript bind()、call()、apply() 差別"
date: 2018-04-17 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

在學習 bind()、call()、apply() 之前必須先搞懂 JavaScript 的 this !!!!

- bind()、call()、apply() 這些是 function 內建的方法
- 用於想要`控制 this`的時候

### `bind(想要成為this的人)`

```js
var person = {
  firstname: "elaine",
  lastname: "li",
  getFullName: function() {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  }
};

var logName = function(lang1, lang2) {
  console.log("Logged: " + this.getFullName());
  console.log("lang1= " + lang1 + ", lang2 = " + lang2);
};

var logPersonName = logName.bind(person);

logPersonName("en", "zh_tw");
```

結果

![](https://i.imgur.com/k0TabmK.png)

## `call(想要成為this的人, 參數1, 參數2...)`

- 和 bind 的差別在於：call 有執行

```js
var person = {
  firstname: "elaine",
  lastname: "li",
  getFullName: function() {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  }
};

var logName = function(lang1, lang2) {
  console.log("Logged: " + this.getFullName());
  console.log("lang1= " + lang1 + ", lang2 = " + lang2);
};

logName.call(person, "en", "zh_tw");
```

![](https://i.imgur.com/2QcN6HL.png)

### `apply(想要成為this的人, 參數陣列)`

- 和 call 的差別在於：apply 後面只接受參數以 array 的型態 ( array 的運算能力比較強大 XD)

```js
var person = {
  firstname: "elaine",
  lastname: "li",
  getFullName: function() {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  }
};

var logName = function(lang1, lang2) {
  console.log("Logged: " + this.getFullName());
  console.log("lang1= " + lang1 + ", lang2 = " + lang2);
};

logName.apply(person, ["en", "zh_tw"]);
```

### 參考資料

- [JavaScript 全攻略：克服 JS 的奇怪部分](https://www.udemy.com/javascriptjs/learn/v4/t/lecture/3604434?start=0) 的 call()、apply() 與 bind() 第 4 節，講座 50
