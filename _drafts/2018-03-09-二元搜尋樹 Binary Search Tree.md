---
layout: post
title: "二元搜尋樹 Binary Search Tree"
date: 2018-03-09 00:00:00 +0800
categories: 演算法
tags:
mathjax: true
description: ""
---

### 定義：若一顆二元樹滿足以下兩點，即可稱為二元搜尋樹

1. 左子節點的值 < 節點的值 (小的資料放左邊)
2. 右子節點的值 > 節點的值 (大的資料放右邊)

![](/assets/img/posts/RlLZWJo.png)

### 搜尋 想法

1. k 是我們要找的資料
2. 如果 root 是 0，那麼就是一個 empty tree，所以 search 失敗
3. 否則，拿 k 和 root 比較
   1. k == root
      - search 成功
   2. k < root
      - search 左邊的 subtree
   3. k > root

      - search 右邊的 subtree

### 搜尋 資料結構

![](/assets/img/posts/r7RUR26.png)

### 插入 想法

![](/assets/img/posts/5sj7HiR.png)

- 做搜尋之後就可以知道要在哪裡插入
- 不可能插入在中間
- 時間複雜度 O(h)，h 是高度

### 刪除 想法

![](/assets/img/posts/ZH2barn.png)

有三種情形

1. 刪除的點是 leaf node，直接刪除就好了
2. 刪除的點有一個 child，把他的 child 拿來補
3. 刪除的點是在中間(代表有兩個小孩)，就把左邊 subtree 最大的那個 (inorder predecessor) 那個拿來補

- 時間複雜度 O(h)，h 是高度

##### 什麼是前序、中序、後序?

![](/assets/img/posts/qzFLOpZ.png)

- binary search tree 用 inorder 來表示是 "排好順序的"
