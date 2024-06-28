---
layout: post
title: "CSS Display 屬性"
date: 2017-03-17 00:00:00 +0800
categories: CSS
tags: CSS
mathjax: true
description: ""
---

### block element 塊元素

- css 為 `display:block`
- 特色
  1. 每個塊元素都重新的一行開始，並且其后的元素也另起一行（就是他獨佔一行的意思）
  2. 元素的高度、寬度、行高以及 top 和 bottom 邊距都可設定
  3. 元素寬度在不設定的情況下，是它本身父容器的 100%（和父元素的寬度一致），除非設定一个寬度
- HTML 中預設的塊元素：

```
<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote>、<form>
```

### inline element 行内元素

- css 為 `display:inline`
- 特色
  1. 和其他元素都在一行上
  2. 元素的高度、寬度、行高及 top 和 bottom 邊距不可設定
  3. 元素的寬度就是它包含的文字或圖片的寬度，不可改變
- HTML 中預設的行内元素：

```
<a>、<span>、<br />、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>
```

### inline-block element 行內塊元素

- css 為 `display:inline-block`
- 特色：
  1. 和其他元素都在一行上
  2. 元素的高度、寬度、行高以及 top 和 bottom 邊距都可設定
- HTML 中預設的行内元素：

```
<img>、<input>
```

### display:none

如果把 display 設為 none 的話，該元素就會被隱藏

### css 的厲害

雖然這些 html 有預設 display 的長相，但我們也可以利用 css 將 display 改變，這就是 css 的妙處

#### 例如：有兩個 div 我想將他們並排

##### 預設

```html
<div style="background-color:yellow;width:200px;height:80px;"></div>
<div style="background-color:blue;width:200px;height:80px;"></div>
```

![](https://i.imgur.com/oniA8rg.png)

##### 將 div 改成 `display:inline-block`

```html
<div
  style="background-color:yellow;width:200px;height:80px;display:inline-block;"
></div>
<div
  style="background-color:blue;width:200px;height:80px;display:inline-block"
></div>
```

![](https://i.imgur.com/PXh65Ay.png)

### 參考資料

- [HTML 标签元素的分类](http://www.adminwang.com/css/90.html)
- [關於 "display" 屬性](http://zh-tw.learnlayout.com/display.html)
