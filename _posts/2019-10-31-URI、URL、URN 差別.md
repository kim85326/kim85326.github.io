---
layout: post
title: "URI、URL、URN 差別"
date: 2019-10-31 00:00:00 +0800
categories: 網路
tags:
mathjax: true
---

![](https://i.imgur.com/9Lrn7Uz.png)

- URI

  - Universal Resource Identifier 統一資源標誌符
  - 在某一規則下能把一個資源獨一無二標示出來

    ```
    https://developer.mozilla.org/en-US/docs/Learn
    tel:+1-816-555-1212
    git@github.com:mdn/browser-compat-data.git
    ftp://example.org/resource.txt
    urn:isbn:9780141036144
    ```

- URL

  - Universal Resource Locator 統一資源定位符
  - 類似一個人的住址
  - 標識一個網際網路資源，並指定對其進行操作或取得該資源的方法

    ```
    https://developer.mozilla.org
    https://developer.mozilla.org/en-US/docs/Learn/
    https://developer.mozilla.org/en-US/search?q=URL
    ```

- URN

  - Universal Resource Name 統一資源名稱
  - 類似一個人的名字
  - 基於某命名空間通過名稱指定資源的 URI
  - 人們可以通過 URN 來指出某個資源，而無需指出其位置和獲得方式

    ```
    urn:isbn:9780141036144
    urn:ietf:rfc:7230
    ```

每個 URL 都是 URI，但不一定每個 URI 都是 URL

### 參考資料

- [維基百科 - 統一資源標誌符](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E6%A0%87%E5%BF%97%E7%AC%A6)
- [MDN - 标识互联网上的内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web)
- [URI 與 URL 的區別](https://www.itread01.com/content/1541700250.html)
- [HTTP 协议中 URI 和 URL 有什么区别？](https://www.zhihu.com/question/21950864)
