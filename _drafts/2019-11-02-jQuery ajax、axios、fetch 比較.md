---
title: "jQuery ajax、axios、fetch 比較"
date: 2019-11-02 00:00:00 +0800
categories: [JavaScript]
tags: [JavaScript] 
description: ""
---

### jQuery ajax

```js
$.ajax({
  type: "POST",
  url: url,
  data: data,
  dataType: dataType,
  success: function() {},
  error: function() {},
});
```

- 對原生 XHR 的封裝
- 支援 JSONP
- 缺點
  - 不太符合前端 MVVM 架構
  - 整包太大，只是要一個 ajax 方法，卻要引入整個 jQuery

### axios

```js
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

- 對原生 XHR 的封裝，且支援 Promise
- Vue、React 都推薦使用
- 支援瀏覽器和 NodeJS
- 支援防止 CSRF
- 支援併發
- 支援取消請求
- 支援攔截請求與回應

### fetch

```js
async function () {
	try {
	  const response = await fetch(url);
	  const data = response.json();
	  console.log(data);
	} catch(e) {
	  console.log("error", e);
	}
}
```

- 新的原生 JavaScript 語法，要兼容舊的必須使用 polyfill
- 語法簡潔
- 解決 callback hell
- 基於 Promise 實現，支援 async/await
- 更加底層，有豐富的 API (Request、Response)
- 脫離 XHR，將來有可能會取而代之
- 缺點
  - 只對網路或跨網域噴錯，對 4xx、5xx 都當做成功的請求，需要封裝去處理
  - 需要設定 credentials 才能從服務端傳送或接收任何 cookies
  - 不支援 timeout
    - 使用 setTimeout 及 Promise.reject 的實現的超時控制，並不能阻止請求過程繼續在後台運行，造成了流量的浪費
  - 沒有辦法原生監測請求的進度，而 XHR 可以

### 參考資料

- [Jquery ajax, Axios, Fetch 区别之我见](https://segmentfault.com/a/1190000012836882)
- [Ajax、fetch、axios 的区别与优缺点](https://blog.csdn.net/qq_36407875/article/details/84642060)
