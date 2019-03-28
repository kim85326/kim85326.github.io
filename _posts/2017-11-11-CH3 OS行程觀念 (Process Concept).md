---
layout: post
title: "CH3 OS行程觀念 (Process Concept)"
date: 2017-11-11 00:00:00 +0800
categories: 作業系統
tags: OS 作業系統
mathjax: true
---

### 該如何稱呼 CPU 所有的運作項目

1. 整批式(Batch)系統執行工作-jobs
2. 分時系統有使用者程式-user programs 或 task

### process

- process 是正在執行的 program
- process 是 active、program 是 passive
- 一個 program 可以是多個 process
- process 不只是 program code，也可以叫 text section
- 還包含 program counter、processor registers
- 堆疊 (stack)
  - 暫存 data - function 參數、return address、local 變數
- 資料區間 (data section)
  - 包含 global 變數
- 堆積 (heap)
  - 動態配置的記憶體

![](https://i.imgur.com/ZLFm3Rv.png)

### 行程狀態(Process State)

process 在執行時會改變狀態

1. 新產生 (new):該行程正在產生中
2. 執行 (running):指令正在執行
3. 等待(waiting):等待某件事件的發生(ex 輸出入完成或接收到一個信號)
4. 就緒 (ready):該行程正等待指定一個處理器
5. 結束 (terminated):該行程完成執行

![](https://i.imgur.com/69yaMwH.png)
![](https://i.imgur.com/rSf3X8n.png)

#### running -> ready 的可能

1. 被 timer interrupt 截斷，因為要公平的執行，不然有人會餓死
2. 執行中突然有個優先權比他高的 process 從 waiting 轉成 ready 了! (CPU 被搶走)

### 行程控制表(Process Control Block)

每一個 process 在 os 中都對應著一個行程控制表 (Process control block (PCB)或稱任務控制表 (Task Control Block)

![](https://i.imgur.com/chCclOP.png)

1. process state: running, waiting 等等
2. program counter: 紀錄目前執行到哪了
3. CPU register
   - 其數量和類別，完全因電腦架構而異。包括累加器 (accumulator)、索引暫存器 (index register)、堆疊指標 (stack pointer)以及一般用途暫存器 (general-purpose register)等，還有一些狀況代碼 (condition code)。當中斷發生時，這些狀態資訊以及程式執行計數器必須儲存起來，以便稍後利用這些儲存的資訊，使程式能於中斷之後順利地繼續執行。
4. CPU scheduling information: 紀錄 process 的優先順序之類的
5. memory-management information: 記憶體管理資訊，記憶體分配
6. accounting information: 包括了 CPU 和實際時間的使用數量、時限、帳號工作或行程號碼。
7. I/O 狀態 information: 包括配置給行程的輸入/輸出裝置，包括開啟檔案的串列，等等

CPU Switch From Process to Process
![](https://i.imgur.com/iAh0d7e.png)

### 行程排班(Process Scheduler)

1. 多元程式規劃系統(Multiprogramming)的主要目的，是隨時有一個行程在執行，藉以提高 CPU 的使用率。分時系統(Time Sharing)的目的是將 CPU 在不同行程之間不斷地轉換，以便讓使用者可以在自己的行程執行時與它交談

2. 為了達到這個目的，行程排班程式(Scheduler)為 CPU 上執行程式選擇一個可用的行程(可能由一組可用行程)。

3. 單一處理器系統，不可能有一個以上的行程同時執行。如果有多個行程，其它的都必須在旁邊等待一直到 CPU 有空，才可能重新排列。

#### 排班佇列(Scheduling Queues)

![](https://i.imgur.com/hz8Ickx.png)

1. Job Queue
   行程進入系統時，是放在工作佇列(Job Queue)之中，此佇列是由系統中所有的行程所組成。

2. Ready Queue
   位於主記憶體中且就緒等待執行的行程是保存在一個所謂就緒佇列 (Ready Queue)的串列。這個佇列一般都是用鏈接串列的方式儲存。在就緒佇列前端保存著指向這個串列的第一個和最後一個 PCB 的指標。

![](https://i.imgur.com/41b7WJD.png)

3. Device Queue
   等 I/O device

#### 排班程式(Schedulers)

![](https://i.imgur.com/55Ji85h.png)

1. Long-term Scheduler (Job Scheduler)
   - 從 Spooled (行程池)中選出程並且將它們載入記憶體(ready queue)內以便執行。
   - 使用頻率比較低，可以慢慢選要把哪個 process 丟進去
2. Short-term Scheduler (or CPU Scheduler)
   - 選擇下一個要給 CPU 執行的是哪個 process(從 ready queue 裡面抓)
   - 使用頻率非常高，一定要有效率的設計之(如果沒有效率就會浪費時間!)
   - 控制 degree of multiprogramming
     (也就是在記憶體中的 process 數量)
3. process 可以分為以下兩類:

   - I/O-bound process: 大部分時間都在做 I/O，用 CPU 計算的時間很少
   - CPU-bound process: 花很多的時間在做 CPU 運算

4. Mid-term scheduler: 將 process 從 memory 中移開(從對 CPU 的競爭中移開)，以減低 degree of multiprogramming，稍後在放回去
   - 把 process 從 memory 裡拿出來放進去的過程稱為 swap out

![](https://i.imgur.com/4imCYOJ.png)

### 內容轉換(Context Switch)

- 當中斷(Interrupt)發生時，系統先暫停 Process，爾後再恢復 Process。

  - 做法是將目前在 CPU 上執行行程(Process)的內容 (Context)先儲存起來，以便作業完成時，可以還原 Process 之內容。

- 轉換 CPU 至另一項行程時必須將舊行程的狀態儲存(State Save)起來，然後再載入新行程的儲存狀態(還原狀態：State Restore)。這項任務稱為內容轉換(Context Switch)。

- context switch 的時候，CPU 沒有在做任何有效的事情! (只是單純的狀態切換)

### 行程的產生(Process Creation)

一個行程的執行期間，可以利用產生行程的系統呼叫來產生數個新的行程。原先的行程就叫做父行程 (Parent Process)，而新的行程則叫做子行程(Children Process)。每一個新產生的行程可以再產生其它的行程，這可以形成一幅行程樹 (Tree of Processes)。

![](https://i.imgur.com/uWaSJu6.png)

1. resource 的分享? 有以下幾種情形:

   1. parent 和 children 共享所有的 resource
   2. parent 和 children 共享部分的 resource
   3. parent 和 children 完全不共享 resource

2. execution?

   1. parent 和 children 並行執行
   2. 等到 children 死掉以後 parent 才繼續執行

3. children process 會長什麼樣子?

   1. 可能和 parent 一模一樣(直接 copy 一份 parent 的 process 和 data)
   2. 可能載入一個新的 program
      - 舉例:
        fork()會產生一個一模一樣的 child process
        (fork 完的 pid 是 0，parent 的 pid 會被換成新的值，可以根據 pid 來判斷是 child 還是 parent)
        叫完 fork()再叫 exec()的話，會把剛剛產生出來這個一模一樣的 child 替換成新的 process

4. Process termination? 工作做完了，要怎麼結束呢?

   1. 會用 exit()呼叫 OS 讓他來把他刪掉
   2. 可能會用 wait()把狀態傳回給 parent
   3. OS 會收回配置給這個 process 的系統資源

   - 有時候，parent 會中止掉自己的 childe process (abort)

     1. 例如 child 用了太多的系統資源
     2. 或者不再需要 child process 來做這個工作了
     3. 或者 parent 自己要結束了，OS 不允許 child 在 parent 結束之後繼續執行

   - orphan process?

     - 這個 process 的 parent died 了! 他將會被 init 收養:)

   - zombie process?

     - 這個 process 已經掛了! 可是系統沒有把配給他的資源清掉，他是個霸著 resource 不放的殭屍!

   - 其他要注意的:
     - malloc()& global 放在 data section，如果使用 vfork()，只有 stack 是自己的(以便進行 function call)，data 和 code 是共享的
     - exit 會把所有東西清除，file 也一起關掉
     - vfork --> 資源共享，用\_exit()只會將自己 create 出來的東西清除:)

### 行程間通訊(Interprocess Communication)

在 OS 中同時執行的行程分為獨立行程(Independent)及合作(Cooperating Process)行程

- 合作行程(Cooperating Process)

  1. 資訊共享(Information Sharing):
     - 數個使用者可能對相同的一項資訊(例如，公用檔案)有興趣，因此須提供一個環境允許使用者能同時使用這些資源。
  2. 加速運算(Computation Speedup):
     - 如果希望某一特定工作執行快一點，則可以分成一些子工作，每一個子工作都可以和其它子工作平行地執行。
  3. 模組化(Modularity):
     - 以模組的方式來建立系統，把系統功能分配到數個行程。
  4. 方便性(Convenience):
     - 即使是單一使用者也可能同時執行數項工作。

- 合作行程間通訊有二個基本模式︰共用記憶體及訊息傳遞。

  1. 共用記憶體

     - 為了闡述合作行程的觀念，讓我們來看「生產者-消費者」的問題。生產者(Producer)行程產生資訊，消費者(Consumer)行程消耗掉這些資訊。

  2. 訊息傳遞
     1. message passing: 先送給 kernel，再送給 target
     2. shared memory: 把要 shared 的東西放在記憶體裡(適用於大檔案)
