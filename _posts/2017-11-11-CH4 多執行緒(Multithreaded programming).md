---
layout: post
title: "CH4 多執行緒(Multithreaded programming"
date: 2017-11-11 00:00:00 +0800
categories: 作業系統
tags: OS 作業系統
excerpt: .
mathjax: true
---

### thread
thread是cpu使用時的基本單位，是一個由thread id、program counter、一組register、一個stack組成

![](https://i.imgur.com/lXY8Y5r.png)

### 動 機(Motivation)
* 許多在桌上型PC執行的套裝軟體都是多執行緒。
* 應用程式通常都製作成有許多執行緒控制的個別行程。
* 網頁瀏覽器可能有一個執行緒顯示影像或文字，而另一執行緒則從網路擷取資料。文書處理器可能有一個執行緒在顯示圖形，另一個執行緒從使用者讀入按鍵，而第三個執行緒在背景下執行拼字和文法校正。

![](https://i.imgur.com/uDdxc58.png)

### 利益(Benefits)
1. 應答(Responsiveness): 和user的互動比較好，例如: 可以使某個程式在進行需時很久的操作同時依然可以處理user的要求(而不是一直算讓你以為他已經當掉了!)

2. 資源分享(Resource Sharing): 如果不用thread的話，resource只能透過memory share或者message passing的方式來共享，可是如果用thread的話，process本身就可以讓自己肚子裡不同的thread使用同一個resource!
(該process所有的thread都可以看到那些resource)。

3. 經濟(Economy): 配置process消耗的memory與resource很高! 配置一個Thread比較沒那麼耗費資源
(Process比較完整 => 比thread慢又耗記憶體)

4. 可擴展性(Scalability): 在多處理器的架構下，多執行緒的利益可以大幅提升，因為每一執行緒可以並行地在不同的處理器上執行。不論有多少CPU可以使用，單一執行緒只能在一個CPU上執行。 
(增加prarllelism(平行度))

### 多核心程式的撰寫(Multicore Programming)
在多核心系統中編寫程式，目前的挑戰有以下五個領域： 

1. 切割活動(Dividing Activities)： 檢查應用程式來找出可以被切割成個別的、同時發生的任務，因此可以在個別的核心上平行地執行。

2. 平衡(Balance)： 當識別任務可以平行地執行時，程式員也必須保證任務執行為相等的工作。

3. 資料分裂(Data Splitting)： 正如同應用程式被分割成個別的任務，藉由任務來存取和運用的資料必須被分割到個別的核心上執行。

4. 資料相依性(Data Dependency)： 藉由任務存取的資料必須在兩個或多個任務之間檢查其相依性。在一個任務依靠另一個任務的情況下，程式員必須確認任務的執行與資料的相依性是同步的。

5. 測試與除錯(Testing & Debugging)： 當一個程式在多核心上平行地執行時，有許多不同的執行路徑。測試和除錯這類同步的程式原來就比測試和除錯單一執行緒的應用程式更加困難。

### concurrency 和 parallelism

concurrency 執行在單核系統
![](https://i.imgur.com/1GCx2Rs.png)
parallelism 執行在多核系統
![](https://i.imgur.com/CbX8USx.png)

### Amdahl's law

![](https://i.imgur.com/8FF8B1x.png)
* S is serial portion
* N processing cores
    * if application is 75% parallel / 25% serial, moving from 1 to 2 cores results in speedup of 1.6 times
* As N approaches infinity, speedup approaches 1 / S

### User thread vs. kernel thread?
* user thread: 透過app手段做出來，kernel不知道一個process有很多thread(即使kernel不支援多核)
* kernel thread: 從kernel本身支援的thread

###  Multithreading Model

#### 多對一模式(Many-to-One Model) 
* 很多user thread對應到一個kernel thread
* 可以把user thread想成搶cpu的單位
* 只有一個CPU，無法平行處理(阿就只有一個啊!)
* 其實...不會比較快

#### 一對一模式(One-to-One Model)
* 一個user thread對應到一個kernel thread
* 當一個thread被卡住(呼叫等待的system call)的時候其他人會繼續處理
* 管理上的成本比較高: 當產生user thread的時候要產生相對應的kernel thread

#### 多對多模式(Many-to-Many Model)
* 自動建立user thread和kernel thread的mapping
* 管理上的成本比較低

#### 二層模式 (Two-level Model)


名詞解釋
1. 多重程式處理(Multiprogramming)是為了使得多個程式可以同時執行而發展的
技術，它可以使得 CPU 一直處於忙碌狀態，而不會等待程式進行週邊的運作，
進而提昇電腦系統的整體效率。在支援多重程式處理的系統中，多個程式都
會被載入到記憶體中，而當某一個程式進行 I/O 作業時，CPU 就會切換到另一
個工作，使得多個工作可以並行處理(concurrent)，達到類似同時執行多個程
式的效果。
2. Multitasking 指的是一個作業系統可以同時執行單一使用者的多個程式或程式
工作。而同時執行多個工作(輪流執行)是透過切換工作來完成，Multitasking
種類有 Cooperative 與 Preemptive。Cooperative 是多個程式之間共同合作，由
程式主動釋放 CPU 使用權，其他程式才能夠取得 CPU 使用權。Preemptive：
由作業系統強制分配 CPU 時間給各個程式，因此切換程式的工作，完全由作
業系統掌控。
3. Multiprocessing 是指計算機系統有多個 CPU，可同時執行一個或多個程式‧提
高計算機系統之可靠度，或分工執行以提升執行速度。