---
layout: post
title: "JavaScript 核心筆記"
date: 2019-09-09 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
---

### JavaScript 是如何運行的

![](https://i.imgur.com/qqppxdt.png)

- 程式語言

  1. 直譯語言
  2. 編譯語言

- JavaScript 是直譯語言

  - 直譯過程
    1. token 詞法分析
    2. tree 語法分析
    3. syntax 代碼生成
  - 協助了解工具
    - [Esprima](https://esprima.org/demo/parse.html)

- JavaScript 引擎

  - RHS
    - right-hand side
    - 查找變數值
    - 如果 RHS 查詢在所有作用域中無法找到變量，引擎就會拋出 `ReferenceError 異常`
    - 如果 RHS 查詢查找到變量，但是對其進行不合理的操作，如對非函數類型調用、查找 `undefined` 或 `null` 類型的屬性，則會拋出 `TypeError`
  - LHS

    - left-hand side
    - 將值賦予變數
    - 如果 LHS 查詢在所有作用域中無法找到變量，在非嚴格模式下會創造一個具有該名稱的變量

      ```js
      myName = "elaine"; // "elaine"
      ```

      ```js
      "use strict";
      myName = "elaine"; // Uncaught ReferenceError: myName is not defined
      ```

- 作用域

  - 靜態作用域
    - 語法作用域
    - 語法解析的時候就已經確定作用域了，且不會再改變
  - 動態作用域
    - 作用域在函式調用時才決定作用域

- JavaScript 為靜態作用域

  ![](https://i.imgur.com/Ck9xeFg.png)

### 執行環境

- 函式被呼叫時會產生獨立的執行環境
- 執行環境限制作用域
- 全域執行環境

  - 瀏覽器 => `window` => `this = window`
  - node => `global` => `this = global`

- execution stack 執行堆疊

### 範圍鏈 Scope Chain

- 查找規則
  1. 引擎從當前的執行作用域開始查找變量，如果找不到，就會向上一層繼續查找
  2. 當找到最外層的全域作用域時，仍未找到則會停止查找
- 範圍鏈和執行環境沒有關係，是語法解析的時候就確定了

### 提升 Hoisting

- 執行環境

  1. 創造環境
  2. 執行

- 函式在創造階段，就會優先載入

  ![](https://i.imgur.com/xmzRrD7.png)

  ```js
  // 執行
  callName(); // 可以正常運行

  // 創造階段
  function callName() {
    console.log("hi elaine");
  }
  ```

  ```js
  callName(); // Uncaught TypeError: callName is not a function

  var callName = function() {
    // 因為創造階段 callName = undefined
    console.log("hi elaine");
  };
  ```

- 猜猜看 r

  1.  ```js
      callName();
      function callName() {
        console.log(Ming);
      }
      var Ming = "小明";
      ```

      ```js
      // 創造階段
      function callName() {
        console.log(Ming); // undefined
      }
      var Ming;

      // 執行
      callName();
      Ming = "小明";
      ```

  2.  ```js
      function callName() {
        console.log(Ming);
      }
      var Ming = "小明";
      callName();
      ```

      ```js
      // 創造階段
      function callName() {
        console.log(Ming); // "小明"
      }
      var Ming;

      // 執行
      Ming = "小明";
      callName();
      ```

### undefined 與 not defined

### Garbage Collection 記憶體回收機制

- 如果一個物件不在被任何物件參考，它將被視為可回收記憶體的垃圾
- 將「這個物件再也不會被使用」的定義縮減到「這個物件不可到達」

### 執行緒與同步、非同步

- JavaScript 是單執行緒
- 非同步
  - 把非同步放到 event queue
  - 等同步執行完，才會去 event queue 找

### 陳述式、表達式

- statement 陳述式
- expression 表達式
  - 會回傳結果

```js
// Function Statement
function greeting() {
  console.log("Hi");
}

// Function Expression
var SayHello = function() {
  console.log("Hello");
};
```

### ASI

- automatic semicolon insertion
- 自動插入分號
- 「不會」發生 ASI 的規則：

  1. 新的一行是 `(`、`[`、`/` 開始 (容易出錯的地方)

     ```js
     var a = 1;
     var b = a(
       // Uncaught TypeError: a is not a function
       a + b
     ).toString();
     ```

     ```js
     (function() {})()(
       // Uncaught TypeError: (intermediate value)(...) is not a function
       function() {}
     )();
     ```

     ```js
     var a = 1
     var b = a
     /test/.test(b)    // Uncaught SyntaxError: Unexpected token .
     ```

  2. 新的一行以 `+`、`-`、`*`、`/`、`%` 作開始 (會影響執行結果)

     ```js
     var a = 2;
     var b = a + a;

     console.log(a); // 2
     console.log(b); // 4
     ```

  3. 新的一行以 `,`、`.` 作開始 (需注意執行結果)

     ```js
     var a = 2;
     var b = a.toString();
     console.log(typeof b); // "string"
     ```

     ```js
     var a = 1,
       b = 2; // b 一樣會 var 被宣告
     ```

- 因此，遇到以上的標點符號前方加入分號也是解決辦法

```js
// 執行錯誤
(function() {})()(function() {})();

// 正確
(function() {})();
(function() {})();
```

### 動態型別

- JavaScript 是動態型別
- 型態轉換

  - 顯性轉換

    ```js
    var a = 1;
    console.log(typeof a); // "number"
    a = "我是豬";
    console.log(typeof a); // "string"
    ```

  - 隱性轉換

    ```js
    var a = 1;
    console.log(a, typeof a); // 1, "number"
    a = a + "";
    console.log(a, typeof a); // "1", "string"
    a = a * 3;
    console.log(a, typeof a); // 3, "number"
    ```

### 原始型別、物件型別

- 原始型別
  - Boolean
  - Null
  - Undefined
  - Number
  - String
  - BigInt
  - Symbol

```js
var a = true;
console.log(typeof a); // boolean
var b = null;
console.log(typeof b); // object
var c;
console.log(typeof c); // undefined
var d = 1;
console.log(typeof d); // number
var e = "文字";
console.log(typeof e); // string
var f = {};
console.log(typeof f); // object
var g = [];
console.log(typeof g); // object

var h = new String("包裹物件");
console.log(typeof h); // object
```

### 優先性、相依性

- 優先性
  - 決定運算子執行順序
  - [MDN - 運算子優先序](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- 相依性
  - 決定運算方向

```js
var b = {};
Object.defineProperty(b, "a", {
  value: 2,
  writable: false,
});
b.a = 3;
console.log(b.a); // 2

var a = 4;
a = b.a = 1;
console.log(a); // 1
console.log(b.a); // 2
```

### 相等

- 嚴格相等

  - `===`
  - 判斷`值`與`型別`是否相同

    ```js
    console.log(1 === "1"); // false
    console.log(1 === 1); // true

    // 例外
    console.log(NaN === NaN); // false
    console.log(+0 === -0); // true
    ```

- 寬鬆相等

  - `==`
  - `boolean` 或 `string` 會先轉為 `number`

    ```js
    console.log(Number("1")); // 1
    console.log(1 == "1"); // true
    console.log(Number("0x11")); // 17
    console.log(17 == "0x11"); // true

    console.log(Number("true")); // NaN
    console.log(1 == "true"); // false
    ```

    ```js
    console.log(Number(true)); // 1
    console.log(true === "1"); // true
    console.log(Number(false)); // 0
    console.log(false === "1"); // false
    ```

  - `null` 與 `undefined` 不會先轉為 `number`

    ```js
    console.log(Number(null)); // 0
    console.log(Number(undefined)); // NaN

    console.log(null == 0); // false
    console.log(undefined == 0); // false
    console.log(null == undefined); // true
    ```

  - `object` 與 `非 object` 比較時，`object` 會以`包裹物件`來做轉換

    ```js
    console.log(Number([10])); // 10
    console.log(10 == [10]); // true
    console.log(String(["A"])); // "A"
    console.log("A" == ["A"]); // true
    console.log(String({ a: "a" })); // "[object Object]"
    console.log("[object Object]" == { a: "a" }); // true
    ```

  - `object` 與 `object` 比較，會比較`參考位置`

    ```js
    console.log({} == {}); // false
    console.log([] == []); // false

    var a = [];
    var b = a;
    console.log(a == b); // true
    console.log(a === b); // true
    ```

### Truthy、Falsy

- `boolean`

  ```js
  console.log(Boolean(true)); // true
  console.log(Boolean(false)); // false
  ```

- `number` 只有 `0`、`+0`、`-0`、`NaN` 是 `false`

  ```js
  console.log(Boolean(1)); // true
  console.log(Boolean(-1)); // true

  console.log(Boolean(0)); // false
  console.log(Boolean(+0)); // false
  console.log(Boolean(-0)); // false
  console.log(Boolean(NaN)); // false
  ```

- `string` 只有 `""` 是 `false`

  ```js
  console.log(Boolean("true")); // true
  console.log(Boolean("false")); // true

  console.log(Boolean("1")); // true
  console.log(Boolean("0")); // true
  console.log(Boolean("-1")); // true

  console.log(Boolean("")); // false
  console.log(Boolean("   ")); // true
  ```

- `null`、`undefined` 都是 `false`

  ```js
  console.log(Boolean(null)); // false
  console.log(Boolean(undefined)); // false
  ```

- `Infinity`、`-Infinity` 都是 `true`

  ```js
  console.log(Boolean(Infinity)); // true
  console.log(Boolean(-Infinity)); // true
  ```

- `[]`、`{}` 都是 `true`

  ```js
  console.log(Boolean({})); // true
  console.log(Boolean([])); // true
  console.log(Boolean([[]])); // true
  console.log(Boolean([0])); // true
  console.log(Boolean([1])); // true
  ```

- `object` 都是 `true`
  ```js
  console.log(Boolean(new Number(0))); // true
  console.log(Boolean(new Boolean(false))); // true
  ```

### 邏輯運算子

- `&&`

  - `expr1 && expr2`
  - 若 `expr1` 為 `false`，回傳 `expr1`，否則為 `expr2`

    ```js
    console.log(true && true); // t && t returns true
    console.log(true && false); // t && f returns false
    console.log(false && true); // f && t returns false
    console.log(false && 3 == 4); // f && f returns false
    console.log("Cat" && "Dog"); // t && t returns "Dog"
    console.log(false && "Cat"); // f && t returns false
    console.log("Cat" && false); // t && f returns false
    console.log("" && false); // f && f returns ""
    console.log(false && ""); // f && f returns false
    ```

- `||`

  - `expr1 || expr2`
  - 若 `expr1` 為 `true`，回傳 `expr1`，否則為 `expr2`

    ```js
    console.log(true || true); // t || t returns true
    console.log(false || true); // f || t returns true
    console.log(true || false); // t || f returns true
    console.log(false || 3 == 4); // f || f returns false
    console.log("Cat" || "Dog"); // t || t returns "Cat"
    console.log(false || "Cat"); // f || t returns "Cat"
    console.log("Cat" || false); // t || f returns "Cat"
    console.log("" || false); // f || f returns false
    console.log(false || ""); // f || f returns ""
    ```

- `&&` 優先順序高於 `||`

### 物件

- 宣告物件

  - Object Iiter 物件實字

    ```js
    var obj = {
      name: "elaine",
    };
    ```

  - 建構式

    ```js
    var obj = new Object({ name: "elaine" });

    var a = new Object(1); // 等同於 new Number(1)
    var b = new Object("1"); // 等同於 new String("1")
    ```

- 存取值

  - `.`
  - `[]`

    - 可以用字串、變數的方式來取值

      ```js
      var person = {
        name: "elaine",
      };
      console.log(person["name"]); // "elaine"
      var key = "name";
      console.log(person[key]); // "elaine"
      ```

### delete 變數與物件屬性的差異

```js
var a = 1;
b = 2;

console.log(window);
```

![](https://i.imgur.com/UNYVT76.png)

利用 `delete` 來刪除

```js
var a = 1;
b = 2; // 等同於 window.b = 2

delete a; // 無法刪除
delete b;
console.log(window);
```

![](https://i.imgur.com/vk9jdG7.png)

`delete` 無法刪除變數，可以刪除屬性

### 純值與物件

- 純值無法新增屬性

  ```js
  var newString1 = "小明家";
  newString1.name = "小明";
  console.log(newString1);

  var newString2 = new String("小明家");
  newString2.name = "小明";
  console.log(newString2);
  ```

  ![](https://i.imgur.com/5DanL0a.png)

- 陣列是物件，可以新增屬性

  ```js
  var newArray = [1, 2, 3];
  newArray.name = "小明";
  console.log(newArray);
  ```

  ![](https://i.imgur.com/K4mYjTx.png)

- 函式是物件，可以新增屬性

  ```js
  function callName() {
    console.log("呼叫小明");
  }
  callName.name = "小明"; // name 是特定屬性，無法更改
  callName.ming = "小明";
  console.dir(callName);
  ```

  ![](https://i.imgur.com/uVTGOCo.png)

### 物件傳參考

- 純值 call by value
  - boolean
  - number
  - string
  - null
  - undefined
- 物件 call by reference

  - 物件
  - 陣列
  - 函式

  ```js
  var person1 = {
    name: "小明",
  };

  var person2 = person1;
  person2.name = "小王";

  console.log(person1);
  console.log(person2);
  console.log(person1 === person2);
  ```

  ![](https://i.imgur.com/4QnSThC.png)

* 圖解記憶體位置
  ![](https://i.imgur.com/G5q9f4j.png)

  ![](https://i.imgur.com/kFnegf1.png)

* 練習題

  ```js
  var a = { x: 1 };
  var b = a;
  a.y = a = { x: 2 };
  console.log(a.y);
  console.log(b);
  ```

  ![](https://i.imgur.com/EGr7nD2.png)

### 淺層複製、深層複製

- 淺層複製

  - `jQuery.extend({}, obj)`
  - `Object.assign({}, obj)`

- 深層複製
  - `JSON.parse(JSON.stringify(obj))`

### JSON

- key 是字串
- 一律使 用雙引號 `"`
- 最後不能加上 `,`

### 具名函式、匿名函式

```js
function a() {
  console.log("具名函式");
}

a();

var b = function() {
  console.log("匿名函式");
};

b();
```

### 立即函式

- 立刻執行
- 無法在函式外被再次執行
- 常用來限制變數作用域

```js
(function IIFE() {
  console.log("立即函式");
})();
IIFE(); // ReferenceError: IIFE is not defined
```

```js
(function() {
  console.log("匿名立即函式");
})();

(function() {
  console.log("匿名立即函式");
})();
```

- 通常會在前面或後面加入 `;`，避免解析錯誤

  ```js
  (function() {
    console.log("立即函式");
  })()(
    (function() {
      console.log("立即函式");
    })()
  )(
    // 等同於

    (function() {
      console.log("立即函式");
    })()
  )(
    (function() {
      console.log("立即函式");
    })()
  );

  // Uncaught TypeError: (intermediate value)(...) is not a function
  ```

  ```js
  // 正常寫法
  (function() {
    console.log("立即函式");
  })();
  (function() {
    console.log("立即函式");
  })();
  ```

### 函式參數

- parameter
- 區域變數
- arguments
- this
- 全域變數

```js
var globalVariable = "全域變數";
var obj = {
  aFunction: function(param) {
    var localVariable = "區域變數";
    console.log(param);
    console.log(localVariable);
    console.log(arguments);
    console.log(this);
    console.log(globalVariable);
  },
};
obj.aFunction("第一個參數", 2, "第三個參數");
```

![](https://i.imgur.com/GnuMxWs.png)

### 閉包

```js
function storeMoney() {
  var money = 1000;
  return function(price) {
    money = money + price;
    return money;
  };
}

var MingMoney = storeMoney();
console.log(MingMoney(100)); // 1100
console.log(MingMoney(100)); // 1200
console.log(MingMoney(100)); // 1300

var JayMoney = storeMoney();
console.log(JayMoney(10)); // 1010
console.log(JayMoney(10)); // 1020
console.log(JayMoney(10)); // 1030
```

- 常見問題

  ```js
  function a() {
    for (var i = 0; i < 3; i++) {
      setTimeout(function() {
        console.log(i);
      }, 1000);
    }
  }

  a(); // 3, 3, 3
  ```

  - 使用立即函式解決

    ```js
    function a() {
      for (var i = 0; i < 3; i++) {
        (function(j) {
          setTimeout(function() {
            console.log(j);
          }, 1000);
        })(i);
      }
    }

    a(); // 0, 1, 2
    ```

  - 透過 `let` 宣告

    ```js
    function a() {
      for (let i = 0; i < 3; i++) {
        setTimeout(function() {
          console.log(i);
        }, 1000);
      }
    }

    a(); // 0, 1, 2
    ```

### this

- 作為物件的方法

  - 呼叫的人是誰

  ```js
  var myName = "Elaine";

  function callName() {
    console.log(this.myName);
  }

  var family = {
    myName: "小明家",
    callName: callName,
    boy: {
      myName: "小明",
      callName: callName,
    },
  };

  family.callName(); // 呼叫的是 family，所以印出 '小明家'

  family.boy.callName(); // 呼叫的是 boy，所以印出 '小明'

  var call = family.callName;
  call(); // 呼叫的是 window，所以印出 'Elaine'
  ```

- 簡易呼叫

  ```js
  var myName = "Elaine";

  var family = {
    myName: "小明家",
    callName: function() {
      var self = this;
      setTimeout(function() {
        console.log(self.myName); // 這樣才是 '小明家'
      }, 1000);
    },
  };
  ```

- bind、call、apply

  ```js
  var myName = "Elaine";

  var family = {
    myName: "小明家",
  };

  function fn(param1, param2) {
    console.log(this, param1, param2);
  }

  fn.call(family, 1, 2);

  fn.apply(family, [3, 4]);

  var fn2 = fn.bind(family, 5, 6);
  fn2();
  fn2(7, 8); // 參數無效

  var fn2 = fn.bind(family, 9);
  fn2(10); // 綁定部分參數
  ```

  - 非嚴格模式

    - 綁定 `this` 為純值，會轉成`包裹物件`

        ```js
        var myName = "Elaine";

        var family = {
        myName: "小明家",
        };

        function fn(param1, param2) {
        console.log(this, param1, param2);
        }

        fn.call(1, "一", "二"); // this 為 Number(1)
        ```

    - 綁定 `this` 為 `undefined` 或 `null`，會轉向 `window`

        ```js
        var myName = "Elaine";

        var family = {
        myName: "小明家",
        };

        function fn(param1, param2) {
        console.log(this, param1, param2);
        }

        fn.call(undefined, "一", "二"); // this 為 window
        fn.call(null, "一", "二"); // this 為 window
        ```

  - 嚴格模式

    - 綁定 `this` 為純值，還是純值

        ```js
        var myName = "Elaine";

        var family = {
        myName: "小明家",
        };

        function fn(param1, param2) {
        "use strict";
        console.log(this, param1, param2);
        }

        fn.call(1, "一", "二"); // this 為 1
        ```

    - 可以正常綁定 `this` 為 `undefined` 或 `null`

        ```js
        var myName = "Elaine";

        var family = {
        myName: "小明家",
        };

        function fn(param1, param2) {
        "use strict";
        console.log(this, param1, param2);
        }

        fn.call(undefined, "一", "二"); // this 為 undefined
        fn.call(null, "一", "二"); // this 為 null
        ```

    - simple

        ```js
        var myName = "Elaine";

        var family = {
        myName: "小明家",
        };

        function fn(param1, param2) {
        "use strict";
        console.log(this, param1, param2);
        }

        fn("一", "二"); // this 為 undefined
        ```

- new
- DOM 事件處理器

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>JS Bin</title>
    </head>
    <body>
      <button onclick="console.log(this)">這是一顆按鈕</button>
    </body>
  </html>
  ```

  ![](https://i.imgur.com/YP2QPDN.png)

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>JS Bin</title>
    </head>
    <body>
      <button id="myBtn">這是另一顆按鈕</button>
      <script>
        var myBtn = document.getElementById("myBtn");
        myBtn.addEventListener("click", function() {
          console.log(this);
        });
      </script>
    </body>
  </html>
  ```

  ![](https://i.imgur.com/K1RUCv6.png)

- 箭頭函式

### 原型

- 一樣具有物件的特性(屬性、方法)
- 向上查找
- 原型可共用屬性與方法

```js
function Dog(name, color) {
  this.name = name;
  this.color = color;
}

var bibi = new Dog("比比", "黑");
var pupu = new Dog("噗噗", "白");

Dog.prototype.bark = function() {
  console.log(this.name + " 汪汪汪");
};

console.log(bibi, pupu);
```

![](https://i.imgur.com/5co5Odj.png)

### `prototype` 與 `__proto__`

- `prototype`
  - 函式
- `__proto__`
  - 物件上

### Object.create 來繼承

```js
function Animal(family) {
  this.family = family || "人科";
}

Animal.prototype.move = function() {
  console.log(this.name + " 移動");
};

function Dog(name, color) {
  Animal.call(this, "犬科");
  this.name = name;
  this.color = color;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
  console.log(this.name + " 汪汪汪");
};

var bibi = new Dog("比比", "黑");
console.log(bibi);
bibi.bark(); // 比比 汪汪汪
bibi.move(); // 比比 移動
```

### 原型鍊總結

![](https://i.imgur.com/fvvQzBO.png)

```js
function Animal(family) {
  this.family = family || "人科";
}

Animal.prototype.move = function() {
  console.log(this.name + " 移動");
};

function Dog(name, color) {
  Animal.call(this, "犬科");
  this.name = name;
  this.color = color;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
  console.log(this.name + " 汪汪汪");
};

var bibi = new Dog("比比", "黑");

// __proto__ 到最後是 null
console.log(bibi.__proto__ === Dog.prototype);
console.log(bibi.__proto__.__proto__ === Animal.prototype);
console.log(bibi.__proto__.__proto__.__proto__ === Object.prototype);
console.log(bibi.__proto__.__proto__.__proto__.__proto__ === null);

// 函式到最後也是 null
console.log(Function.prototype.__proto__ === Object.prototype);

// constructor
console.log(Dog.prototype.constructor === Dog);
console.log(Animal.prototype.constructor === Animal);
console.log(Object.prototype.constructor === Object);
console.log(Function.prototype.constructor === Function);

// 建構式的 __proto__ 都是 Function.prototype
console.log(Dog.__proto__ === Function.prototype);
console.log(Animal.__proto__ === Function.prototype);
console.log(Object.__proto__ === Function.prototype);
console.log(Function.__proto__ === Function.prototype);
```

### 參考資料

- [udemy - JavaScript 核心篇](https://www.udemy.com/course/javascript-adv/learn/lecture/15723718?start=0#overview)
- [【你不知道的 JavaScript 上卷】——作用域與閉包](https://mp.weixin.qq.com/s/a_kYA_2AahsLqJafQHTcoQ)
- [mdn - 記憶體管理](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Memory_Management)
- [你懂 JavaScript 嗎？#8 強制轉型（Coercion）](https://cythilya.github.io/2018/10/15/coercion/)
