---
layout: post
title: "利用 LNMP (Linux + Nginx + MySQL + PHP) 架設伺服器"
date: 2019-05-12 00:00:00 +0800
categories: 架站
tags: PHP MySQL Nginx Linux
mathjax: true
---

### 安裝 EPEL

有許多的套件只有 `EPEL` 中才有，所以一定要安裝

```
$ sudo yum install epel-release -y
```

### 防火牆

如果你的 `CentOS` 有啟動防火牆，那麼還要開放對應的服務

```
$ sudo firewall-cmd --permanent --zone=public --add-service=http
$ sudo firewall-cmd --permanent --zone=public --add-service=https
$ sudo firewall-cmd --reload
```

### 關閉 SELINUX

1. 修改 `/etc/sysconfig/selinux`

   ```
   $ sudo vi /etc/sysconfig/selinux
   ```

2. 將 `SELINUX=enforcing` 改成 `SELINUX=disabled`

   ```
   # SELINUX=enforcing
   SELINUX=disabled
   ```

3. 重新開機

   ```
   $ reboot
   ```

### Nginx

1. 使用 `yum` 安裝 `Nginx`

   ```
   $ sudo yum install nginx -y
   ```

2. 啟動 `Nginx`

   ```
   $ sudo systemctl start nginx
   ```

3. 預設開機啟動 `Nginx`

   ```
   $ sudo systemctl enable nginx
   ```

4. 測試一下

   這時候應該可以打開瀏覽器，輸入網址 `[虛擬機 的 IP]`，就可以看到 `Ngnix` 的預設畫面了

   ![](https://i.imgur.com/b7azriL.png)

### MySQL

1. 安裝 `MariaDB` 伺服器

   ```
   $ sudo yum install mariadb-server -y
   ```

2. 啟動 `MariaDB`

   ```
   $ sudo systemctl start mariadb
   ```

3. 預設開機啟動 `MariaDB`

   ```
   $ sudo systemctl enable mariadb
   ```

4. 剛安裝好 `MariaDB` 時，建議執行一次 `mysql_secure_installation` 這個安全性設定工具

   - 這個設定工具可以幫助管理者設定 root 密碼、移除匿名登入帳號、禁止 root 從遠端登入、移除測試用的資料庫

   ```
   $ mysql_secure_installation
   ```

   | 說明                                              | 中文說明                       | 輸入        |
   | ------------------------------------------------- | ------------------------------ | ----------- |
   | Enter current password for root (enter for none): | 輸入當前 root 密碼             | 直接 enter  |
   | Set root password? [Y/n]                          | 是否設定 root 密碼?            | 直接 enter  |
   | New password:                                     | 輸入新密碼                     | root 新密碼 |
   | Re-enter new password:                            | 再次輸入新密碼                 | root 新密碼 |
   | Remove anonymous users? [Y/n]                     | 是否移除匿名用戶?              | 直接 enter  |
   | Disallow root login remotely? [Y/n]               | 是否禁止 root 用戶遠程登錄？   | 直接 enter  |
   | Remove test database and access to it? [Y/n]      | 是否刪除測試用的數據庫和權限？ | 直接 enter  |
   | Reload privilege tables now? [Y/n]                | 是否重新加載權限表？           | 直接 enter  |

5. 測試一下

   使用 root 帳號登入 `MariaDB` 伺服器，正常的話，就會進入 `MySQL/MariaDB` 互動式的操作畫面

   ```
   mysql -u root -p
   ```

   ![](https://i.imgur.com/Tq2rO3z.png)

   [CentOS Linux 7 安裝 MySQL/MariaDB 資料庫教學](https://blog.gtwang.org/linux/centos-7-install-mariadb-mysql-server-tutorial/)

### PHP

如果直接從 `CentOS7` 預設的 repository 安裝，會安裝成 `PHP5`

1. 安裝 `Remi` 的軟體源

   ```
   $ sudo yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm -y
   ```

2. 安裝 `yum-utils` 工具，這個一個 `yum` 工具的增強工具，可以更加方便的管理 `yum` 軟體源

   ```
   $ sudo yum install yum-utils -y
   ```

3. `yum-utils` 的提供了一個 `yum-config-manager` 程式，它可以將 `Remi` 軟體包作為預設源來安裝 `PHP7` (這邊示範安裝 PHP7.2)

   ```
   $ sudo yum-config-manager --enable remi-php72
   ```

4. 安裝 `php`

   - 安裝 php

     ```
     $ sudo yum install php -y
     ```

   - 安裝 `php` 相關模組 (視你的需求而定)

     ```
     $ sudo yum install php-mysql php-pecl-memcache php-pecl-memcached php-gd php-mbstring php-mcrypt php-xml php-pecl-apc php-cli php-pear php-pdo -y
     ```

5. 測試一下

   ```
   $ php -v
   ```

   ![](https://i.imgur.com/p8lEGkO.png)

### PHP-FPM

1. 用 `yum` 安裝 `PHP-FPM`

   ```
   $ sudo yum install php-fpm -y
   ```

2. 設定 `PHP-FPM`

   1. 編輯 `/etc/php-fpm.d/www.conf`

      ```
      $ sudo vi /etc/php-fpm.d/www.conf
      ```

   2. 修改對應的設定

      - 將使用者改為 `nginx`
      - `Nginx` 將請求轉發至 `php-fpm` 可以透過 `fastcgi` 的方式，而 `fastcgi` 有兩種
        - `TCP`
          - 通過網絡 TCP 連結建立網絡通信，即使是監聽 127.0.0.1，也是通過網絡底層協議來通信。相對於 unix domain socket 方式，會消耗一些網絡資源
        - `unix domain socket`
          - unix domain socket 它不需要經過網路協定，TCP 連線、握手等步驟，而只是將應用層的資料，從一個 process 傳輸到另一個 process 上，它於其它 IPC 機制相比來說，算是目前最常使用的 IPC 機制
          - unix domain socket 比 TCP 還快，效率較高
          - 但當有大量請求時，unix domain socket 的掉包機率比較高，穩定性較差
      - 這邊使用 `unix domain socket` 的方式，注意這裡的設定要和 `Nginx` 設定一樣

      ```
      user = nginx
      group = nginx
      ;listen = 127.0.0.1:9000
      listen = /var/run/php-fpm/php-fpm.sock
      listen.owner = nginx
      listen.group = nginx
      ```

3. 啟動 `PHP-FPM`

   ```
   $ sudo systemctl start php-fpm
   ```

4. 預設開機啟動 `PHP-FPM`

   ```
   $ sudo systemctl enable php-fpm
   ```

5. 測試一下

   1. 設定 `Nginx`，將 `.php` 的請求轉到 `PHP-FPM` 處理

      1. 修改 `/etc/nginx/nginx.conf`

         ```
         $ sudo vi /etc/nginx/nginx.conf
         ```

      2. 在 `server {}` 區塊裡面新增以下程式碼

         - 注意 `fastcgi_pass` 的部分要和 `php-fpm` 的設定一樣

         ```
         location ~ \.php$ {
                  fastcgi_pass   unix:/var/run/php-fpm/php-fpm.sock;
                  fastcgi_index  index.php;
                  fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
                  include        fastcgi_params;
         }
         error_page 404 /404.html;
               location = /40x.html {
         }

         error_page 500 502 503 504 /50x.html;
               location = /50x.html {
         }
         ```

   2. 檢查 `Nginx` 設定是否正確

      ```
      $ sudo nginx -t
      ```

   3. 重新載入 `Nginx` 的設定

      ```
      $ sudo nginx -s reload
      ```

   4. 在 `/usr/share/nginx/html` 裡，新增一隻 php 檔案

      ```
      $ sudo vi /usr/share/nginx/html/info.php
      ```

      info.php 內容

      ```php
      <?php phpinfo(); ?>
      ```

   5. 在瀏覽器網址打上 `[ip]/info.php`

      ![](https://i.imgur.com/jQuyyDN.png)

### phpMyAdmin

1. 用 `yum` 安裝 `phpMyAdmin`

   ```
   $ sudo yum install phpmyadmin -y
   ```

2. 沒有安裝過 `php-mbstring`，記得要安裝 `php-mbstring`

   ```
   $ sudo yum install php-mbstring -y
   ```

3. 安裝完要重新啟動 `php-fpm`

   ```
   $ sudo systemctl restart php-fpm
   ```

4. 設定 `Nginx`

   1. 新增 `snippets` 資料夾

      ```
      $ sudo mkdir /etc/nginx/snippets
      ```

   2. 新增 `/etc/nginx/snippets/phpMyAdmin.conf`

      ```
      $ sudo vi /etc/nginx/snippets/phpMyAdmin.conf
      ```

   3. 編輯 `phpMyAdmin.conf` 的設定

      - 注意 `fastcgi_pass` 的部分要和 `php-fpm` 的設定一樣

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

   4. 編輯 `nginx.conf`

      ```
      $ sudo vi /etc/nginx/nginx.conf
      ```

   5. 在 `nginx.conf` 的 `server {}` 區塊新增一行

      ```
      include snippets/phpMyAdmin.conf;
      ```

5. 檢查 `Nginx` 設定是否正確

   ```
   $ sudo nginx -t
   ```

6. 重新載入 `Nginx` 的設定

   ```
   $ sudo nginx -s reload
   ```

7. 在瀏覽器網址打上 `[ip]/phpMyAdmin`，會出現 `Nginx` 沒有寫入 `php/session` 的權限

   ![](https://i.imgur.com/pvbbVcj.png)

   利用指令查看 `/var/lib/php/` 權限

   ```
   $ ll /var/lib/php/
   ```

   ![](https://i.imgur.com/XRn0EQH.png)

8. 設定 `/var/lib/php/session` 資料夾權限

   ```
   $ sudo chown nginx:nginx /var/lib/php/session
   ```

   ![](https://i.imgur.com/ytqChVK.png)

   此時頁面就可以正常了

   ![](https://i.imgur.com/CRGXSYI.png)

   [How to Install phpMyAdmin with Nginx on CentOS 7](https://linuxize.com/post/how-to-install-phpmyadmin-with-nginx-on-centos-7/)

   [How To Install and Secure phpMyAdmin with Nginx on a CentOS 7 Server](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-with-nginx-on-a-centos-7-server)

   [如何安装和一个 CentOS 7 服务器上使用 Nginx 的 phpMyAdmin 的安全](https://www.howtoing.com/how-to-install-and-secure-phpmyadmin-with-nginx-on-a-centos-7-server)

### 番外篇

使用虛擬機做為開發的人，可以將 `Nginx` 設定指向共享資料夾，這樣在虛擬機外修改程式碼，就可以馬上看到網頁更新了

1. [centos] 設定 `Nginx`

   1. 新增 `test.conf`

      ```
      $ sudo vi /etc/nginx/conf.d/test.conf
      ```

   2. `test.conf`

      - `server_name` 為你的域名
      - `root` 為共享資料夾的目標資料夾
      - `fastcgi_pass` 要和 `php-fpm` 的設定一樣

      ```
      server {
            listen       80;
            server_name  vm-test.com;
            root         /home/elaine/projects/test;
            index index.html index.php index.htm;

            location ~ \.php$ {
                     fastcgi_pass   unix:/var/run/php-fpm/php-fpm.sock;
                     fastcgi_index  index.php;
                     fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
                     include        fastcgi_params;
            }

            error_page 404 /404.html;
            location = /40x.html {
            }

            error_page 500 502 503 504 /50x.html;
            location = /50x.html {
            }

            include snippets/phpMyAdmin.conf;
      }
      ```

   3. 檢查 `Nginx` 設定是否正確

      ```
      $ sudo nginx -t
      ```

   4. 重新載入 `Nginx` 的設定

      ```
      $ sudo nginx -s reload
      ```

2. [centos] 開啟共享資料夾的權限，讓其他使用者 (如 `Nginx`) 有權利執行

   ```
   chmod 701 /home/elaine
   ```

3. [mac] 設定 host

   ```
   $ sudo vi /etc/hosts
   ```

   新增一行

   ```
   172.16.1.136 vm-test.com
   ```

4. [mac] 測試一下

   1. 在共享資料夾下新增一個資料夾 `test`

   2. 在 `test` 資料夾下新增 `index.php`

      index.php 內容

      ```php
      <?php
         echo "Hello World!";
      ```

   3. 打開瀏覽器輸入 `vm-test.com`，就可以看到 `Hello World!` 了

### 參考資料

- [CentOS 7 安裝 Nginx、MySQL/MariaDB、PHP7，架設 LEMP 網頁伺服器筆記](https://blog.gtwang.org/linux/linode-centos-7-nginx-mysql-mariadb-php-7-installation-notes/)
- [於 CentOS7 安裝 Nginx + php7 + php-fpm + Laravel5.6](https://medium.com/@iven00000000/%E6%96%BCcentos7%E5%AE%89%E8%A3%9D-nginx-php7-php-fpm-laravel5-6-df8631681acf)
- [[DigitalOcean] How To Install Linux, Nginx, MySQL, PHP (LEMP) stack On CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-centos-7)
- [於 Ubuntu 18.04 安裝 nginx 與 php-fpm 與 phpmyadmin](https://xanxusvervr.blogspot.com/2018/06/ubuntu-1804nginxphp-fpmphpmyadmin.html)
- [How to Install PHP 7.3 in CentOS 7](https://www.tecmint.com/install-php-7-in-centos-7/)
- [在 CentOS 7 上安裝 PHP 7.3](http://max043.blogspot.com/2019/01/centos-7-php-73.html?m=1)
