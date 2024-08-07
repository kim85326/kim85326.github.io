---
layout: post
title: "CSS Flexbox"
date: 2017-07-14 00:00:00 +0800
categories: CSS
tags: CSS
mathjax: true
description: ""
---

```html
<div class="parent">
  <div class="child child1"></div>
  <div class="child child2"></div>
  <div class="child child3"></div>
</div>
```

## 在父層設定

### display:flex

```css
.parent {
  display: flex;
}
```

### flex-direction

- 決定子元件的排序方向 => 主軸

```css
.parent {
  /*     主軸由左到右 */
  flex-direction: row;
  /*     主軸由右到左 */
  flex-direction: row-reverse;
  /*     主軸由上到下 */
  flex-direction: column;
  /*     主軸由下到上 */
  flex-direction: column-reverse;
}
```

![](/assets/img/posts/M3ScxWI.png)

### flex-wrap

- 當子層的數量太多，可以決定要不要換行
- 預設是 `flex-wrap: nowrap`;

```css
.parent {
  /* 不能換行 */
  flex-wrap: nowrap;
  /* 換行 */
  flex-wrap: wrap;
  /* 換行時反轉 */
  flex-wrap: wrap-reverse;
}
```

### flex-flow

- 只是把 flex-direction 和 flex-wrap 寫在一起
- template
  - `flex-flow: [flex-direction] || [flex-wrap]>`

```css
.parent {
  flex-flow: row wrap;
}
```

### justify-content

- 可以理解成對齊主軸哪個方向
- 或是子層要怎麼平分父層的空間 (主軸)

```css
.parent {
  /* 空間在end => 對齊start */
  justify-content: flex-start;
  /* 空間在start => 對齊end */
  justify-content: flex-end;
  /* 空間平分在start和end端 */
  justify-content: center;
  /* 空間平分圍繞在child之中 (start和end端都沒有) */
  justify-content: space-between;
  /* 空間平分圍繞在child */
  justify-content: space-around;
}
```

![](/assets/img/posts/KEKUGZt.png)

### align-items

- 子層怎麼對齊 (交錯軸)

```css
.parent {
  /* 假如現在主軸是由左到右 => 交錯軸是由上到下 */

  /* 空間在end => 對齊交錯軸的start */
  align-items: flex-start;
  /* 空間在start => 對齊交錯軸的end */
  align-items: flex-end;
  /* 空間平分在start和end端 */
  align-items: center;
  /* 沒有空間 => 子元件延伸 */
  align-items: stretch;
  /* 子元件依照字的位置對齊 */
  align-items: baseline;
}
```

![](/assets/img/posts/imsupd7.png)

## 在子層設定

### flex

- 是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的縮寫
  - 如果只寫一個值就是 `flex-grow`

### flex-grow

- 代表**伸展**的比例
- 值是數字且無單位，不可以為負值
- 預設 `flex-grow: 0`，代表不會放大
- 設定完 `flex-grow` 後
  - 父層的 `justify-content` 和 `flex-wrap` 會失效

```css
.child {
  /* 代表每個放大並都佔一等份 */
  flex-grow: 1;
}
.child1 {
  /* 那現在.child1就佔了2等分 */
  flex-grow: 2;
}
```

### flex-shrink

- 代表**壓縮**的比例
- 值是數字且無單位，不可以為負值
- 預設 `flex-shrink: 1`

### align-self

- 調整該子元件的對齊
- 和 `align-item` 差不多，只是用在子元件上

### order

- 利用數字大小決定順序

```css
.child1 {
  order: 2;
}
.child2 {
  order: -1;
}
.child3 {
  order: 3;
}
/* 出現順序為.child2 .child1 .child3 */
```

![](/assets/img/posts/gSKXhmP.png)

### 參考資料

- [圖解：CSS Flex 屬性一點也不難](https://wcc723.github.io/css/2017/07/21/css-flex/)
- [深入解析 CSS Flexbox](http://www.oxxostudio.tw/articles/201501/css-flexbox.html)
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
