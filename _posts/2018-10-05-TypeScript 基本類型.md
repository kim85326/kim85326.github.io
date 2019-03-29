---
layout: post
title: "TypeScript 基本類型"
date: 2018-10-05 00:00:00 +0800
categories: JavaScript
tags: JavaScript TypeScript
mathjax: true
---

### boolean

```js
let isDone: boolean = false;
```

```js
let createdByNewBoolean: boolean = new Boolean(1);

// index.ts(1,5): error TS2322: Type 'Boolean' is not assignable to type 'boolean'.
```

但是如果使用以下兩個方法都可以

```js
let createdByNewBoolean: Boolean = new Boolean(1);
```

```js
let createdByBoolean: boolean = Boolean(1);
```

其他 javascript 的基本類型都是如此

### number

```js
let decLiteral: number = 6;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
````

### string 

單雙引號和 Backtick 都可以

```js
let myName: string = 'Tom';
let myName: string = "Tom";
let sentence: string = `Hello! I'm ${myName}.`;
```

### array

TypeScript 對於陣列提供兩種寫法：
* 傳統 JavaScript 風格寫法
* 泛型風格寫法

```js
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

### tuple

陣列必須每個元素的型別都相同，若你希望陣列中有不同型別的元素，則應該使用 tuple

```
let x: [string, number];
x = ["hello", 10];
x = [10, "hello"]; // 編譯失敗
```

### void

如果 function 明確不傳回任何值，可以使用 void

```js
function alertName(): void {
    alert('My name is Tom');
}
```

### null 與 undefined

```js
let u: undefined = undefined;
let n: null = null;
```

或是這樣也可以

```js
let num: number = undefined;
```

```js
let u: undefined;
let num: number = u;
```

### any

如果是普通類型，在賦值的時候改變型態是不行的，如

```js
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

但是如果是 any 就可以

```js
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

在任意值上讀取任何屬性都是可以的

```js
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
```

也可以調用任何方法

```js
let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
```

如果是未聲明類型的變數，那將會被視為 any 型態

```js
let something;
something = 'seven';
something = 7;

something.setName('Tom');
```

等價於

```js
let something: any;
something = 'seven';
something = 7;

something.setName('Tom');
```

* 但是實務上不建議使用 any 型別，因為這將喪失 TypeScript 的型別檢查機制，除非有充分的理由

## 聯合類型

類型可以是多種類型的一種，如

```js
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

```js
let myFavoriteNumber: string | number;
myFavoriteNumber = true;

// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

裡面的屬性或方法一定是要每個類型都有的

```js
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

上例中，length 不是 string 和 number 的共有屬性，所以會噴錯

### Type Assertion 類型斷言

實務上有時宣告了 any，但為了 intellisense 或其他變數，需要做明確的轉型，此時可使用 type assertion 明確轉型，也就是告訴編譯器：「我自己知道此變數的明確型別，請相信我的轉型」

* 類型斷言有兩種形式
    * <>

    ```js
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
    ```
    
    * as
        * 當你在TypeScript裡使用JSX時，只有 as 語法斷言是被允許的
        
    ```js
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
    ```

### 初始化物件

TypeScript 有 3 種寫法，可以寫出類似 C# Object Initializer 風格的程式碼

```js
const hero: Hero = {
  name: 'Sam',
  state: 'active'
};
```

```js
const hero = <Hero>{
  name: 'Sam',
  state: 'active'
};
```

```js
const hero = {
  name: 'Sam',
  state: 'active'
} as Hero;
```

### 宣告函數

```js
function addMe(num1: number, num2: number): number {
    return num1 + num2;
}
```

```js
var addMe = function (num1: number, num2: number): number { 
    return num1 + num2;
}
```

### 參考資料

- [TypeScript 官方文件 - 基礎類型](https://www.tslang.cn/docs/handbook/basic-types.html)
- [TypeScript 入门教程 - 原始数据类型](https://ts.xcatliu.com/basics/primitive-data-types.html)
- [深入探討 TypeScript 之基本型別](https://oomusou.io/typescript/basic-type/)
- [深入探討 TypeScript 之 Type Assertion](https://oomusou.io/typescript/type-assertion/)


