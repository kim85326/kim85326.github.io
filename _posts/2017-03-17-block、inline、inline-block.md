---
layout: post
title: "block、inline、inline-block"
date: 2017-03-17 00:00:00 +0800
categories: CSS
tags: CSS
excerpt: .
mathjax: true
---
### block element 塊元素
* css為 display:block
* 特色
    1. 每個塊元素都重新的一行開始，並且其后的元素也另起一行（就是他獨佔一行的意思）
    2. 元素的高度、寬度、行高以及top和bottom邊距都可設定
    3. 元素寬度在不設定的情況下，是它本身父容器的100%（和父元素的寬度一致），除非設定一个寬度
* HTML中預設的塊元素：
```
\<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>
```
### inline element 行内元素
* css為 display:inline
* 特色
    1. 和其他元素都在一行上
    2. 元素的高度、寬度、行高及top和bottom邊距不可設定
    3. 元素的寬度就是它包含的文字或圖片的寬度，不可改變
* HTML中預設的行内元素：
```html
<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>
```

### inline-block element 行內塊元素
* css為 display:inline-block
* 特色：
    1. 和其他元素都在一行上
    2. 元素的高度、寬度、行高以及top和bottom邊距都可設定
* HTML中預設的行内元素：
```html
<img>、<input>
```

### css 的厲害
雖然這些html有預設display的長相，但我們也可以利用css將display改變，這就是css的妙處

#### 例如：有兩個div我想將他們並排
##### 預設
```html
<div style="background-color:yellow;width:200px;height:80px;">
</div>
<div style="background-color:blue;width:200px;height:80px;">
</div>
```
![](https://i.imgur.com/oniA8rg.png)

##### 將div改成display:inline-block
```html
<div style="background-color:yellow;width:200px;height:80px;display:inline-block;">
</div>
<div style="background-color:blue;width:200px;height:80px;display:inline-block">
</div>
```
![](https://i.imgur.com/PXh65Ay.png)

### display:none
如果把display設為none的話，該元素就會變成html預設的display



參考資料<br>
[HTML标签元素的分类](http://www.adminwang.com/css/90.html
)
