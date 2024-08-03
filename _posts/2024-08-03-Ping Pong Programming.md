---
layout: post
title: "Ping Pong Programming"
date: 2024-08-03 17:00:00 +0800
categories: 軟實力
tags: ["軟實力"]
mathjax: true
description: ""
---

我在看 [學徒模式－優秀軟體開發者的養成之路](https://www.tenlong.com.tw/products/9789862762561) 的時候，發現了這個名詞 **Ping Pong Programming**，出於好奇就來看看這是什麼唄

![](/assets/img/posts/ping_pong_program.png)

Ping Pong Programming 是一個由 TDD + Pair Programming 組成的概念

### Ping Pong Programming 流程

假設有兩位開發人員，開發人員 A 和開發人員 B

1. A 寫了一個失敗的測試
2. B 使測試通過，只寫足夠的程式碼來讓測試通過
3. B 寫出下一個測試
4. A 只編寫足以使測試通過的程式碼
5. 繼續下去，直到 A 和 B 都同意不再對他們目前正在研究的單元進行測試
6. 只要所有測試保持**通過**，任何開發人員都可以重構程式碼

### 優點

- 提高程式碼品質：不斷的測試驅動開發（TDD）和重構過程有助於確保程式碼品質
- 知識共享：兩個開發者輪流編寫測試和實現功能，有助於知識和技能的傳播
- 即時反饋：實時的 Code review 和反饋幫助及時發現和修正問題

更多的優點可以參考我的另一篇文章 - [Pair Programming & Mob Programming](/posts/Pair-Programming-&-Mob-Programming/)

### 結語

Ping Pong Programming 在敏捷開發環境中特別有效，因為它強調快速迭代和持續改進，有助於提高開發速度和程式碼品質

當然啦，首先要先對 TDD 和 Pair Programming 熟悉的人才比較適合 Ping Pong Programming，快來試看看唄！

### 參考資料

- [What Is Ping-Pong Programming?](https://openpracticelibrary.com/practice/ping-pong-programming/)
