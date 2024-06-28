---
layout: post
title: "Docusaurus 靜態網站"
date: 2018-10-03 00:00:00 +0800
categories: 其他
tags: React JavaScript
mathjax: true
description: ""
---

## Docusaurus 優點

- 節省時間並專注於專案的文件，只需要用 Mackdown 撰寫文檔或文章，Docusaurus 會幫你準備一組靜態 html 檔案
- 利用 React 來擴充或客製化你的專案，例如擴充一直重複使用的 header 與 footer
- Localization (本地化)已預先配置，使用 Crowdin 將您的文檔翻譯成 70 多種語言
- 文檔版本控制可以幫你同步文檔與其專案版本
- 讓你的社群(應該是使用者?)能輕易在你的文件中找到他們想要的內容，Docusaurus 支持 Algolia documentation search

## 如何建置環境

1. 安裝 docusaurus-init

   - 全域安裝 docusaurus-init

   ```
   $ npm install --global docusaurus-init
   ```

   - 本地安裝 docusaurus-init
     1. 然後通過  npx docusaurus-init  或通過   ./node_modules/.bin/docusaurus-init  創建的   node_modules  目錄運行
     2. 運行腳本後，刪除已創建的  package.json  文件和   node_modules  目錄

   ```
   $ npm install docusaurus-init
   ```

2. 選一個好地方利用 docusaurus-init 建立一個新的網站

```
$ docusaurus-init
```

產生的資料夾結構如下

```
root-directory
├── docs-examples-from-docusaurus
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   ├── exampledoc4.md
│   └── exampledoc5.md
└── website
    ├── blog-examples-from-docusaurus
    │   ├── 2016-03-11-blog-post.md
    │   ├── 2017-04-10-blog-post-two.md
    │   ├── 2017-09-25-testing-rss.md
    │   ├── 2017-09-26-adding-rss.md
    │   └── 2017-10-24-new-version-1.0.0.md
    ├── core
    │   └── Footer.js
    ├── package.json
    ├── pages
    ├── sidebars.json
    ├── siteConfig.js
    └── static
```

3. 將 docs-examples-from-docusaurus 改名為 docs
   將 blog-examples-from-docusaurus 改名為 blog

4. 運行腳本

```
$ npm start
```

你可以在 http://localhost:3000 看到長這樣的網站

![](https://i.imgur.com/lyBkEC5.png)

## 目錄說明

### docs (原為 docs-examples-from-docusaurus)

### blog

website/blog (原為 blog-examples-from-docusaurus)

- 放置部落格文章的資料夾
- 文檔名需符合 yyyy-mm-dd-your-file-name.md

  ![](https://i.imgur.com/f2C2bFX.png)

- 文檔內容要符合

### core

website/core/Footer.js

- 是一個 react 元件，可以客製化

### pages

website/pages

### static

website/static

- 包含此網站使用的靜態資源

### siteConfig

- Docusaurus 使用的主要配置文件

## markdown 內容

- 將你的文檔以 .md 文件的形式添加到 /docs 文件夾中，並確保每個文件都有正確的 header
- 最簡單的標題如下
  - id 是連結名稱，例如 docs/intro.html
  - title 是瀏覽器頁面的標題

```

---
id: intro
title: 啦啦啦
---

這是我的 *新文件内容*

```

### 參考資料

- [docusaurus 官網](https://docusaurus.io/en/)
- [Docusaurus 快速建站](https://blog.csdn.net/eqera/article/details/79324869)
- [Docusaurus – 5 分钟为开源项目创建一个静态网站，文档、API 一应俱全](https://www.appinn.com/docusaurus/)
- [facebook Docusaurus 文档的中文版本](https://github.com/demopark/docusaurus-docs-Zh_CN)
- [用 Algolia DocSearch 輕鬆實現文檔全站搜索](https://laravel-china.org/articles/12400/using-algolia-docsearch-to-easily-realize-document-total-station-search)
