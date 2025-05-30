---
layout: post
title: "JavaScript var、let、const 差別 (下)"
date: 2024-06-29 00:00:00 +0800
categories: 前端開發
tags: ["JavaScript"]
mathjax: true
description: ""
redirect_from: 
  - "/posts/JavaScript-var-let-const-差別-(下)/"
---

上一篇 [JavaScript var、let、const 差別 (上)](/posts/JavaScript-var-let-const-差別-(上)/) 介紹了差別，這篇介紹一下實際運用的話，怎麼做會比較好

### Best Practice

#### 不要再用 var 來宣告變數，改用 let 與 const

在現代 JavaScript 編程中，建議避免使用 `var` 來宣告變數，改用 `let` 與 `const`。而且，優先使用 `const`，除非需要重新賦值才使用 `let`。

原因
1. `var` 的問題：
	- `var` 是函式作用域，容易造成變數提升（Hoisting）問題，使得程式碼行為不可預測。
	- `var` 允許重複宣告同一變數，可能導致意外的變數覆蓋和難以發現的錯誤。
	- `var` 變數在區塊內宣告後，可以在區塊外訪問，這會引發不可預期的問題。
2. `let` 的優勢：
	- `let` 是區塊作用域，僅在其所在的區塊內有效，能夠更好地控制變數的作用範圍。
	- `let` 變數在同一作用域內不能重複宣告，有助於避免變數覆蓋的問題。
	- `let` 支持變數提升，但在變數初始化之前不能使用，有效避免了暫時性死區（TDZ）問題。
3. `const` 的優勢：
	- `const` 與 `let` 一樣是區塊作用域，能夠更好地控制變數的作用範圍。
	- `const` 聲明的變數必須在聲明時初始化，且其值不能被重新賦值，這能確保變數的值在整個作用域內保持不變。
	- 優先使用 `const` 可以增加代碼的可讀性和可維護性，讓開發者明確哪些變數是常量，哪些變數會變動。

錯誤示範
使用 `var` 來宣告變數：

```js
var name = "Elaine";
var name = "Cindy"; // 重複宣告，會覆蓋之前的變數
console.log(name); // "Cindy"
```

正確示範
優先使用 `const` 和 `let` 來宣告變數：

```js
const name = "Elaine";
// name = "Cindy"; // 錯誤：`const` 宣告的變數不能重新賦值

let age = 30;
age = 31; // 正確：`let` 宣告的變數可以重新賦值
```

#### 不要使用逗號 `,` 在同一行來宣告多個變數或常數

```js
let a = 1, b = 2;
```

應該改為：

```js
let a = 1;
let b = 2;
```

原因
1. 可讀性：
	- 單行多變數宣告會使程式碼變得更難閱讀和理解。當變數數量較多時，這種方式會增加一行的複雜度，使得變數之間的關係不夠明確。
	- 將每個變數分行宣告可以讓程式碼更加清晰，易於維護。開發者能夠更快地識別每個變數的用途和賦值。

2. 易於 Debug：
	- 當程式碼中存在錯誤時，逐行宣告變數有助於快速定位問題。單行多變數宣告如果出現錯誤，可能會導致更難發現是哪一個變數導致了問題。
	- 分行宣告變數在除錯工具中更容易設置斷點，逐步檢查每個變數的值。
3. 避免潛在錯誤：
	- 單行多變數宣告在某些情況下可能會引發不易察覺的錯誤，特別是在進行複雜賦值時。例如：

	```js
	let x = 1, y = x + 1, z = y + 1;
	```
	
	上述代碼中，變數的賦值順序對結果有影響，這樣的寫法容易出錯並且不易察覺。分行宣告能夠清楚地表達每個變數的賦值過程：
	
	```js
	let x = 1;
	let y = x + 1;
	let z = y + 1;
	```

#### 宣告變數和常數離使用端越近越好

變數或常數不需要在區塊或函式的最上方宣告，而應該在第一次使用前的上一行宣告，這樣可以讓程式碼更容易閱讀和維護

原因
1. 可讀性：
	- 當變數或常數在首次使用前的上一行宣告時，可以讓程式碼更加直觀和易於理解。讀者可以直接看到變數的宣告與其使用的關聯，而不需要上下滾動尋找。
	- 這樣的宣告方式可以減少上下文切換，讓開發者能更快地掌握變數的用途和作用範圍。
2. 邏輯清晰：
	- 在變數或常數首次使用前的上一行進行宣告，可以更清楚地反映程式碼的邏輯順序。這樣的結構能夠明確地顯示每個變數或常數在何處初始化和使用，有助於理解程式的執行流程。
3. 減少錯誤：
	- 將變數或常數的宣告放置在離使用位置最近的地方，能減少變數作用域帶來的潛在問題。這樣可以避免因作用域不清晰而導致的變數覆蓋或未初始化錯誤。
	- 這種方式還有助於防止變數被意外重複使用或被錯誤地修改。
4. 維護方便：
	- 當變數或常數宣告的位置靠近其使用位置時，未來對程式碼進行修改或維護時更方便。開發者不需要在代碼中進行大量搜索就能找到變數的宣告和使用情況。
	- 這種宣告方式也使得程式碼更模組化，每個區塊或函式的邏輯更集中，方便獨立修改和測試。

例如：

```js
function calculateArea(radius) {
  const pi = 3.14159; // 變數宣告在函式最上方
  let area;

  // 其他程式碼
  // ...
    
  area = pi * radius * radius;
  return area;
}
```

應該改離使用端近一點，而且用 `const`

```js
function calculateArea(radius) {
  // 其他程式碼
  // ...

  const pi = 3.14159; // 在使用前一行宣告
  const area = pi * radius * radius; // 在使用前一行宣告
  return area;
}
```

#### 使用 `function` 宣告而非 `const` 宣告函式

在 `JavaScript` 中宣告函式時，建議使用 `function` 關鍵字，而不是 `const` 或 `let` 來宣告匿名函式。這樣可以提升程式碼的可讀性和一致性。

錯誤示範
使用 `const` 宣告匿名函式：

```js
const square = function(n) {
  return n * n;
};
console.log(square(5)); // 25
```

正確示範
使用 `function` 關鍵字宣告函式：

```js
function square(n) {
  return n * n;
}
console.log(square(5)); // 25
```

原因
1. 函式提升（Hoisting）：
	- 使用 `function` 宣告的函式會被提升（hoisted）到其作用域的頂部，這意味著可以在函式宣告之前使用它們。這有助於組織程式碼，使主要邏輯可以放在文件的開頭，細節實現放在後面。

	```js
	// 函式提升的例子
	console.log(square(5)); // 25

	function square(n) {
		return n * n;
	}
	```

2. 可讀性：
	- 使用 `function` 宣告函式，可以明確地區分出變數和函式。這使程式碼更加直觀，讓讀者能快速理解程式的結構和功能。
3. 一致性：
	- 使用 `function` 關鍵字來宣告函式，有助於保持程式碼風格的一致性。這對於大型專案或團隊合作尤為重要，有助於減少混淆和錯誤。
4. 靈活性：
	- 使用 `function` 宣告的函式可以在程式碼中任意搬動，而不影響其可用性。由於函式提升，無論函式宣告位於程式碼的哪個位置，都可以在宣告之前或之後使用。相比之下，使用 `const` 宣告的匿名函式只能在宣告之後使用。

	```js
	// 使用 function 宣告函式，隨處可用
	console.log(add(3, 4)); // 7

	function add(a, b) {
		return a + b;
	}

	// 函式可以任意搬動
	function multiply(a, b) {
		return a * b;
	}
	console.log(multiply(3, 4)); // 12
	```

	而使用 `const` 宣告的匿名函式，必須在宣告之後才能使用：

	```js
	// 使用 const 宣告匿名函式
	const subtract = function(a, b) {
		return a - b;
	};

	console.log(subtract(7, 4)); // 3
	```

#### 避免全局變數

全局變數會增加程式碼的耦合性，使得程式更難維護和調試。應該儘量將變數限制在其需要的作用域內。

```js
// 錯誤示範
var globalVar = "I am global!";

// 正確示範
function doSomething() {
  const localVar = "I am local!";
  console.log(localVar);
}
```

#### 開啟 `use strict` 嚴格模式

`use strict` 是一種用來啟用 `JavaScript` 嚴格模式的指令，它影響 `JavaScript` 的語法和運行行為，並強制遵循更嚴格的規則。這些規則在一定程度上影響了 `var`、`let` 和 `const` 的使用方式。以下是它們之間的一些具體關聯和影響：

##### 禁止未聲明變數
在嚴格模式下，不能使用未經聲明的變數。這意味著所有變數必須使用 `var`、`let` 或 `const` 明確聲明，否則會引發錯誤。

```js
'use strict';

x = 10; // ReferenceError: x is not defined
```

在非嚴格模式下，這樣的代碼會隱式地創建一個全局變數 x，但在嚴格模式下會引發錯誤，這促使開發者使用 `var`、`let` 或 `const` 來正確地聲明變數。

```js
'use strict';

let x = 10; // 正確
```
