---
layout: post
title: "JavaScript 陣列"
date: 2019-09-13 00:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
---

### 建立陣列

- 使用 `[]` 建立陣列

  - `[element0, element1, ..., elementN]`

  ```js
  var array1 = [];
  var array2 = ["周杰倫", "陳奕迅", "李榮浩"];
  ```

- 使用 `constructor` 建立陣列

  - 建立空陣列
    - `new Array()`
  - 建立指定元素的陣列
    - `new Array(element0, element1[, ...[, elementN]])`
  - 建立一個指定大小的陣列
    - `new Array(arrayLength)`

  ```js
  var array3 = new Array();
  console.log(array3); //[]

  var array4 = new Array("周杰倫", "陳奕迅", "李榮浩");
  console.log(array4); //["周杰倫", "陳奕迅", "李榮浩"]

  var array5 = new Array(3);
  console.log(array5); //[undefined, undefined, undefined]

  var array6 = new Array(-3); //"RangeError: Invalid array length
  ```

  - 不建議使用 constructor 來建立陣列
    - 因為 `new Array(3)` 會讓人誤會是 `[3]` 還是 `[undefined, undefined, undefined]`

* 使用 `Array.of` 建立陣列

  - 由於上面 `new Array(3)` 的問題，有一個新的方法，會用參數的數量來建立新的陣列

    ```js
    console.log(Array.of()); // []
    console.log(Array.of(undefined)); // [undefined]
    console.log(Array.of(1)); // [1]
    console.log(Array.of(1, 2)); // [1, 2]
    ```

  - Polyfill
    ```js
    Array.of = function() {
      return Array.prototype.slice.call(arguments);
    };
    ```

### 判斷是否為陣列

我們無法用 `typeOf` 來判斷是否為陣列

```js
var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
console.log(typeof array1); // "object"
```

- 可以用陣列的 static 方法 `isArray` 來判斷

  ```js
  var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
  var str1 = "哈囉我是字串耶";
  console.log(Array.isArray(array1)); // true
  console.log(Array.isArray(str1)); // false
  ```

- 可以用 `instanceof` 來判斷

  ```js
  var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
  var str1 = "哈囉我是字串耶";
  console.log(array1 instanceof Array); // true
  console.log(str1 instanceof Array); // false
  ```

- 自己寫一個類似 `isArray` 的方法

  ```js
  function isArray(x) {
    return x.constructor.toString().indexOf("Array") > -1;
  }

  var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
  var str1 = "哈囉我是字串耶";
  console.log(isArray(array1)); // true
  console.log(isArray(str1)); // false
  ```

### 陣列長度

- `length` 屬性

  - 陣列長度
  - 可讀可寫

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.length); //3
    ```

  - 但不建議使用這種方式來異動陣列

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    array1.length = 1;
    console.log(array1.length); //1
    console.log(array1); //["周杰倫"]
    array1.length = 4;
    console.log(array1.length); //4
    console.log(array1); //["周杰倫", undefined, undefined, undefined]
    ```

### 存取陣列元素

```js
var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
console.log(array1[0]); // "周杰倫"
array1[0] = "林宥嘉";
console.log(array1[0]); // "林宥嘉"
```

盡量不要直接設定 array 第幾個元素等於 xxx，可能會造成下面這個恐怖的結局

```js
array1[10] = "林俊傑";
console.log(array1); // ["林宥嘉", "陳奕迅", "李榮浩", undefined, undefined, undefined, undefined, undefined, undefined, undefined, "林俊傑"]
console.log(array1.length); // 11
```

請使用 `push`

```js
array1.push("林俊傑");
console.log(array1); // ["林宥嘉", "陳奕迅", "李榮浩", "林俊傑"]
console.log(array1.length); // 4
```

### 改變原陣列元素

![](https://i.imgur.com/VWxJ6cE.png)

- `pop`

  - 移除陣列末端的一個元素，並回傳被移除的元素
  - `arr.pop()`

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.pop()); // "李榮浩"
    console.log(array1); // ["周杰倫", "陳奕迅"]
    ```

- `push`

  - 新增元素至陣列末端，並回傳新增後的陣列長度
  - `arr.push(element1[, ...[, elementN]])`

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.push("林俊傑")); // 4，會回傳新增後的陣列長度
    console.log(array1); // ["周杰倫", "陳奕迅", "李榮浩", "林俊傑"]
    ```

- `shift`

  - 移除陣列前端的一個元素，並回傳被移除的元素
  - `arr.shift()`

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.shift()); // "周杰倫"
    console.log(array1); // ["周杰倫", "陳奕迅"]
    ```

- `unshift`

  - 新增元素至陣列前端，並回傳新增後的陣列長度
  - `arr.unshift(element1[, ...[, elementN]])`

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.unshift("林俊傑")); // 4，會回傳新增後的陣列長度
    console.log(array1); // ["林俊傑", "周杰倫", "陳奕迅", "李榮浩"]
    ```

- `splice`

  - 改變陣列內容，移除或新增元素，並回傳被移除的元素
  - `arr.splice(start[, deleteCount][, element1[, ...[, elementN]]])`
  - `start`
    - 要從哪個位置開始改變
  - `deleteCount`
    - 用來指出要移除多少個元素
    - 如果等於 0，則沒有任何元素被移除
  - `element1, ..., elementN`

    - 要加入陣列的元素，如果省略則表示不加入只移除

  - 移除

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.splice(1)); // ["陳奕迅", "李榮浩"]，移除 index 為 1 (含)以後的元素
    console.log(array1); // ["周杰倫"]
    ```

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.splice(1, 1)); // ["陳奕迅"]，移除 index 為 1 (含)以後的 1 個元素
    console.log(array1); // ["周杰倫", "李榮浩"]
    ```

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.splice(-1, 1)); // ["李榮浩"]，移除後面數來第 1 個(含)以後的 1 個元素
    console.log(array1); // ["周杰倫", "陳奕迅"]
    ```

  - 移除並新增

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.splice(-1, 1, "林宥嘉")); // ["李榮浩"]
    // 移除後面數來第 1 個(含)以後的 1 個元素，並新增 1 個元素
    console.log(array1); // ["周杰倫", "陳奕迅", "林宥嘉"]
    ```

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.splice(-1, 0, "林宥嘉", "王力宏")); // []
    // 移除後面數來第 1 個(含)以後的 0 個元素，並新增 2 個元素
    console.log(array1); // ["周杰倫", "陳奕迅", "林宥嘉", "王力宏", "李榮浩"]
    ```

- `sort`

  - 排序陣列
  - `arr.sort([compareFunction])`

    - 沒有 `compareFunction` 的話，預設為 ASCII 字符順序進行「升序排列」

      ```js
      var months = ["March", "Jan", "Feb", "Dec"];
      months.sort();
      console.log(months); // ["Dec", "Feb", "Jan", "March"]

      var array1 = [1, 30, 4, 21, 100000];
      array1.sort();
      console.log(array1); // [1, 100000, 21, 30, 4]
      ```

    - 有 `compareFunction` 的話

      - 若 `compareFunction(a, b)` < 0，則 a index < b index，反之。
        ```js
        function compare(a, b) {
            if (在某排序標準下 a 小於 b) {
                return -1;
            }
            if (在某排序標準下 a 大於 b) {
                return 1;
            }
            // a 必須等於 b
            return 0;
        }
        ```

      ```js
      var numbers = [4, 2, 5, 1, 3];
      numbers.sort(function(a, b) {
        return a - b;
      });
      console.log(numbers); // [1, 2, 3, 4, 5]
      ```

- `reverse`

  - 反轉陣列
  - `arr.reverse()`

    ```js
    var array1 = ["one", "two", "three"];
    console.log(array1.reverse()); // ["three", "two", "one"]
    console.log(array1); // ["three", "two", "one"]
    ```

- `fill`

  - 使用固定值來填滿陣列
  - `arr.fill(value[, start[, end]])`

    ```js
    console.log([1, 2, 3].fill(4)); // [4, 4, 4]
    console.log([1, 2, 3].fill(4, 1)); // [1, 4, 4]
    console.log([1, 2, 3].fill(4, 1, 2)); // [1, 4, 3]
    console.log([1, 2, 3].fill(4, 1, 1)); // [1, 2, 3]
    console.log([1, 2, 3].fill(4, 3, 3)); // [1, 2, 3]
    console.log([1, 2, 3].fill(4, -3, -2)); // [4, 2, 3]
    console.log([1, 2, 3].fill(4, NaN, NaN)); // [1, 2, 3]
    console.log([1, 2, 3].fill(4, 3, 5)); // [1, 2, 3]
    ```

- `copyWithin`

  - 淺層複製陣列部分元素至原陣列其他位置，陣列長度不變，會修改原陣列
  - `arr.copyWithin(target[, start[, end]])`

    - target 從該位置開始替換資料，`target >= arr.length`，則沒有項目會被複製

    ```js
    console.log([1, 2, 3, 4, 5].copyWithin(-2)); // [1, 2, 3, 1, 2]
    console.log([1, 2, 3, 4, 5].copyWithin(0, 3)); // [4, 5, 3, 4, 5]
    console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)); // [4, 2, 3, 4, 5]
    console.log([1, 2, 3, 4, 5].copyWithin(-2, -3, -1)); // [1, 2, 3, 3, 4]
    ```

### 搜尋

- `indexOf`

  - 和 String 的 `indexOf` 差不多
  - 從陣列前端(或是第 fromIndex + 1 個元素開始)搜尋
  - 如果沒有出現，會回傳 `-1`
  - `arr.indexOf(searchElement[, fromIndex])`

    ```js
    var array1 = ["a", "b", "c", "b"];
    console.log(array1.indexOf("b")); //1
    console.log(array1.indexOf("b", 2)); //3
    console.log(array1.indexOf("b", -3)); //1
    console.log(array1.indexOf("b", -2)); //3
    console.log(array1.indexOf("z")); //-1
    console.log(array1.indexOf("A")); //-1
    ```

- `lastIndexOf`

  - 和 `indexOf` 類似，只是是最後出現的位置
  - `arr.lastIndexOf(searchElement[, fromIndex])`

    - fromIndex 參數為負數的話，會視為 0

    ```js
    var array1 = ["a", "b", "c", "b"];
    console.log(array1.lastIndexOf("b")); //3
    console.log(array1.lastIndexOf("b", 2)); //1
    console.log(array1.lastIndexOf("b", -3)); //1，負數視為 0
    console.log(array1.lastIndexOf("b", -2)); //1，負數視為 0
    console.log(array1.lastIndexOf("z")); //-1
    console.log(array1.lastIndexOf("A")); //-1
    ```

- `includes`

  - ES6 新語法
  - 和 `indexOf` 差不多，只是回傳 boolean 值
  - `arr.includes(searchElement[, fromIndex])`

    - fromIndex 參數為負數的話，會視為 0

    ```js
    var array1 = ["a", "b", "c", "b"];
    console.log(array1.includes("b")); //true
    console.log(array1.includes("b", 2)); //true
    console.log(array1.includes("b", -3)); //true，負數視為 0
    console.log(array1.includes("b", -2)); //true，負數視為 0
    console.log(array1.includes("z")); //false
    console.log(array1.includes("A")); //false
    ```

### 取得部分陣列

- `slice`

  - 和 String 的 `slice` 差不多
  - 複製開始與結束點（結束點不算）中的內容
  - `arr.slice([start[, end]])`

    - 擷取 start + 1 ~ end 的元素
    - 沒有給第二個參數，會一直擷取到陣列末端
    - 負數的參數會從後面開始往前數

    ```js
    var array1 = ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"];
    console.log(array1.slice(6)); // ["w", "o", "r", "l", "d"]，(第 0 個開始算)第 6 個 ~ 最後
    console.log(array1.slice(6, 9)); // ["w", "o", "r"]，(第 0 個開始算)第 6 個 ~ 第 9 個(不含)
    console.log(array1.slice(9, 6)); // []，(第 0 個開始算)第 9 個 ~ 第 6 個(不含)
    console.log(array1.slice(-5, 9)); // ["w", "o", "r"]，結尾往前數 5 個 ~ (第 0 個開始算)第 9 個(不含)
    console.log(array1.slice(-9, -1)); // ["l", "l", "o", " ", "w", "o", "r", "l"]，結尾往前數 9 個 ~ 結尾往前 1 個(不含)
    ```

### 串接陣列

- `concat`

  - 將指定元素與陣列合併並回傳新陣列
  - `var new_array = old_array.concat([value1[, value2[, ...[, valueN]]]])`

    ```js
    var array1 = ["a", "b", "c"];
    console.log(array1.concat(1, 2, 3, 4)); // ["a", "b", "c", 1, 2, 3, 4]
    console.log(array1); // ["a", "b", "c"]

    var array2 = [true, false];
    console.log(array1.concat(array2)); // ["a", "b", "c", true, false]
    console.log(array1); // ["a", "b", "c"]
    ```

### 轉為字串

- `join`

  - 將陣列轉換為字串
  - `arr.join([separator])`

    - 以 separator 作為串接字元

    ```js
    var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
    console.log(array1.join("")); // "周杰倫陳奕迅李榮浩"
    console.log(array1.join("、")); // "周杰倫、陳奕迅、李榮浩"
    ```

### 將類陣列轉換陣列

- `Array.from`

  - 從類陣列（array-like）或是可迭代（iterable）物件建立一個新的 Array 實體
  - `Array.from(object[, mapFunction][, thisValue])`
    - object 為類陣列
    - mapFunction 類似 map 方法，對每個元素進行處理之後再回傳陣列
    - 執行 mapFunction 的 this 是誰
  - 第一個參數為陣列，會回傳一模一樣的陣列

    ```js
    console.log(Array.from(["a", "b", "c"])); // ["a", "b", "c"]
    ```

  - 第一個參數為字串

    ```js
    console.log(Array.from("Hello")); // ["H", "e", "l", "l", "o"]
    ```

  - 第一個參數為物件，且 key 是數字、有 length 屬性

    ```js
    let arrayLike = {
      "0": "a",
      "1": "b",
      "2": "c",
      length: 3,
    };
    console.log(Array.from(arrayLike)); // ["a", "b", "c"]
    ```

  - 第一個參數為 DOM 節點的 NodeList

    ```js
    let doms = document.querySelectorAll("div");
    console.log(Array.from(doms));
    ```

  - 第一個參數為 arguments

    ```js
    function foo() {
      cosole.log(Array.from(arguments));
    }
    ```

    ```js
    function foo() {
      cosole.log([...arguments]); //另外一種 arguments 轉陣列的方法
    }
    ```

  - 第一個參數為 Set

    ```js
    let s = new Set(["a", "b"]);
    console.log(Array.from(s)); // ["a", "b"]
    ```

  - 第一個參數為 Map

    ```js
    let m = new Map([[1, 2], [2, 4], [4, 8]]);
    console.log(Array.from(m)); // [[1, 2], [2, 4], [4, 8]]
    ```

  - 加入第二個參數

    ```js
    console.log(Array.from([1, 2, 3], (x) => x * x)); // [1, 4, 9]
    ```

### 取得 key / value

- `entries`

  - 取得所有的 key / value
  - 回傳一個新的 Array Iterator 物件
  - `a.entries()`

  ```js
  var a = ["a", "b", "c"];
  var iterator = a.entries();

  for (let element of iterator) {
    console.log(element);
  }

  // [0, "a"]
  // [1, "b"]
  // [2, "c"]
  ```

  ```js
  var a = ["a", "b", "c"];
  var iterator = a.entries();

  console.log(iterator.next());
  // {
  //   done: false,
  //   value: [0, "a"]
  // }
  console.log(iterator.next());
  // {
  //   done: false,
  //   value: [1, "b"]
  // }
  console.log(iterator.next());
  // {
  //   done: false,
  //   value: [2, "c"]
  // }
  console.log(iterator.next());
  // {
  //   done: true,
  //   value: undefined
  // }
  ```

- `keys`

  - 取得所有的 key
  - 回傳一個新的 Array Iterator 物件
  - `arr.keys()`

  ```js
  var a = ["a", "b", "c"];
  var iterator = a.keys();

  for (let element of iterator) {
    console.log(element);
  }

  // 0
  // 1
  // 2
  ```

- `values`

  - 取得所有的 value
  - 回傳一個新的 Array Iterator 物件
  - `arr.values()`

  ```js
  var a = ["a", "b", "c"];
  var iterator = a.values();

  for (let element of iterator) {
    console.log(element);
  }

  // "a"
  // "b"
  // "c"
  ```

### callback

- `forEach`

  - 陣列元素依序執行 callback
  - 公式
    ```
    arr.forEach(function callback(currentValue[, index[, array]]) {
      //your iterator
    }[, thisArg]);
    ```

  ```js
  var array1 = ["周杰倫", "陳奕迅", "李榮浩"];
  array1.forEach((item) => {
    console.log(item);
  });

  // "周杰倫"
  // "陳奕迅"
  // "李榮浩"
  ```

- `map`

  - 會建立一個新的陣列，其內容為原陣列的每一個元素經由 callback 運算後所回傳的結果之集合
  - 公式
    ```
      var new_array = arr.map(function callback(currentValue[, index[, array]]) {
          // Return element for new_array
      }[, thisArg])
    ```

  ```js
  var array1 = [1, 2, 3];
  var newArray1 = array1.map((item) => {
    return item * 2;
  });

  console.log(newArray1); //[2, 4, 6]
  ```

- `some`

  - 檢查陣列中某一元素是否符合條件
  - `arr.some(callback[, thisArg])`

  ```js
  function isBiggerThan10(element, index, array) {
    return element > 10;
  }

  console.log([1, 2, 3].some(isBiggerThan10)); // false
  console.log([1, 2, 11].some(isBiggerThan10)); // true
  console.log([12, 13, 14].some(isBiggerThan10)); // true
  ```

- `every`

  - 檢查陣列中每一個元素是否符合條件
  - `arr.every(callback[, thisArg])`

  ```js
  function isBiggerThan10(element, index, array) {
    return element > 10;
  }

  console.log([1, 2, 3].every(isBiggerThan10)); // false
  console.log([1, 2, 11].every(isBiggerThan10)); // false
  console.log([12, 13, 14].every(isBiggerThan10)); // true
  ```

- `filter`

  - 將符合條件的元素建立一個陣列
  - `var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])`

  ```js
  function isBiggerThan10(element, index, array) {
    return element > 10;
  }

  console.log([1, 2, 3].filter(isBiggerThan10)); // []
  console.log([1, 2, 11].filter(isBiggerThan10)); // [11]
  console.log([12, 13, 14].filter(isBiggerThan10)); // [12, 13, 14]
  ```

- `find`

  - 取得第一個符合條件的元素
  - `arr.find(callback[, thisArg])`

  ```js
  function isBiggerThan10(element, index, array) {
    return element > 10;
  }

  console.log([1, 2, 3].find(isBiggerThan10)); // undefined
  console.log([1, 2, 11].find(isBiggerThan10)); // 11
  console.log([12, 13, 14].find(isBiggerThan10)); // 12
  ```

- `findIndex`

  - 取得第一個符合條件的元素的 index
  - `arr.findIndex(callback[, thisArg])`

  ```js
  function isBiggerThan10(element, index, array) {
    return element > 10;
  }

  console.log([1, 2, 3].findIndex(isBiggerThan10)); // -1
  console.log([1, 2, 11].findIndex(isBiggerThan10)); // 2
  console.log([12, 13, 14].findIndex(isBiggerThan10)); // 0
  ```

- `reduce`

  - 將一個累加器及陣列中每項元素（由左至右）傳入 callback，將陣列化為單一值
  - `arr.reduce(callback[accumulator, currentValue, currentIndex, array], initialValue)`

  ```js
  var array1 = [1, 2, 3];
  var value = array1.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });

  console.log(value); //6
  ```

### 其他

盡量不要去操作原始資料，先深層複製再來操作

### 參考資料

- [JavaScript Arrays](https://www.w3schools.com/js/js_arrays.asp)
- [mdn - Array sort](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [mdn - Array full](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [slice()、splice()、split() 傻傻分不清](https://medium.com/@bebebobohaha/slice-splice-split-%E5%82%BB%E5%82%BB%E5%88%86%E4%B8%8D%E6%B8%85-46d9c8992729)
- [JavaScript 陣列元素順序重新排序 sort()](http://www.eion.com.tw/Blogger/?Pid=1170)
- [DAY 9. JavaScript Array 操作](https://ithelp.ithome.com.tw/articles/10191368)
- [阮一峰 ECMAScript 6 入门 数组的扩展](http://es6.ruanyifeng.com/#docs/array)
- [Javascript Array 操作筆記](https://poychang.github.io/note-javascript-array/)
- [從 ES6 開始的 JavaScript 學習生活 - 陣列](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part3/array.html)
