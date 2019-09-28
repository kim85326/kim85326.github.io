---
layout: post
title: "express 學習筆記"
date: 2018-08-01 00:00:00 +0800
categories: NodeJS
tags: express NodeJS JavaScript
mathjax: true
---

### 安裝 express

```
$ npm install --save express
```

### 簡單版伺服器

- app.js

  ```js
  var express = require("express");
  var app = express();

  app.get("/", function(request, response) {
    response.send("hello world");
  });

  // 監聽 port，預設為 3000
  var port = process.env.PORT || 3000;
  app.listen(port);
  ```

### param

找出 id 為 326 的 user
網址：`http://localhost:3000/user/326`

```js
app.get("/user/:id", function(request, response) {
  var id = request.params.id;
  // 等同於 var id = request.param("id");
  // 資料庫查詢 id 為 326 的 user
  response.send("hello world");
});
```

### query

取出 20 筆男性 user
網址：`http://localhost:3000/user?limit=20&gender=male`

```js
app.get("/user", function(request, response) {
  var limit = request.query.limit;
  var gender = request.query.gender;
  // 資料庫查詢 20 筆男性 user
  response.send("hello world");
});
```

### middleware

發出請求 (Request) 之後，到接收回應 (Response)，有中介軟體 (Middleware)

- before middleware

  - 常用在身份驗證、log 紀錄
  - 所有的路由都套用

    ```js
    var express = require("express");
    var app = express();

    // before middleware
    app.use(function(request, response, next) {
      console.log("before middleware");
      // 驗證登入狀態
      // 通過驗證才進入下一個 middleware 或是處理 request
      next();
    });

    app.get("/", function(request, response) {
      console.log("處理 request");
      response.send("hello world");
    });

    var port = process.env.PORT || 3000;
    app.listen(port);
    ```

    - `http://localhost:3000`
      - console 顯示 `before middleware` `處理 request`
      - 頁面顯示 `hello world`

  - 單一路由套用

    ```js
    var express = require("express");
    var app = express();

    function login(request, response, next) {
      console.log("login middleware");
      next();
    }

    app.get("/", login, function(request, response) {
      console.log("處理 request");
      response.send("hello world");
    });

    var port = process.env.PORT || 3000;
    app.listen(port);
    ```

    - `http://localhost:3000`
      - console 顯示 `login middleware` `處理 request`
      - 頁面顯示 `hello world`

- after middleware

  - 常用在找不到頁面，或是程式發生不可預期的錯誤
  - 404

    ```js
    var express = require("express");
    var app = express();

    app.get("/", function(request, response) {
      console.log("處理 request");
      response.send("hello world");
    });

    // after middleware
    app.use(function(request, response, next) {
      console.log("after middleware");
      response.status(404).send("抱歉，您的頁面找不到");
    });

    var port = process.env.PORT || 3000;
    app.listen(port);
    ```

    - `http://localhost:3000`
      - console 顯示 `處理 request`
      - 頁面顯示 `hello world`
    - `http://localhost:3000/123`
      - console 顯示 `處理 after middleware`
      - 頁面顯示 `抱歉，您的頁面找不到`

  - 500

    ```js
    var express = require("express");
    var app = express();

    app.get("/", function(request, response) {
      console.log("處理 request");
      hi(); // 呼叫不存在的方法
      response.send("hello world");
    });

    // after middleware
    app.use(function(error, request, response, next) {
      console.log("after middleware");
      response.status(500).send("伺服器錯誤，請稍候嘗試");
    });

    var port = process.env.PORT || 3000;
    app.listen(port);
    ```

    - `http://localhost:3000`
      - console 顯示 `處理 request` `after middleware`
      - 頁面顯示 `伺服器錯誤，請稍候嘗試`

### redirect

```js
app.get("/user", function(request, response) {
  res.redirect("/");
});
```

### router

- `index.js`

  ```js
  var express = require("express");
  var app = express();

  var user = require("./routes/user");

  app.use("/user", user);

  var port = process.env.PORT || 3000;
  app.listen(port);
  ```

- `routes/user.js`

  ```js
  var express = require("express");
  var router = express.Router();

  router.get("/", function(request, response) {
    response.send("user list");
  });

  router.get("/photo", function(request, response) {
    response.send("user photo");
  });

  module.exports = router;
  ```

### 設定靜態資源

- `app.js`

  ```js
  var express = require("express");
  var app = express();

  app.use(express.static("public"));

  app.listen(3000);
  ```

- 在 `public/` 新增靜態檔案

### body-parser

用來解析 Request 格式

- [原理分析](https://www.twblogs.net/a/5bc610db2b71775efd5b422e)

- 安裝 body-parser

  ```
  $ npm install --save body-parser
  ```

- `app.js`

  ```js
  var express = require("express");
  var bodyParser = require("body-parser");
  var app = express();

  // 支援 application/json
  app.use(bodyParser.json());

  // 支援 application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded());

  app.post("/user", function(request, response) {
    console.log(request.body);
    response.send("hello world");
  });

  var port = process.env.PORT || 3000;
  app.listen(port);
  ```

  ![](https://i.imgur.com/MNutjWT.png)

  ![](https://i.imgur.com/Dd6QRwt.png)

  ![](https://i.imgur.com/DeIoFjN.png)

  ![](https://i.imgur.com/Sr5SiAJ.png)

### cookie-parser

- 安裝 cookie-parser

  ```
  $ npm install --save cookie-parser
  ```

- `app.js`

  ```js
  var express = require("express");
  var cookieParser = require("cookie-parser");
  var app = express();

  app.use(cookieParser());

  app.get("/", function(request, response) {
    console.log(request.cookies);

    // 設定 cookie，有效期限為 10 秒
    response.cookie("name", "elaine", {
      maxAge: 10000,
      httpOnly: true,
    });

    response.send("hello");
  });

  app.listen(3000);
  ```

### morgan

- 日誌 log
- 安裝 morgan

  ```
  $ npm install --save morgan
  ```

- `app.js`

  ```js
  var express = require("express");
  var logger = require("morgan");
  var app = express();

  app.use(logger("dev"));

  app.listen(3000);
  ```

### ejs

- 安裝 `ejs-locals`

  ```
  $ npm install --save ejs-locals
  ```

- `app.js`

  ```js
  var express = require("express");
  var engine = require("ejs-locals");
  var app = express();

  app.engine("ejs", engine);
  app.set("views", "./views");
  app.set("view engine", "ejs");

  router.get("/", function(request, response) {
    res.render("index", { title: "待辦事項" });
  });

  app.listen(3000);
  ```

- `views/index.ejs`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
    </head>
    <body>
      <%= title %>
    </body>
  </html>
  ```

- 安裝 `express-ejs-extend`

  ```
  $ npm install --save express-ejs-extend
  ```

- `app.js`

  ```js
  var express = require("express");
  var engine = require("ejs-locals");
  var app = express();

  app.engine("ejs", require("express-ejs-extend")); // 新增這行
  app.engine("ejs", engine);
  app.set("views", "./views");
  app.set("view engine", "ejs");

  router.get("/", function(request, response) {
    res.render("index", { title: "待辦事項" });
  });

  app.listen(3000);
  ```

- `views/layout/layout.ejs`

  ```html
  <!DOCTYPE html>
  <html>
    <body>
      <%- content %>
    </body>
  </html>
  ```

- `views/index.ejs`

  ```html
  <% extend('./layout/layout.ejs') %>

  <h1>Hello world</h1>
  ```

- 產生的 index.html

  ```html
  <!DOCTYPE html>
  <html>
    <body>
      <h1>Hello world!</h1>
    </body>
  </html>
  ```

### nodemailer

寄送 email

- 開啟 gmail 設定

  ![](https://i.imgur.com/L1Si1AX.png)

  ![](https://i.imgur.com/mmdJicq.png)

- 安裝 nodemailer

  ```
  $ npm install --save nodemailer
  ```

- `app.js`

  ```js
  var express = require("express");
  var bodyParser = require("body-parser");
  var nodemailer = require("nodemailer");
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post("/post", function(request, response) {
    var transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "test@gmail.com",
        pass: "123456",
      },
    });

    var mailOptions = {
      from: "elaine 測試帳號",
      to: "abc@gmail.com",
      subject: request.body.username + " 寄了一封信",
      text: request.body.description,
    };

    transport.sendMail(mailOptions, function(error, info) {
      if (error) {
        response.send("寄信失敗");
      }
      response.send("寄信成功");
    });
  });

  app.listen(3000);
  ```

### csurf

- 安裝 csurf

  ```
  $ npm install --save csurf
  ```

  - 其他套件

    ```
    $ npm install --save ejs-locals cookie-parser body-parser
    ```

- `app.js`

  ```js
  var express = require("express");
  var engine = require("ejs-locals");
  var cookieParser = require("cookie-parser");
  var bodyParser = require("body-parser");
  var csrf = require("csurf");
  var app = express();

  app.engine("ejs", engine);
  app.set("views", "./views");
  app.set("view engine", "ejs");

  var parseForm = bodyParser.urlencoded({ extended: false });
  var csrfProtection = csrf({ cookie: true });
  app.use(cookieParser());

  app.get("/", csrfProtection, function(request, response) {
    response.render("index", { csrfToken: request.csrfToken() });
  });

  // 一定要先 parseForm
  app.post("/post", parseForm, csrfProtection, function(request, response) {
    // 驗證表單資料
    // 新增邏輯
    response.send("新增成功");
  });

  app.listen(3000, function() {
    console.log("http://localhost:3000");
  });
  ```

- `views/index.ejs`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
    </head>
    <body>
      <form action="/post" method="post">
        <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
        <label for="">待辦事項：</label>
        <input type="text" value="" />
        <input type="submit" value="送出" />
      </form>
    </body>
  </html>
  ```

![](https://i.imgur.com/LihP9pR.png)
![](https://i.imgur.com/m16sqRv.png)

### dotenv

設定環境變數

- 安裝

  ```
  $ npm install --save dotenv
  ```

- `app.js`

  ```js
  require("dotenv").config();
  var express = require("express");
  var app = express();

  app.get("/", function(request, response) {
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASS);

    // 連線資料庫
    response.send("hello");
  });

  app.listen(3000, function() {
    console.log("http://localhost:3000");
  });
  ```

- `.env`

  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=s1mpl3
  ```

### connect-flash

需搭配 `cookie-parser` 和 `express-session`

- 安裝

  ```
  $ npm install --save connect-flash
  ```

- `app.js`

  ```js
  var express = require("express");
  var engine = require("ejs-locals");
  var bodyParser = require("body-parser");
  var cookieParser = require("cookie-parser");
  var session = require("express-session");
  var flash = require("connect-flash");
  var app = express();

  app.engine("ejs", engine);
  app.set("views", "./views");
  app.set("view engine", "ejs");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(cookieParser());
  app.use(
    session({
      secret: "my secret",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 100 * 1000 },
    })
  );
  app.use(flash());

  const todos = ["todo1", "todo2"];

  app.get("/", function(request, response) {
    response.render("index", { todos });
  });

  app.get("/post", function(request, response) {
    const messages = request.flash("message");
    response.render("post", { messages });
  });

  app.post("/post", function(request, response) {
    const newTodo = request.body.content;

    if (!newTodo) {
      request.flash("message", "請填寫內容");
      response.redirect("/post");
      return;
    }

    todos.push(newTodo);
    response.redirect("/");
  });

  app.listen(3000, function() {
    console.log("http://localhost:3000");
  });
  ```

- `views/index.ejs`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Todos</title>
    </head>
    <body>
      <h1>代辦事項</h1>
      <a href="/post">新增代辦事項</a>
      <ul>
        <% for (index in todos) { %>
        <li><%= todos[index] %></li>
        <% } %>
      </ul>
    </body>
  </html>
  ```

- `views/post.ejs`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>add Todo</title>
    </head>
    <body>
      <h1>新增待辦事項</h1>
      <a href="/">回首頁</a>
      <form action="/post" method="post">
        <input name="content" type="text" value="" />
        <input type="submit" value="送出" />
      </form>
      <ul>
        <% for (index in messages) { %>
        <li><%= messages[index] %></li>
        <% } %>
      </ul>
    </body>
  </html>
  ```

- `app.js` 進階版

  - 使用 middleware + `response.locals`

    ```js
    var express = require("express");
    var engine = require("ejs-locals");
    var bodyParser = require("body-parser");
    var cookieParser = require("cookie-parser");
    var session = require("express-session");
    var flash = require("connect-flash");
    var app = express();

    app.engine("ejs", engine);
    app.set("views", "./views");
    app.set("view engine", "ejs");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cookieParser());
    app.use(
      session({
        secret: "my secret",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 100 * 1000 },
      })
    );
    app.use(flash());

    app.use(function(request, response, next) {
      console.log(request.flash("message"));
      response.locals.messages = request.flash("message");
      next();
    });

    const todos = ["todo1", "todo2"];

    app.get("/", function(request, response) {
      response.render("index", { todos });
    });

    app.get("/post", function(request, response) {
      response.render("post");
    });

    app.post("/post", function(request, response) {
      const newTodo = request.body.content;

      if (!newTodo) {
        request.flash("message", "請填寫內容");
        response.redirect("/post");
        return;
      }

      todos.push(newTodo);
      response.redirect("/");
    });

    app.listen(3000, function() {
      console.log("http://localhost:3000");
    });
    ```

### bcrypt

加密

- 安裝

  ```
  $ npm install --save bcrypt
  ```

- `app.js`

  ```js
  var express = require("express");
  var engine = require("ejs-locals");
  var bodyParser = require("body-parser");
  var bcrypt = require("bcrypt");
  var app = express();

  app.engine("ejs", engine);
  app.set("views", "./views");
  app.set("view engine", "ejs");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // 加密的 salt
  const saltRounds = 10;
  // 模擬 DB 資料
  const users = [];

  app.get("/", function(request, response) {
    response.render("index");
  });

  app.get("/register", function(request, response) {
    response.render("register");
  });

  app.post("/register", function(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;

    if (
      !username ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      // 回傳錯誤訊息
      response.redirect("/register");
      return;
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {
      const newUser = {
        username: username,
        password: hash,
      };
      users.push(newUser);
      response.redirect("/login");
    });
  });

  app.get("/login", function(request, response) {
    response.render("login");
  });

  app.post("/login", function(request, response) {
    const username = request.body.username;
    const password = request.body.password;

    let user = null;
    for (let index in users) {
      if (users[index].username === username) {
        user = users[index];
        break;
      }
    }

    if (!user) {
      // 找不到該使用者
      response.redirect("/login");
      return;
    }

    bcrypt.compare(password, user.password, function(err, isSame) {
      console.log(password);
      console.log(user.password);
      console.log(isSame);
      if (!err && isSame) {
        // 登入成功，設定 session
        response.redirect("/");
        return;
      }
      // 比對錯誤或是密碼錯誤
      response.redirect("/login");
    });
  });

  app.listen(3000, function() {
    console.log("http://localhost:3000");
  });
  ```

- `views/index.ejs`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>會員系統</title>
    </head>
    <body>
      <h1>會員系統首頁</h1>
      <a href="/register">註冊</a>
      <a href="/login">登入</a>
    </body>
  </html>
  ```

- `views/register.ejs`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>會員系統</title>
    </head>
    <body>
      <h1>註冊</h1>
      <form action="/register" method="post">
        <div>帳號： <input name="username" type="text" value="" /></div>
        <div>密碼 <input name="password" type="password" value="" /></div>
        <div>
          確認密碼
          <input name="confirmPassword" type="password" value="" />
        </div>
        <input type="submit" value="送出" />
      </form>
    </body>
  </html>
  ```

- `views/login.ejs`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>會員系統</title>
    </head>
    <body>
      <h1>登入</h1>
      <form action="/login" method="post">
        <div>帳號： <input name="username" type="text" value="" /></div>
        <div>密碼 <input name="password" type="password" value="" /></div>
        <input type="submit" value="送出" />
      </form>
    </body>
  </html>
  ```
