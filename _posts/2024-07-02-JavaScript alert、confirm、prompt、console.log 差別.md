---
layout: post
title: "JavaScript alert、confirm、prompt、console.log 差別"
date: 2024-07-02 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
redirect_from: 
  - "/2019/09/10/JavaScript-alert-confirm-prompt-console.log"
---

在開發 JavaScript 應用程式時，我們經常需要與使用者互動或除錯。JavaScript 提供了一些內建的方法來達到這些目的，本文將介紹 alert、confirm、prompt 和 console.log 這四種常用的方法，並說明它們的使用情境和差異。

### JavaScript 原生對話框

- `alert`、`confirm`、`prompt` 都可以產生對話框
- 這些對話框有阻塞作用，不點選項，後續程式碼無法繼續執行
- 只能輸出字串，所以會自動呼叫 `toString()` 方法

### alert

`alert` 方法用來顯示一個簡單的提示框，裡面只有一條訊息和一個 "確定" 按鈕。當 `alert` 框出現時，使用者必須點擊 "確定" 按鈕才能繼續操作。

語法：
```js
alert(message);
```

例子：
```js
alert("哈囉啊");
```

![](/assets/img/posts/KiB57Lu.png)

#### 使用情境

`alert` 常用來顯示簡單的通知或警告訊息。例如，當使用者提交表單但有必填欄位未填寫時，可以使用 `alert` 提醒使用者。

### confirm

`confirm` 方法顯示一個帶有 "確定" 和 "取消" 按鈕的提示框。這個方法會返回一個布林值，表示使用者的選擇（`true` 表示點擊 "確定"，`false` 表示點擊 "取消"）。

語法：
```js
const result = confirm(message);
```

例子：
```js
const userConfirmed = confirm("確定要離開嗎?");
if (userConfirmed) {
  alert("好喔掰掰"); // 按下確定才會顯示"好喔掰掰"
}
```

![](/assets/img/posts/4AWNvIr.png)

#### 使用情境

confirm 常用於需要使用者進行二選一決定的情況，例如刪除操作、退出確認等。

### prompt

`prompt` 方法顯示一個帶有文字輸入框的提示框，並且包含 "確定" 和 "取消" 按鈕。這個方法會返回使用者輸入的內容（字串），如果使用者點擊 "取消"，則返回 `null`。

- 如果點取消按鈕，會回傳 `"null"`，是字串型態！

語法：
```js
const userInput = prompt(message);
const userInput = prompt(message, default); // 第二個參數為預設值
```

例子：
```js
var name = prompt("你叫啥名?", "豬");

if (name !== "null" && name !== "") {
  alert("你好 " + name);
}
```

![](/assets/img/posts/dGbtRBd.png)

#### 使用情境

`prompt` 用於需要使用者輸入一些資料的情況，例如獲取使用者的名字、意見或其他資料。

### console.log

`console.log` 方法用來在瀏覽器的控制台輸出訊息。這對於除錯和開發過程中特別有用，因為它可以顯示變數的值、錯誤訊息和其他重要資訊。

語法：
```js
console.log(any);
console.log(anyMessage1, anyMessage2);  // 可以用 , 一直串下去
```

例子：
```js
console.log("hi elaine!");
```

![](/assets/img/posts/2Y8Kf6t.png)

#### 使用情境

`console.log` 是開發過程中最常用的除錯工具之一，用於檢查變數值、程式流程、錯誤訊息等。

除了 `console.log` 之外，JavaScript 的 console 物件還提供了許多其他有用的方法來協助我們進行除錯和記錄，可以參考我另一篇文章 [除了 console.log 之外你還知道哪些 console](/posts/除了-console.log-之外你還知道哪些-console/)

### 常見問題

#### 使用 alert 時，出現 [object Object]

![](/assets/img/posts/MpQqJdL.png)

`alert` 只能輸出字串，所以會自動呼叫 `toString()` 方法，遇到這種情況就是因為你使用 `alert` 印出物件

```js
var obj1 = { name: "elaine" };
alert(obj1);
```

#### alert 可以換行嗎？

- HTML 的 `<br>` 換行符號，並不會產生換行效果

```js
alert("哈囉！<br>我是 elaine");
```

![](/assets/img/posts/cJpZDaJ.png)

- `\n` 可以成功的換行

```js
alert("哈囉！\n我是 elaine");
```

![](/assets/img/posts/Vt5VUB2.png)

### 參考資料

- [簡介 alert()與 console.log()的不同 Script](https://www.itread01.com/p/1028845.html)
- [mdn - prompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
