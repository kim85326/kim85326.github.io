---
layout: post
title: "JavaScript 同步、非同步"
date: 2017-06-10 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

### Callback 回呼

- 概念：當客戶打給你時，你正在跟別人通電話，所以你會請客戶稍等，等你講完這通電話再回撥給他
- 當某事發生的時候，請利用這個 function 通知我

  - 把 function b 以參數的方式傳入 function a，那麼 a 做完才會再做 b
  - 常用點擊事件「當有人點擊這顆按鈕時，請用這個 function 通知我」

    ```js
    $("#id").click(function() {
      alert("這是 callback");
    });
    ```

  - setTimeout「當過了三秒時，請用這個 function 通知我」

    ```js
    setTimeout(function() {
      alert("這是 callback");
    }, 3000);
    ```

  - window.onload 「當網頁載入完成時，請用這個 function 通知我」

    ```js
    window.onload = function() {
      alert("這是 callback");
    };
    ```

### 同步與非同步

![](https://i.imgur.com/iRTIQdG.jpg)

- Synchronous 同步
  - 代表執行時程式會卡在那一行，直到有結果為止
- Asynchronous 非同步
  - 代表執行時不會卡住，但執行結果不會放在回傳值，而是需要透過 callback function (回呼函式) 來接收結果
  - 例如 ajax、setTimeout

### 參考資料

- [JavaScript 全攻略：克服 JS 的奇怪部分](https://www.udemy.com/javascriptjs/learn/v4/content)
- [[筆記] 談談 JavaScript 中的 asynchronous 和 event queue](https://pjchender.blogspot.tw/2016/01/javascriptasynchronousevent-queue.html)
- [JavaScript 同步延遲 ( Promise + setTimeout )](http://www.oxxostudio.tw/articles/201706/javascript-promise-settimeout.html)
- [JavaScript 中的同步與非同步（上）：先成為 callback 大師吧！](https://blog.huli.tw/2019/10/04/javascript-async-sync-and-callback/index.html?fbclid=IwAR2c8Fc-AZz3uhV3Sd-dCcV67Yu_7fY-UpSane8sRFu9YQWc2kHX9x34qtc)
