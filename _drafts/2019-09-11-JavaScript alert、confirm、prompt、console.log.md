---
layout: post
title: "JavaScript alert、confirm、prompt、console.log"
date: 2019-09-11 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
redirect_from: 
  - "/2019/09/10/JavaScript-alert-confirm-prompt-console.log"
---

### 對話框

- `alert`、`confirm`、`prompt` 都可以產生對話框
- 這些對話框有阻塞作用，不點選項，後續程式碼無法繼續執行
- 只能輸出字串，所以會自動呼叫 `toString()` 方法

#### alert

- 彈出提示對話框
- `window.alert(message)`
- `alert(message)`

```js
alert("哈囉啊");
```

![](https://i.imgur.com/KiB57Lu.png)

#### confirm

- 彈出確認對話框
- `result = window.confirm(message)`
- `result = confirm(message)`

```js
if (confirm("確定要離開嗎?")) {
  alert("好喔掰掰"); // 按下確定才會顯示"好喔掰掰"
}
```

![](https://i.imgur.com/4AWNvIr.png)

#### prompt

- 彈出輸入對話框
- 如果點取消按鈕，會回傳 `"null"`，是字串型態！
- `result = window.prompt(message, default);`
- `result = prompt(message[, default]);`

```js
var name = prompt("你叫啥名?", "豬");

if (name !== "null" && name !== "") {
  alert("你好 " + name);
}
```

![](https://i.imgur.com/dGbtRBd.png)

### console.log

- debug 用的

```js
console.log("hi elaine!");
```

![](https://i.imgur.com/2Y8Kf6t.png)

### 常見問題

1. 使用 `alert` 時，出現 `[object Object]`

   ![](https://i.imgur.com/MpQqJdL.png)

   alert 只能輸出字串，所以會自動呼叫 toString() 方法
   遇到這種情況就是因為你使用 alert 印出物件

   ```js
   var obj1 = { name: "elaine" };
   alert(obj1);
   ```

2. `alert` 可以換行嗎？

   - HTML 的 `<br>` 換行符號，並不會產生換行效果

   ```js
   alert("哈囉！<br>我是 elaine");
   ```

   ![](https://i.imgur.com/cJpZDaJ.png)

   - `\n` 可以成功的換行

   ```js
   alert("哈囉！\n我是 elaine");
   ```

   ![](https://i.imgur.com/Vt5VUB2.png)

### 參考資料

- [簡介 alert()與 console.log()的不同 Script](https://www.itread01.com/p/1028845.html)
- [mdn - prompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
