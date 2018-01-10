---
layout: post
title: "CH11、12 檔案系統實現、大量儲存系統 (File System 和 Mass-Storage Systems)"
date: 2018-01-11 00:00:01 +0800
categories: OperatingSystem
tags: OS OperatingSystem
excerpt: .
mathjax: true
---


# File System Implementation

### Allocation Methods

* Contiguous allocation
* Linked allocation
* Indexed allocation

### Contiguous allocation

![](https://i.imgur.com/wnmaUAZ.png)

* 優點：
    * 簡單，只需要start和length
* 缺點：
    * external fragmentation
    * files 不能再變大

#### Extent-Based Systems
為了解決Contiguous allocation的external fragmentation問題
* Contiguous + link 的做法
    * 有start，length，還有pointer to next extent
* 缺點：
    * 不能隨機access，一定按照順序
    
### Linked allocation
全部用link

![](https://i.imgur.com/kljU16z.png)

* 優點：
    * file的大小不被限制
    * 簡單，利用start、end
    * 資源使用率高，只要有空間就可以用，沒有external fragmentation
* 缺點：
    * 如果是 sequential access 那還可以，但direct access就會浪費，因為一直在搜尋前面的pointer，重複搜尋
    * 但是每個block裡面都要有pointer，浪費空間
    * Reliability，只要一個pointer不見了，整個壞掉了

![](https://i.imgur.com/OMlTapc.png)


### Indexed allocation
用一個index block存所有pointer（以array的形式）
只要存index block就好

![](https://i.imgur.com/qIszW2v.png)

* 優點：
    * direct access一次就可以找到位置，sequential也不會有問題
    * 沒有external fragmentation，只要空的就可以使用
* 缺點：
    * 浪費空間，多一個index block
    * index block可能會internal fragmentation
    * 如果block太多，可能會超過一個index block可以儲存的，就需要多個index block來存

###  Indexed Allocation – Mapping

1. Indexed + link 

![](https://i.imgur.com/LYRm5ms.png)

2. hybrid
* 檔案很大就需要這種方式，但浪費空間

![](https://i.imgur.com/m8YcfmT.png)



# ch12 Mass-Storage Systems

### Disk Scheduling
disk access time 分為
* seek time
    * 移動磁頭cylinder，往前往後
* rotational time
    * 旋轉disk找到sector
* read time
    * tranfer time


降低 seek time 的排程
* Seektime 約= seekdistance
* First-come, first served (FCFS)
* Shortest-seek-time-first (SSTF) 
* SCAN and C-SCAN
* LOOK and C-LOOK


### FCFS
* 按照track number先來順序進行讀取

![](https://i.imgur.com/ehPesrz.png)

### SSTF
* 移動到離最近的下一個距離
* 會有starvation

![](https://i.imgur.com/CFoEXEv.png)


### SCAN
* 先往一邊走，到底在往另一邊走

![](https://i.imgur.com/0t3F2Yo.png)


### C-SCAN
* 為了要公平 等待時間
* 先往一邊走，走到底之後，直接移到另外一邊的底，從另外一邊的底開始走

![](https://i.imgur.com/jGn4vNd.png)

### C-LOOK
* look不會走到底，會看queue裡最邊邊的

![](https://i.imgur.com/NzYeZFh.png)
