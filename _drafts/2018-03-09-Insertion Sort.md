---
layout: post
title: "Insertion Sort"
date: 2018-03-09 17:00:00 +0800
categories: 演算法
tags:
mathjax: true
description: ""
---

一筆一筆資料依序進來比較
(最好的就是一進來就排好順序的資料)

![](/assets/img/posts/N5X8Q7p.png)

1. 5 和 9 先做比較，並排序
2. 第三筆資料 2 進來，跟剛剛排好的最後一筆資料 9 做比較
   - 如果大於的話就不用動，直接下一筆資料進來
   - 如果小於的話就要交換並執行 第 3 點
3. 交換好位置的 2，再跟第一筆資料 5 做比較
   - 如果大於的話就不用動，直接下一筆資料進來
   - 如果小於的話就要交換
4. 第四筆資料 8 進來，跟剛剛排好的最後一筆資料 9 做比較
   - 如果大於的話就不用動，直接下一筆資料進來
   - 如果小於的話就要交換並執行 第 5 點
5. 再和第二筆資料 5 做比較.....以此類推

### 性質

1. 方法 : 每次處理一個新的資料時，由右到左 insert 至其適當的位置才停止
2. 需要 n-1 個 pass
3. best case: 未 sort 前，已按順序排好
   每個 pass 僅需一次比較, 共需 (n-1) 次比較
4. worst case: 未 sort 前, 按相反順序排好
   比較次數為：
   ![](/assets/img/posts/Z8PMjJ7.png)
5. 時間複雜度 O(n^2)

### 演算法

![](/assets/img/posts/jm3uMF5.png)

新的資料叫做 e
前面已經排好了 a[1] ~ a[i]，a[0] 沒放東西

![](/assets/img/posts/sZorXDK.png)
