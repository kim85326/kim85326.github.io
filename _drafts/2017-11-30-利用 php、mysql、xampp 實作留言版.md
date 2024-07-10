---
layout: post
title: "利用 PHP、MySQL、XAMPP 實作留言版"
date: 2017-11-30 04:12:00 +0800
categories: PHP
tags: PHP MySQL
mathjax: true
description: ""
---

一個簡單有登入機制的留言版
(缺點就是把 php 和 html 寫在一起 XD)

### 資料表

為了方便(ㄊㄡㄌㄢ ˇ)我直接用 mysql 的介面建立了資料表

#### member 表

![](/assets/img/posts/NnXUgwn.png)

#### mes 表

![](/assets/img/posts/k5EYk37.png)

### view

分成五個檔案 : 首頁 index.php、登入 login.php、註冊 signup.php、新增頁面 add_mes.php、更新頁面 update_mes.php

#### 首頁 index.php

![](/assets/img/posts/cZvLdIO.png)

- 在載入頁面的時候要去資料庫裡面撈 mes 資料出來

```php
<?php
    include_once "database.php";
    session_start();
    $sql = "SELECT * FROM `mes`";
	$result = mysqli_query($con , $sql) or die('MySQL query error');
?>
```

- 塞進去留言版裡面

```php
<?php
    while($row = mysqli_fetch_array($result)){
?>
    <div class="card">
        <h4 class="card-header">標題：<?php echo $row['title'];?>
        <?php if(@$_SESSION["id"]===$row["uid"]){?>
            <a href="mes.php?method=del&id=<?php echo $row["id"]?>" class="btn btn-danger mybtn">刪除</a>
            <a href="update_mes.php?id=<?php echo $row["id"]?>" class="btn btn-primary mybtn">編輯</a>
        <?php }?>
        </h4>
        <div class="card-body">
            <h5 class="card-title">作者：<?php echo $row["uid"];?></h5>
            <p class="card-text">
                <?php echo $row["content"];?>
            </p>
        </div>
    </div>
<?php
    }
?>
```

- 特別判斷這篇留言的主人跟現在登入的人是不是同一個人，是的話才可以編輯和刪除
  - 刪除連結利用 get 的方式，傳到 mes.php，而且帶兩個參數 method=del 和 id=該留言的 id
  - 編輯連結利用 get 的方式，傳到 update.php，而且帶一個參數 id=該留言的 id

```php
<?php if(@$_SESSION["id"]===$row["uid"]){?>
    <a href="mes.php?method=del&id=<?php echo $row["id"]?>" class="btn btn-danger mybtn">刪除</a>
    <a href="update_mes.php?id=<?php echo $row["id"]?>" class="btn btn-primary mybtn">編輯</a>
<?php }?>
```

- 在載入頁面的時候判斷有沒有登入狀態，顯示不同的功能按鈕
  - 有登入就顯示 => 登出、新增留言
  - 沒登入就顯示 => 登入、註冊

```php
<?php if(isset($_SESSION["id"])){?>
    <a href="config.php?method=logout">登出</a>
    <a href="add_mes.php">新增留言</a>
<?php }else{?>
    <a href="login.php">登入</a>
    <a href="signup.php">註冊</a>
<?php }?>
```

#### 登入 login.php

![](/assets/img/posts/DiUGbRN.png)

- 當網頁載入後，如果有登入的話，就不能再登入啦! 所以把用戶導到首頁

```php
<?php include_once "database.php";
	session_start();
	if(isset($_SESSION["id"])){
		header("Location: index.php");
	}
?>
```

- 表單利用 post 的方式，傳到 config.php，而且帶一個 get 參數 method=login

```html
<form role="form" action="config.php?method=login" method="post">
  <div class="form-group">
    <label for="username">帳號</label>
    <input
      type="text"
      class="form-control"
      id="username"
      placeholder="username"
      name="username"
    />
  </div>
  <div class="form-group">
    <label for="password">密碼</label>
    <input
      type="password"
      class="form-control"
      id="password"
      placeholder="Password"
      name="password"
    />
  </div>
  <button type="submit" class="btn btn-primary">登入</button>
  <a href="signup.php">註冊</a>
</form>
```

#### 註冊 signup.php

![](/assets/img/posts/wkMC7pD.png)

- 當網頁載入後，如果有登入的話，就不能再註冊啦! 所以把用戶導到首頁

```php
<?php
    include_once "database.php";
    session_start();
    if(isset($_SESSION["id"])){
        header("Location: index.php");
    }
?>
```

- 表單利用 post 的方式，傳到 config.php，而且帶一個 get 參數 method=signup

```html
<form role="form" action="config.php?method=signup" method="post">
  <div class="form-group">
    <label for="username">帳號</label>
    <input
      type="text"
      class="form-control"
      id="username"
      placeholder="username"
      name="username"
    />
  </div>
  <div class="form-group">
    <label for="password">密碼</label>
    <input
      type="password"
      class="form-control"
      id="password"
      placeholder="Password"
      name="password"
    />
  </div>
  <div class="form-group">
    <label for="name">綽號</label>
    <input
      type="text"
      class="form-control"
      id="name"
      placeholder="name"
      name="name"
    />
  </div>
  <button type="submit" class="btn btn-primary">註冊</button>
  <a href="login.php">已有帳號想登入</a>
</form>
```

#### 新增頁面 add_mes.php

![](/assets/img/posts/DyRT9Dw.png)

- 當網頁載入後，如果沒登入的話，就不能新增留言了! 所以把用戶導到登入頁面

```php
<?php
    include_once "database.php";
    session_start();
    if(!isset($_SESSION["id"])){
    	header("Location: login.php");
    }
?>
```

- 表單利用 post 的方式，傳到 mes.php，而且帶一個 get 參數 method=add

```html
<form role="form" action="mes.php?method=add" method="post">
  <div class="form-group">
    <label for="title">標題</label>
    <input
      type="text"
      class="form-control"
      id="title"
      placeholder="title"
      name="title"
    />
  </div>
  <div class="form-group">
    <label for="content">文章內容</label>
    <input
      type="text"
      class="form-control"
      id="content"
      placeholder="content"
      name="content"
    />
  </div>
  <button type="submit" class="btn btn-primary">新增</button>
</form>
```

#### 更新頁面 update_mes.php

![](/assets/img/posts/OyJlQxc.png)

- 按下編輯按鈕會帶一個 get 參數

- 當網頁載入後，如果不是登入的用戶和該留言的主人不一樣的話，就不能更新留言了! 所以把用戶導到登入頁面

```php
<?php
	include_once "database.php";
	session_start();
	$id = $_GET["id"];
    $sql="SELECT * FROM `mes` WHERE id = '$id'";
	$result = mysqli_query($con , $sql) or die('MySQL query error');
   	$row = mysqli_fetch_array($result);
	if($_SESSION["id"]!=$row["uid"]){
    	header("Location: login.php");
    }
?>
```

- 表單利用 post 的方式，傳到 mes.php，而且帶兩個 get 參數 method=add 和 id=該留言的 id

```html
<form role="form" action="mes.php?method=update&id=<?php echo $row["id"]?>" method="post">
    <div class="form-group">
        <label for="title">標題</label>
        <input type="text" class="form-control" id="title" placeholder="title" name="title" value="<?php echo $row["title"]?>">
    </div>
    <div class="form-group">
        <label for="content">文章內容</label>
        <input type="text" class="form-control" id="content" placeholder="content" name="content" value="<?php echo $row["content"]?>">
    </div>
    <button type="submit" class="btn btn-primary">修改</button>
</form>
```

### controller + model

分成三個檔案 : 資料庫連結 database.php、

#### 資料庫連結 database.php、會員機制 config.php、訊息機制 mes.php

```php
<?php
	$server='localhost';
	$id='root';
	$pwd='1234';
	$dbname='mes_board';
	$con = mysqli_connect($server , $id , $pwd);
	if (!$con){
  		die("Could not connect: " . mysql_error());
  	}
	mysqli_select_db($con , $dbname);
	mysqli_query($con ,"SET NAMES utf8");
	// mysql_close($con);
?>
```

#### 會員機制 config.php

- 判斷我傳過來的 method 參數，代表我要執行的動作

```php
<?php
    include_once "database.php";
	switch ($_GET["method"]) {
		case "login":
			login();
			break;
		case "signup":
			signup();
			break;
		case "logout":
			logout();
			break;
		default:
			break;
	}
```

- 如果是登入的話，要先找資料庫 member 表裡面是否帳號、密碼和使用者輸入的帳號、密碼一樣，如果一樣才能登入，登入要給用戶一個 session，\$\_SESSION["id"] 設成使用者的 id

```php
function login(){
    $sql="SELECT * FROM `member`
            WHERE username = '$_POST[username]' && password = '$_POST[password]'";
    global $con;
    $result = mysqli_query($con , $sql) or die('MySQL query error');
    $row = mysqli_fetch_array($result);
    if($row==""){
        echo "<script type='text/javascript'>";
        echo "alert('帳密錯誤');";
        echo "location.href='login.php';";
        echo "</script>";
    }else{
        session_start();
        $_SESSION["id"] = $row['id'];
        echo "<script type='text/javascript'>";
        echo "alert('登入成功');";
        echo "location.href='index.php';";
        echo "</script>";
    }
}
```

- 如果是註冊的話，要先找資料庫 member 表裡面是否帳號和使用者輸入的帳號一樣，如果一樣的話就代表已經註冊過帳號了。如果沒有一樣的話，就把他填的資料存進資料庫 member 表裡
- 註冊成功後要給用戶一個 session，\$\_SESSION["id"] 設成使用者的 id

```php
function signup(){
    $sql="SELECT * FROM `member`
            WHERE username = '$_POST[username]'";
    global $con;
    $result = mysqli_query($con , $sql) or die('MySQL query error');
    $row = mysqli_fetch_array($result);
    if($row!=""){
        echo "<script type='text/javascript'>";
        echo "alert('已經辦過帳號囉');";
        echo "location.href='login.php';";
        echo "</script>";
    }
    else{
        $sql="INSERT INTO `member` (username, password, name)
                VALUES ('$_POST[username]','$_POST[password]','$_POST[name]')";
        global $con;
        $result = mysqli_query($con , $sql) or die("MySQL query error");

        $sql="SELECT * FROM `member`
            WHERE username = '$_POST[username]' && password = '$_POST[password]'";
        global $con;
        $result = mysqli_query($con , $sql) or die('MySQL query error');
        $row = mysqli_fetch_array($result);
        session_start();
        $_SESSION["id"] = $row["id"];
        echo "<script type='text/javascript'>";
        echo "alert('註冊成功');";
        echo "location.href='index.php';";
        echo "</script>";
    }
}
```

- 如果是登出的話，就把用戶的 SESSION 清除掉

```php
function logout(){
    session_start();
    if(isset($_SESSION["id"])){
        session_unset();
        echo "<script type='text/javascript'>";
        echo "alert('登出成功');";
        echo "location.href='index.php';";
        echo "</script>";
    }
}
```

#### 訊息機制 mes.php

- 判斷我傳過來的 method 參數，代表我要執行的動作

```php
<?php
	include_once "database.php";
    session_start();
	switch ($_GET["method"]) {
		case "add":
			add();
			break;
		case "update":
			update();
			break;
		case "del":
			del();
			break;
		default:
			break;
	}
```

- 如果是新增訊息的話，把表單的東西新增到資料庫 mes 表裡面

```php
function add(){
    $uid = $_SESSION["id"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    $sql = "INSERT INTO `mes` (uid, title, content)
    VALUES ('$uid', '$title', '$content')";
    global $con;
    $result = mysqli_query($con , $sql) or die('MySQL query error');
    echo "<script type='text/javascript'>";
    echo "alert('新增留言成功');";
    echo "location.href='index.php';";
    echo "</script>";
}
```

- 如果是更新訊息的話，把表單的東西更新到資料庫 mes 表裡面

```php
function update(){
    $id = $_GET["id"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    $sql = "UPDATE `mes` SET title = '$title', content = '$content' WHERE id = $id";
    global $con;
    $result = mysqli_query($con , $sql) or die('MySQL query error');
    echo "<script type='text/javascript'>";
    echo "alert('編輯留言成功');";
    echo "location.href='index.php';";
    echo "</script>";
}
```

- 如果是刪除訊息的話，把表單的東西從資料庫 mes 表裡面刪除

```php
function del(){
    $id = $_GET["id"];
    $sql = "DELETE FROM `mes` WHERE id = $id";
    global $con;
    $result = mysqli_query($con , $sql) or die('MySQL query error');
    echo "<script type='text/javascript'>";
    echo "alert('刪除留言成功');";
    echo "location.href='index.php';";
    echo "</script>";
}
```

### 心得

- 主要是伺服器的架設，因為我之前裝了一堆 appserv 和 wamp 導致我的 port 還有 mysql 死掉，不要問我為什麼..我也不知道我怎麼搞得 XD，後來就把他們全部移除，重裝 xampp 就好了...

- 再是連接資料庫，因為新版的 php 連結 mysql 語法不同

```php
$con = mysql_connect($server , $id , $pwd);
```

改成

```php
$con = mysqli_connect($server , $id , $pwd);
```

- 還有 global 變數的抓不到...
  要加一個 global \$con; 才抓得到我 include 的變數

```php
global $con;
$result = mysqli_query($con , $sql) or die('MySQL query error');
```

- 想下載完整程式碼，也可以去我的 github [傳送門](https://github.com/kim85326/mes_board)
