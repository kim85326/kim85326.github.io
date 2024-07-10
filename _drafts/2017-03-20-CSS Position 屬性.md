---
layout: post
title: "CSS Position 屬性"
date: 2017-03-20 00:00:00 +0800
categories: CSS
tags: CSS
mathjax: true
description: ""
---

### static

- static 是預設值。
- 任何套用 `position: static;` 的元素「不會被特別定位」在頁面上特定位置，而是照著瀏覽器預設的配置自動排版在頁面上，所有其他的屬性值都代表該元素會被定位在頁面上

```css
.static {
  position: static;
}
```

### relative

- relative 表現的和 static 一樣，除非你增加了一些額外的屬性
- 在一個設定為 `position: relative` 的元素內設定 top 、 right 、 bottom 和 left 屬性，會使其元素「相對地」調整其原本該出現的所在位置，而不管這些「相對定位」過的元素如何在頁面上移動位置或增加了多少空間，都不會影響到原本其他元素所在的位置

```html
<div class="relative1">
  <div class="relative2"></div>
</div>
```

```css
.relative1 {
  position: relative;
}
.relative2 {
  position: relative;
  top: -20px;
  left: 20px;
  background-color: white;
  width: 500px;
}
```

![](/assets/img/posts/l9iRDeC.png)

### abosulte

- 根據上層容器的相對位置開始
  - 去找第一個外層有設 relative 或是 absolute 或是 fixed 的為主
  - 外層如果都沒有設上面這些屬性時，那會以瀏覽器的視窗 body 為主

```html
<div class="relative">
  <div class="static">
    <div class="absolute"></div>
  </div>
</div>
```

```css
.relative {
  position: relative;
  background-color: pink;
  width: 500px;
  height: 100px;
}
.static {
  background-color: aquamarine;
  width: 400px;
  height: 50px;
}
.absolute {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: yellow;
  width: 400px;
  height: 50px;
}
```

![](/assets/img/posts/2Qf94Xj.png)

### fixed

- 固定在瀏覽器的某個位置
- 最常見 navbar 置上、提示語置下、廣告等等

```css
.fixed {
  position: fixed;
}
```

### z-index

覆蓋層級

- 未定位的元素 (`position: static`)

```css
.static {
  z-index: 0;
}
```

- 有定位的元素的 z-index 會比沒定位的 高 (意思就是有定位的會覆蓋沒定位的元素)

### 參考資料

- [關於 position 屬性](http://zh-tw.learnlayout.com/position.html)
