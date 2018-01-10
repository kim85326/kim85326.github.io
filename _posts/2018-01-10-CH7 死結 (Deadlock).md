---
layout: post
title: "CH7 死結 (Deadlock)"
date: 2018-01-10 00:00:00 +0800
categories: OperatingSystem
tags: OS OperatingSystem
excerpt: .
mathjax: true
---

## system model
每一種資源都有一定的instances，像是可能有5個disk，不只有一個I/O Devices，每一個process要利用資源都有以下三個階段
1. request 要求資源
2. use 使用資源
3. release 釋放資源

## Deadlock 定義
一組processes陷入互相等待的情況
造成processes無法往下執行，使cpu utilization和throughput大幅降低

## Deadlock 特徵
如果同時(simultaneously)存在四個條件，就會發生deadlock
1. mutual exclusion 互斥
    * 一次只有一個process使用資源
2. hold and wait 持有並等待
    * process持有部分資源又在等待其他processes所持有的資源
3. no preemption 不可強奪
    * process不可以搶奪其他waiting process所持有的資源，除非他自願釋放
4. circular waiting 循環等待
    * 存在一組process等待另一個process的資源形成循環
    * P0 -> P1 -> P2 ...-> Pn -> P0

### Resource-Allocation Graph(RAG)
System Model可以用Resource-Allocation Graph(RAG)的方式去用圖表描述，如果圖表中沒有cycle，就不會發生死結，如果有cycle，則看資源的是不是只有一個instances，若只有一個，則會發生deadlock，若不只一個，則有可能發生deadlock。

![](https://i.imgur.com/I00O91P.png)

* Pi -> Rj : Pi要求Rj這個資源
* Pi <- Rj : Pi已經有Rj這個資源

![](https://i.imgur.com/WHY5jOu.png)

##### 例子1

![](https://i.imgur.com/nI5gfTJ.png)

1. P1已經有R2的資源，P1要求R1的資源
2. P2已經有R1、R2的資源，P2要求R3的資源
3. P3已經有R3的資源
4. 並沒有形成cycle，所以沒有deadlock

##### 例子2

![](https://i.imgur.com/RKJICFZ.png)

1. 承例子1，只多了一條線，P3要求R2資源
2. 這時候會形成cycle
    1. P1 -> R1 -> P2 -> R3 -> P3 -> R2 -> P1
    2. P2 -> R3 -> P3 -> R2 -> P2
3. deadlock

##### 例子3

![](https://i.imgur.com/2T9v8dI.png)

1. 雖然有cylce，P1 -> R1 -> P3 -> R2 -> P1
2. 但是P4可以release R2的某一個instance
3. 那P3就可以獲得P4 release 出的那個instance
4. 不會deadlock

### Resource-Allocation Graph 結論
1. 如果沒有cycle => 沒有deadlock
2. 如果有cycle ，不一定有deadlock
    1. 如果每個resource只有一個instance => deadlock
    2. 如果每個resource有多個instance => 可能 deadlock

### 處理 deadlock
一般而言，我們可以處理死結問題(deadlock problem)使用下列三個方式其中之一
1. 確定系統永遠不會進入死結狀態(deadlocked state)
    * Prevention
    * Avoidance
2. 我們可以允許系統進入死結狀態(deadlocked state)，然後偵測它，恢復它
3. 我們可以完全無視這些問題，假裝這些問題從來不曾發生過
    * 第三種方法是其中最多作業系統使用的方式，包括Linux、Windows，它讓程式開發者自己來處理這些問題

### Deadlock Prevention
確保deadlock不會發生 => 4個條件其中一個不成立
1. Mutual exclusion:
    * 對sharable resources而言，Mutual exclusion一定成立
    * 而nonsharable resources，因為可以同時讀取相同檔案，所以一定不會產生
    * 但很困難讓他不成立
2. Hold and Wait:
    * process必須保證一個行程在要求一項資源時，不可以佔用任何其它的資源
    * 兩種可能策略
        * 允許process在執行之初可先持有部分資源，一旦要申請新資源，則必須先釋放持有的全部資源，才可以提申請
        * 除非process可以一次取得完成工作所需的全部資源，才允許process持有資源，否則不准持有任何資源
    * 低資源利用率
    * 可能會有starvation
3. No preemption:
    * 變成preemption
    * process可以搶奪waiting process所持有的Resource
    * 解決：採取類似"Aging"技術(將被搶奪的次數，列為提高優先權之依據)
4. Circular Wait:
    * 確保循環式等候的條件不成立，我們對所有的資源型式強迫安排一個線性的順序
    * 作法
        1. 給予每個Resource唯一的(unique)資源編號(ID)
        2. 規定process需依資源編號遞增的方式提出申請

* 優點:保證系統絕不會有死結存在
* 缺點:resource 可用率低、throughput低

### Deadlock Avoidance
    
當process提資源申請(Request)時，則OS需依據下列資訊：

1. 系統目前可用的資源數量(Available)
2. 各process對資源的最大需求量(max)
3. 各process目前持有的資源量(allocation)
各系統還需多少資源(need) = max - allocation

執行Banker's Algorithm(內含Safety Algorithm)判斷系統若核准後，是否處於Safe state，若是，則核准申請，否則(處於unsafe state)，則否決此次申請，Process則等待依段時間後再重新申請

### Safety演算法
定義:
1. work[i] : 目前可用資源數量之累計
2. finish[i]的值，初始值都是false
    * true : Pi已經完成工作
    * false : Pi尚未完成工作

判斷:
1. 設定初始值
    work[i] = available
    finish[i] = false
2. 找出Pi滿足下面條件
    1. finish[i] = false
    2. need_i <= work
    如果找到就到step3，否則到step4
3. 設定finish[i] = true，且work = work + allocation
    到step2
4. 檢查finish陣列，若皆為true，系統處於safe state，否則處於unsafe state

結論:
存在1組以上Safe state使得processes依此順序執行，皆可完成工作就是安全的狀態，如果找不出一組Safe state就是在不安全的狀態

##### 例題1

![](https://i.imgur.com/c1ScbyI.png)

1. 剩下12-(5+2+2)=3 free
2. 剛好B需要2個就給他 => 等他做完會釋放5個
3. 5個可以給A => A做完釋放10個
4. 就可以給C用了
5. <B,A,C>是一個safe state


##### 例題2

![](https://i.imgur.com/0ZzUEU6.png)

1. 剩下12-(5+2+3)=2 free
2. 剛好B需要2個就給他 => 等他做完會釋放4個
3. 但是A、C都的需要都 > 4
4. 所以會有deadlock 

### Deadlock Avoidance 演算法
1. 資源是單一instance就用 resource-allocation graph
    * 則有cycle就有死結
2. 資源是多個instances就用 banker's algorithm

### Resource Allocation Graph + claim edge
定義:
* 在resource allocation graph中多加入一種邊，稱為claim edge(宣告邊)
做法:
1. 當Pi要求Rj時
2. 將claim edge Ri 虛線-> Rj 改為 Request edge Pi -> Rj
3. 再將Request edge改為allocation edge Pi <- Rj
4. 查看是否有cycle存在，若有就是unsafe state

### banker's algorithm
定義:
* 假設n為process數目，m為resource數目
* 系統資源總量(題目會給)
* Available : m長度的向量
    * 表示可以使用的資源
    * Available = 總資源量-Alloaction
* Max : n x m 的矩陣
    * 表示各process對各類資源的最大需求量
    * Max[i,j] = k，表示Pi對Rj的最大需求量為k
* Allocation : n x m 的矩陣
    * 表示各process目前持有的資源量
    * Allocation[i,j] = k，表示Pi目前持有k個Rj
* Need : n x m 的矩陣
    * 表示各process想要的資源量
    * Need[i,j] = k，表示Pi想要k個Rj
    * Need[i,j] = Max[i,j] - Allocation[i,j]

判斷:
1. 檢查Request_i ≤ Need_i
    若不成立，則OS終止此process
    否則到step2

2. 檢查Request_i ≤ Available
    若不成立，則Process_i必須wait直到Resource Available
    否則到step3
    
3. 計算Allocation_i = Allocation_i + Request_i
    Need_i = Need_i - Request_i
    Available = Available – Request_i

4. 執行"Safety Algorithm"
    如果系統判斷會處於Safe state則核准申請，不行則否決此次申請，稍後再重新申請

結論:
缺點: 太耗費時間 O(n x n x m)

##### 例題1

![](https://i.imgur.com/t0W9Rpr.png)

1. 寫出需求
![](https://i.imgur.com/ogvCsKV.png)

2. 按照上圖，決定把資源給P1，等到P1做完會釋放(2,0,0)，下次資源就有(3,3,2)+(2,0,0)=(5,3,2)
3. (5,3,2)的資源可以給P3，等到P3做完會釋放(2,1,1)，下次資源就有(5,3,2)+(2,1,1)=(7,4,3)
4. (7,4,3)的資源可以給P4，等到P4做完會釋放(0,0,2)，下次資源就有(7,4,3)+(0,0,2)=(7,4,5)
5. (7,4,5)的資源可以給P1，等到P1做完會釋放(0,1,0)，下次資源就有(7,4,5)+(0,1,0)=(7,5,5)
6. (7,5,5)的資源可以給P2，等到P2做完會釋放(3,0,2)，下次資源就有(10,5,7)
7. < P1 , P3 , P4 , P1 , P2 >是一個safe sequence

available = available - need + max 
        = available - need + need + alloc
        = available + alloc
        
### deadlock detection
偵測死結是否存在
若死結存在，則必須打破死結，恢復正常的機制
* 優點：resource utilization較高，Throughput高
* 缺點：cost太高

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





參考資料
https://sls.weco.net/node/21327
http://www.csie.ntnu.edu.tw/~swanky/os/chap5.htm
