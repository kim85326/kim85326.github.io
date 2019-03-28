---
layout: post
title: "CH8 記憶體管理 (Memory Management Strategies)"
date: 2018-01-10 00:00:00 +0800
categories: 作業系統
tags: 作業系統
mathjax: true
---

### 背景

##### 目的

1. 程式(program)必須從硬碟移動到記憶體中，並變成一個進程(process)才能執行
2. CPU 只能直接存取，CPU 內暫存器(register)或記憶體(memory)的內容
   - CPU 可以在一個時脈週期內，存取暫存器(register)多次
   - 但是存取相同內容的話，存取記憶體(memory)可能要花數個 CPU 時脈週期(因為 memory 速率較 register 慢)，照成 CPU 需要等待(stall)
3. 補救方法就是，在快與慢之間加入存取速率中等的快取記憶體(cache)

![](https://i.imgur.com/nibSFN9.png)

##### 基底暫存器與限制暫存器(Base and Limit Registers)

使用兩個暫存器記錄

1. Base register：該 process 的起始記憶體地址，我們稱為基底暫存器
2. Limist register：該 process 所佔記憶體地址大小，我們稱為限制暫存器

![](https://i.imgur.com/73k33f7.png)

### address binding

程式必須載入到記憶體後，變成 process 後才能執行。
在硬碟上等待被載入到記憶體執行得的所有行程，會形成一個輸入佇列(input queue)

![](https://i.imgur.com/sfJZH4U.png)

1. 編譯時間 (compile time)：如果編譯時，程式所在的記憶體位置已知，那麼可產生絕對碼(absolute code)

   - 缺點：但如果起始位置變化，要重新 compiler

2. 載入時間 (load time)：如果編譯時不能確定程式所在的記憶體位置，則必須生成 重定代(relocatable code)

   - 缺點：但如果起始位置變化，要 reload

3. 執行時間 (execution time)：如果行程正要執行時，記憶體區段被移動到另一個區段，則連結時間才會延遲到這個時候(這需要硬體是否支援：MMU)

### logical address 和 physical address

1. logical address
   - cpu 產生的
   - virtul address
2. physical address
   - 真的送到 memory 的

- compile time 和 load time 的 address binding
  - logical address = physical address
- execution time 的 address binding
  - logical address != physical address

### Memory-Management Unit (MMU)

硬體將 logical address 轉成 physical address

![](https://i.imgur.com/9Fw26X7.png)

##### Dynamic Binding

1. 在 execution time 才真正決定程式執行的起始位置，就是程式在執行時可以任意變動起始位置
2. 但是需要額外的硬體支援 ex MMU

##### Dynamic Loading

1. 在 execution time，當某個 module 被真正呼叫到的時候，才將他 load 到 memory 裡面（如果該 module 並不在 memory 裡面）
2. 主要目的是想節省 memory 空間，發揮 memory 使用率（utilization）

##### Dynamic Linking

1. 在 execution time，當某個 module 被真正呼叫到的時候，才將他 load 到 memory 裡面，並將他的 module 和 library 進行外部符號參考的解決（linking）
2. 主要目的是想節省不必要的 linking time
3. 也可以說是 shared libraries

### swapping

![](https://i.imgur.com/5QCu1hc.png)

1. 也可以叫 backing store
2. memory 不夠用了，優先權（priority）較低的會先被 swap out

### Contiguous Allocation 連續

1. fix-partition 大家都配置一樣的記憶體大小
2. Variable-partition 配置的記憶體大小符合 process 大小
3. 當 process 離開 memory 就會有洞(hole)產生，有幾種方法去填這個洞
   1. first-fit
      - 從第一個洞開始找，找到可以塞進去的洞
   2. best-fit
      - 檢查所有洞，找出最小的洞，且可以塞進去的洞
   3. worst-fit
      - 檢查所有洞，找出最大的洞
   4. next-fit
      - first-fit 的變形，因為每次找洞的時候，可能前面的洞已經很小的，但是還是要從前面開始找，就會浪費搜尋時間
      - next-fit 從上次配置的 block 以下的洞開始找

##### 例題 1

![](https://i.imgur.com/E5UsMux.png)

sol:

| 開始位置 | 結束位置 | 大小 |
| -------- | -------- | ---- |
| 0        | 100      | 100  |
| 150      | 350      | 200  |
| 400      | 550      | 150  |
| 600      | 850      | 250  |
| 900      | 950      | 50   |

(a) First-fit
P1 需要 120
這時候 150 這個位置可以使用，150+120=270
所以 P1 在 150~270
剩下

| 開始位置    | 結束位置 | 大小       |
| ----------- | -------- | ---------- |
| 0           | 100      | 100        |
| ~~150~~ 270 | 350      | ~~200~~ 80 |
| 400         | 550      | 150        |
| 600         | 850      | 250        |
| 900         | 950      | 50         |

P2 需要 100
剛好 0 的位置可以用
所以 P2 在 0~100
剩下

| 開始位置    | 結束位置 | 大小       |
| ----------- | -------- | ---------- |
| ~~0~~       | ~~100~~  | ~~100~~    |
| ~~150~~ 270 | 350      | ~~200~~ 80 |
| 400         | 550      | 150        |
| 600         | 850      | 250        |
| 900         | 950      | 50         |

P3 需要 50
270 的位置可以使用，270+50=320
所以 P3 在 270~320
剩下

| 開始位置            | 結束位置 | 大小              |
| ------------------- | -------- | ----------------- |
| ~~0~~               | ~~100~~  | ~~100~~           |
| ~~150~~ ~~270~~ 320 | 350      | ~~200~~ ~~80~~ 30 |
| 400                 | 550      | 150               |
| 600                 | 850      | 250               |
| 900                 | 950      | 50                |

P4 需要 150
400 的位置可以
P4 的位置是 400~550
剩下

| 開始位置            | 結束位置 | 大小              |
| ------------------- | -------- | ----------------- |
| ~~0~~               | ~~100~~  | ~~100~~           |
| ~~150~~ ~~270~~ 320 | 350      | ~~200~~ ~~80~~ 30 |
| ~~400~~             | ~~550~~  | ~~150~~           |
| 600                 | 850      | 250               |
| 900                 | 950      | 50                |

P5 需要 50
600 的位置可以，600+50=650
所以 P5 的位置是 600~650
答案

|     | 開始位置 | 結束位置 | 大小 |
| --- | -------- | -------- | ---- |
| P1  | 150      | 270      | 120  |
| P2  | 0        | 100      | 100  |
| P3  | 270      | 320      | 50   |
| P4  | 400      | 550      | 150  |
| P5  | 600      | 650      | 50   |

(b)best-fit
P1 需要 120
看大小，150 大小最適合，400+120=520
所以 P1 在 400~520
剩下

| 開始位置    | 結束位置 | 大小       |
| ----------- | -------- | ---------- |
| 0           | 100      | 100        |
| 150         | 350      | 200        |
| ~~400~~ 520 | 550      | ~~150~~ 30 |
| 600         | 850      | 250        |
| 900         | 950      | 50         |

P2 需要 100
大小 100 的最適合
所以 P2 在 0~100
剩下

| 開始位置    | 結束位置 | 大小       |
| ----------- | -------- | ---------- |
| ~~0~~       | ~~100~~  | ~~100~~    |
| 150         | 350      | 200        |
| ~~400~~ 520 | 550      | ~~150~~ 30 |
| 600         | 850      | 250        |
| 900         | 950      | 50         |

P3 需要 50
50 的大小最適合
所以 P3 在 900~950
剩下

| 開始位置    | 結束位置 | 大小       |
| ----------- | -------- | ---------- |
| ~~0~~       | ~~100~~  | ~~100~~    |
| 150         | 350      | 200        |
| ~~400~~ 520 | 550      | ~~150~~ 30 |
| 600         | 850      | 250        |
| ~~900~~     | ~~950~~  | ~~50~~     |

P4 需要 150
200 的位置最適合
P4 的位置是 150~300
剩下

| 開始位置    | 結束位置 | 大小       |
| ----------- | -------- | ---------- |
| ~~0~~       | ~~100~~  | ~~100~~    |
| ~~150~~ 300 | 350      | ~~200~~ 50 |
| ~~400~~ 520 | 550      | ~~150~~ 30 |
| 600         | 850      | 250        |
| ~~900~~     | ~~950~~  | ~~50~~     |

P5 需要 50
300 的位置可以，300+50=350
所以 P5 的位置是 300~350
答案

|     | 開始位置 | 結束位置 | 大小 |
| --- | -------- | -------- | ---- |
| P1  | 400      | 520      | 120  |
| P2  | 0        | 100      | 100  |
| P3  | 900      | 950      | 50   |
| P4  | 150      | 300      | 150  |
| P5  | 300      | 350      | 50   |

##### 例題 2

![](https://i.imgur.com/A4SJZQr.png)

sol: （A）
best-fit

| block | 大小 | P1  | P2  | P3  | P4  |
| ----- | ---- | --- | --- | --- | --- |
| 佔了  |      | 540 | 230 | 50  | 109 |
| 1     | 300  | --- | --- | --- | --- |
| 2     | 270  | --- | 40  | --- | --- |
| 3     | 450  | --- | --- | --- | --- |
| 4     | 630  | 90  | --- | 40  | --- |
| 5     | 14   | --- | --- | --- | --- |
| 6     | 310  | --- | --- | --- | --- |
| 7     | 980  | --- | --- | --- | --- |
| 8     | 120  | --- | --- | --- | 11  |

a=4
b=2
c=4
d=8

sol: 我算出來是 14 耶 但沒這選項
worst-fit

| block | 大小 | P1  | P2  | P3  | P4  |
| ----- | ---- | --- | --- | --- | --- |
| 佔了  |      | 540 | 230 | 50  | 109 |
| 1     | 300  | --- | --- | --- | --- |
| 2     | 270  | --- | --- | --- | --- |
| 3     | 450  | --- | --- | 400 | --- |
| 4     | 630  | --- | 300 | --- | --- |
| 5     | 14   | --- | --- | --- | --- |
| 6     | 310  | --- | --- | --- | --- |
| 7     | 980  | 440 | --- | --- | 331 |
| 8     | 120  | --- | --- | --- | --- |

a=7
b=4
c=3
d=7

### 連續配置結論

比較

|           | 時間效益 | 空間利用度｜ |
| --------- | -------- | ------------ |
| first-fit | 優       | ≒ 優         |
| best-fit  | 差       | 優           |
| worst-fit | 差       | 差           |

first-fit 比較好

- 不論是哪一種，都會有 external fragmentation 發生
  - 在連續配置方法下，可能記憶體中所有 free block 的 size 總和>=process 需求大小，但是因為這些 free block 不連續，所以無法使用，造成 memory 的浪費
- 配置完所剩的極小的 free block 一樣會在 available list 裡面，會增加 searching time 和記錄成本

### Fragmentation

空間的浪費

1. External Fragmentation 外部斷裂
   - Variable-partition 會發生
   - 解決方法：
     - compaction
     - page memory management
2. Internal Fragmentation 內部斷裂
   - fix-partition 會發生

![](https://i.imgur.com/vXWD7d2.png)

### compaction

進行壓縮，定期清理 memory。
就是移動執行中的 process 使得非連續的 free block 可以聚集在一起，形成更大的 free block

![](https://i.imgur.com/H657tzS.png)

缺點：

- 需要各 process 為 Dynamic Binding 的支援，否則無法移動 process
- 很難有 Optimal Compaction

### 非連續的配置 - Segmentation

- user view
- logical address 分為 segement number（s）、offset(d)
- 利用 segment table
  - base
    - segment 在 physical address 起始位置
  - limit
    - segment 的長度（大小）
  - Segment-table base register (STBR)
    - segment table 的 physical address
  - Segment-table length register (STLR)
    - process 用了幾個 segment
    - segment number s < STLR 才是 legal 的
- 優點：
  - 可以配置不連續 physical memory
  - 沒有 internal Fragmentation
  - share memory 和 protection
- 缺點：
  - external fragmentation
  - 需要額外的硬體
  - 較多 memory access time

#### address translation

- 如何轉換
  1. 取得 segement number 之後
  2. 利用 segement table 去找到他的 base，就才可以計算起始位置
  3. 把 base+offset 才是真的起始位置
  4. 加上 limit 就是他在 physical address 結束位置

![](https://i.imgur.com/kILgtXa.png)

![](https://i.imgur.com/4fnHcSO.png)

### 非連續的配置 - page

- frames
  - 把 physical memory 分割成 fixed-sized blocks => 叫做 frames
- pages
  - 把 logical memory 按照一樣 size 切割 => 叫做 pages
  - page size = frame size
- 利用 page table，儲存 page、frame 關係
  - 一個 page 對應一個 frame
  - 在 os 裡面
  - 每一個 process 有自己的 page
- 優點：
  - 可以配置不連續 physical memory，
  - 沒有 external Fragmentation
  - share memory 和 protection
- 缺點：
  - internal fragmentation
    - 切得越小，可以減少 internal Fragmentation

#### address translation

- cpu 產生的 virtual address(logical address)可以被分成

  - page number(p)
    - 在第幾個 page
  - page offset(d)
    - 這個 page 的某一個位置

- 假設 logical address 是 2^m，page size 是 2^n，就可以得知下圖

![](https://i.imgur.com/t2dfvOs.png)

- 如何轉換
  1. 得到 page number 和 page offset 之後
  2. 去 page table 查詢 page number 對應的 frame number
  3. physical address = frame number + page offset

![](https://i.imgur.com/dIpepjJ.png)

![](https://i.imgur.com/f2eykDH.png)

##### 例題 3

![](https://i.imgur.com/sZaLpnq.png)

##### 例題 4

問題：
Given a computer system with a 52-bit virtual address, 4KB pages, and 4 bytes per page entry. Suppose that the maximum physical memory size is 512GB, and the system is byte-addressable. Let paging be implemented for the system. What is the number of bits for physical addresses, and what is the maximum number of pages for a process?

答案
a. 39
maximum physical memory size is 512GB
512GB = 2^9 \* 2^30 = 2^39 => 39 個 bit

b. 2^40
virtual address 是 52-bit
page-offset 的長度 => page-size 是 4KB = 2^12 bit
page-number 的長度 => 52-12 = 40
page 最大數是 2^40

### page 和 segmentation 比較

![](https://i.imgur.com/s10JTss.png)

### Page Table 實作

- PTBR

  - 存 page table 的 physical address
  - 存在 PCB （process control block）裡面
  - context-swich 會重新 load

- 當要讀 memory 的 data/instruction 其實是要 access 兩次

  - 一次是讀 page table
  - 一次是讀 data/instruction

- 解決兩次 access => fast-lookup hardware cache => associative memory 或是 translation look-aside buffers (TLBs)
  - TLB 存 page、frame
    ![](https://i.imgur.com/HUDozzJ.png)
  - 曾經查過的資料
  - 可以直接查詢全部
  - 很小、很貴
  - context-switch
    - TLB 全部清空，一般都用這個
    - 加上 process id

#### Paging Hardware With TLB

1. 先看 TLB 如果有(hit)，就可以直接去
2. 如果沒有 hit，就要去 page table 查詢
   ![](https://i.imgur.com/SRjFdpN.png)

Associative Lookup = 𝜀 time unit
Hit ratio = 𝛼
EffectiveAccessTime(EAT)= (1+𝜀)𝛼 + (2+𝜀) (1−𝛼) = 2+𝜀−𝛼

##### 例題 5

![](https://i.imgur.com/qqNTb4h.png)

### memory protection

- 在每一個 frame 都加上 protection bit
  - valid
  - invalid
- PTLR
  - 存 page table 的長度

![](https://i.imgur.com/vfzxOAw.png)

### share pages

- One copy of read-only (reentrant) code
  - library
  - 例如 text editors, compilers, window systems
- 可以不同的 logical address 但都指到相同的 physical address

![](https://i.imgur.com/ekwwZQy.png)

##### 例題 6

![](https://i.imgur.com/H8fGUqn.png)

23A01180
=>0010 0011 1010 0000 0001 0001 1000 0000

page-size 是 2^10，所以扣掉後面 10 個 bit，才是 page-number
=>00 1000 1110 1000 0000 0100
=>08E804

08E804 對應到的是 03A0117F
=>0000 0011 1010 0000 0001 0001 0111 1111

後面再加上 page-offset
=>+01 1000 0000
=>00 0000 1110 1000 0000 0100 0101 1111 1101 1000 0000
=> 0E8045FD80 就是 physical address

### Structure of the Page Table

把單一 page table 的 size 變小，比較好塞

- Hierarchical Page Tables
  - Two-Level Paging

##### Two-Level Paging

- 三次 memory access
- forward-mapped page table

![](https://i.imgur.com/uXgjgNx.png)

![](https://i.imgur.com/yda9F3H.png)

##### 例題 7 ????

![](https://i.imgur.com/n4ar3fQ.png)
