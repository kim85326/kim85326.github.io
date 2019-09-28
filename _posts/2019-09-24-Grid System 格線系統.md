---
layout: post
title: "Grid System 格線系統"
date: 2019-09-24 00:00:00 +0800
categories: CSS
tags:
mathjax: true
---

### 概念

- 總寬度
  - 網頁主要內容呈現的範圍
- 總欄位數
  - 12 是常用的數值，16、24 也有很多人使用
  - 通常這個數值是許多數值的最小公倍數
- Gutter
  - 間隔寬度，欄與欄的間距
- Gutter on outside
  - 外部間距，設定的間隔寬度是否要加在外層
  - 避免網頁主要內容過於貼近瀏覽器邊緣，所以會預先保留一些寬度
- Column
  - 單一欄的寬度
- 公式
  - `總寬度 = 總欄位數 * 單一欄的寬度 + Gutter * (總欄位數 - 1) + Gutter on outside`
  - `單一欄的寬度 = ((總寬度 - Gutter on outside) - Gutter * (總欄位數 - 1)) / 總欄位數`

![](https://i.imgur.com/xjrKvSy.png)

### 結構

總欄位數為 12

- `.container`
  - 最外層的容器，作為限制最大寬度用
- `.row`
  - 包覆欄 (.col) 的容器，有清除欄 (.col) 的浮動之功用
- `.col-[number]`
  - 所有的欄位，可以從 1 ~ 12，透過 Sass 可以自訂所需的欄數

### 01 以 float 完成初版

- 設定總欄數為 12

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Grid System</title>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <body>
      <div class="container">
        <div class="row">
          <div class="col col-2">col-2</div>
          <div class="col col-3">col-3</div>
          <div class="col col-4">col-4</div>
        </div>
      </div>
    </body>
  </body>
</html>
```

```scss
$grid-columns: 12;

* {
  box-sizing: border-box;
}

.row {
  &::before {
    content: "";
    display: block;
  }

  &::after {
    content: "";
    display: block;
    clear: both;
  }
}

.col {
  float: left;
  background-color: rgba(#4a86e9, 0.2); /* 非必要，單純展示用 */
  border: 1px solid #4a86e9; /* 非必要，單純展示用 */
  padding: 15px; /* 非必要，單純展示用 */
}

@for $i from 1 through 12 {
  .col-#{$i} {
    width: calc(100% * (#{$i} / #{$grid-columns}));
  }
}
```

### 02 float RWD 版

- 設定總欄數為 12
- 設定斷點 (參考 Bootstrap)
  - sm => 576px
  - md => 768px
  - lg => 992px
  - xl => 1200px
- 根據斷點設定 .container 最大寬度

  ```css
  @media screen and (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }

  @media screen and (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }

  @media screen and (min-width: 992px) {
    .container {
      max-width: 960px;
    }
  }

  @media screen and (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }
  ```

- 設定 col 的寬度

  - col-[number]

    ```css
    .col-2 {
      width: calc(100% * (2 / 12));
    }
    ```

  - col-sm-[number]
    ```css
    @media screen and (min-width: 576px) {
      .col-sm-2 {
        width: calc(100% * (2 / 12));
      }
    }
    ```
  - col-md-[number]
    ```css
    @media screen and (min-width: 768px) {
      .col-md-2 {
        width: calc(100% * (2 / 12));
      }
    }
    ```
  - col-lg-[number]

    ```css
    @media screen and (min-width: 992px) {
      .col-lg-2 {
        width: calc(100% * (2 / 12));
      }
    }
    ```

  - col-xl-[number]

    ```css
    @media screen and (min-width: 1200px) {
      .col-xl-2 {
        width: calc(100% * (2 / 12));
      }
    }
    ```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Grid System</title>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <body>
      <div class="container">
        <div class="row">
          <div class="col col-12 col-md-8">.col-xs-12 .col-md-8</div>
          <div class="col col-6 col-md-4">.col-xs-6 .col-md-4</div>
        </div>
        <div class="row">
          <div class="col col-6 col-md-4">.col-xs-6 .col-md-4</div>
          <div class="col col-6 col-md-4">.col-xs-6 .col-md-4</div>
          <div class="col col-6 col-md-4">.col-xs-6 .col-md-4</div>
        </div>
        <div class="row">
          <div class="col col-6">.col-xs-6</div>
          <div class="col col-6">.col-xs-6</div>
        </div>
      </div>
    </body>
  </body>
</html>
```

```scss
$grid-columns: 12;
$grid-breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
);
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
);

* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

@each $name, $breakpoints in $grid-breakpoints {
  @media screen and (min-width: $breakpoints) {
    .container {
      max-width: map-get($container-max-widths, $name);
    }
  }
}

.row {
  &::before {
    content: "";
    display: block;
  }

  &::after {
    content: "";
    display: block;
    clear: both;
  }
}

.col {
  float: left;
  background-color: rgba(#4a86e9, 0.2);
  border: 1px solid #4a86e9;
  padding: 15px;
}

@for $i from 1 through 12 {
  .col-#{$i} {
    width: calc(100% * (#{$i} / #{$grid-columns}));
  }
}

@each $name, $breakpoints in $grid-breakpoints {
  @media screen and (min-width: $breakpoints) {
    @for $i from 1 through 12 {
      .col-#{$name}-#{$i} {
        width: calc(100% * (#{$i} / #{$grid-columns}));
      }
    }
  }
}
```

### 03 改用 flexbox

- `.row` 只剩下這樣
  ```
  .row {
      display: flex;
      flex-wrap: wrap;
  }
  ```
- `col` 的寬度算法

  ```
  .col-2 {
      flex: 0 0 16.666667%;
      max-width: 16.666667%;
  }
  ```

```scss
$grid-columns: 12;
$grid-breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
);
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
);

* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

@each $name, $breakpoints in $grid-breakpoints {
  @media screen and (min-width: $breakpoints) {
    .container {
      max-width: map-get($container-max-widths, $name);
    }
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col {
  background-color: rgba(#4a86e9, 0.2);
  border: 1px solid #4a86e9;
  padding: 15px;
}

@for $i from 1 through 12 {
  .col-#{$i} {
    max-width: calc(100% * (#{$i} / #{$grid-columns}));
    flex: 0 0 calc(100% * (#{$i} / #{$grid-columns}));
  }
}

@each $name, $breakpoints in $grid-breakpoints {
  @media screen and (min-width: $breakpoints) {
    @for $i from 1 through 12 {
      .col-#{$name}-#{$i} {
        max-width: calc(100% * (#{$i} / #{$grid-columns}));
        flex: 0 0 calc(100% * (#{$i} / #{$grid-columns}));
      }
    }
  }
}
```

### 完整程式碼

- [完整程式碼](https://kim85326.github.io/grid-system/)

### 參考資料

- [github - bootstrap](https://github.com/twbs/bootstrap)
- [用 clearfix 解決 Bootstrap grid system 跑版問題，以及其背後原理](https://medium.com/@kansetsu7/%E5%88%A9%E7%94%A8clearfix%E8%A7%A3%E6%B1%BAbootstrap-grid-system%E8%B7%91%E7%89%88%E5%95%8F%E9%A1%8C-%E4%BB%A5%E5%8F%8A%E5%85%B6%E8%83%8C%E5%BE%8C%E5%8E%9F%E7%90%86-58f6f461e4ca)
- [https://wcc723.github.io/design/2018/10/18/grid-system/](https://wcc723.github.io/design/2018/10/18/grid-system/)
