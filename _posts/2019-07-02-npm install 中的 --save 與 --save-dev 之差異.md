---
layout: post
title: "npm install 中的 --save 與 --save-dev 之差異"
date: 2019-07-02 00:00:00 +0800
categories: 其他
tags: npm
mathjax: true
---

- dependencies

  - `--save`
  - 使用在已經發布的環境下，換句話說，是指發布後仍然需要依賴使用的 plug-in

  ```
  $ npm install react --save
  ```

- devDependencies

  - `--save-dev`
  - 使用在開發中的環境下，意思是只單純會在開發時應用到的 plug-in

  ```
  $ npm install jest --save
  ```

### npm install

npm install 時，會同時安裝 dependencies 和 devDependencies 的套件

```
$ npm install
```

如果只想安裝 dependencies 的套件，可以指定環境為產品

```
$ npm install --only=prod
```

或

```
$ npm install --production
```

### 參考資料

- [弄懂 npm install 的 –save 與 –save-dev](https://chriskang028.wordpress.com/2017/07/05/%E5%BC%84%E6%87%82-npm-install-%E7%9A%84-dependencies-v-s-devdependencies/)
