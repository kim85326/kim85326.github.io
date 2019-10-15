---
layout: post
title: "Centos7 移除 MariaDB 並安裝 MySQL"
date: 2019-10-15 00:00:00 +0800
categories: 架站
tags: MySQL
mathjax: true
---

### 移除 MariaDB

- 查看已安裝的 MariaDB

  ```
  $ rpm -qa|grep mariadb
  ```

- 移除 MariaDB

  ```
  $ yum remove mariadb
  ```

- 刪除遺留檔案

  ```
  $ rm -rf /etc/my.cnf
  $ rm -rf /var/lib/mysql/
  ```

### 安裝 MySQL

- 安裝套件庫

  ```
  $ sudo rpm -Uvh https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
  ```

- 安裝 MySQL

  ```
  $ sudo yum install mysql-community-server
  ```

- 啟動 MySQL

  ```
  $ systemctl start mysqld
  ```

- 設定開機啟動 MySQL

  ```
  $ systemctl enable mysqld
  ```

- 查看 root 密碼

  ```
  $ sudo cat /var/log/mysqld.log | grep "temporary password"
  ```

- 使用 root 登入 MySQL，並打上面找到的密碼

  ```
  $ mysql -u root -p
  ```

- 修改 root 密碼

  ```
  mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new-password';
  ```

- 如果密碼太簡單導致修改失敗的話，可以修改密碼長度規則或密碼驗證原則 (雖然不建議)

  ```
  mysql> set global validate_password_length=3;
  ```

  ```
  mysql> set global validate_password_policy=0;
  ```

- 更新授權權限

  ```
  mysql> FLUSH PRIVILEGES;
  ```

- 測試登入

  ```
  $ mysql -u root -p
  ```

### 參考資料

- [CentOS 7.x 卸载删除 MariaDB，重新安装](https://blog.csdn.net/chengyuqiang/article/details/80210416)
- [CentOS7 安裝 MySQL 5.7 - 改用 yum install mysql-community-server 安裝](https://blog.xuite.net/tolarku/blog/542563206-CentOS7+%E5%AE%89%E8%A3%9D+MySQL+5.7++-+%E6%94%B9%E7%94%A8+yum+install+mysql-community-server+%E5%AE%89%E8%A3%9D)
- [在 CentOS7 上安裝 MySQL](https://dotblogs.com.tw/tinggg01/2018/07/06/153413)
- [MySQL 更改密碼顯示「ERROR 1819 (HY000) Your password does not satisfy the current policy requirements」錯誤訊息的處理方式](https://blog.vvtitan.com/2018/04/mysql%E6%9B%B4%E6%94%B9%E5%AF%86%E7%A2%BC%E9%A1%AF%E7%A4%BA%E3%80%8Cerror-1819-hy000-password-satisfy-current-policy-requirements%E3%80%8D%E9%8C%AF%E8%AA%A4%E8%A8%8A%E6%81%AF%E7%9A%84%E8%99%95/)
