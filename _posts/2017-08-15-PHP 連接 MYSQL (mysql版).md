---
layout: post
title: "PHP 連接 MySQL (mysql 版)"
date: 2017-08-15 00:00:00 +0800
categories: PHP
tags: PHP
mathjax: true
---

## 連接資料庫

- 連接伺服器
  `mysql_connect("主機名稱","帳號","密碼"）`

- 選擇欲讀取的資料庫名稱
  `mysql_select_db("資料庫名稱")`

- SQL 語法
  `mysql_query("SQL 語法")`

- 將資料設為 utf8 格式（才能讀取中文）
  `mysql_query("set names utf8")`

- 關閉連結
  `mysql_close(mysql_connect("主機名稱","帳號","密碼"）)`

```php
<?php
$server='localhost';
$id='root';
$pwd='1234';
$dbname='mes_board';
$con = mysql_connect($server , $id , $pwd);
if (!$con){
    die("Could not connect: " . mysql_error());
}
mysql_select_db($dbname , $con);
mysql_query("SET NAMES utf8");
// mysql_close($con);
?>
```

## MySQL 語法

```php
<?php
$sql = "select * from 資料庫名稱";
$result = mysql_query($sql);
?>
```

先用一個變數 sql 把 MYSQL 的語法存下來，再塞到 mysql_query()裡面

```php
<?php
$num = mysql_num_rows($result);
$data = mysql_fecth_rows($result);
?>
```

mysql_num_rows()：回傳我們的資料有幾個列
mysql_fecth_rows()：讀取該資料表中列的資料，回傳的是一列資料。
一般會搭配迴圈

```php
<?php
$sql = "SELECT * FROM DB_TABLE";
$result = mysql_query($sql);
$demo = array();
$k=0;
while($data = mysql_fetch_array($result)){
     $demo[$k] = $data;
     $k++;
}
?>
```

### 創造 create

```sql
CREATE TABLE table_name(
    column_name1 data_type,
    column_name2 data_type,
    column_name3 data_type,
    .......
)
```

### 插入 insert

```sql
INSERT INTO table_name VALUES (value1, value2,....)
```

```sql
INSERT INTO table_name (column1, column2,...) VALUES (value1, value2,....)
```

### 查詢 select

```sql
SELECT * FROM table_name
```

從某資料庫中讀取所有的（\*）資料表

```sql
SELECT column_name(s) FROM table_name
```

### where

```sql
SELECT column FROM table
WHERE column operator value
```

### order by

```sql
SELECT column_name(s)
FROM table_name
ORDER BY column_name
```

預設是升序

```sql
SELECT column_name(s)
FROM table_name
ORDER BY column_name DESC
```

DESC 降序

### 更新 update

```sql
UPDATE table_name
SET column_name = new_value
WHERE column_name = some_value
```

### 刪除 delete

```sql
DELETE FROM table_name
WHERE column_name = some_value
```

### 參考資料

- [PHP MySQL 简介](http://www.w3school.com.cn/php/php_mysql_intro.asp)
