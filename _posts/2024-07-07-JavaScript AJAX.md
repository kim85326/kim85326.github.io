---
layout: post
title: "JavaScript AJAX"
date: 2024-07-07 00:00:00 +0800
categories: 前端開發
tags: ["JavaScript"]
mathjax: true
description: ""
---

### 前端要怎麼和後端溝通？

![](/assets/img/posts/LPdcU36.png)

#### 一般請求

點一個連結 (例如 [w3schools](https://www.w3schools.com/)，可以去觀察他的 network)
1. 瀏覽器發送一般請求
2. 伺服器回應給瀏覽器
3. 瀏覽器重新載入頁面，重新渲染

![](/assets/img/posts/xaVxfV0.png)

#### AJAX 請求

點一個連結 (例如 Gmail)
1. 瀏覽器發送 AJAX 請求
2. 伺服器回應給瀏覽器
3. 瀏覽器接受後，調用 JavaScript Callback 函式，由 JavaScript 決定要不要更新畫面

![](/assets/img/posts/GF7HWQb.png)

### 什麼是 AJAX？

傳統的 Web 應用允許客戶端填寫表單 (form)，當送出表單時就向網頁伺服器傳送一個請求。伺服器接收並處理傳來的表單，然後送回一個新的網頁，但這個做法浪費了許多頻寬，因為在前後兩個頁面中的大部分 HTML 往往是 87% 相同的。由於每次應用的溝通都需要向伺服器傳送請求，應用的回應時間依賴於伺服器的回應時間。這導致了使用者介面的回應比本機應用慢得多

AJAX (Asynchronous JavaScript and XML) 應用可以在不重新加載整個頁面的情況下，僅向伺服器傳送並取回必須的資料，並在客戶端採用 JavaScript 處理來自伺服器的回應。因為在伺服器和瀏覽器之間交換的資料大量減少，伺服器回應更快了，重點是使用者也不用重新加載整個頁面

![](/assets/img/posts/2Dis8P7.png)

### JSON

雖然 AJAX 中的 `X` 代表 `XML`，但現代的應用中更多使用 `JSON` 作為數據交換格式，`JSON` 全名為 `JavaScript Object Notation`，是一種輕量級的資料交換格式，它是以 JavaScript 為基礎設計的語法，跟 `XML` 有點類似，但 `JSON` 更加簡潔、輕量

XML 寫法：
```xml
<Person>
  <Name>Elaine</Name>
  <Age>20</Age>
</Person>
```

JSON 寫法：
```json
{
  "name": "Elaine",
  "age": 20
}
```

#### 基本資料型態

- 數值
  - 十進制
  - 可以為負數，可以為小數
- 字串
  - 用 `""` 包起來
- 布林值
  - `true` 或 `false`
- 陣列
  - 用 `[]` 包起來
  - 裡面可以是任意型態
- 物件
  - 用 `{}` 包起來
  - 一個無順序的 key-value
- null

##### 注意：

- key 一定要用雙引號 `""` 包起來
- 單一個逗號或冒號放錯位置，也會讓 `JSON` 檔案出錯而無法運作，以下是錯誤例子：

  ```json
  {
      "name": "elaine",
      "age": 18,
  }
  ```

#### 為什麼使用 JSON 而不是 XML？

- 格式簡單：`JSON` 的語法結構更簡單，讀寫都比 `XML` 更容易
- 解析方便：JavaScript 可以直接解析 `JSON`，使用 `JSON.parse()` 和 `JSON.stringify()` 進行轉換，而 `XML` 需要繁瑣的 `DOM` 解析，可能要裝其他套件
- 效率更高：`JSON` 通常比 `XML` 更小，傳輸速度更快，效率更高
- 更好的可讀性：`JSON` 的格式更符合現代開發的習慣，易於人類閱讀和編寫

### AJAX 範例

當從瀏覽器發送請求到伺服器並拿到 HTML 後，通常會執行其中的 JavaScript 來更新頁面的一部分內容，而不會刷新整個頁面。這樣可以提高使用者體驗和網頁的響應速度

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AJAX Example</title>
</head>
<body>
  <h1>AJAX Example</h1>
  <button id="loadButton">Load Data</button>
  <div id="dataContainer"></div>

  <script>
    // 設定按鈕監聽器，當有人按了按鈕會觸發 callback
    document.getElementById('loadButton').addEventListener('click', function() {
      // 創建 XMLHttpRequest object
      const xhr = new XMLHttpRequest();
      
      // 配置請求
      xhr.open('GET', 'https://api.example.com/data', true);
      
      // 設置 AJAX 回來的 callback
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // 獲取資料並更新頁面
          const data = JSON.parse(xhr.responseText);
          document.getElementById('dataContainer').innerHTML = '<p>Name: ' + data.name + '</p><p>Age: ' + data.age + '</p>';
        }
      };
      
      // 發送請求
      xhr.send();
    });
  </script>
</body>
</html>
```

### 參考資料

- [mdn - Ajax](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)
- [什麼是 Ajax？ 搞懂非同步請求 (Async request) 概念](https://tw.alphacamp.co/blog/ajax-asynchronous-request)
- [前端 AJAX 全攻略](https://linyencheng.github.io/2022/09/22/relationships-between-frontend-and-backend/js-http-client-with-ajax/)
