---
layout: post
title: "設定 HTTPS (Centos + Nginx)"
date: 2019-03-10 00:00:00 +0800
categories: 架站
tags: 
mathjax: true
---

- 切換 root

`$ sudo -s`

### 建立憑證

參考 [https://devcenter.heroku.com/articles/ssl-certificate-self](https://devcenter.heroku.com/articles/ssl-certificate-self)

    $ sudo -s
    $ mkdir -p /etc/nginx/ssl/self-signed
    $ cd /etc/nginx/ssl/self-signed
    $ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
    $ openssl rsa -passin pass:x -in server.pass.key -out server.key

- 產生 server.csr

`$ openssl req -new -key server.key -out server.csr`

| --- | 敘述                                                        | 輸入         |
| --- | ----------------------------------------------------------- | ------------ |
| 1   | Country Name (2 letter code) [AU]:                          | TW           |
| 2   | State or Province Name (full name) [Some-State]:            | Taiwan       |
| 3   | Locality Name (eg, city) []:                                | Taipei       |
| 4   | Organization Name (eg, company) [Internet Widgits Pty Ltd]: | BB-IN        |
| 5   | Organizational Unit Name (eg, section) []:                  | BB-IN        |
| 6   | Common Name (e.g. server FQDN or YOUR name) []:             | [直接 enter] |
| 7   | Email Address []:                                           | [直接 enter] |
| 8   | A challenge password []:                                    | [直接 enter] |
| 9   | An optional company name []:                                | [直接 enter] |

- 產生 server.crt (設 10 年: 3650 天)

`$ openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt`

- 移除不需要的檔案

`$ rm server.csr server.pass.key`

- 修改目錄讀取權限

`$ chmod -R 600 /etc/nginx/ssl`

##建立 https 的設定

- 切換目錄

`$ cd /etc/nginx/`

- 建立 conf 檔

`$ vi sites-available/ssl-http.conf`

    server {
        listen *:443; #
        server_name _;

        ssl on;
        ssl_certificate /etc/nginx/ssl/self-signed/server.crt;
        ssl_certificate_key /etc/nginx/ssl/self-signed/server.key;

        ssl_session_timeout 1d;
        ssl_session_cache shared:SSL:50m;

        ssl_protocols TLSv1.2 TLSv1.1 TLSv1;

        ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:DES-CBC3-SHA:+3DES:+RSA:-DH:!aNULL:!eNULL:!EXPORT:!RC4:!MD5:!PSK';

        ssl_prefer_server_ciphers on;

        access_log /var/log/nginx/ssl-http.access.log main;
        error_log  /var/log/nginx/ssl-http.error.log;

        root /usr/share/nginx/html/;

        client_header_buffer_size 16k;
        large_client_header_buffers 4 32k;
        client_max_body_size 32m;

        keepalive_timeout 3;
        keepalive_requests 25;

        include conf.d/laravel.conf;
    }

- 建立 link 到 sites-enabled

`$ ln -s ../sites-available/ssl-http.conf sites-enabled/`

- 檢查設定是否有誤

`$ nginx -t`

    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful

須出現 test is successful 才行

- 重載服務

`$ service nginx reload`

- 如果有修改到 nginx 的 listen ip 跟 listen port，重啟 nginx

`$ service nginx restart`

### 參考資料

- [NGINX 設定 HTTPS 網頁加密連線，建立自行簽署的 SSL 憑證](https://blog.gtwang.org/linux/nginx-create-and-install-ssl-certificate-on-ubuntu-linux/)
