---
layout: post
title: "CH10 檔案系統 (File System)"
date: 2018-01-10 13:00:00 +0800
categories: 作業系統
tags: ["作業系統"]
mathjax: true
description: ""
redirect_from: 
  - "/2018/01/10/CH10-檔案系統-(File-System)/"
---

### File Attributes 檔案特性

使檔案在存取的時候更加方便，且更易管理

- Name
  - 符號式的檔名是唯一用人看得懂的格式儲存
- Identifier
  - 獨一無二的 tag (number)，用來辨識檔案系統內的檔案（人類不可讀）
- Type
  - 這項資訊對於提供不同檔案型態的系統有需要
- Location
  - 一個指標指向該檔案所在裝置的位置
- Size
  - 檔案大小（以字元、位元組為單位）
- Protection
  - 存取控制資訊，控制誰能讀、寫、執行等資料
- Time, date, and user identification
  - 這項資訊可以保存產生上次修改和上次使用資料，以作為保護、安全、以及使用監督
- 這些資訊都存在 disk 上的 directory structure

![](/assets/img/posts/cJS5dPD.png)

### File Operations 檔案運作

使用者透過系統呼叫來完成檔案存取

- File 是一個 抽象資料型態 abstract data type
- Create
  - 建立檔案
- Write
  - 寫入檔案
- Read
  - 讀取檔案
- Reposition within file - seek
  - 重置檔案
  - 搜尋目錄以找到相關的進入點，然後把目前檔案位置設成某一固定值，也稱為檔案搜尋
- Delete
  - 刪除檔案
- Truncate
  - 縮減檔案
  - 使用者可以使用此功能使檔案特性保持不變（除了檔案長度），但檔案恢復為長度 0
- Open(𝑭𝒊)
  - search the directory structure on disk for entry 𝐹\$, and move the content of entry to memory
- Close (𝑭𝒊)
  - move the content of entry 𝐹\$ in memory to directory structure on disk

### open files

而對於每一個開啟的檔案也都有以下相關的資訊

1. open file table
   - tracks open files
2. file pointer
   - 對於 read 和 write 系統呼叫沒有包含檔案位移的系統而言，他們必須追蹤上一次讀/寫的位置，作為目前檔案位置的指標
3. file-open count
   - 檔案開啟計數器紀錄開啟和關閉的次數，在最後一個關閉動作時就變成 0。系統就可以把該黨的進入點從表格移去
4. disk locatiom
   - 檔案在 disk 位置存放在記憶體中，以免每一次操作都必須要從 disk 讀出
5. access right
   - process 以一種存取模式開啟檔案，這個資訊會被存放在 process table 中，所以作業系統可允許或拒絕輸入/輸出的需求

### Open File Locking

- 作業系統和檔案系統提供
  - 類似 reader-writer locks
  - shared lock 近似 reader lock
    - 多個 processes 可以同時獲得
  - exclusive lock 近似於 writer lock
- mandatory 強制性
  - 如果持有 lock 且要求，access 會被拒絕
- advisory 諮詢
  - process 可以找到 lock 的 status，再決定做什麼

### 檔案型態

![](/assets/img/posts/WdW92cD.png)

### file structure

檔案型態也可以用來指出檔案的內部結構。原始檔和目的檔的結構正符合讀取它們的程式之要求。進一步而言，有些檔案必須符合一定的結構，作業系統才能夠瞭解其內容。作業系統可能會要求一個可執行檔有一定的結構，以便決定將檔案載入到記憶體的什麼地方，以及第一個指令的位置。有些作業系統將此觀念延伸到一組系統支援的檔案結構，對於這些檔案結構都有特殊的操作來處理這些檔案。

### access method

- sequential access

  - 最簡單的存取方法。檔案中的資訊是依著記錄次序一筆接著一筆處理的，這也是至今最通用的檔案存取模式。

    ![](/assets/img/posts/W4i7qDU.png)

- direct access

  - 檔案是由固定長度的邏輯記錄（logical record）所組成，這可以讓程式不必以一定的順序，快速地讀寫記錄
  - 直接存取方法是以檔案存放在磁碟上的模式為基礎，因為磁碟允許隨機存取任何檔案區段
  - 為了要直接存取，檔案被視為一串編有號碼的區段或記錄。

    ![](/assets/img/posts/ucmCBkZ.png)

    - n = relative block number
    - Relative block numbers allow OS to decide where file should be placed

![](/assets/img/posts/L5E5WSf.png)

- 其他 access
  - 其它的存取方法以建立在一個直接存取方法的基礎上
  - 例如 index

![](/assets/img/posts/2Iqrgeh.png)

### Directory Structure

![](/assets/img/posts/nxKzNNA.png)

- directory structure 和 files 都被存在 disk

- disk 可以被細分成 partitions
- disk 或 partitions 可以被 RAID 進行 protect 來防止 failure
- disk 或 partitions 可以被稱為 minidisks 或 slices，根據有沒有檔案系統可以分為
  - raw
    - 例如 database
  - formatted
    - 格式化成檔案系統
    - 叫做 volume （可以想成 c 槽 d 槽）

### Directory Operations 目錄操作

- search for a file
- Create a file
- Delete a file
- List a directory
  - 很浪費時間
- Rename a file
- Traverse the file system

### single-level directory

最簡單的目錄結構就是單層目錄。所有的檔案都裝在同一目錄中，非常容易瞭解與使用。

![](/assets/img/posts/JnabOH1.png)

問題：

- 同一個資料夾下的名字是獨一無二的
- 沒有效率，因為一次要列出所有檔案

### Two-Level Directory

雙層目錄結構中，每個使用者擁有自己的使用者檔案目錄（user file directory, UFD）。每個 UFD 都有一個相似的結構，但是只列出單一使用者的檔案。當一個使用者的任務開始了或是一個使用者簽到（login）之後，系統的主檔案目錄（master file directory, MFD）就被搜尋一遍。主檔案目錄是用使用者姓名或是帳號來索引，並且其中每單元都指向一個使用者的使用者檔案目錄

![](/assets/img/posts/od8EiQb.png)

- 以 user 分資料夾

### Tree-Structured Directories

把雙層目錄視為一棵二階的樹，由目錄結構發展成一棵任何型式的樹自然產生了樹狀目錄。這將允許使用者去建立他們自己的副目錄，並且可以適當地組合他們的檔案。樹是最常見的目錄結構。樹有一個根部目錄，在此系統中的每一個檔案都有一個單獨的路徑名稱。

![](/assets/img/posts/bUANxdA.png)

- 有效的 search
- grouping capability
- 目前 directory (work directory)
  - cd /spell/mail/prog
  - type list
- 絕對路徑、相對路徑
- 在當前資料夾 create a new file
- delete a file
  - 只要寫 rm <file-name>
- 在當前資料夾 create 子資料夾
  - mkdir <dir-name>

### Acyclic-Graph Directories 非循環圖型目錄

- 一個非循環圖型（acyclic graph）則允許目錄中的副目錄或檔案被共用，透過 links
  - Symbolic link
    - 捷徑
  - Hard link
    - 複製所有檔案訊息
- 相同的檔案或子目錄可以在兩個不同的目錄中
- 非循環式圖型是樹狀結構目錄法的自然發展結果
- 如果資料夾被刪除 list => dandling pointer
  - 解決方法
    - 利用 reference counters，如果為 0 就刪除
    - Backpointers, so we can delete all pointers Variable size records a problem
    - Backpointers using a daisy chain organization
    - Entry-hold-count solution

![](/assets/img/posts/IU0eb50.png)

### 一般 General Graph Directory

使用非循環圖型結構時最嚴重的問題就是如何保證沒有循環存在。
如果以雙層目錄開始，並且允許使用者建立子目錄，一個樹狀結構的目錄就形成了。
很容易看出來加入新的檔案和子目錄到現有的樹狀目錄上仍可保持它的樹狀結構特性。
但是，當將鏈加到現有樹狀結構的目錄上時，樹狀結構就被破壞了，造成了一個一般圖型結構。

- 可能會有 cycle
- 如何保證沒有 cycle
  - 只允許 links，而不是子目錄
  - Garbage collection
    - 從 root 開始 traverse 下來，看可不可以到
  - 每次加入新的 link 時候，使用 cycle detection algorithm 去決定是否 ok

![](/assets/img/posts/Lj6bPqc.png)

### File System Mounting

正如同一個檔案必須先開啟才可以使用，一個檔案系統必須先安裝才可以被系統的行程取得。更特別的是，目錄系統可以由許多分割區建立起來，此種目錄必須被安裝才可以讓它們在檔案系統的命名空間中被取得。

![](/assets/img/posts/g9KJy7x.png)

### file sharing

##### 多使用者

當作業系統容納多位使用者時，檔案分享、檔案命名和檔案保護等事項變得很重要。對於檔案可以被使用者分享的目錄，系統必須調解檔案的分享。在預設情況下，系統可以允許使用者存取其它使用者的檔案，或是它可能要求使用者獲得該檔案的存取權。

- user IDs
- group IDs

### protection

### access lists and groups

- access 分成三種模式
  - read
  - write
  - execute

![](/assets/img/posts/QJ3CyOF.png)

![](/assets/img/posts/laGWTfW.png)
