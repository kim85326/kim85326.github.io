---
layout: post
title: "JavaScript 同步、非同步"
date: 2017-04-11 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

我學完 javascript 基礎語法之後，就去看[JavaScript 全攻略：克服 JS 的奇怪部分](https://www.udemy.com/javascriptjs/learn/v4/content)這堂課，講的真的很棒！我覺得很適合想深入了解 javascript 的人。

### callback 回呼

- 概念：當客戶打給你時，你正在通話，所以你會請客戶稍等，等你通完電話再回撥給他
- 把 function b 以參數的方式傳入 function a，那麼 a 做完才會再做 b
- 常用的 jQuery 事件，就是利用 callback 完成

```js
$("#id").click(function() {
  alert("這是callback");
});
```

- setTimeout 也是利用 callback

```js
setTimeout(function() {
  alert("這是callback");
}, 3000); //3秒(3000毫秒)之後，做callback
```

### 同步與非同步

![](https://i.imgur.com/iRTIQdG.jpg)

- synchronous (同步) 指的是 one at a time，也就是程式會逐列執行，一次執行一列
- asynchronous (非同步) 多了一個 a，指的就是 more than one at a time，也就是程式在執行的時候會同時執行不只一列的程式碼
  - 例如 ajax、setTimeout
- Sync 與 Async 的差別在於：發送需求的人是否需要等到需求完成才可以執行其他事情。

參考資料<br>
[[筆記] 談談 JavaScript 中的 asynchronous 和 event queue](https://pjchender.blogspot.tw/2016/01/javascriptasynchronousevent-queue.html)<br>
[JavaScript 同步延遲 ( Promise + setTimeout )](http://www.oxxostudio.tw/articles/201706/javascript-promise-settimeout.html)<br>
