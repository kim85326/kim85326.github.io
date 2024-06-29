---
layout: post
title: "CH7 死結 (Deadlock)"
date: 2018-01-10 00:00:00 +0800
categories: 作業系統
tags: 作業系統
mathjax: true
description: ""
redirect_from: 
  - "/2018/01/09/CH7-死結-(Deadlock)/"
---

## system model

每一種資源都有一定的 instances，像是可能有 5 個 disk，不只有一個 I/O Devices，每一個 process 要利用資源都有以下三個階段

1. request 要求資源
2. use 使用資源
3. release 釋放資源

## Deadlock 定義

一組 processes 陷入互相等待的情況
造成 processes 無法往下執行，使 cpu utilization 和 throughput 大幅降低

## Deadlock 特徵

如果同時(simultaneously)存在四個條件，就會發生 deadlock

1. mutual exclusion 互斥
   - 一次只有一個 process 使用資源
2. hold and wait 持有並等待
   - process 持有部分資源又在等待其他 processes 所持有的資源
3. no preemption 不可強奪
   - process 不可以搶奪其他 waiting process 所持有的資源，除非他自願釋放
4. circular waiting 循環等待
   - 存在一組 process 等待另一個 process 的資源形成循環
   - P0 -> P1 -> P2 ...-> Pn -> P0

### Resource-Allocation Graph(RAG)

System Model 可以用 Resource-Allocation Graph(RAG)的方式去用圖表描述，如果圖表中沒有 cycle，就不會發生死結，如果有 cycle，則看資源的是不是只有一個 instances，若只有一個，則會發生 deadlock，若不只一個，則有可能發生 deadlock。

![](https://i.imgur.com/I00O91P.png)

- Pi -> Rj : Pi 要求 Rj 這個資源
- Pi <- Rj : Pi 已經有 Rj 這個資源

![](https://i.imgur.com/WHY5jOu.png)

##### 例子 1

![](https://i.imgur.com/nI5gfTJ.png)

1. P1 已經有 R2 的資源，P1 要求 R1 的資源
2. P2 已經有 R1、R2 的資源，P2 要求 R3 的資源
3. P3 已經有 R3 的資源
4. 並沒有形成 cycle，所以沒有 deadlock

##### 例子 2

![](https://i.imgur.com/RKJICFZ.png)

1. 承例子 1，只多了一條線，P3 要求 R2 資源
2. 這時候會形成 cycle
   1. P1 -> R1 -> P2 -> R3 -> P3 -> R2 -> P1
   2. P2 -> R3 -> P3 -> R2 -> P2
3. deadlock

##### 例子 3

![](https://i.imgur.com/2T9v8dI.png)

1. 雖然有 cylce，P1 -> R1 -> P3 -> R2 -> P1
2. 但是 P4 可以 release R2 的某一個 instance
3. 那 P3 就可以獲得 P4 release 出的那個 instance
4. 不會 deadlock

### Resource-Allocation Graph 結論

1. 如果沒有 cycle => 沒有 deadlock
2. 如果有 cycle ，不一定有 deadlock
   1. 如果每個 resource 只有一個 instance => deadlock
   2. 如果每個 resource 有多個 instance => 可能 deadlock

### 處理 deadlock

一般而言，我們可以處理死結問題(deadlock problem)使用下列三個方式其中之一

1. 確定系統永遠不會進入死結狀態(deadlocked state)
   - Prevention
   - Avoidance
2. 我們可以允許系統進入死結狀態(deadlocked state)，然後偵測它，恢復它
3. 我們可以完全無視這些問題，假裝這些問題從來不曾發生過
   - 第三種方法是其中最多作業系統使用的方式，包括 Linux、Windows，它讓程式開發者自己來處理這些問題

### Deadlock Prevention

確保 deadlock 不會發生 => 4 個條件其中一個不成立

1. Mutual exclusion:
   - 對 sharable resources 而言，Mutual exclusion 一定成立
   - 而 nonsharable resources，因為可以同時讀取相同檔案，所以一定不會產生
   - 但很困難讓他不成立
2. Hold and Wait:
   - process 必須保證一個行程在要求一項資源時，不可以佔用任何其它的資源
   - 兩種可能策略
     - 允許 process 在執行之初可先持有部分資源，一旦要申請新資源，則必須先釋放持有的全部資源，才可以提申請
     - 除非 process 可以一次取得完成工作所需的全部資源，才允許 process 持有資源，否則不准持有任何資源
   - 低資源利用率
   - 可能會有 starvation
3. No preemption:
   - 變成 preemption
   - process 可以搶奪 waiting process 所持有的 Resource
   - 解決：採取類似"Aging"技術(將被搶奪的次數，列為提高優先權之依據)
4. Circular Wait:
   - 確保循環式等候的條件不成立，我們對所有的資源型式強迫安排一個線性的順序
   - 作法
     1. 給予每個 Resource 唯一的(unique)資源編號(ID)
     2. 規定 process 需依資源編號遞增的方式提出申請

- 優點:保證系統絕不會有死結存在
- 缺點:resource 可用率低、throughput 低

### Deadlock Avoidance

當 process 提資源申請(Request)時，則 OS 需依據下列資訊：

1. 系統目前可用的資源數量(Available)
2. 各 process 對資源的最大需求量(max)
3. 各 process 目前持有的資源量(allocation)
   各系統還需多少資源(need) = max - allocation

執行 Banker's Algorithm(內含 Safety Algorithm)判斷系統若核准後，是否處於 Safe state，若是，則核准申請，否則(處於 unsafe state)，則否決此次申請，Process 則等待依段時間後再重新申請

### Safety 演算法

定義:

1. work[i] : 目前可用資源數量之累計
2. finish[i]的值，初始值都是 false
   - true : Pi 已經完成工作
   - false : Pi 尚未完成工作

判斷:

1. 設定初始值
   work[i] = available
   finish[i] = false
2. 找出 Pi 滿足下面條件
   1. finish[i] = false
   2. need_i <= work
      如果找到就到 step3，否則到 step4
3. 設定 finish[i] = true，且 work = work + allocation
   到 step2
4. 檢查 finish 陣列，若皆為 true，系統處於 safe state，否則處於 unsafe state

結論:
存在 1 組以上 Safe state 使得 processes 依此順序執行，皆可完成工作就是安全的狀態，如果找不出一組 Safe state 就是在不安全的狀態

##### 例題 1

![](https://i.imgur.com/c1ScbyI.png)

1. 剩下 12-(5+2+2)=3 free
2. 剛好 B 需要 2 個就給他 => 等他做完會釋放 5 個
3. 5 個可以給 A => A 做完釋放 10 個
4. 就可以給 C 用了
5. <B,A,C>是一個 safe state

##### 例題 2

![](https://i.imgur.com/0ZzUEU6.png)

1. 剩下 12-(5+2+3)=2 free
2. 剛好 B 需要 2 個就給他 => 等他做完會釋放 4 個
3. 但是 A、C 都的需要都 > 4
4. 所以會有 deadlock

### Deadlock Avoidance 演算法

1. 資源是單一 instance 就用 resource-allocation graph
   - 則有 cycle 就有死結
2. 資源是多個 instances 就用 banker's algorithm

### Resource Allocation Graph + claim edge

定義:

- 在 resource allocation graph 中多加入一種邊，稱為 claim edge(宣告邊)
  做法:

1. 當 Pi 要求 Rj 時
2. 將 claim edge Ri 虛線-> Rj 改為 Request edge Pi -> Rj
3. 再將 Request edge 改為 allocation edge Pi <- Rj
4. 查看是否有 cycle 存在，若有就是 unsafe state

### banker's algorithm

定義:

- 假設 n 為 process 數目，m 為 resource 數目
- 系統資源總量(題目會給)
- Available : m 長度的向量
  - 表示可以使用的資源
  - Available = 總資源量-Alloaction
- Max : n x m 的矩陣
  - 表示各 process 對各類資源的最大需求量
  - Max[i,j] = k，表示 Pi 對 Rj 的最大需求量為 k
- Allocation : n x m 的矩陣
  - 表示各 process 目前持有的資源量
  - Allocation[i,j] = k，表示 Pi 目前持有 k 個 Rj
- Need : n x m 的矩陣
  - 表示各 process 想要的資源量
  - Need[i,j] = k，表示 Pi 想要 k 個 Rj
  - Need[i,j] = Max[i,j] - Allocation[i,j]

判斷:

1. 檢查 Request_i ≤ Need_i
   若不成立，則 OS 終止此 process
   否則到 step2

2. 檢查 Request_i ≤ Available
   若不成立，則 Process_i 必須 wait 直到 Resource Available
   否則到 step3

3. 計算 Allocation_i = Allocation_i + Request_i
   Need_i = Need_i - Request_i
   Available = Available – Request_i

4. 執行"Safety Algorithm"
   如果系統判斷會處於 Safe state 則核准申請，不行則否決此次申請，稍後再重新申請

結論:
缺點: 太耗費時間 O(n x n x m)

##### 例題 1

![](https://i.imgur.com/t0W9Rpr.png)

1. 寫出需求
   ![](https://i.imgur.com/ogvCsKV.png)

2. 按照上圖，決定把資源給 P1，等到 P1 做完會釋放(2,0,0)，下次資源就有(3,3,2)+(2,0,0)=(5,3,2)
3. (5,3,2)的資源可以給 P3，等到 P3 做完會釋放(2,1,1)，下次資源就有(5,3,2)+(2,1,1)=(7,4,3)
4. (7,4,3)的資源可以給 P4，等到 P4 做完會釋放(0,0,2)，下次資源就有(7,4,3)+(0,0,2)=(7,4,5)
5. (7,4,5)的資源可以給 P1，等到 P1 做完會釋放(0,1,0)，下次資源就有(7,4,5)+(0,1,0)=(7,5,5)
6. (7,5,5)的資源可以給 P2，等到 P2 做完會釋放(3,0,2)，下次資源就有(10,5,7)
7. < P1 , P3 , P4 , P1 , P2 >是一個 safe sequence

available = available - need + max
= available - need + need + alloc
= available + alloc

### deadlock detection

偵測死結是否存在
若死結存在，則必須打破死結，恢復正常的機制

- 優點：resource utilization 較高，Throughput 高
- 缺點：cost 太高

### deadlock recovery

一旦檢測出死結，則就要採取一些策略使系統從死結中恢復

1. 結束所有死結進程。即強制性地從系統中撤銷死結進程，並剝奪它們的資源給剩下的進程使用。（使前面的工作全部損失）
2. 將死結進程退回到前一個檢查點，並重新從該檢查點啓動這些進程（前提是系統必須提供檢查點和重新啓動的機制）。

3. 相繼的逐個結束死結進程直至死結不再存在。在每個進程結束後，都要使用死結檢測算法以確定死結是否依然存在。

4. 相繼的逐個搶佔死結進程的資源，直至死結不再存在。但搶佔資源的方法是否可行，往往與資源特性有關。有時搶佔資源還需要人工干預，例如搶佔激光印表機時就需將原來影印的紙張先放到一邊去，並使被搶佔進程回到當初獲得資源時的斷點。

由於所有使死結進程相繼結束和強佔資源策略均涉及損失了這些進程已完成工作的開銷。因此要基於成本的基礎上選擇結束進程的次序。首先要優先選擇以下死結進程：

1. 選擇使用最少處理器時間的進程。

2. 選擇使用最少輸出工作量的進程。

3. 選擇具有最多剩餘時間的進程。

4. 選擇分的最少資源進程。

5. 具有最小優先級的進程。

### 參考資料

- [宅學習 - 07. 死結 (Deadlock)](https://sls.weco.net/node/21327)
