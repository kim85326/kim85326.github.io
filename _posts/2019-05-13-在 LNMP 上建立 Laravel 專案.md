---
layout: post
title: "在 LNMP 上建立 Laravel 專案"
date: 2019-05-13 00:00:00 +0800
categories: 架站
tags: Nginx PHP Laravel
mathjax: true
---

環境：Mac/Linux
登入身份：elaine

### 安裝 composer

1. 下載 composer-setup.php 安裝程式

   - 請確認你已經先安裝好 PHP 才能執行上述指令

   ```
   $ php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
   ```

2. 檢查已下載的檔案

   - 確保檔案沒被竄改。顯示「Installer verified」表示沒問題

   ```
   $ php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
   ```

3. 執行安裝

   ```
   $ php composer-setup.php
   ```

4. 刪除安裝檔

   ```
   $ php -r "unlink('composer-setup.php');"
   ```

5. 設置全域指令

   - 這個 composer.phar 工具目前只能在所屬的目錄下才能執行，這樣使用上有點麻煩，可以把它移動到我們自己的指令目錄，當成全域指令。同時改名為 composer 方便輸入：
   - 註：前提是 /usr/local/bin 已經加入 `$PATH` 中
     `PATH=/usr/local/bin:$PATH`

   ```
   $ mv composer.phar /usr/local/bin/composer
   ```

6. 查看版本即安裝完成

   ```
   $ composer -v
   ```

   ![](https://i.imgur.com/ZrpQQQP.png)

### 安裝 laravel 專案

- 建立一個名為 blog 的專案

  ```
  $ composer create-project --prefer-dist laravel/laravel blog
  ```

### 新增一個資料庫

    ![](https://i.imgur.com/hF8lcdb.png)

    - 輸入資料庫名稱之後點擊 create

    ![](https://i.imgur.com/wEGJFPg.png)

### 設定專案連結資料庫的資訊

- 修改專案的 .env

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog
DB_USERNAME=root
DB_PASSWORD=password
```

### 開啟權限

- 開啟 bootstrap cache 目錄權限

```
$ chmod -R 777 bootstrap/cache/
```

- 開啟 storage 目錄權限

```
$ chmod -R 777 storage/
```

### 設定 Nginx

```
$ sudo su
```

- 在 conf.d 資料夾下新增一個 blog.conf

```
server {
    listen 80;
    server_name vm-blog.com;
    root /usr/share/nginx/html/blog/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### 關閉 SELinux

1. 修改 /etc/sysconfig/selinux

   ```
   $ vi /etc/sysconfig/selinux
   ```

2. 將 SELINUX=enforcing 改成 SELINUX=disabled

   ```
   # SELINUX=enforcing
   SELINUX=disabled
   ```

3. 重新開機

   ```
   $ reboot
   ```

### 完成

- 開啟 vm-blog.com，可以成功看到 laravel 預設畫面

![](https://i.imgur.com/jU1qYT8.png)

### 參考資料

- [使用 Composer 管理 PHP 套件](http://blog.tonycube.com/2016/12/composer-php.html)
