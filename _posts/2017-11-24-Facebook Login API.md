---
layout: post
title: "Facebook Login API"
date: 2017-11-24 00:00:00 +0800
categories: api
tags: facebook api
mathjax: true
---

1. 先到 facebook developer
   [傳送門](https://developers.facebook.com/apps/)

2. 點選新增應用程式 => 填你應用程式要顯示的名稱 => 點選建立應用程式編號

![](https://i.imgur.com/8blZnhx.png)

![](https://i.imgur.com/SGW8Ioc.png)

3. 點選 facebook 登入

![](https://i.imgur.com/zoRf6no.png)

4. 點選網站

![](https://i.imgur.com/qoW0thw.png)

5. 填你的網站網址 => save => 繼續
   ![](https://i.imgur.com/1jc2ki5.png)

6. 下面就是介紹要怎麼使用 Facebook JavaScript SDK

### 設定 Facebook JavaScript SDK

```js
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{latest-api-version}'
    });

    FB.AppEvents.logPageView();

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
```

這段的意思是載入 facebook javascript sdk

- 要修改的部分是
  1. 以應用程式編號取代 {your-app-id}
  2. 以 SDK 版本取代 {latest-api-version}
- 可以到主控版找到這些資訊

![](https://i.imgur.com/lu8hxRU.png)

### 檢查登入狀態

```js
FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});
```

這段的作用是每當載入網頁的時候，都要去判斷用戶是否已經使用「Facebook 登入」來登入你的應用程式。

- 這裡的 response 是一個物件，裡面長這樣

```js
{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}
```

- status 說明此應用程式用戶的登入狀態。狀態可能為以下其中一項：
  - connected - 這位用戶已登入 Facebook，也已經登入您的應用程式。
  - not_authorized - 這位用戶已登入 Facebook，但尚未登入您的應用程式。
  - unknown - 這位用戶沒有登入 Facebook，因此您無法得知用戶是否已登入您的應用程式，或者之前已呼叫 FB.logout()，因此無法連結至 Facebook。
- 如果狀態是 connected，就會包含 authResponse，且由以下資料所構成：
  - accessToken - 含有這位應用程式用戶的存取權杖。
  - expiresIn - 以 UNIX 時間顯示權杖何時到期並需要再次更新。
  - signedRequest - 已簽署的參數，其中包含這位應用程式用戶的資訊。
  - userID - 這位應用程式用戶的編號。
- 我們要拿取用戶的資料必須要有 accessToken

### 新增「Facebook 登入」按鈕

```html
<fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
</fb:login-button>
```

- 上面是簡單版的登入按鈕 ![](https://i.imgur.com/gVHWuQ3.png)
  如果你想做客製化的登入按鈕![](https://i.imgur.com/XBeIWmM.png)
  可以利用外掛程式配置器 [傳送門](https://developers.facebook.com/docs/facebook-login/web/login-button)
- onlogin 的屬性是用於設定檢察登入狀態的 js，了解用戶是否登入，會呼叫 checkLoginState

```js
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
```

- checkLoginState 會呼叫 getLoginStatus 來取得最新登入狀態

### 公開發佈應用程式

點選左側的應用程式審查 => 是否發佈 => 是 => 選擇類別 => 確認

![](https://i.imgur.com/L0ziUiN.png)

![](https://i.imgur.com/gsdhQaO.png)

現在，你的應用程式目前已對外公開上線。

## 整體實現

#### 分為五個檔案

- index.html
- login.html
- fb_auth.js
  - 裡面放連接 Facebook JavaScript SDK 的東西，因為幾乎每個檔案都共用這段程式碼，所以提出來變成一個 file
- index.js
- login.js

#### 說明

- 進到 index.html 時，如果沒登入，就強制跳轉到 login.html
- 進到 login.html 時，如果發現已經登入了，就強制跳轉到 index.html

#### 程式碼

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script
      scr="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    ></script>
  </head>
  <body>
    <div class="container">
      <h1>首頁</h1>
      <div id="status"></div>
      <button class="btn btn-primary" onclick="logout()">登出</button>
    </div>
    <script type="text/javascript" src="fb_auth.js"></script>
    <script type="text/javascript" src="index.js"></script>
  </body>
</html>
```

##### login.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script
      scr="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    ></script>
  </head>
  <body>
    <div class="container">
      <h1>登入</h1>
      <!-- 客製化fb登入按鈕 -->
      <div id="fb-root"></div>
      <div
        class="fb-login-button"
        data-max-rows="1"
        data-size="medium"
        data-button-type="login_with"
        data-show-faces="false"
        data-auto-logout-link="false"
        data-use-continue-as="false"
        scope="public_profile,email"
        onlogin="checkLoginState();"
      ></div>
    </div>
    <script type="text/javascript" src="fb_auth.js"></script>
    <script type="text/javascript" src="login.js"></script>
  </body>
</html>
```

##### fb_auth.js

```js
//連接 Facebook JavaScript SDK
window.fbAsyncInit = function() {
  FB.init({
    appId: "1762819617084102", //更改你的應用程式編號
    cookie: true,
    xfbml: true,
    version: "v2.11" //更改你的SDK 版本
  });

  //每次載入頁面就去確認用戶的登入狀況
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
```

##### index.js

```js
//檢查登入狀態
function statusChangeCallback(response) {
  console.log("statusChangeCallback");
  console.log(response);
  if (response.status === "connected") {
    //取得用戶資料，但這種只有name和id
    FB.api("/me", function(response) {
      console.log(response);
      document.getElementById("status").innerHTML =
        response.name + "<br/>" + response.id + "歡迎登入";
    });
  } else {
    alert("請登入");
    document.location.href = "login.html";
  }
}

//登出按鈕
function logout() {
  FB.logout(function(response) {
    alert("登出成功");
    window.location.reload();
  });
}
```

##### login.js

```js
//按下登入按鈕時，檢查登入狀態
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log("statusChangeCallback");
  console.log(response);
  //如果已經登入就把他帶到index.html
  if (response.status === "connected") {
    //拿到用戶的token去跟fb要使用者資料
    get_profile(response.authResponse.accessToken);
    document.location.href = "index.html";
  }
}

//透過token去跟fb要用戶資料
function get_profile(token) {
  console.log("Welcome!  Fetching your information.... ");
  //field後面的參數取決你要取得用戶的欄位，這邊是取得用戶的 id,name,first_name,last_name,email
  var url = `https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token=${token}`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //data就是我們要的用戶資料
      var data = JSON.parse(xhr.responseText);
      //之後你可以做任何你想做的事...例如塞到你的資料庫中
    }
  };
  xhr.send();
}
```
