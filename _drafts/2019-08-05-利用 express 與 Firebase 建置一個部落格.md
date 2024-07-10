---
layout: post
title: "利用 express 與 Firebase 建置一個部落格"
date: 2018-08-05 00:00:00 +0800
categories: NodeJS
tags: express NodeJS JavaScript DataBase Firebase
mathjax: true
description: ""
---

### 架設 express server

### express firebase admin

1. 安裝 `firebase admin`

   ```
   $ npm install --save firebase-admin
   ```

2. 安裝 `dotenv`

   ```
   $ npm install --save dotenv
   ```

3. 下載金鑰

   ![](/assets/img/posts/98HmHlJ.png)

4. 設定 `firebase admin`

   - 根據下載的 .json 檔內容，對應填入 `.env` 欄位

     ```
     FIREBASE_ADMIN_TYPE=service_account
     FIREBASE_ADMIN_PROJECT_ID=node-blog-aaaf7
     FIREBASE_ADMIN_PRIVATE_KEY_ID=a30ad7f9b945c3f6c5b237cd247e8ea3bf8ae8c7
     FIREBASE_ADMIN_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZ5uaoJu8AvbHU\nakSq3wnc9+6hDlQgOzWLQ9US3yyPFUVSkdxQakp/vdcggUihoQ2ZMGjpZ2tpJl3l\n+Mpd8qmwjYs1QgDxepsl672TkMGsgYgUYgf+TPSaWjz2ZhFEaGBZUta1dtstLZL5\ngNUqRYAJyN9SxBcIcdocrU1rSUKNIHIlNtxKYR6rSxObjlDwWiczmJHZ0Vq10RJR\nZOfSCQ2PP3BhRetDU6pH3JXriEYcNb1UYt8WAsrKaI4U4iYx+Kw5bZYoUj3D1RJh\nBL/4Hq0Ifpoxvayk4JpySQ1h3/JttNa0Q9sOiL6YXW7ZA7qJppnWZHBsUyGeINfL\nlT50rVqzAgMBAAECggEAMvX/aKzDtWYa7XBm3oHOXUoHzXLWLnoMp9nFQ2N8+MAd\nXVMJNeOMWbI9+vh0WXjf7NrX0nm5Wm8m5pC0SdmhkOG9t9vsPgnQOAVQl/119C5M\nJhuz8+P9luLMjvaLPzCkvs8sY5hAyTvvEAk2DLJIzHSkZl6iFdzFUXudSCpRDDOv\nwugKsiWS0AvbV8t/h2VXxeR5lgxqlpOrqmup13lZqBubs0sMXaeE5UAH2evqxRWJ\nSdUCtYismP7NnHSuZoXX9Ens0FkKESSMjIRI6EPUE9hnbF4ZMKKXKfgr0s8q8qOL\ngpI06OtXeKugNBAFl643ovBANPlQxMI2xN828dbjEQKBgQDITJEP+h5YIdArKAx/\nPyMQnzJTBduUpiuzRPnHpC2kHQeGgo/shjDWxgTvWe7E3ty76TsxF+d8kI23PiYo\nbvhizMugtLXm8Dua6wlIltKQl/nylmIxiB7d9gfME78SSWFUIN0xyUKp0uC7WXVc\nvJ4h2rKL6ED2PHQ9p8qzZyUeWwKBgQDEs0ozlFwmlBDN0YFI0QVEzuJsbYR+jLYh\nq1PrI7u2cBF7cTqSABtyYD8MJo8mpx//4XLdieSXSWv3fS6lHnU+0UuVC7sTkkwq\no9mLvBNyki4levIYMDxXdrTdeFNGHWJKIJNLUfzUtBX6IPSu5Ra6JiQGHz0NsDqF\nmcsuryMUiQKBgQCoXfweMwAo0xt5+2st1zOxeDBEK4tdU6UuRw+zamVXK3O09LDo\ngBAzqTZiv/T+Fdv0NOQlq1NRmO0XGC3ZFRbDbiTIzL6PBmcEHQerteP/2VAoQ5L8\n0dAogfQh7oNRas9eeVWV0PixaeqwcU0/C+ncyUoGYs+gbEbFwPKZhV1lOwKBgCFZ\nIEBka8cinUK3vUqCHXmP9bVaT/dAlfRZXq3j7gQ9NcmO5dYw7HZUuPuvYd+0v+ka\n6OWEZlv717Eq6QiXhFs1ErJfPcVQrVchVlWpekaXX/l8waS2MNTHTFyr9LpTawGU\nSkSfztSk/4Dbq4AnWNYQd1UOYMR8Vz+lVlxA1xq5AoGATWM9yriDpPbKmhp1x3ZH\nLatolCVqnO0ejSSNZW7vhO+uKEvk5st4zbEfz1JAcOxIz3uyEq/0bpoGPIcgWciL\nZqXFQRjHYnz5l4pwD7cortEHGd0pmgLzxj4jFt2aLTC0NXIobLzYEvbQIBtX1KsV\n2lLT+MutiXMjNJg9m4UzAM4=\n-----END PRIVATE KEY-----\n
     FIREBASE_ADMIN_CLIENT_EMAIL_ID=firebase-adminsdk-rrond@node-blog-aaaf7.iam.gserviceaccount.com
     FIREBASE_ADMIN_CLIENT_ID=115842409062444304787
     FIREBASE_ADMIN_AUTH_URI=https://accounts.google.com/o/oauth2/auth
     FIREBASE_ADMIN_TOKEN_URI=https://oauth2.googleapis.com/token
     FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
     FIREBASE_ADMIN_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rrond%40node-blog-aaaf7.iam.gserviceaccount.com
     FIREBASE_ADMIN_DATABASE_URL=https://node-blog-aaaf7.firebaseio.com
     ```

   - `connections/firebaseAdminConnection.js`

     - 注意在 `.env` 設定的私鑰的 `\n` 會變成 `\\n`，因此這裡用 replace 方法還原

     ```js
     require("dotenv").config();
     const firebaseAdmin = require("firebase-admin");

     const serviceAccount = {
       type: process.env.FIREBASE_ADMIN_TYPE,
       project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
       private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
       private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(
         /\\n/g,
         "\n"
       ),
       client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL_ID,
       client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
       auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
       token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
       auth_provider_x509_cert_url:
         process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
       client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
     };

     firebaseAdmin.initializeApp({
       credential: firebaseAdmin.credential.cert(serviceAccount),
       databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
     });

     const db = firebaseAdmin.database();

     module.exports = db;
     ```

   - 在其他檔案引用上面的模組，如在 `routes/index.js`

     ```js
     var firebaseAdminDb = require("../connections/firebaseAdminConnection");

     const ref = firebaseAdminDb.ref("todo");
     ref.once("value", (snapshot) => {
       console.log(snapshot.val());
     });
     ```

### 顯示提示訊息

```
$ npm install --save connect-flash
```

```
$ npm install --save express-session
```

- `app.js`

  ```js
  var session = require("express-session");
  var flash = require("connect-flash");

  app.use(
    session({
      secret: "my secret",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 100 * 1000 },
    })
  );
  app.use(flash());
  ```

- 在刪除的 route，新增 flash

  ```js
  router.post("/categories/delete/:id", function(req, res) {
    const id = req.param("id");
    categoriesRef
      .child(id)
      .remove()
      .then(() => {
        req.flash("info", "欄位已刪除");
        res.redirect("/dashboard/categories");
      });
  });
  ```

- 在顯示的 route，顯示 flash 的資訊

  ```js
  router.get("/categories", function(req, res) {
    const messages = req.flash("info");
    categoriesRef.once("value", function(snapshot) {
      const categories = snapshot.val();
      res.render("dashboard/categories", {
        categories,
        messages,
      });
    });
  });
  ```

- `categories.ejs`

  ```
  <\% if (messages.length > 0) { \%> <\% for (key in messages) {\%> <div class="alert alert-warning"> <%- messages[key] \%> </div> <\%}\%> <\%}\%>
  ```

### moment striptags

- 安裝 `moment` 與 `striptags`

  ```
  $ npm install --save moment striptags
  ```

- 在 `routes/dashboard.js` 引入模組，並導出至顯示頁面 `views/dashboard/archives.ejs`

  ```js
  // 略
  var moment = require("moment");
  var striptags = require("striptags");
  // 略
  router.get("/archives", function(req, res) {
    // 略
    res.render("dashboard/archives", {
      articles,
      categories,
      moment,
      striptags,
      status,
    });
  });
  ```

- `views/dashboard/archives.ejs`

  ```html
  <!-- 略 -->
  <%- striptags(articles[key].content).slice(0, 150) %>...
  <!-- 略 -->
  <%- moment(articles[key].updateTime * 1000).format("YYYY-MM-DD") %>
  ```

### 會員登入機制

- 安裝 `firebase`

  ```
  $ npm install --save firebase
  ```

- 設定 firebase 連線

  - 啟用 `firebase` 登入功能

    ![](/assets/img/posts/xiPsQCM.png)

  - 根據下圖內容，對應填入 `.env` 欄位

    ![](/assets/img/posts/ti3vbZC.png)

    ```
    # FIREBASE_CLIENT

    FIREBASE_CLIENT_API_KEY=AIzaSyAUUyHycPoNUZwsBr2gdLuUl8AoAEhM8PE
    FIREBASE_CLIENT_AUTH_DOMAIN=node-blog-aaaf7.firebaseapp.com
    FIREBASE_CLIENT_DATABASE_URL=https://node-blog-aaaf7.firebaseio.com
    FIREBASE_CLIENT_PROJECT_ID=node-blog-aaaf7
    FIREBASE_CLIENT_STORAGE_BUCKET=
    FIREBASE_CLIENT_MESSAGING_SENDER_ID=568066612342
    FIREBASE_CLIENT_APP_ID=1:568066612342:web:f965ac75b9db4de724d357
    ```

  - `connections/firebaseClientConnection.js`

    ```js
    var firebase = require("firebase");
    require("dotenv").config();

    var firebaseConfig = {
      apiKey: process.env.FIREBASE_CLIENT_API_KEY,
      authDomain: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_CLIENT_DATABASE_URL,
      projectId: process.env.FIREBASE_CLIENT_PROJECT_ID,
      storageBucket: process.env.FIREBASE_CLIENT_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_CLIENT_APP_ID,
    };

    firebase.initializeApp(firebaseConfig);

    module.exports = firebase;
    ```

- 註冊機制

  - `routes/auth.js`

    ```js
    var express = require("express");
    var firebaseClient = require("../connections/firebaseClientConnection");
    var router = express.Router();

    router.get("/signup", function(req, res) {
      const messages = req.flash("error");

      res.render("dashboard/signup", { messages });
    });

    router.post("/signup", function(req, res) {
      const email = req.body.email;
      const password = req.body.password;
      const confirmPassword = req.body.confirm_password;

      if (confirmPassword !== password) {
        req.flash("error", "密碼不一致");
        res.redirect("/auth/signup");
        return;
      }

      firebaseClient
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          res.redirect("/auth/signin");
        })
        .catch((error) => {
          console.log(error);
          req.flash("error", error.message);
          res.redirect("/auth/signup");
        });
    });

    module.exports = router;
    ```

  - `views/dashboard/signup.ejs`

    ```html
    <% extend("../layouts/dashboard-layout") %>
    <div class="row justify-content-center">
      <div class="col-sm-6">
        <% if (messages.length > 0) { %> <% for (key in messages) { %>
        <div class="alert alert-danger">
          <%- messages[key] %>
        </div>
        <%} %> <%} %>
        <form method="POST" action="/auth/signup">
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              placeholder="請輸入 email"
              required
            />
            <small id="emailHelp" class="form-text text-muted"
              >我們不會隨意散佈你的 Email</small
            >
          </div>
          <div class="form-group">
            <label for="password">密碼</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="請輸入密碼"
              required
            />
          </div>
          <div class="form-group">
            <label for="confirm_password">確認密碼</label>
            <input
              type="password"
              class="form-control"
              id="confirm_password"
              name="confirm_password"
              placeholder="確認密碼"
              required
            />
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="confirm"
              required
            />
            <label class="form-check-label" for="confirm"
              >請確認你了解這是自己做的 Blog</label
            >
          </div>
          <div class="text-right mt-3">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
    ```

- 登入機制

  - `routes/auth.js`

    ```js
    // 略
    router.get("/signin", function(req, res) {
      const messages = req.flash("error");

      res.render("dashboard/signin", { messages });
    });

    router.post("/signin", function(req, res) {
      const email = req.body.email;
      const password = req.body.password;
      firebaseClient
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          req.session.uid = response.user.uid;

          res.render("dashboard");
        })
        .catch((error) => {
          req.flash("error", error.message);
          res.redirect("/auth/signin");
        });
    });
    // 略
    ```

  - `views/dashboard/signin.ejs`

    ```html
    <% extend("../layouts/dashboard-layout") %>

    <div class="row justify-content-center">
      <div class="col-sm-6">
        <% if (messages.length > 0) { %> <% for (key in messages) { %>
        <div class="alert alert-danger">
          <%- messages[key] %>
        </div>
        <%} %> <%} %>
        <form method="POST" action="/auth/signin">
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              placeholder="請輸入 email"
              required
            />
            <small id="emailHelp" class="form-text text-muted"
              >我們不會隨意散佈你的 Email</small
            >
          </div>
          <div class="form-group">
            <label for="password">密碼</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="請輸入密碼"
              required
            />
          </div>
          <div class="text-right mt-3">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
    ```

- 登出機制

  - `routes/auth.js`

    ```js
    router.get("/signout", function(req, res) {
      req.session.uid = "";
      res.redirect("/auth/signin");
    });
    ```

  - `dashboard-layout.ejs`

    ```html
    <a class="nav-link" href="/auth/signout">登出</a>
    ```

- 新增登入後的後台首頁

  - `views/dashboard/index.ejs`

    ```
    <% extend("../layouts/dashboard-layout") %>

    歡迎光臨
    ```

- 驗證身份機制

  - `app.js` 利用 middleware 驗證身份

    ```js
    const authCheck = (req, res, next) => {
      if (req.session.uid === process.env.ADMIN_UID) {
        return next();
      }
      return res.redirect("/auth/signin");
    };

    app.use("/", indexRouter);
    app.use("/auth", authRouter);
    app.use("/dashboard", authCheck, dashboardRouter);
    ```

  - `.env` 新增許可的管理者 uid

    ```
    # ADMIN
    ADMIN_UID=aJ3OtzPAnLW5b29Mrz1FxTkf9533
    ```

### disqus 留言版

![](/assets/img/posts/nqojkr1.png)

![](/assets/img/posts/S7CLpgx.png)

![](/assets/img/posts/F29iHPF.png)

拉到最下面

![](/assets/img/posts/vXCUh4j.png)

![](/assets/img/posts/0Hbtf6T.png)

貼到 `views/post.ejs`

```html
<!-- 留言 -->
<div class="card mb-3">
  <div class="card-body">
    <div id="disqus_thread"></div>
    <script>
      /**
       *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
       *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
      /*
            var disqus_config = function () {
            this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
            };
            */
      (function() {
        // DON'T EDIT BELOW THIS LINE
        var d = document,
          s = d.createElement("script");
        s.src = "https://node-blog-6.disqus.com/embed.js";
        s.setAttribute("data-timestamp", +new Date());
        (d.head || d.body).appendChild(s);
      })();
    </script>
    <noscript
      >Please enable JavaScript to view the
      <a href="https://disqus.com/?ref_noscript"
        >comments powered by Disqus.</a
      ></noscript
    >
  </div>
</div>
```

成功載入

![](/assets/img/posts/MCPVA6Q.png)

### 錯誤頁面

- `app.js`

  ```js
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var error = new Error("Not Found");
    error.status = 404;
    res.render("error", { title: "您所查看的頁面不存在 QQ" });
  });
  ```

- `views/error.ejs`

  ```html
  <% extend("./layouts/layout") %>

  <div class="row my-4 justify-content-center">
    <div class="col-md-9">
      <h1 class="text-center"><%- title %></h1>
      <p class="text-center">
        <a href="/">回到首頁</a>
      </p>
    </div>
  </div>
  ```
