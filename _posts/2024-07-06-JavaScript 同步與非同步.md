---
layout: post
title: "JavaScript 同步與非同步"
date: 2024-07-06 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
---

### JavaScript 是單執行緒

由於 JavaScript 是單執行緒的，這意味著一次只能執行一個任務。如果某個任務需要等待（例如網路請求或 I/O 操作），這會阻塞整個執行過程。為了避免這種情況，我們可以使用非同步。在非同步中，可以在等待的同時繼續執行其他操作，從而更有效地利用系統資源，提升應用程式的效能和使用者體驗。

### 什麼是同步？

同步是指程式碼在執行時需要按順序進行，後一個操作必須等待前一個操作完成後才能開始。在 JavaScript 中，這意味著如果一段程式碼是同步的，整個執行流程會被阻塞，直到該段程式碼完成為止。

#### 同步例子：排隊買票

想像你和朋友一起去電影院看電影，這是同步操作的例子：

1. 你們排在售票處的隊伍裡
2. 每個人依次買票，前面的人買完票後才輪到你
3. 你只能等前面的人買完票，然後才輪到你們

在這個例子中，買票的過程必須按順序進行，不能同時進行，所以這是同步的

```js
function buyTicket() {
  console.log("正在購買票...");
  console.log("票已購買！");
}

buyTicket();
console.log("享受電影！");
```

在這段程式碼中，`buyTicket` 函數必須完全執行完畢後，才會繼續執行後面的 `console.log("享受電影！")`。

### 什麼是非同步？

非同步是指程式碼執行不必按順序進行，可以在等待某個操作完成的同時繼續執行其他操作。在 JavaScript 中，常用的非同步方式包括回呼函數、`Promises` 和 `async/await`。

#### 非同步例子：網上買票

現在，想像你和朋友一起在網路上購票，這是非同步操作的例子：

1. 你打開購票網站，選擇電影和場次，並提交訂單
2. 網站在後台處理你的訂單，同時處理其他人的訂單
3. 在等待購票確認的同時，你可以瀏覽其他電影資訊，或做其他事情

在這個例子中，購票和確認的過程是非同步的。你提交訂單後，網站可以同時處理多個訂單，你也不必等待其他人的訂單處理完成才能處理你的訂單。

```js
function buyTicketAsync() {
  return new Promise((resolve) => {
    console.log("正在購買票...");
    setTimeout(() => {
      console.log("票已購買！");
      resolve();
    }, 2000); // 模擬網絡延遲
  });
}

buyTicketAsync().then(() => {
  console.log("享受電影！");
});

console.log("等待購票時做其他事情...");
```

在這段程式碼中，`buyTicketAsync` 函數返回一個 `Promise`，模擬非同步購票操作。在購票過程中，可以執行其他操作。

### 避免等待浪費資源

JavaScript 的單執行緒特性意味著如果我們在寫程式碼時遇到需要等待的操作，比如網路請求或 I/O 操作，會阻塞整個執行過程，導致資源浪費和效能問題。使用非同步可以讓我們在等待的同時繼續執行其他操作，充分利用系統資源，提升應用的效率。

例如，在購票的非同步例子中，我們在等待購票確認的同時，可以瀏覽其他電影資訊或進行其他操作，這樣可以避免等待時間的浪費，提升使用者體驗。


### 同步與非同步的應用場景

![](/assets/img/posts/iRTIQdG.jpg)

#### 同步應用場景

- 簡單的計算或邏輯處理：這些操作執行迅速，且不會阻塞應用程序
- 順序依賴的操作：當一個操作必須依賴於前一個操作的結果時，使用同步方式可以保證順序

#### 非同步應用場景

- 網絡請求：如 API 調用、數據加載等，這些操作通常需要較長時間
- I/O 操作：如文件讀寫、數據庫查詢等，這些操作通常涉及外部資源，時間不可控

同步與非同步是 JavaScript 寫程式中的兩個核心概念，理解並靈活應用這些概念對於提升應用程式的效能和使用者體驗至關重要。通過選擇適當的寫程式方式和遵循最佳實踐，我們可以開發出更高效、更穩定的應用程式。

### 參考資料

- [[筆記] 談談 JavaScript 中的 asynchronous 和 event queue](https://pjchender.blogspot.tw/2016/01/javascriptasynchronousevent-queue.html)
- [JavaScript 同步延遲 ( Promise + setTimeout )](http://www.oxxostudio.tw/articles/201706/javascript-promise-settimeout.html)
- [JavaScript 中的同步與非同步（上）：先成為 callback 大師吧！](https://blog.huli.tw/2019/10/04/javascript-async-sync-and-callback/index.html?fbclid=IwAR2c8Fc-AZz3uhV3Sd-dCcV67Yu_7fY-UpSane8sRFu9YQWc2kHX9x34qtc)

