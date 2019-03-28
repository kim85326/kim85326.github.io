---
layout: post
title: "Display 與 Visible 差別"
date: 2017-03-19 00:00:00 +0800
categories: CSS
tags: CSS
mathjax: true
---

有一些特殊的元素 display 預設值會套用 none 屬性值，例如 script 元素就是個典型的例子。`display:none` 通常會搭配 JavaScript 一起使用，我們可以透過 JavaScript 動態修改元素的 display 屬性，用以隱藏或顯示該元素，而不是將元素從頁面中刪除或重建。

display 和 visibility 屬性不一樣

- 把 `display: none` 不會保留元素原本該顯示的空間
- 但是 `visibility: hidden` 會讓元素的內容看不見，但會保留原本內容應該顯示的空間，只是看不到內容而已

### 參考資料

- [關於 "display" 屬性](http://zh-tw.learnlayout.com/display.html)
