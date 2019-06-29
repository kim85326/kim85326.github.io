---
layout: post
title: "利用 LNMP(Linux + Nginx + MySQL + PHP)架設伺服器"
date: 2019-05-12 00:00:00 +0800
categories: 架站
tags:
mathjax: true
---

### 啟用 EPEL

有許多的套件只有 EPEL 中才有，所以一定要啟用

```
$ sudo yum install epel-release
```

### 防火牆

如果你的 CentOS 有啟動防火牆，那麼還要開放對應的服務

```
$ firewall-cmd --permanent --zone=public --add-service=http
$ firewall-cmd --permanent --zone=public --add-service=https
$ firewall-cmd --reload
```

### Nginx

由於我懶得一直打 sudo，以下指令皆使用 root 身份來執行

1. 使用 yum 安裝 Nginx

```
$ yum install nginx
```

2. 啟動 Nginx

```
$ systemctl start nginx
```

3. 預設開機開啟 Nginx

```
$ systemctl enable nginx
```

4. 測試一下

這時候應該可以打開瀏覽器，輸入網址 [vm 的 ip]，就可以看到 Ngnix 的預設畫面了

![](https://i.imgur.com/b7azriL.png)

### MySQL

1. 安裝 MariaDB 伺服器

```
$ yum install mariadb-server
```

2. 啟動 MariaDB

```
$ systemctl start mariadb
```

3. 預設開機開啟 MariaDB

```
$ systemctl enable mariadb
```

4. 剛安裝好 MariaDB 時，建議執行一次 mysql_secure_installation 這個安全性設定工具

   - 這個設定工具可以幫助管理者設定 root 密碼、移除匿名登入帳號、禁止 root 從遠端登入、移除測試用的資料庫

```
$ mysql_secure_installation
```

5. 測試一下

- 使用 root 帳號登入 MariaDB 伺服器，正常的話，就會進入 MySQL/MariaDB 互動式的操作畫面

```
mysql -u root -p
```

![](https://i.imgur.com/Tq2rO3z.png)

[CentOS Linux 7 安裝 MySQL/MariaDB 資料庫教學](https://blog.gtwang.org/linux/centos-7-install-mariadb-mysql-server-tutorial/)

### PHP

- 如果直接從 CentOS 7 預設的 repository 安裝，會安裝成 PHP 5
- 若要在 CentOS 7 中安裝 PHP 7，大致上有兩種主要的方式
  - 一種是[使用外部套件庫來直接安裝 PHP 7](https://www.tecmint.com/install-php-7-in-centos-7/)，但這種方式裝的套件並不是 RedHat 官方提供的，無法保證穩定性
  - 另外一種是使用 CentOS 官方所提供的 SCL 環境來安裝 PHP 7，所有的套件都經過充分的測試，比較不會有系統不穩的問題

1. 從官網取得 Remi 和 EPEL rpm 的連結，並安裝

```
$ rpm -Uvh https://rpms.remirepo.net/enterprise/remi-release-7.rpm
$ rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

2. 開啟 remi-php72

```
$ yum install yum-utils
```

```
$ yum-config-manager –enable remi-php72
```

3. 安裝 php 及 Laravel 相關模組

```
$ yum install php php-mysql php-pecl-memcache php-pecl-memcached php-gd php-mbstring php-mcrypt php-xml php-pecl-apc php-cli php-pear php-pdo
```

4. 測試一下

```
$ php -v
```

![](https://i.imgur.com/p8lEGkO.png)

### PHP-FPM

1. 用 yum 安裝 PHP-FPM

```
$ yum install php-fpm
```

2. 設定 PHP-FPM

```
$ vi /etc/php-fpm.d/www.conf
```

```
user = nginx
group = nginx
;listen = 127.0.0.1:9000
listen = /var/run/php-fpm/php-fpm-7.1.sock
listen.owner = nginx
listen.group = nginx
```

3. 啟動 PHP-FPM

```
$ systemctl start php-fpm
```

4. 預設開機開啟 PHP-FPM

```
$ systemctl enable php-fpm
```

5. 測試一下

   1. 設定 Nginx，將 PHP 轉到 PHP-FPM 處理

      1. 修改 nginx.conf

      ```
      $ vi /etc/nginx/nginx.conf
      ```

      2. 在 server {} 區塊裡面新增以下程式碼
         - 注意 fastcgi_pass 的部分要和 php-fpm 的設定一樣

      ```
      location ~ \.php$ {
          root /usr/share/nginx/html;
          fastcgi_pass   unix:/var/run/php-fpm/php-fpm.sock;
          fastcgi_index  index.php;
          fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
          fastcgi_param  SCRIPT_NAME      $fastcgi_script_name;
          include        fastcgi_params;
      }
      ```

   2. 重新載入 Nginx 的設定

   ```
   $ nginx -s reload
   ```

   3. 在 /usr/share/nginx/html 裡，新增一隻 php 檔案

   ```
   $ touch /usr/share/nginx/html/info.php
   $ vi /usr/share/nginx/html/info.php
   ```

   info.php 內容

   ```php
   <?php phpinfo(); ?>
   ```

   4. 在瀏覽器網址打上 [ip]/info.php

   ![](https://i.imgur.com/jQuyyDN.png)

### phpMyAdmin

1. 用 yum 安裝 phpMyAdmin

```
$ yum install phpmyadmin
```

2. 設定 Nginx

   1. 修改 nginx.conf

   ```
   $ vi /etc/nginx/nginx.conf
   ```

   2. 在 server {} 區塊裡面新增以下程式碼
      - 注意 fastcgi_pass 的部分要和 php-fpm 的設定一樣

   ```
   location /phpMyAdmin {
          root /usr/share/;
          index index.php index.html index.htm;
          location ~ ^/phpMyAdmin/(.+\.php)$ {
                  try_files $uri =404;
                  root /usr/share/;
                  fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;
                  fastcgi_index index.php;
                  fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                  include /etc/nginx/fastcgi_params;
          }
          location ~* ^/phpMyAdmin/(.+\.(jpg|jpeg|gif|css|png|js|ico|html|xml|txt))$ {
                  root /usr/share/;
          }
   }
   location /phpmyadmin {
       rewrite ^/* /phpMyAdmin last;
   }
   ```

   3. 重新載入 Nginx 的設定

   ```
   $ nginx -s reload
   ```

3. 在瀏覽器網址打上 [ip]/phpMyAdmin，會出現 nginx 沒有寫入 php/session 的權限

![](https://i.imgur.com/pvbbVcj.png)

或是利用指令查看 /var/lib/php/ 權限

![](https://i.imgur.com/XRn0EQH.png)

4. 設定資料夾權限

```
$ chown nginx:nginx /var/lib/php/session
```

![](https://i.imgur.com/ytqChVK.png)

此時頁面就可以正常了

![](https://i.imgur.com/CRGXSYI.png)

[How to Install phpMyAdmin with Nginx on CentOS 7](https://linuxize.com/post/how-to-install-phpmyadmin-with-nginx-on-centos-7/)

[How To Install and Secure phpMyAdmin with Nginx on a CentOS 7 Server](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-with-nginx-on-a-centos-7-server)

[如何安装和一个 CentOS 7 服务器上使用 Nginx 的 phpMyAdmin 的安全](https://www.howtoing.com/how-to-install-and-secure-phpmyadmin-with-nginx-on-a-centos-7-server)

### 參考資料

- [CentOS 7 安裝 Nginx、MySQL/MariaDB、PHP7，架設 LEMP 網頁伺服器筆記](https://blog.gtwang.org/linux/linode-centos-7-nginx-mysql-mariadb-php-7-installation-notes/)
- [於 CentOS7 安裝 Nginx + php7 + php-fpm + Laravel5.6](https://medium.com/@iven00000000/%E6%96%BCcentos7%E5%AE%89%E8%A3%9D-nginx-php7-php-fpm-laravel5-6-df8631681acf)
- [[DigitalOcean] How To Install Linux, Nginx, MySQL, PHP (LEMP) stack On CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-centos-7)
- [於 Ubuntu 18.04 安裝 nginx 與 php-fpm 與 phpmyadmin
  ](https://xanxusvervr.blogspot.com/2018/06/ubuntu-1804nginxphp-fpmphpmyadmin.html)
