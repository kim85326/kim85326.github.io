---
layout: post
title: "去抖 Debounce & 節流 Throttle 優化前端效能"
date: 2024-07-08 00:00:00 +0800
categories: JavaScript
tags: ["JavaScript", "Vue"]
mathjax: true
description: ""
---

在現代前端開發中，Debounce 和 Throttle 是兩個常見的技術，用於控制高頻率事件的觸發次數。這些技術能夠幫助優化性能，提升應用的響應速度和用戶體驗。本篇文章將介紹 Debounce 和 Throttle 的概念、區別以及如何在 Vue 3 中使用這些技術。

### 去抖 Debounce

Debounce 的概念是將高頻率觸發的事件（如輸入框輸入事件）進行延遲處理，只有在事件停止觸發一段時間後才執行相應的函數。這樣可以防止多次重複執行相同的操作

#### 原理

兩秒後在執行，兩秒內有人又來，就再延後

```js
function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);    // 等過 delay 才真正執行
    }, delay);
  }
}

const debouncedFunction = debounce(function(e) {
  console.log(e.target.value);
}, 2000);

document.querySelector('input').addEventListener('input', debouncedFunction);
```

#### 使用場景

- 按鈕提交：防止多次提交按鈕，只執行最後一次提交
- 伺服器驗證：表單驗證需要伺服器端配合時，只執行連續輸入事件的最後一次，例如即時搜尋、Email 是否被註冊過

#### 範例

不需要重複造輪，可以直接使用 [lodash-es](https://lodash.com/docs/4.17.15)，是使用 `lodash-es` 不是 `lodash` 哦，`lodash-es` 利用 tree shaking 技術來減少最終打包文件的大小

```bash
npm install --save lodash-es
```

```vue
<template>
  <div>
    <input type="text" v-on:input="handleInput" />
    <p>搜尋結果：{{ searchResult }}</p>
  </div>
</template>

<script setup>
import { debounce } from 'lodash-es';
import { ref } from 'vue';

const input = ref('');
const searchResult = ref('');

async function fetchSearchResult(query) {
  // 模擬 API 請求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`搜尋結果為：${query}`);
    }, 500);
  });
};

const handleInput = debounce(async (event) => {
  input.value = event.target.value;
  searchResult.value = await fetchSearchResult(input.value);
}, 2000);
</script>
```

### 節流 Throttle

Throttle 的概念是將高頻率觸發的事件進行節流處理，在一定的時間間隔內只執行一次函數。這樣可以確保在特定時間內，事件處理函數最多只會被調用一次

#### 原理

與 Debounce 的程式邏輯相似，只多了一個時間間隔的判斷 (例如：兩秒內只有一次)

```js
function throttle(func, delay) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {  // 正在執行，就跳過
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false; // delay 後才釋放 inThrottle，讓後面的人可以再執行
      }, delay);
    }
  }
}

const throttledFunction = throttle(function(e) {
  console.log(e.target.value);
}, 2000);

document.querySelector('input').addEventListener('input', throttledFunction);
```

#### 使用場景

- 拖曳：固定時間內只執行一次，防止超高頻次觸動位置變動
- 縮放：監控瀏覽器 resize
- 動畫：避免短時間內多次觸發動畫引發效能問題

#### 範例

這裡也是直接使用 `lodash-es`

```vue
<template>
  <div>
    <div v-on:scroll="handleScroll" style="height: 200px; overflow-y: scroll;">
      <div style="height: 1000px;">Scroll me</div>
    </div>
    <p>滾動位置：{{ scrollPosition }}</p>
  </div>
</template>

<script setup>
import { throttle } from 'lodash-es';
import { ref } from 'vue';

const scrollPosition = ref(0);

const handleScroll = throttle((event) => {
  scrollPosition.value = event.target.scrollTop;
}, 2000);
</script>
```

### 總結

Debounce 和 Throttle 是兩個強大的工具，可以幫助控制高頻事件的觸發，從而優化性能。Debounce 適用於需要在事件停止後執行的場景，而 Throttle 適用於需要在固定時間間隔內執行的場景。在實際運用中，我們可以使用 lodash 庫輕鬆實現這些功能，提升應用的用戶體驗和性能。


### 參考資料

- [http://demo.nimius.net/debounce_throttle/](http://demo.nimius.net/debounce_throttle/)
- [[javascript] throttle 與 debounce，處理頻繁的 callback 執行頻率](https://blog.camel2243.com/2017/06/05/javascript-throttle-%E8%88%87-debounce%EF%BC%8C%E8%99%95%E7%90%86%E9%A0%BB%E7%B9%81%E7%9A%84-callback-%E5%9F%B7%E8%A1%8C%E9%A0%BB%E7%8E%87/)
