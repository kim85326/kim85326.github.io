---
layout: post
title: "TypeScript Interface 介面"
date: 2018-10-07 00:00:00 +0800
categories: TypeScript
tags: JavaScript TypeScript
mathjax: true
---

TypeScript 的核心原則之一是對值所具有的結構進行類型檢查，它有時被稱做「鴨式辨型法」或「結構性子類型化」

### 什麼是 Duck Typing ? 弱型別

- 當看到一隻鳥走起來像鴨子、游泳起來像鴨子、叫起來也像鴨子，那麼這隻鳥就可以被稱為鴨子
- 白話 : 物件只要有該型別相同的 property 與 method，就算是該 class 型別
- 用於動態弱型別 script
- 執行階段檢查型別是否正確
- JavaScript、Ruby 屬於 Duck Typing

### 什麼是 Strong Typing? 強型別

- 由母鴨生產的鴨子，才算是鴨子
- 白話 : 物件必須透過 class 的 new 建立，物件才算是該 class 型別
- 用於強型別編譯語言
- 編譯階段檢查型別是否正確
- C++、Java、C# 屬於 Strong Typing

### object interface

```js
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

類型檢查器會查看 printLabel 的調用
printLabel 有一個參數，並要求這個對象參數有一個名為 label 類型為 string 的屬性
需要注意的是，我們傳入的對象參數實際上會包含很多屬性，但是編譯器只會檢查那些必需的屬性是否存在，並且其類型是否匹配

#### 若真的要傳入比 interface 還多 property 的物件，我該怎麼做 ?

- 使用 object 傳入

  ```js
  interface LabelledValue {
    label: string;
  }

  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
  }

  let myObj = { size: 10, label: "Size 10 Object" };
  printLabel(myObj);
  ```

  - 由於 excess property checks 只針對 object literal，因此改傳 object
  - 先將 object literal 指定給 myObj，再將 myObj 傳入 printLabel

- 使用 Type Assertion

  ```js
  interface LabelledValue {
      label: string;
  }

  function printLabel(labelledObj: LabelledValue) {
      console.log(labelledObj.label);
  }

  printLabel(<LabelledValue>{size: 10, label: "Size 10 Object"});

  ```

  - 先使用 type assertion 將 {size: 10, label: "Size 10 Object"} 轉型成 LabelledValue 型別，再傳入 printLabel()

- 使用 String Index Signature
  ```js
  interface LabelledValue {
    label: string;
    [propName: string]: any;
  }

  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
    console.log(labelledObj["size"]);
  }

  printLabel({ size: 10, label: "Size 10 Object" });
  ```
  - 前面兩種做法，基本上就是將多餘的 property 視而不見，目的只是為了避開編譯錯誤

### 可選屬性

interface 的屬性有時候不是全都是必須的，利用「?」代表非必要屬性

```
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

### 只可讀屬性 readonly

一些對象屬性只能在對象剛剛創建的時候修改其值
你可以在屬性名前用 readonly 來指定只讀屬性

```js
interface Point {
    readonly x: number;
    readonly y: number;
}
```

#### 該如何分辨 readonly 與 const ?

- readonly : 用於 property
- const : 用於 variable

### Function Interface

無論是 named function 或者是 anonymous function，都可以在參數與回傳值明確指定 type，讓編譯器幫我們做檢查，一但型別錯誤，編譯將會失敗。

```js
// named function
function add(x: number, y: number): number {
  return x + y;
}

// anonymous function
let myAdd: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};
```

如果不想指定類型，TypeScript 的類型系統會推斷出參數類型，所以這樣寫也是可以的

```js
let myAdd = function(x: number, y: number): number {
  return x + y;
};
```

### Index Interface

```js
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

共有支持兩種索引簽名：字符串和數字。可以同時使用兩種類型的索引，但是數字索引的返回值必須是字符串索引返回值類型的子類型。這是因為當使用 number 來索引時，JavaScript 會將它轉換成 string 然後再去索引對象。也就是說用 100（一個 number）去索引等同於使用"100"（一個 string）去索引，因此兩者需要保持一致

```js
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}
```

### Class Interface

要求 class 須具備哪些 public method 與 property 時，會使用 interface 特別定義

```js
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

### Constructor Interface 好難

Class interface 不會去定義 constructor 的 signature，但有時候自己寫 constructor function / factory method 建立物件時，基於依賴反轉原則，我們會希望 object 有我們期望的 signature，因此會定義出 constructor interface，要求 class 去實踐，且受 TypeScript 編譯器檢查

https://oomusou.io/typescript/interface/

### interface 繼承

- 和 class 一樣，interface 也可以相互繼承
- 由於 interface 可以繼承，甚至多重繼承，因此設計 interface 時，可以遵循「介面隔離原則」: 使用者不該使用用不到 method 的 interface ，將 interface 開的小小的，再根據需求去組合 interface，讓物件與物件之間的耦合達到最小

```
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

#### interface 繼承 class

- 當 interface 繼承 class 時，有兩個特色 :
  - 原 Class 原本的實作部分完全捨棄，只繼承 signature 部分
  - 原 Class 的 private 與 protected 部分也會一併被繼承保留

```js
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {

}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    select() { }
}

class Location {
}
```

```js
// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
  select() {}
}
```

- Image 沒有繼承 Control class，因此沒有 private state property，因此不符合 SeletableControl interface 的要求，TypeScript 編譯會報錯。

### 參考資料

- [TypeScript 官方文件 - 接口](https://www.tslang.cn/docs/handbook/interfaces.html)
- [深入探討 TypeScript 之 Interface](https://oomusou.io/typescript/interface/)
- [深入探討 TypeScript 之 Function](https://oomusou.io/typescript/function/)
