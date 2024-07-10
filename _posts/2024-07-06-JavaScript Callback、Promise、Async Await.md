---
layout: post
title: "JavaScript Callback、Promise、Async Await"
date: 2024-07-06 22:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
---

在上一篇文章中，我們探討了 [JavaScript 同步與非同步](/posts/JavaScript-同步與非同步/)。這篇文章將進一步介紹 JavaScript 中實現非同步操作的三種主要方式：`Callback`、`Promise` 和 `Async Await`。這些技術各有優劣，適用於不同的場景和需求。

### Callback

#### 概念

當某事發生時，請利用這個函數通知我。就像當客戶打給你時，你正在跟別人通電話，所以你會請客戶稍等，等你講完這通電話再回撥給他。

#### 例子：

- 點擊事件：「當有人點擊這顆按鈕時，請用這個函數通知我」
 
  ```js
  document.getElementById("id").addEventListener("click", function() {
    alert("這是 callback");
  });
  ```

- 定時器：「當過了三秒時，請用這個函數通知我」

  ```js
  setTimeout(function() {
    alert("這是 callback");
  }, 3000);
  ```

- `window.onload`：「當網頁載入完成時，請用這個函數通知我」

  ```js
  window.onload = function() {
    alert("這是 callback");
  };
  ```

#### 優點：

- 簡單直觀：Callback 函數的概念簡單，易於理解和使用

#### 缺點：

- Callback 地獄：當多層 Callback 嵌套時，程式碼變得難以閱讀和維護
- 錯誤處理困難：需要手動處理每個 Callback 中的錯誤，容易出現疏漏

![image](/assets/img/posts/ryCqn08wA.png)

### Promise

#### 概念

`Promise` 是 ES6 引入的一種異步編程解決方案。它是一個代表未來某個值或事件的對象，可以處理異步操作的最終成功 `resolved` 或失敗 `rejected` 結果。

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "資料已取得";
      resolve(data);
    }, 1000);
  });
}

fetchData()
  .then((data) => {
    console.log("處理資料:", data);
  })
  .catch((error) => {
    console.error("發生錯誤:", error);
  });
```

#### 優點

- 鏈式調用：可以使用 `.then()` 進行鏈式調用，使程式碼更具可讀性
- 錯誤處理更容易：可以使用 `.catch()` 方法統一處理錯誤

#### 缺點

- 相對複雜：相比 Callback ，`Promise` 的概念和使用稍微複雜一些，對新手不太友好
- 不夠直觀：處理錯誤和追踪異步操作的狀態有時會變得繁瑣
- 嵌套地獄：雖然 `Promise` 通常比 Callback 更易於閱讀，但如果使用不當，仍然可能導致多層嵌套，難以維護

### Async Await

#### 概念

`async` 和 `await` 是 ES8 引入的語法糖，用於簡化基於 `Promise` 的異步操作。`async` 函數會自動返回一個 `Promise`，而 `await` 關鍵字可以暫停函數的執行，等待 `Promise` 解決。

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "資料已取得";
      resolve(data);
    }, 1000);
  });
}

async function processData() {
  try {
    const data = await fetchData();
    console.log("處理資料:", data);
  } catch (error) {
    console.error("發生錯誤:", error);
  }
}

processData();
```

#### 優點

- 同步風格的代碼：使異步代碼看起來像同步代碼，增加可讀性
- 錯誤處理簡單：可以使用 `try...catch` 進行錯誤處理

#### 缺點

- 需要理解 `Promise`：雖然語法簡化，但仍需理解 `Promise` 的概念

### Best Practices

#### Callback Best Practices

##### 避免回呼地獄

每個 Callback 都被拆分成單獨的函數，並且每個函數都具有描述性的名稱，使程式碼更易於閱讀和維護，但還是要避免太多層 Callback，會影響閱讀和 trace code 還有 error handler

```js
function firstTask(callback) {
  setTimeout(() => {
    console.log("第一個任務完成");
    callback();
  }, 1000);
}

function secondTask(callback) {
  setTimeout(() => {
    console.log("第二個任務完成");
    callback();
  }, 1000);
}

function thirdTask(callback) {
  setTimeout(() => {
    console.log("第三個任務完成");
    callback();
  }, 1000);
}

function executeTasks() {
  firstTask(() => {
    secondTask(() => {
      thirdTask(() => {
        console.log("所有任務完成");
      });
    });
  });
}

executeTasks();
```

##### 錯誤處理

在 Callback 中處理錯誤並將錯誤傳遞給下一個回呼

```js
function firstTask(callback) {
  setTimeout(() => {
    try {
      console.log("第一個任務完成");
      callback(null);
    } catch (error) {
      callback(error);
    }
  }, 1000);
}
```

#### Promise Best Practices

##### 鏈式調用

利用 `.then()` 和 `.catch()` 進行鏈式調用

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "資料已取得";
      resolve(data);
    }, 1000);
  });
}

fetchData()
  .then((data) => {
    console.log("處理資料:", data);
    return anotherTask(data);
  })
  .catch((error) => {
    console.error("發生錯誤:", error);
  });
```

##### 避免嵌套

避免嵌套，將多個 `Promise` 進行平行處理

```js
Promise.all([fetchData(), anotherTask()])
  .then((results) => {
    console.log("所有任務完成:", results);
  })
  .catch((error) => {
    console.error("發生錯誤:", error);
  });
```

#### Async Await Best Practices

##### 錯誤處理

使用 `try...catch` 來捕獲並處理錯誤

```js
async function processData() {
  try {
    const data = await fetchData();
    console.log("處理資料:", data);
  } catch (error) {
    console.error("發生錯誤:", error);
  }
}

processData();
```

##### 效能優化，同時進行異步操作

在非同步操作中，使用 `Promise.all` 同時處理多個異步操作，進一步提高效能

```js
async function processMultipleTasks() {
  try {
    const [data1, data2] = await Promise.all([fetchData(), anotherTask()]);
    console.log("所有資料已取得:", data1, data2);
  } catch (error) {
    console.error("發生錯誤:", error);
  }
}

processMultipleTasks();
```

##### UI 反饋

在進行長時間的非同步操作時，應給使用者提供適當的反饋，如顯示加載動畫或提示訊息，改善使用者體驗

```js
async function fetchDataWithFeedback() {
  try {
    showLoadingSpinner();
    const data = await fetchData();
    console.log("處理資料:", data);
  } catch (error) {
    console.error("發生錯誤:", error);
  } finally {
    hideLoadingSpinner();
  }
}

fetchDataWithFeedback();
```

### 參考資料

- [Introducing asynchronous JavaScript - Callbacks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#callbacks)
- [Callback Hell and How to Rescue it ?](https://dev.to/jerrycode06/callback-hell-and-how-to-rescue-it-ggj)
- [JavaScript 中的同步與非同步（上）：先成為 callback 大師吧！](https://blog.huli.tw/2019/10/04/javascript-async-sync-and-callback/index.html?fbclid=IwAR2c8Fc-AZz3uhV3Sd-dCcV67Yu_7fY-UpSane8sRFu9YQWc2kHX9x34qtc)
