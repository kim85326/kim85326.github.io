---
layout: post
title: "JavaScript XMLHttpRequest、Fetch 和 Axios 差別"
date: 2024-07-07 01:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
---

在進行網絡請求時，JavaScript 提供了多種方式來與伺服器進行通信。最常見的三種方式是 XMLHttpRequest、Fetch 和 Axios。在探討它們的差異、優缺點以及使用場景之前，可以先閱讀上一篇文章 [JavaScript AJAX](/posts/JavaScript-AJAX/)

### XMLHttpRequest

XMLHttpRequest（XHR）是最早期用於在瀏覽器與伺服器之間傳輸資料的 API，它允許在不重新加載整個頁面的情況下進行 HTTP 請求。

#### 語法

- `var xhr = new XMLHttpRequest()`，代表產生一個 XHR 物件
- `xhr.open(方法, URL, [是否為非同步])`
    - 初始化設定
    - 預設為 `true`，非同步
- `xhr.send()` 送出請求
- `xhr.addEventListener("load", callback)` 使用 Callback 等資料回來
- XHR 有各種狀態碼 (readyState)，不是 HTTP Status Code 哦！
    - `xhr.readyState = 0`，代表已經產生 `XMLHttpRequest`，但還沒發
    - `xhr.readyState = 1`，代表用了 `open()`，但還沒傳送資料過去
    - `xhr.readyState = 2`，代表用了 `send()`
    - `xhr.readyState = 3`，代表還在載入資料
    - `xhr.readyState = 4`，代表載入完畢，資料已經完全
- `xhr.status` 代表 HTTP Status Code

#### 範例

##### 範例1 - 取得資料

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "./data.json");
xhr.addEventListener("load", function() {
    console.log(xhr.responseText);
});
xhr.send();
```

##### 範例2 - 登入 (application/x-www-form-urlencoded)

```js
var xhr = new XMLHttpRequest();
xhr.open("POST", "./login");
xhr.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
);
xhr.addEventListener("load", function() {
    console.log(xhr.responseText);
});
xhr.send("name=elaine&password=123");
```

##### 範例3 - 登入 (application/json)

```js
var account = {
    name: "elaine",
    password: "123",
};
var xhr = new XMLHttpRequest();
xhr.open("post", "https://xxx", true);
xhr.setRequestHeader("Content-type", "application/json");
var data = JSON.stringify(account);
xhr.send(data);
```

##### 完整範例

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>練習 XMLHttpRequest</title>
    </head>
    <body>
        <textarea id="responseText"></textarea>
        <script>
            function success(text) {
                var textarea = document.getElementById("responseText");
                textarea.value = text;
            }

            function fail(code) {
                var textarea = document.getElementById("responseText");
                textarea.value = "Error code: " + code;
            }

            function pending() {
                var textarea = document.getElementById("responseText");
                textarea.value = "loading...";
            }

            var request = new XMLHttpRequest();

            // 狀態發生變化時會執行這個 callback
            request.onreadystatechange = function() {
                // 判斷是否請求完成
                if (request.readyState === 4) {
                    // 判斷 status code 是否為成功
                    if (request.status === 200) {
                        return success(request.responseText);
                    } else {
                        return fail(request.status);
                    }
                } else {
                    return pending();
                }
            };

            // 設定 URL 與 HTTP 方法
            request.open("GET", "/users");
            // 發送請求
            request.send();
        </script>
    </body>
</html>
```

#### 優點

- 瀏覽器支援度廣泛：XHR 在所有現代瀏覽器中都被支援

#### 缺點

- 複雜性高：語法相對複雜，需要處理多種狀態和事件
- 可讀性差：相比於 `Fetch` 和 `Axios`，`XHR` 的程式碼可讀性較差

### Fetch

Fetch 是一種現代化的接口，用於發送 HTTP 請求。它基於 `Promise`，提供了更簡潔的語法和更好的可讀性

#### 語法

- `fetch(url, options)`
  - url：請求的 URL
  - options，常見的欄位如下
    
    ```js
    fetch(url, {
      body: JSON.stringify(data), // request body 要用 json 格式，記得要搭配 header 的 content-type
      credentials: "same-origin", // 決定 cookie 要不要帶過去 server，可以設定 include, same-origin, omit
      headers: {
        "content-type": "application/json", // 跟 server 說我要傳 JSON 格式過去囉
      },
      method: "POST", // http method 可以帶 GET, POST, PUT, PATCH, DELETE，預設是 GET
    })
    ```

- response 物件
  - `response.status`：一個整數（預設值為 200），包含回應的狀態碼
  - `response.statusText`：一個字串（預設值為 "OK"），對應於 HTTP 狀態碼訊息
  - `response.ok`：這是一個檢查 HTTP status code 是否在 200-299 範圍內的簡寫。這會回傳一個 bool
- server 回傳的資料是 JSON 格式的話，要使用 `await response.json()` 來解析出來 object

##### 注意：

- `fetch()` 回傳的 `promise` 不會 reject HTTP 的 error status，就算是 HTTP 404 或 500 也一樣。相反地，它會正常地 resolve，並把 `ok` status 設為 `false`。會讓它發生 reject 的只有網路錯誤或其他會中斷 request 的情況
- 記得 `response.json()` 是一個 `Promise`，要用 `.then()` 或是 `await` 才可以解出來

#### 範例

##### 範例1：取得資料 (使用 GET & 解析 response JSON 資料)

```js
async function fetchData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchData();
```

##### 範例2：登入 (使用 POST & request body 帶 JSON)

```js
async function login() {
    const account = {
        name: "elaine",
        password: "123",
    };
    try {
        const response = await fetch('https://xxx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

login();
```

#### 優點

- 簡潔語法：基於 `Promise`，使程式碼更簡潔和易於理解
- 更好的錯誤處理：可以通過 `.then()` 和 `.catch()` 方法處理請求和錯誤，也可以用 `async await` 搭配 `try..catch`

#### 缺點

- 支援限制：不支援所有舊版瀏覽器（如 IE）
- 錯誤處理不足：`Fetch` 只會在網絡錯誤時拒絕 `Promise`，對於 4xx 或 5xx 狀態碼需要手動檢查
- 不支援進度事件：
  - XMLHttpRequest 支援進度事件，可以追蹤請求的上傳和下載進度
  - fetch API 則不支援進度事件，這在需要進度監控的場景中是一個限制

### Axios

Axios 是一個基於 `Promise` 的 HTTP 客戶端，適用於瀏覽器和 Node.js。它提供了更豐富的功能和更簡潔的 API，但是他不是原生的，需要安裝

#### 安裝 Axios

可以使用 `npm install axios`，也可以使用 CDN 方式載入

```html
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
```

詳細的安裝方式請看 [Github - Axios Installing](https://github.com/axios/axios?tab=readme-ov-file#installing)

#### 語法

```js
import axios from 'axios';

async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

- axios 有提供幾個方便的 method
  - `axios.request(config)`
  - `axios.get(url[, config])`
  - `axios.delete(url[, config])`
  - `axios.head(url[, config])`
  - `axios.options(url[, config])`
  - `axios.post(url[, data[, config]])`
  - `axios.put(url[, data[, config]])`
  - `axios.patch(url[, data[, config]])`
- 也可以先建立 instance，設定一些共用的東西，再使用上面的 method

  ```js
  const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  ```

- 常見的 request config，其他請參考 [Github - Axios Request Config](https://github.com/axios/axios?tab=readme-ov-file#request-config)

  ```js
  const instance = axios.request({
    baseURL: 'https://some-domain.com/api/',
    url: '/user',
    method: 'get',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'},
    params: { // query parameters
      ID: 12345
    },
    data: { // request body，可以是 string，也可以是 object 或是 URLSearchParams
      firstName: 'Fred'
    },
    withCredentials: true, // 決定 cookie 要不要帶過去 server，default 是 false
  });
  ```


#### 設定 Base URL

你可以通過設定 Axios 的實例來設置一個全局的 base URL，這樣所有的請求都會自動使用這個 base URL

```js
const apiClient = axios.create({
    baseURL: 'https://api.example.com'
});

async function fetchData() {
    try {
        const response = await apiClient.get('/endpoint');
        console.log(response.data);
    } catch (error) {
        console.error('API request error:', error);
    }
}

fetchData();
```

#### 設定 timeout

```js
const apiClient = axios.create({
    baseURL: 'https://api.example.com'
    timeout: 3000,  // 3000 代表 3s，default 是 0 (代表沒有 timeout)
});
```

#### 攔截器

攔截器允許你在請求或回應被處理之前進行操作。以下是設定請求和回應攔截器的範例

```js
const apiClient = axios.create({
    baseURL: 'https://api.example.com'
});

// request 攔截器
apiClient.interceptors.request.use((config) => {
    console.log('Request sent:', config);
    config.headers.Authorization = `Bearer ${yourToken}`; // 常見的是 request header 加上 token
    return config;
}, error => {
    // 在請求發送之前，如果出現錯誤（例如，請求配置不正確）
    return Promise.reject(error);
});

// response 攔截器
apiClient.interceptors.response.use((response) => {
    console.log('Response received:', response);
    return response;
}, (error) => {
    // response error 攔截器
    console.error('Response error:', error);
    return Promise.reject(error);
});

async function fetchDataWithInterceptors() {
    try {
        const response = await apiClient.get('/endpoint');
        console.log(response.data);
    } catch (error) {
        console.error('API request error:', error);
    }
}

fetchDataWithInterceptors();
```

#### Cancel Request

從 v0.22.0 開始，Axios 支援使用 AbortController 來以 fetch API 的方式取消請求：

```js
const controller = new AbortController();

async function fetchData() {
  try {
    const response = await axios.get('/user/12345', {
      signal: controller.signal
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();

// 取消 Request
controller.abort()
```

在 Axios 0.22.0 之前，取消請求使用的是 CancelToken，這是 Axios 自定義的一種取消機制

```js
const cancelTokenSource = axios.CancelToken.source();

async function fetchData() {
  try {
    const response = await axios.get('/user/12345', {
      cancelToken: cancelTokenSource.token
    });
    console.log(response.data);
  } catch (error) {
    if (axios.isCancel(error)) {
      // 處理請求取消的錯誤
      console.log('請求已取消', error.message);
    } else {
      // 處理錯誤
      console.error(error);
    }
  }
}

fetchData();

// 取消請求（訊息參數是可選的）
cancelTokenSource.cancel('操作已被使用者取消。');
```

##### 完整取消 Request 範例

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <title>Axios 請求取消範例</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <button id="fetchDataBtn">獲取數據</button>
    <button id="cancelRequestBtn">取消請求</button>
    <div id="result"></div>
    <script>
      document.getElementById('fetchDataBtn').addEventListener('click', fetchData);
      document.getElementById('cancelRequestBtn').addEventListener('click', cancelRequest);

      let controller;

      async function fetchData() {
        // 創建一個新的 AbortController
        controller = new AbortController();

        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            signal: controller.signal
          });
          document.getElementById('result').textContent = JSON.stringify(response.data, null, 2);
        } catch (error) {
          if (axios.isCancel(error)) {
            document.getElementById('result').textContent = '請求已取消';
          } else {
            document.getElementById('result').textContent = '錯誤: ' + error.message;
          }
        }
      }

      function cancelRequest() {
        if (controller) {
          // 取消請求
          controller.abort();
          document.getElementById('result').textContent = '正在取消請求...';
        }
      }
    </script>
</body>
</html>
```

#### 範例

##### 範例1 - 登入 (application/x-www-form-urlencoded)

```js
async function login() {
  try {
    const params = new URLSearchParams({
      name: 'elaine',
      password: '123'
    });
    const response = await axios.post('/login', params);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

login();
```

##### 範例2 - 登入 (application/json)

```js
async function login() {
    try {
      const account = {
        name: 'elaine',
        password: '123'
      };
      const response = await axios.post('/login', account);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
}

login();
```

#### 優點

- 簡潔語法：更簡潔的語法和更好的可讀性
- 自動轉換：自動轉換 `JSON` 資料
- 攔截器：提供請求和回應攔截器，方便處理請求和回應
- 更好的錯誤處理：對 4xx 和 5xx 錯誤有更好的處理
- 更容易的設定：例如 cancel request、timeout、base url

#### 缺點

- 額外依賴：`Axios` 不是原生的，需要額外引入 `Axios` 套件

### 小結

- XMLHttpRequest：適合需要對請求和回應進行詳細控制的場景，但語法相對複雜，可讀性差
- Fetch：適合現代瀏覽器和簡單的網絡請求，語法簡潔，但對錯誤處理不夠完善
- Axios：提供了更豐富的功能和更簡潔的 API，適合需要處理多種請求和回應邏輯的場景，但不是原生的，所以需要額外引入套件

### 參考資料

- [mdn - Using Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
- [github - axios](https://github.com/axios/axios?tab=readme-ov-file)
