---
layout: post
title: "CH6 行程排班 (Process Scheduling)"
date: 2018-01-10 00:00:00 +0800
categories: 作業系統
tags: 作業系統
mathjax: true
description: ""
---

## Bounded-Buffer

![](https://i.imgur.com/tcsaEMt.png)

- in 代表 buffer 中下一個可以放資料的位置
- out 代表 buffer 中第一個可以取資料的位置

![](https://i.imgur.com/cBX8fjY.png)

- Consumer

  - in = out 代表 buffer 是空的

    | [ x ] | [ x ] | [ x ] | [ x ] |
    | ----- | ----- | ----- | ----- |
    | in    | -     | -     | -     |
    | out   | -     | -     | -     |

- Producer

  - (in + 1) % BUFFER_SIZE = out 代表 buffer 是滿的

    | [ o ] | [ o ] | [ o ] | [ x ] |
    | ----- | ----- | ----- | ----- |
    | -     | -     | -     | in    |
    | out   | -     | -     | -     |

- 雖然 solution is correct ，但只可以使用到 BUFFER_SIZE -1 個 elements

##### 改良後

![](https://i.imgur.com/E6wKqzu.png)

多一個 count 變數來計算現在用了幾個 buffer

- 初始值 count = 0
- producer 做完就 +1
- consumer 做完就 -1

## Race Condition

在進行 count++ 時，其實在電腦是編譯成三行程式碼

1. register1 = count
   => LOAD Reg, Count
2. register1 = register1 + 1
   => ADD #1
3. count = register1
   => STORE Reg, Count

執行 count++ 過程中，如果突然 cpu 的執行權被 count-- 搶走了，會發生資料錯誤

例如：當 counter = 6 時，將產生 5、6、7 三種可能結果

這種情形叫做 Race Condition，Synchronization 是來預防此情形發生

## Critical Section

Critical Section 是一段不能讓多個行程同時執行的程式碼。

- 某個 process 在執行他的 Critical Section 時，其他的 process 不能在這段時間內進入他們的 Critical Section 。
- 一個行程在修改與其他行程所共有的資料，可以將修改共有資料的這段程式碼，寫在 Critical Section 中解決
- 可以解決 process 在 share data 可能造成資料不一致的問題。
- 必須同時符合 Mutual Exclusion (互斥)、Progress (進行)與 Bounded Waiting (有限等待)三項條件。

##### Critical Section Protocol

entry section => critical Section => exit section

![](https://i.imgur.com/O15QsFf.png)

### Critical Section 的條件

- Mutual Exclusion (同時只有一個 process 執行他的 cs)
  - 如果某個 process 在執行他的 Critical Section 時，其他的 process 不能在這段時間內進入他們的 Critical Section
- Progress （要有進度不能卡住)
  - 不想進入 critical section 的 process 不可以阻礙其它 process 進入 critical section，即不可參與進入 critical section 的決策過程。
  - 必須在有限的時間從想進入 critical section 的 process 中，挑選其中一個 process 進入 critical section，隱含 No Deadlock。
- Bounded Waiting （不能一直無限等）
  - 自 process 提出進入 critical section 的申請到獲准進入 critical section 的等待時間是有限的。即若有 n 個 processes 想進入，則任一 process 至多等待 n-1 次即可進入，隱含 No starvation。
- 解決的方法不能 depend on process 的 relative speed 和 scheduling policy

### 交替演算法 turn （問題 : 別人給我 turn 才可以做）

![](https://i.imgur.com/9xxy2Hy.png)

- 共用一個變數 turn，指出目前允許進入 critical section 的是哪一個 process
- 滿足 mutual exclusion
  - turn 的值不可能同時為 i 和 j，所以一次只能一個進入 cs
- 不能滿足 progress
  - 假設現在 turn = i，但是 Pi 並不想進入 cs，Pj 想進入 cs，Pj 就沒辦法進入（一定要等待 Pi 做完把 turn = j，Pj 才可以做）
  - Pj 被 Pi block
- 滿足 bounded waiting
  - 若 Pi 和 Pj 都想進入 cs，此時 turn = i，所以 Pi 先進入 cs，Pj 就先等待
  - 等到 Pi 離開之後又想進入 cs 時，Pi 會被卡住，因為 Pi 離開的時候有把 turn = j
  - 所以對於 Pj 而言，他最多等待一次就可以進入 cs

### 旗標演算法 flag （問題 : 一直在互讓）

![](https://i.imgur.com/FYQzOo7.png)

- 將交替演算法中共有的變數 turn 改為共有的陣列 flag，記錄系統中個別 process 的狀態。
- 一開始將陣列所有元素都設為 FALSE
- 如果 Pi 要進入 critical section，則將 flag[i] 設為 TRUE，並檢查 flag[j]，若 flag[j] 為 TRUE，則 Pi 要等 Pj 執行完再進入 critical section
- 當 Pi 離開 critical section 後，再將 flag[i] 設為 FALSE。讓其他 process 可以接著進入 critical section
- 滿足 mutual exclusion 的條件
- 不能滿足 progress 和 bounded waiting 的條件
  - 當 Pi 與 Pj 皆將 flag[i], flag[j] 皆設為 TRUE，則永遠跳不出 while 迴圈（互讓） => deadlock

### Peterson’s Combined Solution

- 解決 2 個 process
- LOAD、STORE 這兩個 instructions 是 atomic （最小單位），代表不能被 interrupted
- 2 個 process 共用這 2 個變數
  - boolean flag[2] : 每個 process 是否想要進入他的 critical section，想要的就設為 TRUE
    - 初始值都是 FALSE
  - int turn : 目前系統允許哪個 process 進入 critical section
    - 初始值設為 i 或 j

![](https://i.imgur.com/Z8lBadh.png)

**要證明就是把 那三個條件都證明過**

#### mutual exclusion

- 證明兩個 process 同時都在他們的 critical section
  1. (flag[j] && turn == j) 和 （flag[i] && turn == i）都要是 false
  2. 現在 flag[i] 和 flag[j] 一定是 true
  3. 所以只能 turn == j 和 turn == i 都是 false
  4. 但 turn 不是 = i 就是 = j 所以其中一個是 true，另一個是 false，所以假設不成立
  5. 符合 mutual exclusion

#### progress

- 目前沒有 process 在 cs，如果有一個 process 要進去他的 cs，一定可以進去
- 多個 process 要進去 cs 時，在有限時間內要做出決定
  1. 如果 Pi 有興趣，那就會在 while(flag[j] && turn == j)
  2. Pj 目前沒有興趣
     1. flag[j] = false，Pi 就可以進去 cs
     2. 後來 Pj 有興趣了，flag[j] = true 完，會 turn = i，Pi 就可以進去 cs
  3. 符合 progress

#### bounded waiting

- 找出次數的上限
  1. 如果 Pi 有興趣
  2. 如果 Pj 不在他的 cs，那 flag[j] = false，Pi 可以進去了
  3. 如果 Pj 正在他的 cs，等 flag[j] = false，Pi 就可以進去了
  4. 如果 Pj 在 entry section，如果 Pi 先執行 while 就可以進去了。否則 Pj 進去，Pi 要等到 Pj 把他的 flag[j] = false 才能進去
  5. 符合 bounded waiting

### 證明 critical section

- Mutual exclusion
  - 假設兩個（以上）的 processes 可以同時進出 CS， 找出其矛盾
- Progress
  - 沒有 process 在 CS 中，一個 process 要進去 CS，一定可以進去
  - 多個 process 要進 CS，在有限的時間內做出決定
- Bounded waiting
  - 找出次數的上限

### Lock

acquire lock => critical section => release lock
![](https://i.imgur.com/8tc6CNl.png)

### Synchronization Hardware

- 單 CPU 的系統中，可以很簡單地讓行程在修改共用的變數時，停止接受中斷而解決同步的問題。
- 但是在多 CPU 的系統中並不合適，因為停止所有 CPU 的中斷除了很耗時間之外，也會增加行程進入 critical section 所花費的時間。
- 現代機器提供特殊 atomic hardware instructions
  _ Atomic : non-interruptable
  _ Test and set (TS) : test memory word and set value \* Swap : contents of two memory words

### Test and set （寫入某個記憶體位置，回傳舊值）

![](https://i.imgur.com/tpZMjJm.png)

- Definition
  - TestAndSet 指令會傳回參數 target 目前的值，並同時將 target 的值設為 TRUE
  - 在執行完整個指令之前都不會被中斷
- Solution
  - 利用共用變數 lock 並將初始值設為 false
- 滿足 mutual exclusion
  1. 現在 Pi 和 Pj 都想進去 cs
  2. Pi 先執行 TestAndSet ，然後 return false 並且把 lock 的值設為 true，進到 cs
  3. Pj 執行 while（）的時候，return true 並且把 lock 的值設為 true，所以一直卡在 while
- 滿足 progress
  - 不想進 cs 的 process 不會去搶 TestAndSet 的指令
  - 有限時間內，一定會有人搶到 TestAndSet，所以一定有人可以進 cs
- 不滿足 bounded waiting
  - Pi 已經進 cs 了，而 Pj 卡在 while loop 中等待要進 cs，此時如果 Pi 離開 cs，又想進 cs，Pi 很有可能再度先於 Pj 執行 TestAndSet 指令，而再度進到 cs，所以 Pj 可能會 Starvation

### Swap（把 a、b 值交換）

![](https://i.imgur.com/5vCX58z.png)

- Definition
  - Swap 指令會交換參數 a 與 b 兩個記憶體的內容。
  - 在執行完整個指令之前都不會被中斷。
- Solution
  - 利用共同變數 lock 並將初始值設為 false，每一個 process 有個 local 變數 key 來與 lock 做交換
- 滿足 mutual exclusion
  1. 現在 Pi 和 Pj 都想進去 cs，key 都會設成 true
  2. Pi 先執行 Swap，然後 lock 和 key 會交換，因此 lock = true、key = false，Pi 就可以進 cs
  3. Pj 執行 Swap 時，因為 lock = true，所以交換後 lock = true、key = true，這時候 Pj 就會卡在 while loop
- 滿足 progress
  - 不想進 cs 的 process 不會去搶 swap 指令
  - 有限時間內，一定會有人搶到 swap 指令，所以一定有人會進入 cs
- 不滿足 bounded waiting
  - Pi 已經進 cs 了，而 Pj 卡在 while loop 中等待要進 cs，此時如果 Pi 離開 cs，又想進 cs，Pi 很有可能再度先於 Pj 執行 swap 指令，而再度進到 cs，所以 Pj 可能會 Starvation

### Bakery Algorithm (N processes solution)

##### 麵包演算法概念

- 每位顧客(process)到店中會領一張號碼牌，店家依號碼牌依序服務客戶。
- number 可能會重複，但 Process ID 是唯一的。如果有 process 拿到相同的號碼，會以 pid 較小的優先

##### 麵包演算法實作

- boolean chooseing[1,...,n-1]
  - 預設 false
  - true 代表我想進去
  - false 代表我不想進去
- int number[1,...,n-1]
  - 預設 0
  - 0 代表我不想進去（或是做完了）
  - 大於 0 代表我的號碼
- (a , b) < (c , d)
  - 如果 a < c 或 (a = c 或 b < d)
  - a、c 代表 number，b、d 代表 pid
- max(a0,a1,...an-1) return 裡面最大的值

![](https://i.imgur.com/66hZuB5.png)

##### 麵包演算法分析

- 滿足 mutual exclusion
  1. 一開始 choosing 都設為 false，number 都設為 0
  2. 現在 Pi 和 Pj 都想進去 cs，choose[i] = true，choose[j] = true，各自領了號碼牌，再將 choose[i] = false，choose[j] = false
  3. Pi 先執行第二個 while，順利的進入 cs
  4. Pj 想進去，但因為 (number[i],i) < (number[j],j)，所以 Pj 一直被卡在第二個 while 沒辦法進去 cs
  5. 滿足 mutual exclusion
- 滿足 progress

  1. 如果 Pj 不想進入 critical section，其 Number[i] = 0 且 Choosing[i] = false。如果此時 Pi 想進入 critical section 時，就不會被 Pj 卡在 while 中
     = > Pj 並不會阻擋 Pi 進入 critical section
  2. 如果現在有多個 processes 想進入各自的 critical section，因為有領號碼牌，所以一定可以在有限的時間內，找出一個最小的號碼牌或是同為最小號碼牌但 pid 比較小的 process 進入 critical section

- 滿足 bounded waiting
  - 依照 number 讓 process 先到的先做，別人不可以插隊，只要等到 number 比他小的 process 做完，就可以進去 cs 了，所以進到 cs 的次數是有限的
- 額外問題
  1. Is it possible that many processes receive the same number?
     - 有可能，因為取號碼牌可以分成三個動作
       1. 挑最大值
       2. 加 1
       3. 將結果 assign 給 number[i]
          ![](https://i.imgur.com/yT6zhWZ.png)
          => Pi 和 Pj 有相同 number 值
  2. If we remove the first while loop (i.e., while(Choosing[j]); ), the mutual exclusion is still maintained?
     - 不正確，會違反 mutual exclusion
     - 假設現在 choosing[0]~choosing[n-1] 皆為 0
     - 現在有兩個 process Pi 和 Pj 想進去 cs，且 Pi pid < Pj pid

![](https://i.imgur.com/0iXaged.png)

- while(Choosing[j]); 這行
  - 代表想要比較的 process 正在拿號碼牌（拿到一半、搞不好還沒有號碼），你要等人家拿完才可以做比較啊，搞不好人家的號碼牌比你小耶

### Bounded-waiting Mutual Exclusion with TestAndSet() (TestAndSet 另一種方法)

![](https://i.imgur.com/nCzQ6zE.png)

- process 共用變數 waiting 陣列，紀錄哪些 process 正在等待進入 cs
  - 初始值 false
- lock 代表目前 cs 是否可以進去
  - 初始值 false
- mutual exclusion
  - 如果有一個 process 想進去 cs 時，會將 lock 設為 true，其他想進去的 process 只能卡在 while 那邊等，當進去的 process 想離開的時候，會在出口區把下一個 waiting[j] = false，讓下一個 process 可以進來，因此符合 mutual exclusion。
- progress
  - 若沒有 process 等著進入 cs，要離開 cs 的 process 會將 lock 變數設為 FALSE，也會將下一個 process 的 waiting 陣列值設為 FASLE，讓只要有等待進入 cs 的 process，一定可以進入，因此滿足了 progress 的條件
- bounded waiting
  - 如果現在有 n 個 processes，離開 critical section，process 設定 waiting 陣列值的方法，是依序檢查到 process 的 waiting 陣列值為 TRUE，就把他設為 false，所以每個 process 最多只會等待 n-1 次，就可以進入 critical section，所以滿足 bounded waiting 的條件。

### critical section 中，硬體演算法和軟體演算法的比較

- 都會 busy waiting

1. Software：純粹利用軟體演算法來控制流程，不須花費硬體裝置。
   優點：不用花錢購買新硬體，利用的資源較少。
   缺點：programmer 必須多花費心思，程式設計上不容易。因為必須考慮中斷的情形發生。
2. Hardware：利用硬體來製造不可分割的指令或是 disable 中斷來實作。
   優點：programmer 設計程式較為容易。
   缺點：要花錢購買硬體裝置。
   _ 只有 kernel mode 能用
   _ need time
   _ 多處理機上會失效，單處理機上不好(busy waiting)
   _ starvation

### Mutex (mutual exclusion) Locks

- 用 acquire() 取得 lock （atomic）
- 用 release() 釋放 lock （atomic）
- 來保護 critical section
- 若無法取得 lock，則進入 busy waiting

![](https://i.imgur.com/6LCdaux.png)

## Semaphore

- Semaphore 是一個同步物件，用於保持在 0 至指定最大值之間的一個計數值。(Semaphore 不需要 busy waiting，用到 waiting queue)
- 大部分的作業系統都已經實作了 Semaphore，作為行程同步的工具
- 變數 int S (Semaphore) 記錄著有多少 process 可以再進入 cs
- S 的存取只能用 wait() signal()，這兩個方法都是 atomic 不可中斷
- 必須保證沒有兩個 process 可以同時執行 wait() 和 signal()，也就是說要把 wait()和 signal() 也放入 critical section

![](https://i.imgur.com/UMHoRR5.png)

- binary semaphore

  - integer value can range only between 0 and 1; can be simpler to implement
  - Also known as mutex locks

  ![](https://i.imgur.com/1HzqCVx.png)

  - 現在有兩個 P1 的 statement 叫 S1，P2 的 statement 叫 S2
  - 我們想要 S2 只在 S1 完成後才執行

  ![](https://i.imgur.com/IVqzhcV.png)

  - 共用變數 mutux 初始值是 1
  - force suspend 初始值是 0

### Semaphore 實作

##### Semaphore 的缺點 busy waiting

- 如果已經有 process 進入了 cs，那麼其他想要進入 cs 的 process 都會在入口區中一直地執行迴圈來等待，會很浪費 cpu
- busy waiting 的 semaphore => spinlock 旋轉鎖。
- 為了避免忙碌等待所造成的 CPU 資源浪費，可以修改 wait() 和 signal() 兩個函式。

##### semaphore 改良

```c
typedef struct {
int value;
struct process *list; //waiting queue
} semaphore;
```

![](https://i.imgur.com/hjyz460.png)

- block()
  - wait() 呼叫時，執行 S->value-- 完，如果其值 <0，不讓 process busy waiting，直接讓 process 將自己 block 起來
    - 放這些 process 的地方叫做 waiting queue
- wakeup()
  - 把 process 從 waiting queue 移出

![](https://i.imgur.com/sVKcB52.png)

##### 問題

- waiting list 如果使用不適當的實作方式，例如後進先出串列，可能會造成無限阻隔或是飢餓現象。
  - 可以使用先進先出串列來實作號誌串列。
  - 必須保證 wait() 和 signal() 在執行的過程中不會被中斷(atomic)。
- 改良後的 semaphore 雖然不能完全不使用 busy waiting，但是大幅地縮短了 busy waiting 的時間。
- 由整個 cs 縮短到只有實作 wait() 和 signal()的 cs 所造成的 busy waiting。
- 可以提高系統的效能。

### Four Typical Uses of Semaphores

- Mutual exclusion
  - Mutex locks
- Force suspend
  - Keep the execution in a particular order
- Count-down lock
  - A semaphore has an implicit counter
- Notification
  - Indicate that an event has occurred

![](https://i.imgur.com/vnE4Fps.png)

![](https://i.imgur.com/A3Ohq2H.png)

- S1 = 1 ，S2 = 0
  - output => 1 2 1 2 1 2
- S1 = 0 ，S2 = 1
  - output => 2 1 2 1 2 1
- S1 = 0 ，S2 = 0
  - S1、S2 都會被卡在 wait，無法繼續執行下去
- S1 = 1 ，S2 = 1
  - S1、S2 同時進入 cs，output 會取決於誰先搶到 cpu，有無限多種可能

## Deadlock and Starvation

### deadlock

- 兩個或多個 processes 在無限等待，可能是因為一個 process 在等待某一項資源

- 例如 S、Q 初始值為 1，signal()永遠不會被執行到，所以行程 deadlock

![](https://i.imgur.com/3NbnWnu.png)

### starvation

- 在 semaphore waiting queue 裡面無限等待

### Priority Inversion

- 當低優先權的 process 有 高優先權的 process 的 lock 會產生排程問題

##### Priority Inversion

- 假設有三個 processes Task1、Task2、Task3，其優先權順序是 H > M > L

![](https://i.imgur.com/aN4EedP.png)

##### Priority Inheritance

- 優先權繼承協定必須允許 Task3 暫時地繼承 Task1 的優先權，因此才能阻止 Task2 搶先它的執行。

![](https://i.imgur.com/i2r37hY.png)

### synchronization 經典問題

- bounded-buffer
- readers and writers
- dining-philosophers

### Bounded-Buffer Problem

- n 個 buffers
- mutex
  - 初始值為 1
- full
  - 初始值為 0
  - 使用過的欄位
- empty
  - 初始值為 n
  - 空的欄位
- 如果 buffer 是 full，producer 會被 block
- 如果 buffer 是 empty，consumer 會被 block

![](https://i.imgur.com/RUd741T.png)

##### Bounded-Buffer - 問題

![](https://i.imgur.com/fnArbtX.png)

- 如果 mutex 在 full、empty 之外，則當全空或全滿時會形成 deadlock

1. 如果現在是空的，consumer 想要去拿東西，執行 wait(mutex)，再執行 wait(full)，但因為現在沒有東西可以拿，所以要 wait 了並且要讓出 cpu，但是現在 lock 被他搶走了，所以造成 deadlock
2. 如果現在是滿的，producer 想要去放東西，執行 wait(mutex)，再執行 wait(empty)，但因為現在是滿的所以沒辦法放東西，所以就要 wait 了並且讓出 cpu，但是 lock 現在被他搶走了，所以也會造成 deadlock

### Reader-Write Problem

- 一個系統中經常會有數個 processes 共同分享同一份資料物件
- 如果一個讀取者和一個寫入者同時存取所共享的資料，可能會發生錯誤

##### 規則

- readers：
  - 只能讀 data set，不能更改
  - 可允許同時很多 reader 一起讀資料
- writers：
  - 可以讀和寫
  - 同一時間只能有一個 writer 可以更改資料
- 如果 writer 在寫，reader 就不能讀
- 如果還有 reader 在讀，writer 就不能寫
  - reader 的優先權比較高

##### 變數說明

- int readcount
  - 記錄正在讀取資料的讀取者數目
  - 初始值為 0
- semaphore wrt
  - 如果 writer 正在寫的時候，要 block reader
  - 初始值為 1
- semaphore mutex
  - readcount 的 mutex
  - 初始值為 1

##### 實作

![](https://i.imgur.com/8YquAZY.png)

- 第一個 reader 要讀的時候，如果有 writer 在，那 reader 就會被卡在 wait(wrt)
- 最後一個 reader 要離開的時候，要 signal(wrt) 通知 writer
- 當 writer 要離開的時候，如果後面有 reader 和 writer 在等，這時候由 scheduler 來決定誰可以先進
- 如果有一個 writer 離開，後面有 reader 進了，那麼所有在 waiting 的 reader 也會跟著進去

##### 問題

- First variation
  - 除非 writer 可以使用 shared object，不然不能讓 reader 等待
- Second variation
  - 當 writer 已經 ready 後，就立刻 write
- 以上兩種都可能會造成 starvation
- 解決方法
  - 部分作業系統由核心的 kernel 提供

### Dining-Philosophers Problem

##### 規則

- 有 5 位哲學家和 5 枝筷子
- 哲學家思考時，就不會用餐
- 如果哲學家想吃飯時，要依序拿取位於左右兩邊的筷子，進行用餐
- 用餐完畢，要把筷子放下

![](https://i.imgur.com/D7eif2M.png)

##### 變數說明

- semaphore chopstick [5]
  - 初始值為 1

##### 實作

![](https://i.imgur.com/MMl1t3A.png)

- 當哲學家要吃飯的時候，要 wait(左邊筷子)，wait(右邊筷子)，都有才可以吃飯，吃完飯要，signal(左邊筷子)，signal(右邊筷子)

##### 問題

- deadlock
  - 當毎位哲學家依序拿起位於自己左邊的筷子後，則毎位哲學家都拿不到右邊的筷子，而呈現全部 wait，無人可 eating 的情況
- 解決 deadlock
  1. 限制用餐人數：最多允許 4 位哲學家同時用餐
     - 此法雖無 deadlock，但有 starvation
  2. 規定除非哲學家可以順利取得左右兩邊的筷子，否則，哲學家不准拿任何筷子
     - 打破 Hold and Wait
  3. 採用非對稱作法：奇數號的哲學家先拿左、再拿右，偶數號的哲學家先拿右、再拿左。
     - 打破 Circular Wait
  4. 採用 Monitor 來解

### Semaphoro 的缺點

- Programmer 可能會誤用 Semaphore 的 wait 及 signal 運作，導致錯誤的状況發生：
  - 違反 Mutual Exclusion
  - 造成 Dead Lock

![](https://i.imgur.com/K3Er19v.png)

## Monitor （公廁的概念）

- 為一個解決同歩問題的高階資料結構(物件導向)，由以下三部份組成：
  - 共享資料區
    - 此區域會宣告一些共享變數，且只提供給 Monitor 內各 Procedure 所共用，外界 Process 不得直接使用。
    - monitors 沒有 public data
  - 初始區
    - 設定某些共享資料變數的初値
  - 一組 Procedures (Operations)
    - 供外界呼叫使用
- Monitor 本身已經確保 mutual exclusion 的性質
  - 一次只有一個 process 可以進去

![](https://i.imgur.com/s9webJa.png)

- 為解決同步問題，Monitor 會提供一種特殊型態的變數供 Programmer 使用：Condition 型態變數
- 假設宣告 x 為 condition 型態變數
  - condition x
- 則在 x 變數上，會提供 2 個 Atomic Operations:
  - x.wait()
    - 強迫 Process 暫停，並把該 Process 放入 x 的 Waiting Queue 中
  - x.signal()
    - 如果有 Process 卡在 x.wait 的 Waiting Queue 中，則此運作會從該 Waiting Queue 中取出第一個 Process，將其 wakeup。否則 x.signal 無任何作用。
- condition 形態的變數並沒有 value and cannot be modified

- 可以有四種狀態
  - Active
    - 正在 running
  - Entering
    - 被 monitor block 住
  - Waiting
    - 等 condition 變數
  - Inactive
    - Those waiting on the waiting bench

##### Signal and wait

##### Signal and continue

![](https://i.imgur.com/tQGl4nJ.png)

### 利用 monitor 解決 哲學家問題

##### 實作

![](https://i.imgur.com/g1NOtXX.png)

##### 資料區（變數說明）

- 每個哲學家會有三種不同的狀態(State)：thinking, hungry, eating
- 當哲學家發生搶不到筷子的情況(Condition)時之同步處理

##### 初始區

- 每個 Process 的初始狀態皆設定為 thinking
- 不需針對 Condition 型態變數設定初值，因為它是用來卡住哲學家

##### 程序區

- 每個 Procedure 的輸入參數皆為哲學家編號
- 哲學家 i 在拿起筷子(pickup)時：
  - 先將自已的狀態設成飢餓(hungry)
  - 再測試(test)左右兩邊的人是否正在 eating；
    - 若是，代表搶不到兩枝筷子，則會將自已卡住(wait)而去睡覺。
    - 若否
      - 則將自已設成 eating 狀態。
      - 若哲學家先前曾因搶不到筷子而被卡住(wait)，則將會被喚醒(signal)；否則 signal 指令無作用。
      - 【因為被卡住的哲學家不會喚醒自已 ! 而是有別的哲學家因吃完飯、放下筷子(putdown)時嘗試將他喚醒以進行吃飯】
- 哲學家 i 在放下筷子(putdown)時：
  - 先將自已的狀態設成思考(thinking)
  - 再測試(test)左右兩邊的人是否因為我在 eating 而被卡住；若有，則解救他們，讓他們可以吃飯。

##### 問題

- 雖然沒有 deadlock，但還是有可能 starvation

### 比較 semaphore monitor

使用 monitor 可以輕易地模仿出 semaphore 的效果，
可是使用 semaphore 來模擬 monitor 卻會十分複雜

![](https://i.imgur.com/CtYWLbM.png)

雖然助教的答案長這樣...

![](https://i.imgur.com/IE1PoXV.png)
