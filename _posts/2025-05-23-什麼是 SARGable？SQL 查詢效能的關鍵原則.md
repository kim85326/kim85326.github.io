---
layout: post
title: "什麼是 SARGable？SQL 查詢效能的關鍵原則"
date: 2025-05-23 10:00:00 +0800
categories: 後端技術
tags: ["資料庫", "SQL"]
mathjax: true
description: ""
---

最近幫 Team member 做 Technical Review 的時候，聊到 SQL best practice，其中就有談到「SARGable」，我發現自己不是很會解釋這個詞，所以就想寫一篇文章來紀念一下我的學習

### SARGable 是什麼？

SARGable 是 **Search ARGument able** 的縮寫，意思是「查詢條件能使用搜尋參數」

簡單來說：  
> **SARGable 的條件可以讓資料庫使用索引，加速查詢**

如果條件是 SARGable 的，資料庫引擎就能利用 B-Tree 等索引直接定位資料
反之資料庫就只能一筆筆掃（Table Scan）

### 什麼樣的查詢是 SARGable？

這些查詢條件能善用索引，是 SARGable 的範例：

```sql
SELECT * FROM Users WHERE age = 30;

SELECT * FROM Orders WHERE created_at >= '2025-01-01';

SELECT * FROM Products WHERE name LIKE 'junelson%';
```

只要條件是「直接比對欄位值」，而非讓欄位經過運算或函數處理，資料庫就能用索引篩資料

### 非 SARGable 的查詢

如果你在 WHERE 子句中對欄位做了運算、函數、轉型或模糊查詢開頭有 %，就會破壞索引使用，導致效能變差：

```sql
-- ❌ 函數包欄位
SELECT * FROM Users WHERE YEAR(birthday) = 2000;

-- ❌ 欄位經過算式
SELECT * FROM Orders WHERE price * 1.05 > 1000;

-- ❌ 模糊查詢開頭有萬用字元
SELECT * FROM Products WHERE name LIKE '%junelson';
```

### 改寫技巧：讓查詢變 SARGable

| ❌ 不建議寫法              | ✅ 建議寫法                                                  |
|---------------------------|---------------------------------------------------------------|
| `YEAR(birthday) = 2000`   | `birthday >= '2000-01-01' AND birthday < '2001-01-01'`        |
| `price * 1.05 > 1000`     | `price > 1000 / 1.05`                                         |
| `LIKE '%junelson'`           | 改用全文檢索（Full-Text Search, FTS），或設計為 `LIKE 'junelson%'`    |


### 那些 NOT、!=、<> 是 SARGable 嗎？

這些「非」條件（negation conditions）有些其實是可以 SARGable 的，有些則會導致效能變差，要看具體寫法與使用情境

| 條件             | 是否 SARGable | 說明                                                                 |
|------------------|----------------|----------------------------------------------------------------------|
| `!=` 或 `<>`      | ⚠️ 有機會        | SQL Server 可能會用 `Index Seek + Predicate`，但仍可能導致效能下降     |
| `!>` / `!<`      | ⚠️ 極少見        | 這是 `<=` / `>=` 的另一種寫法，雖語法合法，但不常見，也視實際查詢計劃而定  |
| `NOT IN`         | ❌ 通常不會      | 特別是子查詢結果包含 NULL 時，索引會失效，常轉成 Table Scan             |
| `NOT LIKE '%x'`  | ❌ 效能差        | 和 `LIKE '%x'` 一樣，無法使用 B-tree 索引，只能 Table Scan               |
| `NOT BETWEEN`    | ⚠️ 有機會        | 視實際資料範圍與索引選擇，有可能還是會使用 Index Seek                    |

```sql
-- 有機會使用索引，但效率未必高
SELECT * FROM Users WHERE status != 'inactive';

-- 容易失效的查詢（特別是 NOT IN）
SELECT * FROM Users WHERE email NOT IN (SELECT email FROM Blacklist);

-- 非常慢：NOT LIKE 開頭有萬用字元
SELECT * FROM Products WHERE name NOT LIKE '%junelson';
```

#### 小提示：能不能 SARGable，最終還是要看實際查詢計畫（Execution Plan）  

有些 `NOT` 條件雖然語法沒錯，但資料庫會選擇最保守的 Table Scan

### 建議：用白名單（Positive condition）取代黑名單（Negative condition）

例如：

```sql
-- ❌ 黑名單寫法：效能差
WHERE status NOT IN ('inactive', 'deleted')

-- ✅ 白名單寫法：效能佳
WHERE status IN ('active', 'pending')
```

這樣寫邏輯上更清楚，也比較容易觸發索引使用

### 怎麼知道有沒有用到索引？

打開實際執行計劃（Actual Execution Plan）

在 SSMS (SQL Server Management Studio) 中：
	•	按下 Ctrl + M（或點選工具列的「Include Actual Execution Plan」）
	•	然後執行你的查詢
	•	查詢下方會多一個「Execution Plan」頁籤

看結果中是否出現 `Index Seek`（代表有使用索引）或 `Table Scan`（代表整張掃）

| 圖示類型       | 說明                   | 表示什麼                         |
|----------------|------------------------|----------------------------------|
| **Index Seek** | 索引查找（最有效）        | ✅ 有用到索引，效率好              |
| **Index Scan** | 掃描整個索引（次佳）      | ⚠️ 索引有用，但範圍太大            |
| **Table Scan** | 掃描整張表（最差）        | ❌ 沒有用索引，效能可能很差        |
