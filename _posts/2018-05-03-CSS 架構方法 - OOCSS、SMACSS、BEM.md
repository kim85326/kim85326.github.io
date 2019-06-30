---
layout: post
title: "CSS 架構方法 - OOCSS、SMACSS、BEM"
date: 2018-05-03 00:00:00 +0800
categories: 前端
tags: CSS、OOCSS、SMACSS、BEM
mathjax: true
---

<a class="slide-link" href="https://docs.google.com/presentation/d/e/2PACX-1vSjYhNDbi_2P-WdA6uyP0fTMSo1Lfq_GujyWShPJ2Qmj5_HQU2TzIp_5edUfr-svjux8ZsNw4rEdfmF/pub?start=false&loop=false&delayms=3000" target="_blank">
    這是我在公司技術分享會的投影片
</a>

<div class="slide">
    <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSjYhNDbi_2P-WdA6uyP0fTMSo1Lfq_GujyWShPJ2Qmj5_HQU2TzIp_5edUfr-svjux8ZsNw4rEdfmF/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</div>

- 良好的 css 架構
  - 預測
  - 複用 - 重複利用性、能夠用在更多頁面
  - 維護 - 視覺化、共同開發上更好溝通、網頁維護
  - 延展

## 模組化 OOCSS (Object Oriented CSS)

- 元件化
- 結構與樣式分開
  - 結構：`position、float、margin、padding`...
  - 樣式：`border、color、background-color`...

```css
.mb-20 {
  margin-bottom: 20px;
}
```

- 容器與內容分開
  - 容器：排版的框架、grid
  - 內容：元件
- 減少對 html 的依賴
  - 使用 OOCSS 時，盡量不要用後代選擇器(.header ul)
  - OOCSS 應該是直接命名 class，才能夠隨意指定到各 html tag 上

## SMACSS (Scalable Modular Architecture for CSS)

- 將結構分類

  - base - 標籤預設的樣式
    - css reset
    - css normalize
    - 在 base 裡面不使用 !important
  - layout - 網頁佈局、排版、格線

    - 例如
      - grid
      - header
      - sidebar
      - content

    ```css
    .layout-header {
    }
    .l-header {
    }
    ```

  - module - 模塊
    - 頁面上可以單獨存在，並且可以重複使用的元件
    - 子模組以原模組名稱加上 `-` 作為名稱
    ```css
    .card {
    }
    .card-header {
    }
    .card-name {
    }
    ```
    - 例如
      - navbar
      - tab
  - state - 狀態說明

    - active、inactive
    - disabled、default
    - 命名規則是 `.is-*` 開頭

    ```css
    .is-hidden {
    }
    .is-error {
    }
    .is-tab-active {
    }
    ```

  - theme - 主題樣式 (非必要)
    - 網站主視覺
    - 命名通常以 `.theme-*` 做開頭

- 命名規則
- 減少對 html 的依賴
  - 使用 SMACSS 時，盡量不要用後代選擇器(.header ul)
  - SMACSS 應該是直接命名 class，才能夠隨意指定到各 html tag 上
- 偽元素、@media query 寫在原本 module 的後面

## BEM (Block Element Modifier)

- 把網頁每一個東西都當成積木
- block - 明確描述目的
  - 在頁面上獨立存在並可重複使用的元件
  - 如同 SMACSS 的 module , layout
  - 每一個 block 都是獨立的存在
  - 命名規則：
    - 明確描述目的 (.logo、.search)
    - 不能寫影響環境的樣式 (margin、position)
    - 不能寫 id 選擇器

```css
/* 合法 */
.error {
}
/* 不合法，如果突然要改成 orange 不就要改名字 */
.text-red {
}
```

- element
  - 為 block 的子組件
  - 無法獨立於 block 之外
  - 有 block 可能沒有 element
  - 命名規則以 block 名稱再加上兩條底線 `__`

```css
.button__icon {
}
.text-field__label {
}
.heading__title {
}
.menu__item {
}
```

- modifier - 後修飾語(說明差異)
  - 用來定義 block 或 element 的狀態或屬性
  - 類似 SMACSSS 的 state
  - 同一個 block 或 element 可以允許多組 modifier 同時存在

```css
.button--active {
}
.text-field--editable {
}
.heading_align-top {
}
.search-form__button--lg {
}
```

- 命名規則

  - `.namespace-block-name__element-name--modifier`

- 使用 BEM 的 CSS 就是 material design

### 參考資料

- [漫談 css 架構方法](https://www.slideshare.net/kurotanshi/css-oocss-smacss-bem)
- [從入門到業界實戰 - UI / UX 前端網頁設計 - CSS 樣式管理](https://hahow.in/courses/58d5c70c27ea7d070060160e/discussions?curriculum=5a1e1752a2c4b000589dd850)
