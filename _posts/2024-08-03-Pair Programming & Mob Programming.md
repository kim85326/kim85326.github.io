---
layout: post
title: "Pair Programming & Mob Programming"
date: 2024-08-03 14:00:00 +0800
categories: 軟實力
tags: ["軟實力", "工程效率", "敏捷", "鈦坦教會我的那些事"]
mathjax: true
description: ""
---

在敏捷開發中，我們在工作中時常會使用 Pair Programming 和 Mob Programming 來合作。這篇文章將介紹這兩種 Programming 方式的定義、優缺點以及適用的情境。

### Pair Programming 是什麼？

Pair programming 是由 XP 發明人 Kent Beck 提出來的概念

簡單來說，就是兩個人共用一台電腦，一起進行程式開發

會有兩個角色：

- Driver：開車的人，負責寫程式，操作鍵盤和鼠標
- Navigator：導航的人，負責觀察、規劃、回饋、指引程式碼撰寫的方向

定期角色互換（例如每 15 分鐘）

通常一般人聽到「蛤 ~ 要兩個人一起做這個功能，不就要花兩倍的成本」

但其實不一定哦 ~

我們來看看 Pair Programming 到底真正執行起來會帶來什麼效應

#### Pair Programming 優點

- 即時反饋
    - Navigator 可以即時發現並指出 Driver 的錯誤或改進點，從而減少錯誤的發生
    - 大家應該都有聽過「小黃鴨除錯法」，就是寫程式，遇到 Bug 的時候試著向桌上的鴨子解釋每行程式碼，而就在解釋的過程中，解釋的人可能就發覺了問題的解決方案，其實 Pair Programming 也是，透過與另一位工程師溝通，能夠更清楚地表達和檢查自己的思路，從而更快地找到問題並解決
- 知識共享
    - 兩名工程師可以互相學習，提高整體的技術水平
    - 在實務上我們通常會讓一個 Senior 搭配一個 Junior，可以達到傳承的效果，不只是技術上的交流，還有 Domain 上的知識傳遞
    - Junior 也可以透過這種方式偷學 Senior 的思路和寫程式的技巧、解題的思路、快捷鍵、好用的工具等等
    - 有時候兩個 Junior 在一起，他們可以相互鼓勵，增強信心，但要特別小心兩個 Junior 有可能會陷入盲點，或是方向歪掉，導致效率更差，或是不懂得設定 TimeBox 求救，導致一張 Task 越做越久。所以還是推薦一個 Senior 搭配一個 Junior 效果較佳
- 有效的學習方式
    - 直接用實戰來教學
- 程式碼和產品品質提升
    - 因為有兩個人的智慧和經驗，程式碼的品質通常會更高
    - 通常會有效的減少 Bug
- 減少公車指數
    - 讓這段程式碼不再只有一個人懂，如果有人離職或請假的話，也不會造成專案 GG

當然 Pair Programming 有好的也會有不好的地方

#### Pair Programming 缺點

- 不同習慣的摩擦
    - 對於有不同習慣的工程師，在一起工作可能會產生麻煩，甚至矛盾
- 影響團隊和諧
    - 工程師對某些問題各執己見、意見分歧，尤其是程式碼風格等技術細節，可能會引發爭吵，影響團隊和諧
    - 面對新手，有經驗的老手可能會覺得非常的煩躁，不合適的溝通會導到團隊的不和諧
- 新人的壓力
    - 新手在面對有經驗的老手時會顯得非常的緊張和不安，甚至出現害怕焦慮的的精神狀態，從而總是出現低級錯誤，而老手站在他們後面不停地指責他們導致他們更加緊張，出現惡性循環。最終導致專案進度效率低下，且團隊貌合神離
- 老人的自尊心
    - 有經驗的人更喜歡單兵作戰，找個人來站在他背後看著他可能會讓他感到非常的不爽，最終導致工作時受到情緒影響，反而出現反作用

#### Pair Programming 適用情境

- 複雜問題的解決
- 新技術的學習和推廣
- 重構
- 團隊有新人進來時，透過 Pair programming 能讓新人快速上手
    - 菜鳥在一個陌生的地方，要去打擾工作中的老鳥還是會有心理負擔的，不如套用 Pair Programming，這樣老鳥的工作會變成除了原有的程式工作外，引導菜鳥也會變成老鳥的工作，而菜鳥因為與老鳥在看相同的畫面，也比較容易知道要在什麼時候打斷老鳥
    - 使用 Pair Programming 來當 OJT，透過實戰 (直接寫程式)，比老鳥幫新人上一大堆技術課，但又不確定他到底有沒有懂好

#### Pair Programming 成員挑選

- 兩個會吵架的成員，盡量不要在一起 Pair
- 兩個菜雞或是對 Task 不熟悉的人不要一起，找個有經驗的人來教，價值比較高
- 兩個都很熟悉這個 Task，或是 Task 很簡單，也不需要 Pair

### Mob Programming 是什麼？

Mob Programming 是指一個團隊（通常由三人或更多人組成）共同編寫程式的一種方式

團隊成員輪流擔任 Driver，其餘成員則充當 Navigator

概念上和 Pair Programming 很像，只是人數變成三人以上


#### Mob Programming 優點

- 多角度視角
    - 多個成員可以從不同角度發現問題和提出建議，從而提高問題解決的全面性
- 團隊協作
    - 加強團隊成員之間的協作和溝通，提升整體的團隊凝聚力
- 快速反應
    - 可以更快速地解決問題，因為多個成員可以同時思考和討論

#### Mob Programming 缺點

- 效率問題
    - 可能會因為人數過多而降低效率，特別是在討論和決策過程中，人多嘴雜
    - 最好是至少有一個 Senior Host (或是很了解系統的人)，不然一群菜雞，群龍無首效率超差

#### Mob Programming 適用情境

- 複雜系統的設計和實現
- 團隊內部知識的快速傳播
- 創意和腦力激盪

### 結語

Pair Programming 和 Mob Programming 都是一個長期的投資，可能當下會覺得花了更多的人力，但是後續省下的時間和解決了不少團隊的困擾，也提高了程式碼和產品品質

而且 Pair Programming 和 Mob Programming 不一定只能用在寫程式，有時候我們也會用在 Code Review，像是兩個人一起 Code Review 或是 Mob Code Review (三個人以上一起 Code Review)

通常我們 Code Review 架構時，會直接把投螢幕拉下來，一個人當 Driver 其他人當 Navigator，來確保團隊每個人都了解主要架構，幫助之後 Support 可以更快找到問題，也可以幫助之後做 feature 的人可以更快找到進入點，對 feature 更有概念

### 參考資料

- [找兩個人做同一件事？鈦坦科技為何採用結對編程？專訪技術經理點出三大重點](https://medium.com/titansoft/%E6%89%BE%E5%85%A9%E5%80%8B%E4%BA%BA%E5%81%9A%E5%90%8C%E4%B8%80%E4%BB%B6%E4%BA%8B-%E5%A4%96%E5%95%86%E8%BB%9F%E9%AB%94%E5%85%AC%E5%8F%B8%E7%82%BA%E4%BD%95%E6%8E%A1%E7%94%A8%E7%B5%90%E5%B0%8D%E7%B7%A8%E7%A8%8B-%E5%B0%88%E8%A8%AA%E6%8A%80%E8%A1%93%E7%B6%93%E7%90%86%E9%BB%9E%E5%87%BA%E4%B8%89%E5%A4%A7%E9%87%8D%E9%BB%9E-3ed9ebcbf3e1)
- [Pair programming 是什麼？](https://medium.com/pm%E7%9A%84%E7%94%9F%E7%94%A2%E5%8A%9B%E5%B7%A5%E5%85%B7%E7%AE%B1/pair-programming-%E6%98%AF%E4%BB%80%E9%BA%BC-d4fffa7f0466)
- [結對程式設計的利弊](https://coolshell.cn/articles/16.html)
- [Pair Programming (結對程式設計)的執行心得](https://akuma1.pixnet.net/blog/post/358886316#comment-1986381)