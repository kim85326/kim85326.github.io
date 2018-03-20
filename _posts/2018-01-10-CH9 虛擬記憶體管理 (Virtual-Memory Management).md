---
layout: post
title: "CH9 虛擬記憶體管理 (Virtual-Memory Management)"
date: 2018-01-10 00:00:00 +0800
categories: 作業系統
tags: OS 作業系統
excerpt: .
mathjax: true
---

* Virtual memory – separation of user logical memory from physical memory
    * large process
        * logical address space 可以大過 physical address space
    * 增加cpu/resources 使用率
    * 簡單programming
        * More programs running concurrently
    * faster
        * Less I/O needed to load or swap processes
* Virtual memory 實現
    * Demand paging
    * Demand segmentation

![](https://i.imgur.com/FC4uvDV.png)

### demand paging
* 需要page才把他放進memory
    * Less I/O needed, no unnecessary I/O
        * Faster response
    * Less memory needed
        * More users
* Page is needed => reference to it
    * invalid reference => abort
    * not-in-memory => bring to memory
* Lazy swapper : never swaps a page into memory unless page will be needed
    * Swapper 以pages為單位，不是以process

![](https://i.imgur.com/SM8IE8Q.png)

* 利用 Valid-Invalid Bit 知道到底有沒有用
    * v : in-memory
    * i : not-in-memory
    
![](https://i.imgur.com/82YC1iP.png)

* 如果是bit的值是i就叫做page fault

### page fault
當有些pages不在main memory時

* 處理方式：
    0. 該page在page table的Valid-Invalid Bit為invalid，發出trap給os
    1. os會去看另外一張table（internal table）決定
        * invalid reference => abort
        * just not in memory => 繼續
    2. 找到空的frame
    3. 將page從disk swap in 進 memory
    4. reset table，把validation bit 改為 v
    5. restart instruction

![](https://i.imgur.com/s6xq8AN.png)

* Hardware support needed for demand paging
    * Page table with valid / invalid bit
    * Secondary memory (swap device with swap space) 
    * Instruction restart

#### Performance of Demand Paging
* Page Fault Rate : 0<=p<1
* EAT = 1 – 𝑝 × memory access+ 𝑝 (page fault overhead+ swap page out+ swap page in+ restart overhead)
* 如何減少PageFaultRate
    * Page Replacement Algorithm
    * Number of frame
    * Page Size
    * Program Structure

##### 例題

![](https://i.imgur.com/cpuSUP1.png)

### copy-on-write

我不記得老師有說耶..?

fork時並不複製資料分頁，直到寫入時才複製

### Page Replacement
* 當沒有free frame的時候，就要做Page Replacement
    * 把找一些沒用的page swap out(踢出去)
    * 檢查 modify bit
* modify（dirty） bit
    * 在memory時有沒有被修改過
    * 如果沒被修改過，可以直接被踢掉（因為disk本來就有一模一樣的）

![](https://i.imgur.com/lW3NzSq.png)

* 處理方式：
    1. 找到造成page fault的page在disk的哪裡
    2. 找到空的frame
        * 如果是空的就直接使用
        * 如果不是空的，就要page replacement演算法來挑選victim frame
            * 如果找到dirty的就踢掉他
    3. 將page從disk swap in 進 memory
    4. reset table，把validation bit 改為 v
    5. restart instruction

![](https://i.imgur.com/r6dK9Ja.png)

兩個問題
* frame-allocation algorithm
    * 先每個process有多少frame可以用
    * 哪些frames可以用
* Page-replacement algorithm
    * 想要最低 page-fault rate on both first access and re-access


### FIFO 演算法 （先來先被踢）

![](https://i.imgur.com/h1I2mjn.png)

* 會發生15次 page faults
* page fault ratio = 15/20 = 75%

##### anomaly 奇怪的現象
當增加frame數量的話，原本以為page fault會減少，但事實上有可能會增加

![](https://i.imgur.com/oTkiee4.png)

### Optimal 演算法 (最晚被用到的先被踢)

![](https://i.imgur.com/yx46n0L.png)

* 會發生9次 page faults
* 但是有一個問題，你不能預知未來...
* 但但是我們可以拿其他的跟最佳做比較，知道哪個最接近

### Least Recently Used (LRU) 演算法 (最久不被用到的先被踢)

![](https://i.imgur.com/9FlR1qU.png)

* 會發生12次 page faults
* 比FIFO好，但比optimal差
* LRU and OPT 都是 stack algorithms，不會出現Belady’s Anomaly

##### LRU 實現
由於很少電腦能夠提供足夠的硬體來支援真正的LRU頁替換，而LRU近似換頁法是一種以「參考位元」的方式來執行分頁替換的方法，利用參考位元來記錄過去使用過哪些分頁；雖然無法知道被使用的先後次序，但知道哪些被使用過而哪些還沒被使用。這種部分排班資訊可使許多分頁替換演算法盡量接近LRU替換法。
* counter implementation
    * LFU Algorithm（count最小，最少被使用就把它踢掉）
    * MFU Algorithm（count最大，最常被使用就把它踢掉）
    * Search through table needed
    * 比較貴
    * 不太接近opt
* stack implementation
    * ![](https://i.imgur.com/3O5EVBn.png)
    * move it to the top
    * requires 6 pointers to be changed
    * 但是每次update就越貴

### LRU stack implementation

* 利用一個reference bit記錄
    * 初始值為0
    * page被referenced就設為1
    * Replace any with reference bit = 0 (if one exists)
        * We do not know the order, however
    
#### Second-chance algorithm

![](https://i.imgur.com/cCyzNBH.png)

* 如果 reference bit = 0
    * replace 他
* 如果 reference bit = 1
    * 把他設為0，但是把他留下來
    * replace 下一個page

#### Enhanced Second-Chance

![](https://i.imgur.com/AkgkQ7s.png)

##### 例題 (還沒寫喔！！！)

![](https://i.imgur.com/rLx3cl2.png)


