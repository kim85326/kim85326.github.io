---
layout: post
title: "Clean Code"
date: 2018-08-29 00:00:00 +0800
categories: 程式語言
tags:
mathjax: true
---

1. 注意細節 ex 記憶體流失、race conditions、不一致的命名方式
2. 只做好一件事，每個 function、class、module 都能表達單一的意圖
3. 可讀性
4. 容易被修改、增強
5. 能通過所有的測試
6. 沒有重複的程式碼

### 有意義的命名

1. 避免誤導，以及避免縮寫導致誤導
2. List 對程式設計師有特定的意義，不能隨便用
3. 避免小寫 L 和 O，會和０、１搞混
4. 避免 a1、a2...an 等無意義的命名
5. info 和 data 是不可區分的無意義字詞 （像 a 和 the)
6. 使用能被唸出來的名稱，比較能被記住
7. 使用可被搜尋的名字
8. i、j、k 常用於迴圈計數
9. 避免命名 manager、processor、data、info
10. 類別的命名利用名詞或名詞片語來命名、不應該是動詞
11. 方法的命名利用動詞或動詞片語來命名，例如： postPayment、deletePage、save、取出應該用 get 當字首、修改應該用 set 當字首、判定用 is 當字首
12. 避免雙關語 add，可以利用 insert 或 append

### 函數

1. 簡短
2. 只做一件事，每個函式只有一層抽象概念
3. 由上往下閱讀程式碼，降層原則
4. 避免過多的參數 0 > 1 > 2 >> 3
5. Circle makeCircle(double x, double y, double radius) 可以改為 Circle makeCircle(Point center, double radius) ，利用建立物件的方法，減少函數參數的數量
6. 不要有副作用，只能做一件事，單純的
7. 函數能做某件事(指令)，也能回答某個問題(查詢)，但是兩者不該同時發生，可以寫成 setAttribute(“username”, “elaine”) 和 attributeExists(“username”)
8. 利用例外處理 (try 和 catch) 取代回傳錯誤碼，但還是不夠，最好是把 try 和 catch 分成兩個函數
9. 不要重複，這樣之後要修改時，要修改更多地方
10. 盡量只有一個進入點一個離開點，代表函數只能有一個 return ，避免任何 break 和 continue 和 goto 的出現，但如果能抱持函數短小，可以用 return 和 break 和 continue
11. 函式像文章一樣，一開始又臭又長沒關係，只要不斷修改到最後能符合準則

### 註解

1. 好的程式碼不需要註解，只有失敗的程式碼才需要註解
2. 法律行註解、資訊型註解
3. 對意圖的解釋 return 1; // we are greater because we are the right type
4. 闡明，assertTrue(a.compareTo(a) == 0); // a == a
5. 對後果的警告 // don’t run unless you have some time to kill
6. 留下 todo，可能因為某些原因無法在此時做到，可能是提醒移除過時的功能，或是注意某個問題
7. 放大重要性
8. 公共的 api
9. 不要寫下安慰自己、提醒自己的註解
10. 不要寫比程式碼還難懂的註解
11. 不需要寫出處或是署名，原始碼管控系統就會幫你記錄了
12. 避免註解程式碼，留下一堆壞掉的程式碼，會讓別人沒勇氣刪掉它
13. 註解要寫在該描述的程式碼附近
14. 簡短的函式不需要太多的描述，替只做一件小事的函式挑選一個好名字，比寫註解在函式標頭還好

### 編排

1. 簡短的程式碼比大型程式碼更容易讓人理解
2. 高層模組到低層模組，上而下，第一段粗略的概念，越往下，慢慢的所有細節會浮現
3. 空白行後面將接續一個新而不同的概念
4. 極度相似的概念，應該寫在一起
5. 縮排！！！
